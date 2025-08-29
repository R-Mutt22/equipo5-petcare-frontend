import axios from "./axios";  
  
export const getServicesBySitterRequest = (sitterId) => axios.get(`/services/sitter/${sitterId}`);  
export const createServiceRequest = (service) => axios.post(`/services`, service);  
export const updateServiceRequest = (id, service) => axios.put(`/services/${id}`, service);  
export const deleteServiceRequest = (id) => axios.delete(`/services/${id}`);  
export const getAvailableServicesRequest = () => axios.get(`/services/available`);