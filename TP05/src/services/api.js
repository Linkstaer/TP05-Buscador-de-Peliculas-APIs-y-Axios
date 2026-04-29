import axios from 'axios';

const API_KEY = '4a249f30'; 
const BASE_URL = 'https://www.omdbapi.com/';

const api = axios.create({
  baseURL: BASE_URL,
});

export const searchMovies = async (title) => {
  const response = await api.get(`?apikey=${API_KEY}&s=${title}`);
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`?apikey=${API_KEY}&i=${id}&plot=full`);
  return response.data;
};

export default api;