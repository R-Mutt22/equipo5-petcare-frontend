import axios from "./axios";  
  
export const getAllUsersRequest = () => axios.get(`/admin/users`);  
export const getAllServicesRequest = () => axios.get(`/admin/services`);  
export const getAllBookingsRequest = () => axios.get(`/admin/bookings`);  
export const blockUserRequest = (userId) => axios.put(`/admin/users/${userId}/block`);  
export const unblockUserRequest = (userId) => axios.put(`/admin/users/${userId}/unblock`);


export const registerAdminRequest = (admin) => axios.post(`/admin/register`, admin);  
export const loginAdminRequest = (admin) => axios.post(`/admin/login`, admin);  
export const verifyAdminTokenRequest = async (data) => {  
  try {  
    const res = await axios.post("/admin/verify", data);  
    return res.data;  
  } catch (error) {  
    throw error;  
  }  
};