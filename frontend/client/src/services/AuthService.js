import axios from "axios";
import { API_BASE_URL } from "../config/api";


const API = `${API_BASE_URL}/auth`;

export const login = (data) => {
  return axios.post(`${API}/login`, data);
};

export const register = (data) => {
  return axios.post(`${API}/register`, data);
};