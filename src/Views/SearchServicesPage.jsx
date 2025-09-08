import React, { useState, useEffect } from "react";
import { SearchBar } from "../Componentes/Wrappers/SearchBar";
import { ServiceCard } from "../Componentes/Wrappers/ServiceCard";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";
import { useServices } from "../Context/ServiceContext";

export const SearchServicesPage = () => {
  const { services, fetchServices } = useServices();
  const [filteredServices, setFilteredServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      await fetchServices();
      setIsLoading(false);
    };
    loadServices();
  }, []);

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter(
      (service) =>
        service.type.toLowerCase().includes(term.toLowerCase()) ||
        (service.description &&
          service.description.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredServices(filtered);
  };

  const handleServiceSelect = (service) => {
    // Aquí se navegaría al formulario de crear reserva (Feature-023)
    console.log("Servicio seleccionado:", service);
    // navigate('/create-booking', { state: { selectedService: service } });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#eef1f6] flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold text-[#407c87] mb-6">
        Buscar Servicios Disponibles
      </h1>

      <div className="w-full max-w-2xl mb-6">
        <SearchBar
          onSearch={handleSearch}
          searchType="services"
          className="w-full"
        />
      </div>

      {searchTerm && (
        <p className="text-gray-600 mb-4">
          Resultados para: "{searchTerm}" ({filteredServices.length}{" "}
          encontrados)
        </p>
      )}

      {filteredServices.length === 0 ? (
        <EmptyState
          title="No se encontraron servicios"
          description={
            searchTerm
              ? "Intenta con otros términos de búsqueda"
              : "No hay servicios disponibles"
          }
          icon="🔍"
        />
      ) : (
        <div className="w-full max-w-2xl grid gap-4">
          {filteredServices.map((service) => (
            <div
              key={service._id || service.id_service}
              onClick={() => handleServiceSelect(service)}
            >
              <ServiceCard
                service={service}
                onEdit={() => {}} // Deshabilitar edición para owners
                onDelete={() => {}} // Deshabilitar eliminación para owners
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
