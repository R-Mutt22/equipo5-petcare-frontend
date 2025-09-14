import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSitter } from '../Context/SitterContext';

export const ProtectedRouteSitter = () => {
  const { isAuthenticatedSitter, sitter, loadingSitter } = useSitter();

  /* if (loadingSitter) {
    return <div className="text-center mt-10">Cargando...</div>;
  } */
 /*  if (!isAuthenticatedSitter) {
    return <Navigate to="/login" replace />;
  }
  if (!sitter || sitter.role !== 'sitter') {
    return <div className="text-center text-red-500 mt-10">Acceso denegado: solo niñeras pueden ver esta página.</div>;
  } */
  return <Outlet />;
}
