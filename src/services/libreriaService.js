import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const consultarLibros = () => {
  return axios.get(`${BASE_URL}/libros`);
};

export const registrarVenta = (libroId, cantidad) => {
  return axios.post(`${BASE_URL}/ventas`, { libro_id: libroId, cantidad });
};
