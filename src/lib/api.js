import axios from 'axios';

const API_BASE = 'https://auth.tilchattaas.com/api'; 

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};
 