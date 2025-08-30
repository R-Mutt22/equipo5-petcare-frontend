import { createContext, useContext, useState } from "react";  
import {   
  createBookingRequest,  
  getBookingsByOwnerRequest,  
  getBookingsBySitterRequest,  
  updateBookingRequest,  
  cancelBookingRequest,  
  checkAvailabilityRequest  
} from "../api/bookings.auth";  
  
const BookingContext = createContext();  
  
export const useBookings = () => {  
  const context = useContext(BookingContext);  
  if (!context) {  
    throw new Error("useBookings must be used within a BookingProvider");  
  }  
  return context;  
};  
  
export const BookingProvider = ({ children }) => {  
  const [bookings, setBookings] = useState([]);  
  
  const getBookingsByOwner = async (ownerId) => {  
    try {  
      const res = await getBookingsByOwnerRequest(ownerId);  
      setBookings(res.data);  
    } catch (error) {  
      console.error("Error fetching owner bookings:", error);  
    }  
  };  
  
  const getBookingsBySitter = async (sitterId) => {  
    try {  
      const res = await getBookingsBySitterRequest(sitterId);  
      setBookings(res.data);  
    } catch (error) {  
      console.error("Error fetching sitter bookings:", error);  
    }  
  };  
  
  const createBooking = async (booking) => {  
    try {  
      const res = await createBookingRequest(booking);  
      setBookings([...bookings, res.data]);  
      return res.data;  
    } catch (error) {  
      console.error("Error creating booking:", error);  
      throw error;  
    }  
  };  
  
  const cancelBooking = async (id) => {  
    try {  
      const res = await cancelBookingRequest(id);  
      if (res.status === 200) {  
        setBookings(bookings.filter(booking => booking._id !== id));  
      }  
    } catch (error) {  
      console.error("Error canceling booking:", error);  
    }  
  };  
  
  const checkAvailability = async (sitterId, date, time) => {  
    try {  
      const res = await checkAvailabilityRequest(sitterId, date, time);  
      return res.data.available;  
    } catch (error) {  
      console.error("Error checking availability:", error);  
      return false;  
    }  
  };  
  
  return (  
    <BookingContext.Provider value={{  
      bookings,  
      getBookingsByOwner,  
      getBookingsBySitter,  
      createBooking,  
      cancelBooking,  
      checkAvailability  
    }}>  
      {children}  
    </BookingContext.Provider>  
  );  
};