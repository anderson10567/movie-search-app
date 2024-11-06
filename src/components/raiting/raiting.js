import React from 'react'
import { Rate } from 'antd'
import PropTypes from 'prop-types';

const Raiting = ({ rate, rateMovie, movieId }) => {
  const handleChange = (value) => {
    rateMovie(value, movieId)
  }

  return <Rate count={10} allowHalf className="movie-card__stars" onChange={handleChange} value={rate} />
}

Raiting.propTypes = {
  rate: PropTypes.number.isRequired,
  rateMovie: PropTypes.func.isRequired,
  movieId: PropTypes.number.isRequired,
};

export default Raiting
