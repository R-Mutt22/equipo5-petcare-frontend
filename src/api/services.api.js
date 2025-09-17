import axios from "./axios";

// Obtener todos los servicios
export const getServices = async () => {
  const res = await axios.get("/services");
  return res.data;
};

// Obtener un servicio por ID
export const getServiceById = async (id) => {
  const res = await axios.get(`/services/${id}`);
  return res.data;
};

// Crear un nuevo servicio
export const createService = async (serviceData) => {
  const res = await axios.post("/services", serviceData);
  return res.data;
};

// Actualizar un servicio
export const updateService = async (id, serviceData) => {
  const res = await axios.put(`/services/${id}`, serviceData);
  return res.data;
};

// Eliminar un servicio
export const deleteService = async (id) => {
  const res = await axios.delete(`/services/${id}`);
  return res.data;
};

//Desbloquea el servicio por su ID
export const enableService = async (id) => {
  return await axios.put(`/services/${id}/status`, null, {
    params: { status: true },
  });
};

//Bloquea el servicio por su ID
export const disableService = async (id) => {
  return await axios.put(`/services/${id}/status`, null, {
    params: { status: false },
  });
};
