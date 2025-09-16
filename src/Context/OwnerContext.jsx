import { createContext, useContext, useState, useEffect } from "react";
import {
  registerOwnerRequest,
  loginOwnerRequest,
  verifyOwnerTokenRequest,
} from "../api/user.auth";


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
      setLoadingOwner(true);
      const res = await registerOwnerRequest(ownerData);
      /* const token = res.data.token;
      localStorage.setItem("token", token); */
      setOwner(res.data);
      setIsAuthenticatedOwner(true);
    } catch (error) {
      setErrors(error.response.data);
      setLoadingOwner(false);
    }
  };

  const signin = async (ownerData) => {
   
    try {
      setLoadingOwner(true); 
      setErrors([]); 
      const res = await loginOwnerRequest(ownerData);
      console.log(res)
      /* const token = res.data.token;
      localStorage.setItem("token", token);
      const resOwner = await verifyOwnerTokenRequest({ token }); */
      setOwner(res.data);
      setIsAuthenticatedOwner(true);
      setLoadingOwner(false); 
    } catch (error) {
      console.log(error)
      if (Array.isArray(error.response)) {
        setErrors(error.response);
      } else {
        setErrors([error.response]);
      }
      setLoadingOwner(false); // Resetear en error
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setOwner(null);
    setIsAuthenticatedOwner(false);
  };

  return (
    <OwnerContext.Provider
      value={{
        owner,
        isAuthenticatedOwner,
        loadingOwner,
        errors,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};
