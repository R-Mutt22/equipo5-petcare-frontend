import { createContext, useContext, useState } from "react";
import {
  createBookingRequest,
  getBookingsByOwnerRequest,
  getBookingsBySitterRequest,
  updateBookingRequest,
  cancelBookingRequest,
  checkAvailabilityRequest,
} from "../api/bookings.auth";
import {
  createBooking,
  getBookings,
  cancelBookings,
  deleteBookings,
} from "../api/bookings.api";

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

  const fetchCreateBooking = async (booking) => {
    try {
      console.log("Aquí se obtiene booking: ", booking);
      const res = await createBooking(booking);
      console.log("Este es res: ", res);
      setBookings([...bookings, res.data]);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        console.error("No tienes permisos para crear esta reserva");
      }
      console.error("Error creating booking:", error);
      throw error;
    }
  };

  const fetchCancelBooking = async (id, booking) => {
    try {
      console.log("Este es el id: ", id);
      console.log("Este es booking parametro: ", booking);
      console.log("Soy editPet con información!!");
      const res = await cancelBookings(id, booking);
      console.log("Este es res: ", res);
      const updateBookingStatus = bookings.map((booking) =>
        booking.id === id ? res.data : booking
      );
      setBookings(updateBookingStatus);
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const fetchDeleteBooking = async (id) => {
    try {
      const res = await deleteBookings(id);
      if (res.status === 204) {
        setBookings(bookings.filter((booking) => booking.id !== id));
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
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
        fetchCreateBooking,
        fetchCancelBooking,
        fetchDeleteBooking,
        checkAvailability,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
