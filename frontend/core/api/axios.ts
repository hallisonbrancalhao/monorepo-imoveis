import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
