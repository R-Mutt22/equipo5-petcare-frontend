import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

//Simulacion de usuario Owner autenticado y su rol
const user = {
  isAuthenticated: true, //Para negar el acceso se cambia a false
  role: 'owner',         //Para negar el acceso se cambia a otro rol
}

export const ProtectedRouteOwner = () => {

  if (!user.isAuthenticated) {
    //Se redirige al login si no está autenticado
    return <Navigate to="/login" replace />
  }
  if (user.role !== 'owner') {
    //Se muestra un aviso sobre acceso denegado si no es dueño
    return <div className="text-center text-red-500 mt-10">Acceso denegado: solo dueños pueden ver esta página.</div>;
  }
  //Se muestra la ruta protegita si es dueño autenticado
  return (
    <div>ProtectedRouteOwner</div>
  )
}
