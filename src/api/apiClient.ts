import axios from 'axios';

const BASE_URL = 'https://namig.pro/api';
const TIMEOUT = 5000;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});
