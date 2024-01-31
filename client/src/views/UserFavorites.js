import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom'; // Import the Link component
import './UserFavorites.css';
import GoBackButton from '../components/GoBackButton';

const UserFavorites = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        // Fetch user's favorite movies from the server
        axios.get('http://localhost:8000/api/favorites')
            .then((response) => {
                console.log('Fetched user favorites:', response.data);
                setFavoriteMovies(response.data.favorites);
            })
            .catch((error) => {
                console.error('Error fetching user favorites:', error);
            });
    }, []);

    return (
            <div className="user-favorites" style={{ backgroundColor: 'black' }}>

            <GoBackButton />
            <h2 style={{ color: 'goldenrod', textAlign: 'center' }}> 'User' Favorite Movies</h2>

            <div className="movie-list">
                {favoriteMovies.map((movie) => (

                    <Link to={`/movies/${movie.movieId}`} key={movie._id} className="movie-card">
                        <MovieCard movie={movie} className="movie-card" />
                    </Link>

                ))}
            </div>

        </div>
    );
};

export default UserFavorites;
