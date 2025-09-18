import React from "react";  
import { Navigate, Outlet } from "react-router-dom";  
import { useAdmin } from "../Context/AdminContext";  
  
export const ProtectedRouteAdmin = () => {  
  const { isAuthenticatedAdmin, admin, loadingAdmin } = useAdmin();  
  
  if (loadingAdmin) {  
    return <div className="text-center mt-10">Cargando página...</div>;  
  }  
  
  if (!isAuthenticatedAdmin) {  
    return <Navigate to="/login" replace />;  
  }  
  
  /* if (!admin || admin.role !== "ADMINISTRATOR") {  
    return (  
      <div className="text-center text-red-500 mt-10">  
        Acceso denegado: solo los administradores pueden ver esta página.  
      </div>  
    );  
  }   */
  
  return <Outlet />;  
};