import axios from "axios";

const API = "http://localhost:3000/auth";

export const login = (data) => {
  return axios.post(`${API}/login`, data);
};

export const register = (data) => {
  return axios.post(`${API}/register`, data);
};