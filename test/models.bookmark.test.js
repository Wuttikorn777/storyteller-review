const fs = require('fs');
const Bookmark = require('../models/bookmarkModel');

jest.mock('fs'); // Mock fs module

describe('Bookmark Model', () => {
  let bookmark;

  beforeEach(() => {
    bookmark = new Bookmark();
    fs.writeFileSync.mockClear();
    fs.readFileSync.mockClear();
    fs.existsSync.mockClear();
  });

  test('should add a new bookmark', () => {
    const newBookmark = { username: 'user1', movieId: 1, title: 'Movie 1' };
    bookmark.addBookmark(newBookmark);
    expect(bookmark.getAllBookmarks()).toContainEqual(newBookmark);
  });

  test('should get all bookmarks', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    expect(bookmark.getAllBookmarks()).toEqual(bookmarks);
  });

  test('should get bookmarks by user', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' },
      { username: 'user1', movieId: 3, title: 'Movie 3' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    const user1Bookmarks = bookmark.getBookmarksByUser('user1');
    expect(user1Bookmarks).toEqual([
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user1', movieId: 3, title: 'Movie 3' }
    ]);
  });

  test('should delete a specific bookmark by user and movieId', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteBookmark('user1', 1);
    expect(bookmark.getAllBookmarks()).toEqual([{ username: 'user2', movieId: 2, title: 'Movie 2' }]);
  });

  test('should delete the first bookmark by user', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user1', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteFirstBookmarkByUser('user1');
    expect(bookmark.getAllBookmarks()).toEqual([{ username: 'user1', movieId: 2, title: 'Movie 2' }]);
  });

  test('should delete the last bookmark by user', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user1', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteLastBookmarkByUser('user1');
    expect(bookmark.getAllBookmarks()).toEqual([{ username: 'user1', movieId: 1, title: 'Movie 1' }]);
  });

  test('should delete the first bookmark', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteFirstBookmark();
    expect(bookmark.getAllBookmarks()).toEqual([{ username: 'user2', movieId: 2, title: 'Movie 2' }]);
  });

  test('should delete the last bookmark', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteLastBookmark();
    expect(bookmark.getAllBookmarks()).toEqual([{ username: 'user1', movieId: 1, title: 'Movie 1' }]);
  });

  test('should sort bookmarks by title in ascending order', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Zebra' },
      { username: 'user2', movieId: 2, title: 'Apple' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.sortBookmarksByTitle();
    expect(bookmark.getAllBookmarks()).toEqual([
      { username: 'user2', movieId: 2, title: 'Apple' },
      { username: 'user1', movieId: 1, title: 'Zebra' }
    ]);
  });

  test('should sort bookmarks by title in descending order', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Apple' },
      { username: 'user2', movieId: 2, title: 'Zebra' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.sortBookmarksByTitleDesc();
    expect(bookmark.getAllBookmarks()).toEqual([
      { username: 'user2', movieId: 2, title: 'Zebra' },
      { username: 'user1', movieId: 1, title: 'Apple' }
    ]);
  });

  test('should search bookmarks by title', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'The Matrix' },
      { username: 'user2', movieId: 2, title: 'Matrix Reloaded' },
      { username: 'user3', movieId: 3, title: 'Inception' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    const results = bookmark.searchBookmarksByTitle('Matrix');
    expect(results).toEqual([
      { username: 'user1', movieId: 1, title: 'The Matrix' },
      { username: 'user2', movieId: 2, title: 'Matrix Reloaded' }
    ]);
  });

  test('should save bookmarks to a file', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.saveBookmarksToFile('test.json');
    expect(fs.writeFileSync).toHaveBeenCalledWith('test.json', JSON.stringify(bookmarks, null, 2));
  });

  test('should load bookmarks from a file', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' }
    ];
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(bookmarks));
    bookmark.loadBookmarksFromFile('test.json');
    expect(bookmark.getAllBookmarks()).toEqual(bookmarks);
  });

  test('should handle loading from a non-existent file', () => {
    fs.existsSync.mockReturnValue(false);
    bookmark.loadBookmarksFromFile('nonexistent.json');
    expect(bookmark.getAllBookmarks()).toEqual([]);
  });

  test('should handle empty bookmarks when sorting by title', () => {
    bookmark.sortBookmarksByTitle();
    expect(bookmark.getAllBookmarks()).toEqual([]);
  });
  test('should not delete any bookmark if user does not exist', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteFirstBookmarkByUser('user3'); // User 'user3' does not exist
    expect(bookmark.getAllBookmarks()).toEqual(bookmarks); // No changes
  });
  test('should not delete any bookmark if user does not exist (last)', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteLastBookmarkByUser('user3'); // User 'user3' does not exist
    expect(bookmark.getAllBookmarks()).toEqual(bookmarks); // No changes
  });
  test('should handle invalid JSON when loading bookmarks from file', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue('Invalid JSON'); // Invalid JSON format
    expect(() => bookmark.loadBookmarksFromFile('test.json')).toThrow(SyntaxError);
  });
  test('should handle invalid JSON when loading bookmarks from file', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue('Invalid JSON'); // Invalid JSON format

    expect(() => {
      bookmark.loadBookmarksFromFile('test.json');
    }).toThrow(SyntaxError); // Expect a SyntaxError
  });
  test('should not delete any bookmark if user does not exist', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteFirstBookmarkByUser('user3'); // User 'user3' does not exist
    expect(bookmark.getAllBookmarks()).toEqual(bookmarks); // No changes
  });
  test('should not delete any bookmark if user does not exist (last)', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteLastBookmarkByUser('user3'); // User 'user3' does not exist
    expect(bookmark.getAllBookmarks()).toEqual(bookmarks); // No changes
  });
  test('should handle empty bookmarks when sorting by title', () => {
    bookmark.sortBookmarksByTitle();
    expect(bookmark.getAllBookmarks()).toEqual([]); // Expect no changes
  });
  test('should handle empty file when loading bookmarks from file', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(''); // Empty file

    bookmark.loadBookmarksFromFile('test.json');
    expect(bookmark.getAllBookmarks()).toEqual([]); // Expect an empty array
  });
  test('should handle empty file when loading bookmarks from file', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(''); // Empty file

    bookmark.loadBookmarksFromFile('test.json');
    expect(bookmark.getAllBookmarks()).toEqual([]); // Expect an empty array
  });
  test('should handle invalid JSON when loading bookmarks from file', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue('Invalid JSON'); // Invalid JSON format

    expect(() => {
      bookmark.loadBookmarksFromFile('test.json');
    }).toThrow(SyntaxError); // Expect a SyntaxError
  });
  test('should handle error when saving bookmarks to file', () => {
    fs.writeFileSync.mockImplementation(() => {
      throw new Error('Write error');
    });

    expect(() => {
      bookmark.saveBookmarksToFile('test.json');
    }).toThrow('Write error'); // Expect an error
  });
  test('should not delete any bookmark if user does not exist', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteFirstBookmarkByUser('user3'); // User 'user3' does not exist
    expect(bookmark.getAllBookmarks()).toEqual(bookmarks); // No changes
  });
  test('should not delete any bookmark if user does not exist (last)', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteLastBookmarkByUser('user3'); // User 'user3' does not exist
    expect(bookmark.getAllBookmarks()).toEqual(bookmarks); // No changes
  });
  test('should return an empty array if no bookmarks match the search title', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'The Matrix' },
      { username: 'user2', movieId: 2, title: 'Inception' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    const results = bookmark.searchBookmarksByTitle('Avatar');
    expect(results).toEqual([]); // No matches
  });
  test('should delete the first bookmark if bookmarks exist', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteFirstBookmark();
    expect(bookmark.getAllBookmarks()).toEqual([
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ]); // First bookmark removed
  });

  test('should do nothing if bookmarks are empty when deleting the first bookmark', () => {
    bookmark.deleteFirstBookmark(); // No bookmarks to delete
    expect(bookmark.getAllBookmarks()).toEqual([]); // No changes
  });
  test('should delete the last bookmark if bookmarks exist', () => {
    const bookmarks = [
      { username: 'user1', movieId: 1, title: 'Movie 1' },
      { username: 'user2', movieId: 2, title: 'Movie 2' }
    ];
    bookmarks.forEach(b => bookmark.addBookmark(b));
    bookmark.deleteLastBookmark();
    expect(bookmark.getAllBookmarks()).toEqual([
      { username: 'user1', movieId: 1, title: 'Movie 1' }
    ]); // Last bookmark removed
  });

  test('should do nothing if bookmarks are empty when deleting the last bookmark', () => {
    bookmark.deleteLastBookmark(); // No bookmarks to delete
    expect(bookmark.getAllBookmarks()).toEqual([]); // No changes
  });


});