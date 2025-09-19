import axios from "./axios";

export const createBooking = async (booking) => {
  return await axios.post("/bookings", booking);
};

//Obtener todas las reservas
export const getBookings = async () => {
  return await axios.get("/bookings");
};

//Obtener todas las reservas por el id del dueño
export const getBookingsByOwner = async (ownerId) => {
  return await axios.get(`/bookings/owner/${ownerId}`);
};

//Eliminar la reservas por su id
export const cancelBookings = async (id) => {
  return await axios.delete(`/bookings/${id}`);
};
