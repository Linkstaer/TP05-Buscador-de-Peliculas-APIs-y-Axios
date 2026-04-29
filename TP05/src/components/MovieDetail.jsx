import React from 'react';

const MovieDetail = ({ movie, onBack }) => {
  const placeholder = "https://via.placeholder.com/300x450?text=Sin+Imagen";

  const renderData = (data) => (data && data !== "N/A" ? data : "No disponible");

  return (
    <div className="movie-detail-overlay">
      <div className="movie-detail-container">
        <button className="back-button" onClick={onBack}>
          ← Volver
        </button>

        <div className="detail-content">
          <div className="detail-poster">
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : placeholder} 
              alt={movie.Title} 
            />
          </div>

          <div className="detail-info">
            <h2>{movie.Title} ({movie.Year})</h2>
            <p className="plot"><strong>Sinopsis:</strong> {renderData(movie.Plot)}</p>
            
            <div className="info-grid">
              <p><strong>Director:</strong> {renderData(movie.Director)}</p>
              <p><strong>Actores:</strong> {renderData(movie.Actors)}</p>
              <p><strong>Género:</strong> {renderData(movie.Genre)}</p>
              <p><strong>Duración:</strong> {renderData(movie.Runtime)}</p>
              <p><strong>Idioma:</strong> {renderData(movie.Language)}</p>
              <p><strong>País:</strong> {renderData(movie.Country)}</p>
              <p className="rating">
                <strong>Puntaje IMDb:</strong> ⭐ {renderData(movie.imdbRating)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;