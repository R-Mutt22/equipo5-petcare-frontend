import { createContext, useContext, useState } from "react";
import {
  createBookingRequest,
  getBookingsByOwnerRequest,
  getBookingsBySitterRequest,
  updateBookingRequest,
  cancelBookingRequest,
  checkAvailabilityRequest,
} from "../api/bookings.auth";
import { getBookings, cancelBookings } from "../api/bookings.api";
import { useOwner } from "./OwnerContext";

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

  const getAllBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (error) {
      console.log("Error al obtener bookings: ", error);
    }
  };

  const getBookingsByOwner = async (ownerId) => {
    try {
      const res = await getBookingsByOwnerRequest(ownerId);
      // console.log("BookingsContext:", res);
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

  const fetchCancelBooking = async (id) => {
    try {
      const res = await cancelBookings(id);
      if (res.status === 200) {
        setBookings(bookings.filter((booking) => booking.id !== id));
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
    <BookingContext.Provider
      value={{
        bookings,
        getBookingsByOwner,
        getBookingsBySitter,
        getAllBookings,
        createBooking,
        fetchCancelBooking,
        checkAvailability,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
