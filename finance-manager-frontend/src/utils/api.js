import axios from 'axios';

// API request helpers
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function get(path, config) {
  const res = await api.get(path, config);
  return res.data;
}

export async function post(path, data, config) {
  const res = await api.post(path, data, config);
  return res.data;
}

export async function put(path, data, config) {
  const res = await api.put(path, data, config);
  return res.data;
}

export async function del(path, config) {
  const res = await api.delete(path, config);
  return res.data;
}
