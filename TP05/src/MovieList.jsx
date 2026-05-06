    import MovieCard from './MovieCard';

const MovieList = ({ movies, onSelectMovie }) => {
  if (!movies || movies.length === 0) {
    return <p className="no-results">No hay resultados para mostrar.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onSelect={onSelectMovie} />
      ))}
    </div>
  );
};

export default MovieList;