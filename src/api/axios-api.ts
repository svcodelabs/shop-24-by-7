import axios from "axios";

export default axios.create({ baseURL: "https://dummyjson.com/products" });

export const axiosPrivate = axios.create({
  baseURL: "https://dummyjson.com/products",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
