const fs = require('fs');
const path = './movies.json';

// เพิ่มหนังใหม่
function addMovie(name, releaseYear, rating, comments = []) {
  if (rating === null || rating === undefined) {
    console.log('Movie cannot be added without a rating!');
    return;
  }

  const newMovie = { name, releaseYear, rating, comments };

  let movies;
  try {
    const data = fs.readFileSync(path, 'utf-8');
    movies = JSON.parse(data);
  } catch (err) {
    console.error("Error reading the file or parsing JSON:", err);
    return;
  }

  movies.push(newMovie);
  fs.writeFileSync(path, JSON.stringify(movies, null, 2));
}

// แก้ไขหนัง
function updateMovie(name, newRating, newComments) {
  let movies;
  try {
    const data = fs.readFileSync(path, 'utf-8');
    movies = JSON.parse(data);
  } catch (err) {
    console.error("Error reading the file or parsing JSON:", err);
    return null;
  }

  const movieIndex = movies.findIndex(movie => movie.name === name);
  if (movieIndex === -1) return null;

  movies[movieIndex].rating = newRating;
  movies[movieIndex].comments = newComments;

  fs.writeFileSync(path, JSON.stringify(movies, null, 2));
  return movies[movieIndex];
}

module.exports = { addMovie, updateMovie };
