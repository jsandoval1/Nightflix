import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
    const [movies, setMovies] = useState([]);

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const genre = params.get('genre') || '878';

    const getGenreName = () => {
        switch (genre) {
            case '28':
                return 'Action';
            case '35':
                return 'Comedy';
            case '10749':
                return 'Romance';
            case '878':
                return 'Science Fiction';
            case '37':
                return 'Western';
            case '9648':
                return 'Mystery';
            default:
                return 'Movies';
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = '7efaf14bc4ec647494e7c9e0be8665ed';
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`
                );

                const movieResults = response.data.results.map((movie) => ({
                    id: movie.id,
                    title: movie.title,
                    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    releaseYear: movie.release_date.substring(0, 4),
                }));

                setMovies(movieResults);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchMovies();
    }, [genre]);

    return (
        <div className="container">
            <div className="header">
                <h2 className="home-title">Nightflix</h2>
                <Link to="/userFavorites" className="user-favorites-link">'User' Favorites</Link>
            </div>
            <div className="genre-links">
                <Link
                    to="/?genre=28"
                    className={`genre-link ${genre === '28' ? 'selected-link' : ''}`}
                >
                    Action
                </Link>
                <Link
                    to="/?genre=35"
                    className={`genre-link ${genre === '35' ? 'selected-link' : ''}`}
                >
                    Comedy
                </Link>
                <Link
                    to="/?genre=10749"
                    className={`genre-link ${genre === '10749' ? 'selected-link' : ''}`}
                >
                    Romance
                </Link>
                <Link
                    to="/?genre=878"
                    className={`genre-link ${genre === '878' ? 'selected-link' : ''}`}
                >
                    Science Fiction
                </Link>
                <Link
                    to="/?genre=37"
                    className={`genre-link ${genre === '37' ? 'selected-link' : ''}`}
                >
                    Western
                </Link>
                <Link
                    to="/?genre=9648"
                    className={`genre-link ${genre === '9648' ? 'selected-link' : ''}`}
                >
                    Mystery
                </Link>
            </div>
            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} className="movie-card" />
                ))}
            </div>
        </div>
    );
};

export default Home;
