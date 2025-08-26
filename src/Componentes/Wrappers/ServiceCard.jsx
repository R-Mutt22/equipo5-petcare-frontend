export const ServiceCard = ({ service, onEdit, onDelete }) => {  
  return (  
    <div className="bg-white p-4 rounded-lg my-2 shadow-md">  
      <header className="flex justify-between">  
        <div>  
          <p className="font-medium text-gray-800 text-lg">  
            {service.name}  
          </p>  
          <p className="font-medium text-gray-600">TIPO: {service.type}</p>  
          <p className="font-medium text-gray-600">PRECIO: ${service.price}</p>  
          <p className="font-medium text-gray-600">DURACIÓN: {service.duration} horas</p>  
          <p className="font-medium text-gray-600">CUIDADOR (SITTER): {service.sitterName}</p>  
        </div>  
        <div className="flex gap-2">  
          <button   
            onClick={() => onEdit(service)}  
            className="btn btn-sm btn-info"  
          >  
            Editar  
          </button>  
          <button   
            onClick={() => onDelete(service.id)}  
            className="btn btn-sm btn-error"  
          >  
            Eliminar  
          </button>  
        </div>  
      </header>  
      {service.description && (  
        <p className="font-medium text-gray-600 mt-2">DESCRIPCIÓN: {service.description}</p>  
      )}  
    </div>  
  );  
};