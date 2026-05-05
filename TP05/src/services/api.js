import axios from 'axios';

export const omdbApi = axios.create({
  baseURL: 'https://www.omdbapi.com/',
});

export const API_KEY = '84a57e6e';