import { createContext, useContext, useState, useEffect } from "react";
import {
  registerSitterRequest,
  loginSitterRequest,
  verifySitterTokenRequest,
} from "../api/user.auth";

export const SitterContext = createContext();

export const useSitter = () => {
  const context = useContext(SitterContext);
  if (!context) {
    throw new Error("useSitter must be used within a SitterProvider");
  }
  return context;
};

export const SitterProvider = ({ children }) => {
  const [sitter, setSitter] = useState(null);
  const [isAuthenticatedSitter, setIsAuthenticatedSitter] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loadingSitter, setLoadingSitter] = useState(false);

  const signup = async (sitterData) => {
    try {
      setLoadingSitter(true);
      const res = await registerSitterRequest(sitterData);
      console.log(res);
      /* const token = res.data.token;
      localStorage.setItem("token", token); */
      setSitter(res.data);
      setIsAuthenticatedSitter(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
      setLoadingSitter(false);
    }
  };

  const signin = async (sitterData) => {
    try {
      setLoadingSitter(true);
      setErrors([]);
      const res = await loginSitterRequest(sitterData);
      console.log(res);
      /* const token = res.data.token;
      localStorage.setItem("token", token);
      const resSitter = await verifySitterTokenRequest({ token }); 
      setSitter(resSitter);*/
      setIsAuthenticatedSitter(true);
      setLoadingSitter(false); 
    } catch (error) {
      console.log(error.response);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
      setLoadingSitter(false); // Resetear en error
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setSitter(null);
    setIsAuthenticatedSitter(false);
  };

  // Verificación de token automática
  /*  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticatedSitter(false);
        setSitter(null);
        setLoadingSitter(false);
        return;
      }
      try {
        const res = await verifySitterTokenRequest({ token });
        if (!res) {
          setIsAuthenticatedSitter(false);
          setLoadingSitter(false);
          return;
        }
        setIsAuthenticatedSitter(true);
        setSitter(res);
        setLoadingSitter(false);
      } catch (error) {
        setIsAuthenticatedSitter(false);
        setSitter(null);
        setLoadingSitter(false);
      }
    }
    checkLogin();
  }, []);
 */
  return (
    <SitterContext.Provider
      value={{
        sitter,
        isAuthenticatedSitter,
        loadingSitter,
        errors,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </SitterContext.Provider>
  );
};
