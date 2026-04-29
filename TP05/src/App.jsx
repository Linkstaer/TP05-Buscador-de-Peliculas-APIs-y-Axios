import { useState, useEffect } from 'react';
import { searchMovies, getMovieDetails } from './services/api';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleSearch('Avengers'); 
  }, []); 

  const handleSearch = async (title) => {
    setLoading(true);
    setError(null);
    setSelectedMovie(null);

    try {
      const data = await searchMovies(title);
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error === "Movie not found!" ? "No se encontraron coincidencias." : data.Error);
      }
    } catch (err) {
      setError("Ocurrió un error al consultar la API.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = async (id) => {
    setLoading(true);
    try {
      const data = await getMovieDetails(id);
      setSelectedMovie(data);
      window.scrollTo(0, 0);
    } catch (err) {
      setError("Error al obtener el detalle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🎬 Movie App</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main>
        {loading && <Loader />}
        
        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && !selectedMovie && (
          <MovieList movies={movies} onSelect={handleSelectMovie} />
        )}

        {!loading && selectedMovie && (
          <MovieDetail 
            movie={selectedMovie} 
            onBack={() => setSelectedMovie(null)} 
          />
        )}
      </main>
    </div>
  );
}

export default App;