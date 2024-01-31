const FavoriteMovieController = require('../controllers/FavoriteMovie.controller');

module.exports = (app) => {
    // Add a route handler for DELETE requests to remove movies from favorites
    app.delete('/api/favorites/:id', FavoriteMovieController.removeFavoriteMovie);

        // Add a route handler for checking if a movie is in favorites
    app.get('/api/favorites/:id', FavoriteMovieController.checkIfMovieIsFavorite);


    // Your existing route handlers for POST and GET requests
    app.post('/api/favorites', FavoriteMovieController.addFavoriteMovie);
    app.get('/api/favorites', FavoriteMovieController.listFavoriteMovies);
}
