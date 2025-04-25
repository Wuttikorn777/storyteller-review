const fs = require('fs');
const Encryption = require('../util');

util = new Encryption();

class Rating {
  constructor() {
    this.ratings = [];
  }

  // Add a new rating
  addRating(rating) {
    this.ratings.push(rating);
  }

  // Get all ratings
  getAllRatings() {
    return this.ratings; // คืนค่ารายการทั้งหมด
  }

  getRatingsByMovieId(movieId) {
    return this.ratings.filter(rating => rating.movieId === movieId);
  }

  // Save ratings to a file
  saveRatingsToFile(filePath) {
    fs.writeFileSync(filePath, JSON.stringify(this.ratings, null, 2));
  }

  // Load ratings from a file
  loadRatingsFromFile(filePath) {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      this.ratings = JSON.parse(data || '[]');
    } else {
      this.ratings = [];
    }
  }
}

module.exports = Rating;
