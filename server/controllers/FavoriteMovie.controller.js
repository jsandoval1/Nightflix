const mongoose = require('mongoose');
const FavoriteMovie = require('../models/FavoriteMovie.model');

// // Add a favorite movie
// exports.addFavoriteMovie = async (req, res) => {
//     const { movieId, title, image } = req.body;

//     if (!movieId || !title || !image) {
//         return res.status(400).json({ message: 'Movie ID, title, and image are required' });
//     }

//     FavoriteMovie.create({ movieId, title, image })
//         .then((favorite) => {
//             console.log('Movie added to favorites successfully:', favorite);
//             res.status(201).json({ favorite });
//         })
//         .catch((error) => {
//             console.error('Error adding movie to favorites:', error);
//             res.status(500).json({ error });
//         });
// };

// Add a favorite movie
// Add a favorite movie
// Updated addFavoriteMovie function
exports.addFavoriteMovie = async (req, res) => {
    const { movieId, title, image } = req.body;

    if (!movieId || !title || !image) {
        return res.status(400).json({ message: 'Movie ID, title, and image are required' });
    }

    FavoriteMovie.create({ movieId, title, image })
        .then((favorite) => {
            console.log('Movie added to favorites successfully:', favorite);
            res.status(201).json({ favorite });
        })
        .catch((error) => {
            console.error('Error adding movie to favorites:', error);
            res.status(500).json({ error });
        });
};


// Check if a specific movie is in favorites
exports.checkIfMovieIsFavorite = async (req, res) => {
    const { id } = req.params;

    // Find a favorite movie by movieId
    FavoriteMovie.findOne({ movieId: id })
        .then((favorite) => {
            if (favorite) {
                console.log('Movie is in favorites:', favorite);
                res.json({ isFavorite: true });
            } else {
                console.log('Movie is not in favorites');
                // res.status(404).json({ isFavorite: false });
            }
        })
        .catch((error) => {
            console.error('Error checking if the movie is in favorites:', error);
            res.status(500).json({ error });
        });
};
// List favorite movies
exports.listFavoriteMovies = async (req, res) => {
    console.log('Fetching all favorite movies...'); // Log a message for debugging

    // Use the FavoriteMovie model to find all favorite movies in the database
    FavoriteMovie.find()
        .then((favorites) => {
            console.log('Favorite movies fetched successfully:', favorites); // Log the fetched favorites
            res.json({ favorites }); // Send the list of favorite movies in the response
        })
        .catch((error) => {
            console.error('Error fetching favorite movies:', error); // Log an error if fetching fails
            res.status(500).json({ error }); // Send an error response with status code 500
        });
};


exports.removeFavoriteMovie = async (req, res) => {
    const { id } = req.params;

    console.log('Received ID:', id);

    // Remove the check for valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ message: 'Invalid movie ID' });
    // }

    console.log(`Removing favorite movie with ID ${id}`);

    FavoriteMovie.findOneAndDelete({ movieId: id }) // Assuming movieId is a string
        .then((result) => {
            if (result) {
                console.log('Movie removed from favorites successfully');
                res.json({ message: 'Movie removed from favorites' });
            } else {
                console.log('Movie not found in favorites');
                res.status(404).json({ message: 'Movie not found in favorites' });
            }
        })
        .catch((error) => {
            console.error('Error removing movie from favorites:', error);
            res.status(500).json({ error });
        });
};
