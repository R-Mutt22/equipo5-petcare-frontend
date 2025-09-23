import React, { useState, useEffect } from "react";
import { SearchBar } from "../Componentes/Wrappers/SearchBar";
import { ServiceCard } from "../Componentes/Wrappers/ServiceCard";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";
import { useServices } from "../Context/ServiceContext";
import { useOwner } from "../Context/OwnerContext"; // Usar OwnerContext existente
import { useNavigate } from "react-router-dom";
import { usePets } from "../Context/PetContext"; // Agregar PetContext  

export const SearchServicesPage = () => {
  const { services, fetchServices } = useServices();
  const { owner, isAuthenticatedOwner } = useOwner(); // Obtener owner del contexto
    const { pets, fetchGetPetsByOwner } = usePets(); // Obtener mascotas del contexto  

  const navigate = useNavigate();

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
  // Detectar si hay un owner autenticado
  const isOwner = isAuthenticatedOwner && owner;
   // Cargar mascotas del owner cuando se monta el componente  
  useEffect(() => {  
    if (owner?.id) {  
      fetchGetPetsByOwner(owner.id);  
    }  
  }, [owner?.id]);  
  /* 
  const handleServiceSelect = (service) => {
    // Aquí se navegaría al formulario de crear reserva (Feature-023)
    console.log("Servicio seleccionado:", service);
    // navigate('/create-booking', { state: { selectedService: service } });
  }; */
  // Función para manejar la reserva  
  const handleMakeBooking = (service) => {  
    navigate('/create-booking', {   
      state: {   
        selectedService: service,  
        userId: owner?.id,  
        userPets: pets, // Enviar todas las mascotas del owner  
      }   
    });  
  };  

  return (
    <div className="min-h-screen bg-[#eef1f6] flex flex-col items-center py-8">
      {/* Resto del JSX existente hasta las tarjetas */}

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
            <ServiceCard
              key={service._id || service.id_service}
              service={service}
              isOwner={isOwner}
              onMakeBooking={() => handleMakeBooking(service)}
              onEdit={() => {}} // Solo para sitters
              onDelete={() => {}} // Solo para sitters
            />
          ))}
        </div>
      )}
    </div>
  );
};
