import axios from "./axios";

//Obtener todos los usuarios (owners y sitters)
export const getAllUsers = async () => {
  return await axios.get("/users");
};
