const path = require('path');
const Rating = require('../models/ratingModel');

// Initialize the Task model
const ratingModel = new Rating();
const ratingsFilePath = path.join(__dirname, '../ratings.json');

// Load tasks from file on app start
ratingModel.loadRatingsFromFile(ratingsFilePath);

exports.addRating = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // ถ้ายังไม่ได้ login ให้กลับไปหน้า login
    }
    const rating = {
        movieId: req.body.movieId,
        username: req.body.CurrentUser,
        rating: req.body.rating
    };

    ratingModel.addRating(rating);
    console.log("new rating has been added");
    ratingModel.saveRatingsToFile(ratingsFilePath);
}

exports.getRatingsByMovieId = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // ถ้ายังไม่ได้ login ให้กลับไปหน้า login
    }
    const movieId = req.params.movieId;
    const ratings = ratingModel.getRatingsByMovieId(movieId);
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);
    const totalVotes = ratings.length;
    res.json({ ratings, averageRating, totalVotes });
}