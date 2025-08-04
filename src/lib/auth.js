// src/lib/auth.js
import axios from 'axios';

const API_BASE = 'https://auth.tilchattaas.com/api';

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/login/`, {
    email,
    password
  });
  return res.data;
};

export const refreshAccessToken = async (refresh) => {
  const res = await axios.post(`${API_BASE}/token/refresh/`, {
    refresh
  });
  return res.data;
};

export const getProtectedData = async (accessToken) => {
  const res = await axios.get(`${API_BASE}/protected/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};
