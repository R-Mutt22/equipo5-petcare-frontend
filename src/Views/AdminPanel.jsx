import React from "react";
import { Link } from "react-router-dom";

export const AdminPanel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-blue-700 mb-6">
        Panel del Administrador
      </h1>
      <p className="text-2 mb-6 px-20">
        En este panel puedes administrar los usuarios (dueños y niñeras),
        servicios ofrecidos por las niñeras y las reservas creadas por los
        dueños
      </p>
      <div className="flex gap-4">
        <button className="btn btn-info">
          <Link to="/admin/users">Mirar usuarios</Link>
        </button>
        <button className="btn btn-info">
          <Link to="/admin/services">Mirar servicios</Link>
        </button>
        <button className="btn btn-info">
          <Link to="/admin/bookings">Mirar reservas</Link>
        </button>
      </div>
    </div>
  );
};
