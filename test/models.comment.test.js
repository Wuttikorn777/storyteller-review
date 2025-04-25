const fs = require('fs');
const path = require('path');
const CommentModel = require('../models/commentModel');

jest.mock('fs'); // Mock fs module

describe('Comment Model', () => {
    const commentsFilePath = path.join(__dirname, '../comments.json');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all comments for a movie', (done) => {
        const mockComments = {
            1: [{ username: 'user1', comment: 'Great movie!' }],
            2: [{ username: 'user2', comment: 'Not bad.' }]
        };

        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, JSON.stringify(mockComments));
        });

        CommentModel.getAllComments(1, (err, comments) => {
            expect(err).toBeNull();
            expect(comments).toEqual([{ username: 'user1', comment: 'Great movie!' }]);
            done();
        });
    });

    test('should return an empty array if no comments exist for a movie', (done) => {
        const mockComments = {};

        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, JSON.stringify(mockComments));
        });

        CommentModel.getAllComments(3, (err, comments) => {
            expect(err).toBeNull();
            expect(comments).toEqual([]);
            done();
        });
    });

    test('should handle error when reading comments file', (done) => {
        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(new Error('File not found'), null);
        });

        CommentModel.getAllComments(1, (err, comments) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('File not found');
            expect(comments).toBeNull();
            done();
        });
    });

    test('should add a new comment for a movie', (done) => {
        const mockComments = {
            1: [{ username: 'user1', comment: 'Great movie!' }]
        };

        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, JSON.stringify(mockComments));
        });

        fs.writeFile.mockImplementation((filePath, data, encoding, callback) => {
            callback(null);
        });

        CommentModel.addComment(1, 'user2', 'Amazing!', (err) => {
            expect(err).toBeNull();
            expect(fs.writeFile).toHaveBeenCalledWith(
                commentsFilePath,
                JSON.stringify(
                    {
                        1: [
                            { username: 'user1', comment: 'Great movie!' },
                            { username: 'user2', comment: 'Amazing!' }
                        ]
                    },
                    null,
                    2
                ),
                'utf8',
                expect.any(Function)
            );
            done();
        });
    });

    test('should handle error when adding a comment', (done) => {
        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, '{}');
        });

        fs.writeFile.mockImplementation((filePath, data, encoding, callback) => {
            callback(new Error('Write error'));
        });

        CommentModel.addComment(1, 'user2', 'Amazing!', (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Write error');
            done();
        });
    });
    test('should handle invalid JSON in comments file', (done) => {
        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, 'Invalid JSON'); // Invalid JSON format
        });

        CommentModel.getAllComments(1, (err, comments) => {
            expect(err).toBeInstanceOf(SyntaxError); // Expect a SyntaxError
            expect(comments).toBeNull(); // Comments should be null
            done();
        });
    });
    test('should handle empty comments file', (done) => {
        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, ''); // Empty file
        });

        CommentModel.getAllComments(1, (err, comments) => {
            expect(err).toBeNull();
            expect(comments).toEqual([]); // Should return an empty array
            done();
        });
    });
    test('should return an empty array if movieId does not exist in comments file', (done) => {
        const mockComments = {
            1: [{ username: 'user1', comment: 'Great movie!' }]
        };

        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, JSON.stringify(mockComments));
        });

        CommentModel.getAllComments(2, (err, comments) => { // Movie ID 2 does not exist
            expect(err).toBeNull();
            expect(comments).toEqual([]); // Should return an empty array
            done();
        });
    });
    test('should add a new comment for a movie that does not exist in the file', (done) => {
        const mockComments = {};

        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, JSON.stringify(mockComments));
        });

        fs.writeFile.mockImplementation((filePath, data, encoding, callback) => {
            callback(null);
        });

        CommentModel.addComment(2, 'user3', 'Awesome!', (err) => {
            expect(err).toBeNull();
            expect(fs.writeFile).toHaveBeenCalledWith(
                commentsFilePath,
                JSON.stringify(
                    {
                        2: [{ username: 'user3', comment: 'Awesome!' }]
                    },
                    null,
                    2
                ),
                'utf8',
                expect.any(Function)
            );
            done();
        });
    });
    test('should handle error when reading comments file while adding a comment', (done) => {
        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(new Error('Read error'), null);
        });

        CommentModel.addComment(1, 'user2', 'Amazing!', (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Read error');
            done();
        });
    });
    test('should handle error when writing comments file', (done) => {
        const mockComments = {
            1: [{ username: 'user1', comment: 'Great movie!' }]
        };

        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, JSON.stringify(mockComments));
        });

        fs.writeFile.mockImplementation((filePath, data, encoding, callback) => {
            callback(new Error('Write error'));
        });

        CommentModel.addComment(1, 'user2', 'Amazing!', (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Write error');
            done();
        });
    });
    test('should handle empty file when adding a comment', (done) => {
        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, ''); // Empty file
        });

        fs.writeFile.mockImplementation((filePath, data, encoding, callback) => {
            callback(null);
        });

        CommentModel.addComment(1, 'user1', 'Great movie!', (err) => {
            expect(err).toBeNull();
            expect(fs.writeFile).toHaveBeenCalledWith(
                commentsFilePath,
                JSON.stringify({ 1: [{ username: 'user1', comment: 'Great movie!' }] }, null, 2),
                'utf8',
                expect.any(Function)
            );
            done();
        });
    });


});