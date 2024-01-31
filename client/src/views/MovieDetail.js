import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './MovieDetail.css'; // Import the CSS file

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [videos, setVideos] = useState(null);
    const [images, setImages] = useState([]);
    const [castImages, setCastImages] = useState([]);
    const [rating, setRating] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isInFavorites, setIsInFavorites] = useState(false);

    const handleGoBack = () => {
        // Use navigate(-1) to navigate back one step in the history stack
        navigate(-1);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Function to check if the movie is in favorites
    const checkIsInFavorites = async () => {
        try {
            // Send a GET request to the server to check if the movie is in favorites
            const response = await axios.get(`http://localhost:8000/api/favorites/${id}`);
            // If the response status is 200 (OK), the movie is in favorites
            setIsInFavorites(response.status === 200);
        } catch (error) {
            // If an error occurs (e.g., 404 - Not Found), the movie is not in favorites
            setIsInFavorites(false);
        }
    };

    useEffect(() => {
        const apiKey = '7efaf14bc4ec647494e7c9e0be8665ed';

        const fetchData = async () => {
            try {
                const movieResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
                );
                setMovie(movieResponse.data);

                const creditsResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
                );
                setCredits(creditsResponse.data);

                const videosResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
                );
                setVideos(videosResponse.data);

                const imagesResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
                );
                setImages(imagesResponse.data.backdrops);

                // Fetch cast images
                const castImagePromises = creditsResponse.data.cast.slice(0, 5).map(async (actor) => {
                    try {
                        const response = await axios.get(
                            `https://api.themoviedb.org/3/person/${actor.id}/images?api_key=${apiKey}`
                        );
                        const images = response.data.profiles;
                        return {
                            name: actor.name,
                            images,
                        };
                    } catch (error) {
                        return {
                            name: actor.name,
                            images: [],
                        };
                    }
                });

                Promise.all(castImagePromises).then((castImages) => {
                    setCastImages(castImages);
                });

                // Fetch movie rating
                const ratingResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${apiKey}`
                );
                const releaseDates = ratingResponse.data.results;
                const usRelease = releaseDates.find((date) => date.iso_3166_1 === 'US');
                if (usRelease && usRelease.release_dates.length > 0) {
                    setRating(usRelease.release_dates[0].certification);
                } else {
                    setRating('N/A');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/favorites/${id}`);
                setIsInFavorites(response.status === 200);
            } catch (error) {
                setIsInFavorites(false);
            }
        };
        
        
        fetchData();
        fetchFavorites();
        checkIsInFavorites();
    }, [id]);

    const handleToggleFavorites = () => {
        const movieIdString = id.toString();
    
        if (isInFavorites) {
            // Remove from favorites
            axios
                .delete(`http://localhost:8000/api/favorites/${movieIdString}`)
                .then(() => {
                    setIsInFavorites(false);
                })
                .catch((error) => {
                    // Handle the error appropriately
                    console.error('Error removing movie from favorites:', error);
                });
        } else {
            // Add to favorites
            const title = movie.title; // Get the title from the movie data
            const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Update this to get the appropriate image URL from your movie data
    
            axios
                .post('http://localhost:8000/api/favorites', { movieId: movieIdString, title, image })
                .then(() => {
                    setIsInFavorites(true);
                })
                .catch((error) => {
                    // Handle the error appropriately
                    console.error('Error adding movie to favorites:', error);
                });
        }
    };
    

    if (!movie || !credits || !videos) {
        return <div>Loading...</div>;
    }

    const director = credits.crew.find((crewMember) => crewMember.job === 'Director');

    const writerJobTitles = ['Screenplay', 'Writer', 'Author', 'Script', 'Writer (Screenplay)'];
    const writer = credits.crew.find((crewMember) => writerJobTitles.includes(crewMember.job));

    const userScore = movie.vote_average;
    const originalLanguage = movie.original_language;
    const trailerKey = videos.results[0]?.key;

    return (
        <div className="movie-detail">
            <div className="nav-button-container">
                <Button className="buttons" variant="contained" onClick={handleGoBack}>
                    Go Back
                </Button>
                {movie ? ( // Check if movie data is available
                    <Button
                        className="buttons"
                        variant="contained"
                        onClick={handleToggleFavorites}
                    >
                            {console.log('isInFavorites:', isInFavorites)}
                        {isInFavorites ? 'Remove from Favorites' : 'Add to Your Favorites'}
                    </Button>
                ) : null}
            </div>

            <div>
                {trailerKey && (
                    <div className="trailer">
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Trailer"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>

            <div className="movie-detail">
                <div className="movie-info">
                    <Typography variant="h2" className="movie-title">
                        {movie.title}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Overview:</strong> {movie.overview}
                    </Typography>
                    <Typography variant="body1" className="movie-detail-item">
                        <strong>Rating:</strong> {rating}
                    </Typography>
                    <Typography variant="body1" className="movie-detail-item">
                        <strong>Director:</strong> {director ? director.name : 'N/A'}
                    </Typography>
                    <Typography variant="body1" className="movie-detail-item">
                        <strong>Writer:</strong> {writer ? writer.name : 'N/A'}
                    </Typography>
                    <Typography variant="body1" className="movie-detail-item">
                        <strong>User Score:</strong> {userScore}
                    </Typography>
                    <Typography variant="body1" className="movie-detail-item">
                        <strong>Original Language:</strong> {originalLanguage}
                    </Typography>
                </div>
            </div>

            <div className="top-billed-cast-images">
                {castImages.map((castMember) => (
                    <div key={castMember.name} className="cast-images">
                        {castMember.images.length > 0 ? (
                            <img
                                key={castMember.images[0].file_path}
                                src={`https://image.tmdb.org/t/p/w185${castMember.images[0].file_path}`}
                                alt={`Cast Member: ${castMember.name}`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        ) : (
                            <Typography variant="body1">No Image Available</Typography>
                        )}
                        <Typography variant="body1" style={{ marginTop: '5px' }}>
                            {castMember.name}
                        </Typography>
                    </div>
                ))}
            </div>

            <Typography variant="h4" className="image-gallery-title">
                Check out some pics from {movie.title}!
            </Typography>

            <div className="image-gallery">
                {images.length > 0 && (
                    <div style={{ position: 'relative', maxWidth: '100%', height: 'auto' }}>
                        <img
                            key={images[currentImageIndex].file_path}
                            src={`https://image.tmdb.org/t/p/w500${images[currentImageIndex].file_path}`}
                            alt={`Backdrop ${images[currentImageIndex].file_path}`}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        {images.length > 1 && (
                            <div className="button-container">
                                <Button variant="contained" onClick={handlePreviousImage} style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                    Previous
                                </Button>
                                <Button variant="contained" onClick={handleNextImage} style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
