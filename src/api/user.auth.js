import axios from "./axios"

//Registro y login para dueños
export const registerOwnerRequest = (owner) => axios.post(`/owners/register`, owner);
export const loginOwnerRequest = (owner) => axios.post(`/owners/login`, owner);
/* export const verifyOwnerTokenRequest = async (data) => {
    try {
        const res = await axios.post("/owners/verify", data);
        return res.data;
    } catch (error) {
        throw error;
    }
} */

//Registro y login para niñeras
export const registerSitterRequest = (sitter) => axios.post(`/sitters/register`, sitter);  
export const loginSitterRequest = (sitter) => axios.post(`/sitters/login`, sitter);  
/* export const verifySitterTokenRequest = async (data) => {  
  try {  
    const res = await axios.post("/sitters/verify", data);  
    return res.data;  
  } catch (error) {  
    throw error;  
  }  
}; */