import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";

const mockBookings = [
  {
    id_booking: 1,
    id_pet: 1,
    id_service: 1,
    id_user: 1,
    start_time: "2025-09-06T13:30",
    end_time: "2025-09-06T14:30",
    status: "Activo",
    special_request: "Pasear por el parque",
    total_price: 1500,
  },
  {
    id_booking: 2,
    id_pet: 2,
    id_service: 2,
    id_user: 1,
    start_time: "2025-09-07T15:30",
    end_time: "2025-09-07T16:30",
    status: "Inactivo",
    special_request: "Cuidar en la casa",
    total_price: 5000,
  },
  {
    id_booking: 3,
    id_pet: 3,
    id_service: 3,
    id_user: 1,
    start_time: "2025-09-08T12:30",
    end_time: "2025-09-08T13:30",
    status: "Activo",
    special_request: "Cuidar, alimentar y bañar en la casa",
    total_price: 2500,
  },
];

export const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1200);
  }, []);

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
                <th>ID_Pet</th>
                <th>ID_Service</th>
                <th>ID_User</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id_booking}>
                  <td>{booking.id_booking}</td>
                  <td>{booking.start_time}</td>
                  <td>{booking.end_time}</td>
                  <td>{booking.status}</td>
                  <td>{booking.special_request}</td>
                  <td>{booking.total_price}</td>
                  <td>{booking.id_pet}</td>
                  <td>{booking.id_service}</td>
                  <td>{booking.id_user}</td>
                  <td>
                    <button className="btn btn-sm btn-error">Eliminar</button>
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
