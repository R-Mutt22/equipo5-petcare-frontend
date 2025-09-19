import axios from "./axios";

//Crear una mascota
export const createPet = async (data, pet) => {
  return await axios.post(`/pets/${data.ownerId}`, pet);
};

//Obtiene las mascotas por el id del dueño
export const getPetsByOwner = async (ownerId) => {
  return await axios.get(`/pets/owner/${ownerId}`);
};

//Obtiene una mascota por el id
export const getPetById = async (id) => {
  return await axios.get(`/pets/${id}`);
};

//Actualiza una mascota por el id
export const updatePet = async (id, pet) => {
  return await axios.put(`/pets/${id}`, pet);
};

//Elimina una mascota por el id
export const deletePet = async (id) => {
  return await axios.delete(`/pets/${id}`);
};
