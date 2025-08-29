import { createContext, useContext, useState, useEffect } from "react";  
import { registerOwnerRequest, loginOwnerRequest /*, verifyOwnerTokenRequest */ } from "../api/user.auth";  
  
export const OwnerContext = createContext();  
  
export const useOwner = () => {  
  const context = useContext(OwnerContext);  
  if (!context) {  
    throw new Error("useOwner must be used within an OwnerProvider");  
  }  
  return context;  
};  
  
export const OwnerProvider = ({ children }) => {  
  const [owner, setOwner] = useState(null);  
  const [isAuthenticatedOwner, setIsAuthenticatedOwner] = useState(false);  
  const [errors, setErrors] = useState([]);  
  const [loadingOwner, setLoadingOwner] = useState(false);  
  
  // Métodos de autenticación siguiendo el patrón de UserContext  
  const signup = async (ownerData) => {  
    try {  
      const res = await registerOwnerRequest(ownerData);  
     /*  const token = res.data;  
      localStorage.setItem("token", token);   */
      setOwner(res.data);  
      setIsAuthenticatedOwner(true);  
    } catch (error) {  
      setErrors(error.response.data);  
    }  
  };  
  
  const signin = async (ownerData) => {  
    try {  
      const res = await loginOwnerRequest(ownerData);  
      /* const token = res.data;  
      localStorage.setItem("token", token);  
      const resOwner = await verifyOwnerTokenRequest({ token });  */ 
      setOwner(resOwner);  
      setIsAuthenticatedOwner(true);  
    } catch (error) {  
      if (Array.isArray(error.response.data)) {  
        return setErrors(error.response.data);  
      }  
      setErrors([error.response.data.message]);  
    }  
  };  
  
  const logout = () => {  
   /*  localStorage.removeItem("token");  */ 
    setOwner(null);  
    setIsAuthenticatedOwner(false);  
  };  
  
  return (  
    <OwnerContext.Provider value={{  
      owner,  
      isAuthenticatedOwner,  
      loadingOwner,  
      errors,  
      signup,  
      signin,  
      logout  
    }}>  
      {children}  
    </OwnerContext.Provider>  
  );  
};