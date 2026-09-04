import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

export const getAllProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

export const getProductBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/products/${slug}`);
  return res.data;
};