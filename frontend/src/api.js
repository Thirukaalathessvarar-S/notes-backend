
import axios from 'axios';

const API_URL = 'https://notes-backend-1-khcs.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (user) => {
  const response = await api.post('/auth/register', user);
  return response.data;
};

export const getNotes = async (token) => {
  const response = await api.get('/notes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createNote = async (note, token) => {
  const response = await api.post('/notes', note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateNote = async (id, note, token) => {
  const response = await api.put(`/notes/${id}`, note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id, token) => {
  const response = await api.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
