const CommentModel = require('../models/commentModel');

exports.getCommentsByMovieId = (req, res) => {
    const movieId = req.params.movieId;

    CommentModel.getAllComments(movieId, (err, comments) => {
        if (err) {
            return res.status(500).json({ message: "Error reading comments." });
        }
        res.json({ comments });
    });
};

exports.addComment = (req, res) => {
    const { movieId, username, comment } = req.body;

    if (!movieId || !username || !comment) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    CommentModel.addComment(movieId, username, comment, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving comment." });
        }
        res.status(201).json({ message: "Comment added successfully." });
    });
};