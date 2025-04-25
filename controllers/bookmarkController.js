const path = require('path');
const Bookmark = require('../models/bookmarkModel');

// Initialize the Task model
const bookmarkModel = new Bookmark();
const bookmarksFilePath = path.join(__dirname, '../bookmarks.json');

// Load tasks from file on app start
bookmarkModel.loadBookmarksFromFile(bookmarksFilePath);

exports.getBookmarksByUser = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // ถ้ายังไม่ได้ login ให้กลับไปหน้า login
    }
    const username = req.session.user.username;
    const bookmarks = bookmarkModel.getBookmarksByUser(username);
    res.json({ bookmarks });
}

exports.addBookmark = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' }); // ถ้ายังไม่ได้ login ให้กลับไปหน้า login
    }
    const username = req.session.user.username;
    const bookmark = {
        movieId: req.body.movieId,
        username: username,
        title: req.body.title,
        poster: req.body.poster
    };
    bookmarkModel.addBookmark(bookmark);
    console.log("new bookmark has been added");
    bookmarkModel.saveBookmarksToFile(bookmarksFilePath);
    res.json({ bookmarks: bookmarkModel.getBookmarksByUser(username) });
}

exports.deleteBookmark = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' }); // ถ้ายังไม่ได้ login ให้กลับไปหน้า login
    }
    const username = req.session.user.username;
    const movieId = req.params.movieId;
    bookmarkModel.deleteBookmark(username, movieId);
    bookmarkModel.saveBookmarksToFile(bookmarksFilePath);
    res.json({ bookmarks: bookmarkModel.getBookmarksByUser(username) });
}

exports.deleteFirstByUser = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const username = req.session.user.username;
    console.log("deleteFirstByUser called for user:", username);
    bookmarkModel.deleteFirstBookmarkByUser(username);
    bookmarkModel.saveBookmarksToFile(bookmarksFilePath);
    res.json({ bookmarks: bookmarkModel.getBookmarksByUser(username) });
};

exports.deleteLastByUser = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const username = req.session.user.username;
    console.log("deleteLastByUser called for user:", username);
    bookmarkModel.deleteLastBookmarkByUser(username);
    bookmarkModel.saveBookmarksToFile(bookmarksFilePath);
    res.json({ bookmarks: bookmarkModel.getBookmarksByUser(username) });
};

exports.sortBookmarksByTitle = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const username = req.session.user.username;
    const sortedBookmarks = bookmarkModel.sortBookmarksByTitle(username);
    res.json({ bookmarks: sortedBookmarks });
};

exports.sortBookmarksByTitleDesc = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const username = req.session.user.username;
    const sortedBookmarks = bookmarkModel.sortBookmarksByTitleDesc(username);
    res.json({ bookmarks: sortedBookmarks });
};

exports.searchBookmarksByTitle = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const username = req.session.user.username;
    const title = req.query.title || '';
    const filteredBookmarks = bookmarkModel.searchBookmarksByTitle(username, title);
    res.json({ bookmarks: filteredBookmarks });
};