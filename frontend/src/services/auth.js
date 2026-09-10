import api from './api';

export async function register({ email, username, password, phone_number }) {
  const response = await api.post('/auth/register/', { email, username, password, phone_number });
  return response.data;
}

export async function login({ email, password }) {
  const response = await api.post('/auth/login/', { email, password });
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
  return response.data;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export async function getMe() {
  const response = await api.get('/auth/me/');
  return response.data;
}
