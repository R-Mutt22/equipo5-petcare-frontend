import axios from "./axios";

//Obtener todos los usuarios (owners y sitters)
export const getUsers = async () => {
  return await axios.get("/users");
};
