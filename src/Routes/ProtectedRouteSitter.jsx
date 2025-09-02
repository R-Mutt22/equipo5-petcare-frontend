import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Simulación de usuario autenticado y rol
const user = {
  isAuthenticated: true, // Cambia a false para probar el acceso denegado
  role: 'sitter',        // Cambia a otro rol para probar el acceso denegado
};

export const ProtectedRouteSitter = () => {
  if (!user.isAuthenticated) {
    // Si no está autenticado, redirige a login
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'sitter') {
    // Si no es niñera, muestra acceso denegado
    return <div className="text-center text-red-500 mt-10">Acceso denegado: solo niñeras pueden ver esta página.</div>;
  }
  // Si es niñera autenticada, muestra la ruta protegida
  return <Outlet />;
}
