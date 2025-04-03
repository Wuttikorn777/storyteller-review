const fs = require('fs');
const path = './movies.json';
const { addMovie, updateMovie } = require('../models/movieData');

beforeEach(() => {
  fs.writeFileSync(path, JSON.stringify([], null, 2));
  console.log = jest.fn();
  console.error = jest.fn();
});

describe('addMovie', () => {
  test('should not add movie without rating', () => {
    addMovie('Test Movie', 2020);
    expect(console.log).toHaveBeenCalledWith('Movie cannot be added without a rating!');
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    expect(data.length).toBe(0);
  });

  test('should add movie with rating and no comments', () => {
    addMovie('Test Movie', 2020, 8);
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    expect(data.length).toBe(1);
    expect(data[0].comments).toEqual([]);
  });

  test('should add movie with full data', () => {
    const comments = ['Great movie!', 'Loved it!'];
    addMovie('Epic Film', 2021, 9, comments);
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    expect(data[0].name).toBe('Epic Film');
    expect(data[0].releaseYear).toBe(2021);
    expect(data[0].rating).toBe(9);
    expect(data[0].comments).toEqual(comments);
  });

  test('should allow duplicate movie names (if no validation)', () => {
    addMovie('Duplicated', 2020, 7);
    addMovie('Duplicated', 2021, 8);
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const allSameName = data.filter(m => m.name === 'Duplicated');
    expect(allSameName.length).toBe(2);
  });
});

describe('updateMovie', () => {
  test('should update rating and comments', () => {
    addMovie('Update Me', 2019, 7);
    updateMovie('Update Me', 10, ['Amazing']);
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const movie = data.find(m => m.name === 'Update Me');
    expect(movie.rating).toBe(10);
    expect(movie.comments).toEqual(['Amazing']);
  });

  test('should return null if movie not found', () => {
    const result = updateMovie('Not Exist', 10, []);
    expect(result).toBeNull();
  });

  test('should return null if file read fails', () => {
    fs.writeFileSync(path, '{ bad json');
    const result = updateMovie('Anything', 5, []);
    expect(result).toBeNull();
  });

  test('should update movie with default empty comments if not provided', () => {
    addMovie('Silent Update', 2018, 6, ['Old']);
    const result = updateMovie('Silent Update', 9); // No newComments
    expect(result.rating).toBe(9);
    expect(result.comments).toBeUndefined(); // เพราะไม่ได้ส่ง comments ใหม่
  });
});
