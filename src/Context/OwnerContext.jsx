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
    console.log(ownerData);
    try {
      const res = await registerOwnerRequest(ownerData);
      console.log(res);
      setOwner(res.data);
      setIsAuthenticatedOwner(true);
    } catch (error) {
      //setErrors(error.response.data);
      console.log(error);
    }
  };

  const signin = async (ownerData) => {
    try {
      const res = await loginOwnerRequest(ownerData);
      const { token, user } = res.data;
      localStorage.setItem("owner_token", token);
      setOwner(user);
      setIsAuthenticatedOwner(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    localStorage.removeItem("owner_token");
    setOwner(null);
    setIsAuthenticatedOwner(false);
  };
  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("owner_token");
      if (!token) {
        setIsAuthenticatedOwner(false);
        setOwner(null);
        setLoadingOwner(false);
        return;
      }
      try {
        const res = await verifyOwnerTokenRequest({ token });
        if (!res) {
          setIsAuthenticatedOwner(false);
          setLoadingOwner(false);
          return;
        }
        setIsAuthenticatedOwner(true);
        setOwner(res);
        setLoadingOwner(false);
      } catch (error) {
        setIsAuthenticatedOwner(false);
        setOwner(null);
        setLoadingOwner(false);
      }
    }
    checkLogin();
  }, []);
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
