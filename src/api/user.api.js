import axios from "./axios";

//Obtener todos los usuarios (owners y sitters)
export const getUsers = async () => {
  return await axios.get("/users");
};

//Desbloquea al usuario por su ID
export const enableUser = async (id) => {
  return await axios.put(`/users/${id}/status`, null, {
    params: { status: true },
  });
};

//Bloquea al usuario por su ID
export const disableUser = async (id) => {
  return await axios.put(`/users/${id}/status`, null, {
    params: { status: false },
  });
};
