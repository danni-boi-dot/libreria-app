import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Cambiar según tu configuración de servidor

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const buscarLibro = async (query) => {
  try {
    const response = await api.get(`/buscar-libro?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar libros:', error);
    return [];
  }
};

export const registrarVenta = async (libroId, cantidad) => {
  try {
    const response = await api.post('/registrar-venta', { libroId, cantidad });
    return response.data;
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    return "Error: No se pudo completar la venta.";
  }
};

export const consultarInventario = async () => {
  try {
    const response = await api.get('/consultar-inventario');
    return response.data;
  } catch (error) {
    console.error('Error al consultar el inventario:', error);
    return {};
  }
};

export const calcularGanancias = async () => {
  try {
    const response = await api.get('/calcular-ganancias');
    return response.data.ganancias;
  } catch (error) {
    console.error('Error al calcular las ganancias:', error);
    return 0;
  }
};
