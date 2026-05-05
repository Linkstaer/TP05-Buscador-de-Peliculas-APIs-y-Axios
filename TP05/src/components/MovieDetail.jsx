const MovieDetail = ({ movie, onBack }) => {
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=Sin+Imagen';

  return (
    <div className="movie-detail">
      <button className="back-btn" onClick={onBack}>⬅ Volver a la lista</button>
      <div className="detail-container">
        <img src={posterUrl} alt={`Póster de ${movie.Title}`} className="detail-poster" />
        
        <div className="detail-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Género:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actores:</strong> {movie.Actors}</p>
          <p><strong>Sinopsis:</strong> {movie.Plot}</p>
          <p><strong>Duración:</strong> {movie.Runtime}</p>
          <p><strong>Idioma:</strong> {movie.Language}</p>
          <p><strong>País:</strong> {movie.Country}</p>
          {movie.imdbRating !== 'N/A' && (
            <p className="imdb-rating"><strong>⭐ Puntaje IMDb:</strong> {movie.imdbRating}/10</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;