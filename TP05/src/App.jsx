import { useState, useEffect } from 'react';
import { omdbApi, API_KEY } from './api/api';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSelectedMovieId(null); 
    
    try {
      const response = await omdbApi.get(`?s=${query}&apikey=${API_KEY}`);
      
      if (response.data.Response === 'False') {
        setMovies([]);
        setError(response.data.Error === "Pelicula no encontrada!" ? "No se encontraron resultados para tu búsqueda." : response.data.Error);
      } else {
        setMovies(response.data.Search);
      }
    } catch (err) {
      setError('Ocurrió un error al conectar con la API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMovies([]);
    setError(null);
    setSelectedMovieId(null);
  };

  useEffect(() => {
    if (!selectedMovieId) return;

    const fetchMovieDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await omdbApi.get(`?i=${selectedMovieId}&apikey=${API_KEY}`);
        setMovieDetail(response.data);
      } catch (err) {
        setError('Ocurrió un error al cargar los detalles de la película.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [selectedMovieId]);

return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <h1>Buscador</h1>
          {!selectedMovieId && (
            <SearchBar onSearch={handleSearch} onClear={handleClear} />
          )}
        </div>
      </header>
      
      <main>
        {!selectedMovieId && !loading && !error && (
            <h2 className="section-title">Películas</h2>
        )}

        {loading && <Loader />}
        
        {error && !loading && <ErrorMessage message={error} />}

        {!selectedMovieId && !loading && !error && movies.length > 0 && (
          <MovieList movies={movies} onSelectMovie={setSelectedMovieId} />
        )}

        {selectedMovieId && movieDetail && !loading && !error && (
          <MovieDetail 
            movie={movieDetail} 
            onBack={() => {
              setSelectedMovieId(null);
              setMovieDetail(null);
            }} 
          />
        )}
      </main>
    </div>
  );
}

export default App;