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
//     status: true,
//   },
//   {
//     id_service: 2,
//     type: "Hospedaje",
//     description: "Hospedaje de mascotas por noche",
//     rate: 5000,
//     id_user: 101,
//     status: false,
//   },
//   {
//     id_service: 3,
//     type: "Cuidado Diario",
//     description: "Cuidado de mascotas durante el día",
//     rate: 2500,
//     id_user: 101,
//     status: true,
//   },
// ];

export const ServiceManagement = () => {
  const { services, fetchServices, unlockService, blockService } =
    useServices();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      await fetchServices();
      setLoading(false);
    };
    loadServices();
  }, []);

  const handleEnable = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id_service === id ? { ...service, status: true } : service
      )
    );
  };

  const handleDisable = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id_service === id ? { ...service, status: false } : service
      )
    );
  };

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
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>{service.type}</td>
                  <td>{service.description}</td>
                  <td>{service.rate}</td>
                  <td>{service.owners.name}</td>
                  <td>{service.status ? "Activo" : "Bloqueado"}</td>
                  <td className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => unlockService(handleEnable)}
                      className="btn btn-sm btn-primary"
                    >
                      Desbloquear
                    </button>
                    <button
                      onClick={() => blockService(handleDisable)}
                      className="btn btn-sm btn-error"
                    >
                      Bloquear
                    </button>
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
