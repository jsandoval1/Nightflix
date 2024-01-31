import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const linkTo = movie.movieId ? `/movies/${movie.movieId}` : `/movies/${movie.id}`;

    return (
        <Link to={linkTo} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <div className="movie-details">
                <p>{movie.title}</p>
                <p>{movie.releaseYear}</p>
            </div>
        </Link>
    );
};

export default MovieCard;
