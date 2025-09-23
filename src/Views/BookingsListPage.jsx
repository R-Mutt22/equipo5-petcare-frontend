import React, { useState, useEffect } from "react";
import { BookingCard } from "../Componentes/Wrappers/BookingCard";
import { SearchBar } from "../Componentes/Wrappers/SearchBar";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";
import { useBookings } from "../Context/BookingContext";
import { useOwner } from "../Context/OwnerContext";

export const BookingsListPage = () => {
  const { bookings, getBookingsByOwner, fetchCancelBooking } = useBookings();
  const { owner, isAuthenticatedOwner, loadingOwner } = useOwner();
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      if (owner?.id && isAuthenticatedOwner) {
        setIsLoading(true);
        setError(null);
        try {
          await getBookingsByOwner(owner.id);
          console.log("Reservas: ", filteredBookings);
        } catch (error) {
          console.error("Error cargando reservas:", error);
          setError(
            "Error al cargar las reservas. Por favor, intenta de nuevo."
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!loadingOwner) {
      loadBookings();
    }
  }, [owner, isAuthenticatedOwner, loadingOwner]);

  useEffect(() => {
    filterBookings();
  }, [bookings, activeTab, searchTerm]);

  const filterBookings = () => {
    let filtered = bookings || [];

    // Filtrar por estado booleano (activas = true, inactivas = false)
    if (activeTab === "active") {
      filtered = filtered.filter((booking) => booking.status === true);
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((booking) => booking.status === false);
    }

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (booking) =>
          booking.id?.toString().includes(searchTerm) ||
          (booking.status ? "activa" : "inactiva").includes(
            searchTerm.toLowerCase()
          )
      );
    }

    setFilteredBookings(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCancelBooking = async (id, booking) => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
      try {
        await fetchCancelBooking(id, booking);
        setError(null);
      } catch (error) {
        console.error("Error cancelando reserva:", error);
        setError("Error al cancelar la reserva. Por favor, intenta de nuevo.");
      }
    }
  };

  const handleEditBooking = (booking) => {
    console.log("Editar reserva:", booking);
  };

  // if (loadingOwner) {
  //   return <LoadingSpinner />;
  // }

  if (!isAuthenticatedOwner || !owner) {
    return (
      <div className="min-h-screen bg-[#eef1f6] py-8">
        <div className="container mx-auto px-4">
          <EmptyState
            title="Acceso requerido"
            description="Debes iniciar sesión como propietario para ver tus reservas"
            icon="🔒"
          />
        </div>
      </div>
    );
  }

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="min-h-screen bg-[#eef1f6] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#407c87] mb-6 text-center">
          Mis Reservas
        </h1>

        <div className="bg-blue-50 p-3 rounded mb-4 max-w-4xl mx-auto">
          <p className="text-sm text-blue-700">
            <strong>Propietario:</strong> {owner.name || "Usuario"} (ID:{" "}
            {owner.id})
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-4 max-w-4xl mx-auto">
            <span>{error}</span>
          </div>
        )}

        {/* Tabs para filtrar reservas por estado booleano */}
        <div className="flex justify-center mb-6">
          <div className="tabs tabs-boxed">
            <button
              className={`tab ${activeTab === "active" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Activas (
              {(bookings || []).filter((b) => b.status === true).length})
            </button>
            <button
              className={`tab ${activeTab === "inactive" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("inactive")}
            >
              Inactivas (
              {(bookings || []).filter((b) => b.status === false).length})
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto mb-6">
          <SearchBar
            onSearch={handleSearch}
            searchType="bookings"
            className="w-full"
          />
        </div>

        {searchTerm && (
          <p className="text-center text-gray-600 mb-4">
            Resultados para: "{searchTerm}" ({filteredBookings.length}{" "}
            encontrados)
          </p>
        )}

        {filteredBookings.length === 0 ? (
          <EmptyState
            title={
              searchTerm
                ? "No se encontraron reservas"
                : `No tienes reservas ${
                    activeTab === "active" ? "activas" : "inactivas"
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
                key={booking.id}
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
