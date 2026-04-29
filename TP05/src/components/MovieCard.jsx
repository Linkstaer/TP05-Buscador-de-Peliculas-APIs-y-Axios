import React from 'react';

const MovieCard = ({ movie, onSelect }) => {
  const placeholder = "https://via.placeholder.com/300x450?text=Sin+Imagen";

  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      <div className="poster-container">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : placeholder} 
          alt={movie.Title} 
          className="movie-poster"
        />
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <div className="movie-meta">
          <span className="year">{movie.Year}</span>
          <span className="type-badge">{movie.Type.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;