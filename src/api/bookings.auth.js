import axios from "./axios";  
  
export const createBookingRequest = (booking) => axios.post(`/bookings`, booking);  
export const getBookingsByOwnerRequest = (ownerId) => axios.get(`/bookings/owner/${ownerId}`);  
export const getBookingsBySitterRequest = (sitterId) => axios.get(`/bookings/sitter/${sitterId}`);  
export const updateBookingRequest = (id, booking) => axios.put(`/bookings/${id}`, booking);  
export const cancelBookingRequest = (id) => axios.delete(`/bookings/${id}`);  
export const checkAvailabilityRequest = (sitterId, date, time) =>   
  axios.get(`/bookings/availability`, { params: { sitterId, date, time } });