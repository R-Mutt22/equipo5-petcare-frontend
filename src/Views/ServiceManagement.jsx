import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { useServices } from "../Context/ServiceContext";
import { EmptyState } from "../Componentes/UI/EmptyState";

// const mockServices = [
//   {
//     id_service: 1,
//     type: "Paseo",
//     description: "Paseo de mascotas por el parque",
//     rate: 1500,
//     id_user: 101,
//   },
//   {
//     id_service: 2,
//     type: "Hospedaje",
//     description: "Hospedaje de mascotas por noche",
//     rate: 5000,
//     id_user: 101,
//   },
//   {
//     id_service: 3,
//     type: "Cuidado Diario",
//     description: "Cuidado de mascotas durante el día",
//     rate: 2500,
//     id_user: 101,
//   },
// ];

export const ServiceManagement = () => {
  const { services, fetchServices } = useServices();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        await fetchServices();
      } catch (error) {
        console.log("Error al cargar los servicios: ", error);
      } finally {
        setLoading(false);
      }
    };
    getAllServices();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-blue-700 mb-6">
        Administración de servicios
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="text-gray-600">
            <LoadingSpinner size="lg" />
            <span>Cargando datos de servicios...</span>
          </div>
        </div>
      ) : services.length === 0 ? (
        <>
          <EmptyState
            title="No hay servicios"
            description="Aún no hay servicios registrados"
            icon="⚠️"
          />
        </>
      ) : (
        <>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Tarifa</th>
                <th>ID_User</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id_service}>
                  <td>{service.id_service}</td>
                  <td>{service.type}</td>
                  <td>{service.description}</td>
                  <td>{service.rate}</td>
                  <td>{service.id_user}</td>
                  <td>
                    <button className="btn btn-sm btn-error">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
