import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";
import { useBookings } from "../Context/BookingContext";
import { useNavigate } from "react-router-dom";

// const mockBookings = [
//   {
//     id_booking: 1,
//     id_pet: 1,
//     id_service: 1,
//     id_user: 1,
//     start_time: "2025-09-06T13:30",
//     end_time: "2025-09-06T14:30",
//     status: "Activo",
//     special_request: "Pasear por el parque",
//     total_price: 1500,
//   },
//   {
//     id_booking: 2,
//     id_pet: 2,
//     id_service: 2,
//     id_user: 1,
//     start_time: "2025-09-07T15:30",
//     end_time: "2025-09-07T16:30",
//     status: "Inactivo",
//     special_request: "Cuidar en la casa",
//     total_price: 5000,
//   },
//   {
//     id_booking: 3,
//     id_pet: 3,
//     id_service: 3,
//     id_user: 1,
//     start_time: "2025-09-08T12:30",
//     end_time: "2025-09-08T13:30",
//     status: "Activo",
//     special_request: "Cuidar, alimentar y bañar en la casa",
//     total_price: 2500,
//   },
// ];

export const BookingManagement = () => {
  const { bookings, getAllBookings, fetchDeleteBooking } = useBookings();
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        await getAllBookings();
      } catch (error) {
        console.log("Error al obtener las reservas: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleOnDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta reserva?")) {
      await fetchDeleteBooking(id);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-blue-700 mb-6">
        Administración de reservas
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="text-gray-600">
            <LoadingSpinner size="lg" />
            <span>Cargando datos de reservas...</span>
          </div>
        </div>
      ) : bookings.length === 0 ? (
        <>
          <EmptyState
            title="No hay reservas"
            description="Aún no hay reservas registrados"
            icon="⚠️"
          />
        </>
      ) : (
        <>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiempo de comienzo</th>
                <th>Tiempo de finalización</th>
                <th>Estado</th>
                <th>Petición especial</th>
                <th>Precio total</th>
                <th>Nombre de la Mascota</th>
                <th>Tipo de Servicio</th>
                <th>Nombre de Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.startTime}</td>
                  <td>{booking.endTime}</td>
                  <td>{booking.status}</td>
                  <td>{booking.specialRequest}</td>
                  <td>$ {booking.totalPrice}</td>
                  <td>{booking.pet.name}</td>
                  <td>{booking.service.type}</td>
                  <td>{booking.user.name}</td>
                  <td>
                    <button
                      onClick={() => handleOnDelete(booking.id)}
                      className="btn btn-sm btn-error"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
