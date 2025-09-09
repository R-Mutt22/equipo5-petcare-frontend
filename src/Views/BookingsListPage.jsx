import React, { useState, useEffect } from "react";
import { BookingCard } from "../Componentes/Wrappers/BookingCard";
import { SearchBar } from "../Componentes/Wrappers/SearchBar";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";
import { useBookings } from "../Context/BookingContext";
import { useOwner } from "../Context/OwnerContext";

export const BookingsListPage = () => {
  const { bookings, getBookingsByOwner, cancelBooking } = useBookings();
  const { owner } = useOwner();
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      if (owner?.id) {
        setIsLoading(true);
        await getBookingsByOwner(owner.id);
        setIsLoading(false);
      }
    };
    loadBookings();
  }, [owner]);

  useEffect(() => {
    filterBookings();
  }, [bookings, activeTab, searchTerm]);

  const filterBookings = () => {
    let filtered = bookings;

    // Filtrar por estado (activas/pasadas)
    if (activeTab === "active") {
      filtered = bookings.filter(
        (booking) =>
          booking.status === "confirmed" || booking.status === "pending"
      );
    } else if (activeTab === "past") {
      filtered = bookings.filter(
        (booking) =>
          booking.status === "completed" || booking.status === "cancelled"
      );
    }

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (booking) =>
          booking.id_booking.toString().includes(searchTerm) ||
          booking.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
      await cancelBooking(bookingId);
    }
  };

  const handleEditBooking = (booking) => {
    // Navegar al formulario de edición
    console.log("Editar reserva:", booking);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#eef1f6] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#407c87] mb-6 text-center">
          Mis Reservas
        </h1>

        {/* Tabs para filtrar reservas */}
        <div className="flex justify-center mb-6">
          <div className="tabs tabs-boxed">
            <button
              className={`tab ${activeTab === "active" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Activas (
              {
                bookings.filter(
                  (b) => b.status === "confirmed" || b.status === "pending"
                ).length
              }
              )
            </button>
            <button
              className={`tab ${activeTab === "past" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Pasadas (
              {
                bookings.filter(
                  (b) => b.status === "completed" || b.status === "cancelled"
                ).length
              }
              )
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="max-w-md mx-auto mb-6">
          <SearchBar
            onSearch={handleSearch}
            searchType="bookings"
            className="w-full"
          />
        </div>

        {/* Contador de resultados */}
        {searchTerm && (
          <p className="text-center text-gray-600 mb-4">
            Resultados para: "{searchTerm}" ({filteredBookings.length}{" "}
            encontrados)
          </p>
        )}

        {/* Lista de reservas */}
        {filteredBookings.length === 0 ? (
          <EmptyState
            title={
              searchTerm
                ? "No se encontraron reservas"
                : `No tienes reservas ${
                    activeTab === "active" ? "activas" : "pasadas"
                  }`
            }
            description={
              searchTerm
                ? "Intenta con otros términos de búsqueda"
                : "Cuando tengas reservas aparecerán aquí"
            }
            icon={activeTab === "active" ? "📅" : "📋"}
          />
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id_booking || booking._id}
                booking={booking}
                onCancel={handleCancelBooking}
                onEdit={handleEditBooking}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
