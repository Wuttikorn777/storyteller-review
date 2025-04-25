const fs = require('fs');
const path = require('path');
const Rating = require('../models/ratingModel');

jest.mock('fs'); // Mock fs module

describe('Rating Model', () => {
    const ratingsFilePath = path.join(__dirname, '../ratings.json');
    let ratingModel;

    beforeEach(() => {
        ratingModel = new Rating();
        jest.clearAllMocks();
    });

    test('should add a new rating', () => {
        const newRating = { movieId: 1, username: 'user1', rating: 5 };
        ratingModel.addRating(newRating);
        expect(ratingModel.getAllRatings()).toContainEqual(newRating);
    });

    test('should get ratings by movieId', () => {
        const ratings = [
            { movieId: 1, username: 'user1', rating: 5 },
            { movieId: 1, username: 'user2', rating: 4 },
            { movieId: 2, username: 'user3', rating: 3 }
        ];
        ratings.forEach(r => ratingModel.addRating(r));
        const movieRatings = ratingModel.getRatingsByMovieId(1);
        expect(movieRatings).toEqual([
            { movieId: 1, username: 'user1', rating: 5 },
            { movieId: 1, username: 'user2', rating: 4 }
        ]);
    });

    test('should save ratings to a file', () => {
        const ratings = [
            { movieId: 1, username: 'user1', rating: 5 }
        ];
        ratings.forEach(r => ratingModel.addRating(r));
        ratingModel.saveRatingsToFile(ratingsFilePath);
        expect(fs.writeFileSync).toHaveBeenCalledWith(ratingsFilePath, JSON.stringify(ratings, null, 2));
    });

    test('should load ratings from a file', () => {
        const ratings = [
            { movieId: 1, username: 'user1', rating: 5 }
        ];
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(ratings));
        ratingModel.loadRatingsFromFile(ratingsFilePath);
        expect(ratingModel.getAllRatings()).toEqual(ratings);
    });

    test('should handle loading from a non-existent file', () => {
        fs.existsSync.mockReturnValue(false);
        ratingModel.loadRatingsFromFile(ratingsFilePath);
        expect(ratingModel.getAllRatings()).toEqual([]);
    });
    test('should handle invalid JSON when loading ratings from file', () => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue('Invalid JSON'); // Invalid JSON format

        expect(() => {
            ratingModel.loadRatingsFromFile(ratingsFilePath);
        }).toThrow(SyntaxError); // Expect a SyntaxError
    });
    test('should handle error when saving ratings to file', () => {
        fs.writeFileSync.mockImplementation(() => {
            throw new Error('Write error');
        });

        expect(() => {
            ratingModel.saveRatingsToFile(ratingsFilePath);
        }).toThrow('Write error'); // Expect an error
    });
    test('should return an empty array if no ratings exist for a movie', () => {
        const ratings = [
            { movieId: 1, username: 'user1', rating: 5 },
            { movieId: 2, username: 'user2', rating: 4 }
        ];
        ratings.forEach(r => ratingModel.addRating(r));
        const movieRatings = ratingModel.getRatingsByMovieId(3); // Movie ID 3 does not exist
        expect(movieRatings).toEqual([]); // Expect an empty array
    });
    test('should handle empty file when loading ratings from file', () => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(''); // Empty file

        ratingModel.loadRatingsFromFile(ratingsFilePath);
        expect(ratingModel.getAllRatings()).toEqual([]); // Expect an empty array
    });
    test('should return an empty array if ratings list is empty', () => {
        const movieRatings = ratingModel.getRatingsByMovieId(1); // No ratings added
        expect(movieRatings).toEqual([]); // Expect an empty array
    });

});