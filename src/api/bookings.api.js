import axios from "./axios";

//Obtener todas las reservas
export const getBookings = async () => {
  return await axios.get("/bookings");
};
