import axios from './axios';

// Obtener todos los servicios
export const getServices = async () => {
  const res = await axios.get('/servicios');
  return res.data;
};

// Obtener un servicio por ID
export const getServiceById = async (id) => {
  const res = await axios.get(`/servicios/${id}`);
  return res.data;
};

// Crear un nuevo servicio
export const createService = async (serviceData) => {
  const res = await axios.post('/servicios', serviceData);
  return res.data;
};

// Actualizar un servicio
export const updateService = async (id, serviceData) => {
  const res = await axios.put(`/servicios/${id}`, serviceData);
  return res.data;
};

// Eliminar un servicio
export const deleteService = async (id) => {
  const res = await axios.delete(`/servicios/${id}`);
  return res.data;
};
