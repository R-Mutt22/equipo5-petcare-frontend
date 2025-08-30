import { createContext, useContext, useState, useEffect } from "react";  
import { registerSitterRequest, loginSitterRequest, verifySitterTokenRequest } from "../api/user.auth";  
  
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
      const res = await registerSitterRequest(sitterData);  
      const token = res.data;  
      localStorage.setItem("sitter_token", token);  
      setSitter(res.data);  
      setIsAuthenticatedSitter(true);  
    } catch (error) {  
      setErrors(error.response.data);  
    }  
  };  
  
  const signin = async (sitterData) => {  
    try {  
      const res = await loginSitterRequest(sitterData);  
      const token = res.data;  
      localStorage.setItem("sitter_token", token);  
      const resSitter = await verifySitterTokenRequest({ token });  
      setSitter(resSitter);  
      setIsAuthenticatedSitter(true);  
    } catch (error) {  
      if (Array.isArray(error.response.data)) {  
        return setErrors(error.response.data);  
      }  
      setErrors([error.response.data.message]);  
    }  
  };  
  
  const logout = () => {  
    localStorage.removeItem("sitter_token");  
    setSitter(null);  
    setIsAuthenticatedSitter(false);  
  };  
  
  // Verificación de token automática  
  useEffect(() => {  
    async function checkLogin() {  
      const token = localStorage.getItem("sitter_token");  
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
  
  return (  
    <SitterContext.Provider value={{  
      sitter,  
      isAuthenticatedSitter,  
      loadingSitter,  
      errors,  
      signup,  
      signin,  
      logout  
    }}>  
      {children}  
    </SitterContext.Provider>  
  );  
};