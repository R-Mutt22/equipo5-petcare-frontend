import { createContext, useContext, useState } from "react";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  enableService,
  disableService,
} from "../api/services.api";

const ServiceContext = createContext();

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  // Obtener todos los servicios
  const fetchServices = async () => {
    try {
      const data = await getServices();
      console.log(data);
      setServices(data.content);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    }
  };

  // Obtener un servicio por ID
  const fetchServiceById = async (id) => {
    try {
      return await getServiceById(id);
    } catch (error) {
      console.error("Error al obtener servicio:", error);
      throw error;
    }
  };

  // Crear servicio
  const addService = async (serviceData) => {
    try {
      const newService = await createService(serviceData);
      setServices([...services, newService]);
      return newService;
    } catch (error) {
      console.error("Error al crear servicio:", error);
      throw error;
    }
  };

  // Actualizar servicio
  const editService = async (id, serviceData) => {
    try {
      const updated = await updateService(id, serviceData);
      setServices(services.map((s) => (s._id === id ? updated : s)));
      return updated;
    } catch (error) {
      console.error("Error al actualizar servicio:", error);
      throw error;
    }
  };

  // Eliminar servicio
  const removeService = async (id) => {
    try {
      await deleteService(id);
      setServices(services.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      throw error;
    }
  };

  // Desbloquear un servicio
  const unlockService = async (id) => {
    try {
      const res = await enableService(id);
      setServices((allServices) =>
        allServices.map((service) =>
          service.id_service === id ? res.data : service
        )
      );
    } catch (error) {
      console.log("Error al desbloquear servicio: ", error);
    }
  };

  const blockService = async (id) => {
    try {
      const res = await disableService(id);
      setServices((allServices) =>
        allServices.map((service) =>
          service.id_service === id ? res.data : service
        )
      );
    } catch (error) {
      console.log("Error al bloquear servicio: ", error);
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        fetchServices,
        fetchServiceById,
        addService,
        editService,
        removeService,
        unlockService,
        blockService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
