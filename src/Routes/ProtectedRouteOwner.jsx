import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useOwner } from "../Context/OwnerContext";

export const ProtectedRouteOwner = () => {
  const { isAuthenticatedOwner, owner, loadingOwner } = useOwner();

  // if (loadingOwner) {
  //   return <div className="text-center mt-10">Cargando página...</div>;
  // }

  // if (!isAuthenticatedOwner) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!owner || owner.role !== "owner") {
  //   return (
  //     <div className="text-center text-red-500 mt-10">
  //       Acceso denegado: solo los dueños pueden ver esta página.
  //     </div>
  //   );
  // }

  return <Outlet/>;
};
