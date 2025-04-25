const fs = require('fs');
const Encryption = require('../util');

util = new Encryption();

class Bookmark {
    constructor() {
        this.bookmarks = [];
    }

    // Add a new bookmark
    addBookmark(bookmark) {
        this.bookmarks.push(bookmark);
    }

    // Get all bookmarks
    getAllBookmarks() {
        //return this.bookmarks;
        return this.bookmarks;
    }

    getBookmarksByUser(username) {
        return this.bookmarks.filter(bookmark => bookmark.username === username);
    }

    deleteBookmark(username, movieId) {
        this.bookmarks = this.bookmarks.filter(bookmark => !(bookmark.username === username && bookmark.movieId === movieId));
    }

    deleteFirstBookmarkByUser(username) {
        const index = this.bookmarks.findIndex(bookmark => bookmark.username === username);
        if (index !== -1) {
            this.bookmarks.splice(index, 1);
        }
    }

    deleteLastBookmarkByUser(username) {
        for (let i = this.bookmarks.length - 1; i >= 0; i--) {
            if (this.bookmarks[i].username === username) {
                this.bookmarks.splice(i, 1);
                break; // ลบเฉพาะอันสุดท้ายที่เจอแล้วหยุด
            }
        }
    }

    deleteFirstBookmark() {
        if (this.bookmarks.length > 0) {
            this.bookmarks.shift();
        }
    }

    deleteLastBookmark() {
        if (this.bookmarks.length > 0) {
            this.bookmarks.pop();
        }
    }

    sortBookmarksByTitle() {
        this.bookmarks.sort((a, b) => a.title.localeCompare(b.title));
    }

    sortBookmarksByTitleDesc() {
        this.bookmarks.sort((a, b) => b.title.localeCompare(a.title));
    }

    searchBookmarksByTitle(title) {
        return this.bookmarks.filter(bookmark => bookmark.title.toLowerCase().includes(title.toLowerCase()));
    }

    // Save bookmarks to a file
    saveBookmarksToFile(filePath) {
        fs.writeFileSync(filePath, JSON.stringify(this.bookmarks, null, 2));
    }

    // Load bookmarks from a file
    loadBookmarksFromFile(filePath) {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            try {
                this.bookmarks = JSON.parse(data || '[]'); // Handle empty file
            } catch (error) {
                throw new SyntaxError('Invalid JSON format in bookmarks file');
            }
        } else {
            this.bookmarks = [];
        }
    }
}

module.exports = Bookmark;