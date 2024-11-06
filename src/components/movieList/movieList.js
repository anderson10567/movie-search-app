import React, { useContext } from 'react'
import { List, Card, Badge } from 'antd'
import Raiting from '../raiting/raiting'
import { GenreContext } from '../genrecontext/genrecontext'
import './movieList.css'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types';
import defaultPoster from './no_poster.jpg';


const getRatingStyle = (rating) => {
    const getColor = () => {
        switch (true) {
            case rating <= 3: return '#E90000';
            case rating <= 5: return '#E97E00';
            case rating <= 7: return '#E9D100';
            default: return '#66E900';
        }
    };

    return {
        color: 'black',
        backgroundColor: 'white',
        border: `2px solid ${getColor()}`,
        borderRadius: '50%',
        width: '25px',
        height: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        paddingleft: '5px',
    }
}

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}



const MovieList = ({ movies, rateMovie }) => {
    const genres = useContext(GenreContext)

    return (
        <>
            <List
                className="movie-list"
                grid={{ gutter: 10, column: 2 }}
                dataSource={movies}
                renderItem={(movie) => (
                    <List.Item className="movie-list-item">
                        <Card className="movie-card">
                            <div className="movie-content">
                            <img
                                    alt={movie.title}
                                    src={movie.poster_path === null ? defaultPoster :`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    className="movie-poster"
                                />
                                <div className="movie-description">
                                    <h3 className="movie-title">{movie.title}</h3>
                                    <p className="movie-text">
                                        {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
                                    </p>
                                    <div className="movie-rating" style={getRatingStyle(movie.vote_average)}>
                                        {Math.round(movie.vote_average * 10) / 10}
                                    </div>
                                    <div className="movie-ratingstar">
                                        <Raiting rate={movie.rating || movie.user_rating} rateMovie={rateMovie} movieId={movie.id} />
                                    </div>
                                    <p className="release-date">
                                        <strong></strong> {formatDate(movie.release_date)}
                                    </p>

                                    <div className="movie-genres">
                                        {genres
                                            .slice(0, 5)
                                            .map(
                                                (genre) =>
                                                    movie.genre_ids.includes(genre.id) && (
                                                        <Badge key={nanoid()} count={genre.name} color="#D3D3D3" />
                                                    )
                                            )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}
MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
    rateMovie: PropTypes.func.isRequired,
};

export default MovieList
