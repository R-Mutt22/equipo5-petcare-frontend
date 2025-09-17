import axios from "./axios";

//Obtener todas las reservas
export const getBookings = async () => {
  return await axios.get("/bookings");
};

//Eliminar la reservas por su id
export const cancelBookings = async (id) => {
  return await axios.delete(`/bookings/${id}`);
};
