import axios from "axios";

export default axios.create({ baseURL: import.meta.env.VITE_API_URL_PRODUCTS });

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL_PRODUCTS,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
