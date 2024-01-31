const mongoose = require('mongoose');

const favoriteMovieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Store the image URL
        required: true,
    },
    // Add other fields if needed, such as releaseYear, description, etc.
    // releaseYear: Number,
    // description: String,
});

const FavoriteMovie = mongoose.model('FavoriteMovie', favoriteMovieSchema);

module.exports = FavoriteMovie;
