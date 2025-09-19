import React, { useEffect } from 'react';
import { ServiceCard } from '../Componentes/Wrappers/ServiceCard';
import { LoadingSpinner } from '../Componentes/UI/LoadingSpinner';
import { EmptyState } from '../Componentes/UI/EmptyState';
import { useServices } from '../Context/ServiceContext';

/*
// Mock de servicios ofrecidos (documentación temporal)
const mockServices = [
  {
    id_service: 1,
    type: 'Paseo',
    description: 'Paseo de mascotas por el parque',
    rate: 1500,
    id_user: 101,
  },
  {
    id_service: 2,
    type: 'Hospedaje',
    description: 'Hospedaje de mascotas por noche',
    rate: 5000,
    id_user: 101,
  },
  {
    id_service: 3,
    type: 'Cuidado Diario',
    description: 'Cuidado de mascotas durante el día',
    rate: 2500,
    id_user: 101,
  },
];
*/

export const ServicesListPage = () => {
  const { services, fetchServices, editService, removeService } = useServices();
  useEffect(() => {
    fetchServices();
  }, []);

  // Handler para editar servicio
  const handleEdit = (service) => {
    // Aquí podrías abrir un modal o navegar al formulario de edición
    alert(`Editar servicio: ${service.type}`);
    // Ejemplo: editService(service._id, { ...service, type: 'Nuevo tipo' });
  };

  // Handler para eliminar servicio
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este servicio?')) {
      await removeService(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef1f6] flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold text-[#407c87] mb-6">Servicios Ofrecidos</h1>
      {services.length === 0 ? (
        <EmptyState title="No hay servicios" description="Aún no has agregado servicios." icon="🛎️" />
      ) : (
        <div className="w-full max-w-2xl grid gap-4">
          {services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
