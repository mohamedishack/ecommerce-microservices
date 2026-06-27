import axios from "axios";
import { API_BASE_URL } from "../config/api";


const API = `${API_BASE_URL}`;

export const getProducts = (params) => {
  return axios.get(`${API}/products`, {
    params,
  });
};