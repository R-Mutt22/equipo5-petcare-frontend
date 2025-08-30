import { createContext, useContext, useState } from "react";  
import {   
  getServicesBySitterRequest,  
  createServiceRequest,  
  updateServiceRequest,  
  deleteServiceRequest,  
  getAvailableServicesRequest  
} from "../api/services.auth";  
  
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
  
  const getServicesBySitter = async (sitterId) => {  
    try {  
      const res = await getServicesBySitterRequest(sitterId);  
      setServices(res.data);  
    } catch (error) {  
      console.error("Error fetching sitter services:", error);  
    }  
  };  
  
  const getAvailableServices = async () => {  
    try {  
      const res = await getAvailableServicesRequest();  
      setServices(res.data);  
    } catch (error) {  
      console.error("Error fetching available services:", error);  
    }  
  };  
  
  const createService = async (service) => {  
    try {  
      const res = await createServiceRequest(service);  
      setServices([...services, res.data]);  
      return res.data;  
    } catch (error) {  
      console.error("Error creating service:", error);  
      throw error;  
    }  
  };  
  
  const updateService = async (id, service) => {  
    try {  
      const res = await updateServiceRequest(id, service);  
      if (res.status === 200) {  
        setServices(prevServices =>   
          prevServices.map(prevService =>   
            prevService._id === id ? service : prevService  
          )  
        );  
      }  
    } catch (error) {  
      console.error("Error updating service:", error);  
    }  
  };  
  
  const deleteService = async (id) => {  
    try {  
      const res = await deleteServiceRequest(id);  
      if (res.status === 200) {  
        setServices(services.filter(service => service._id !== id));  
      }  
    } catch (error) {  
      console.error("Error deleting service:", error);  
    }  
  };  
  
  return (  
    <ServiceContext.Provider value={{  
      services,  
      getServicesBySitter,  
      getAvailableServices,  
      createService,  
      updateService,  
      deleteService  
    }}>  
      {children}  
    </ServiceContext.Provider>  
  );  
};