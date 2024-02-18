import axios from 'axios';

const API = 'http://localhost:3000/api';

export const registerRequest = user => axios.post(`${API}/auth/register`, user);

export const loginRequest = user => axios.post(`${API}/auth/login`, user);

export const verifyRequest = () => axios.get(`${API}/verify`);