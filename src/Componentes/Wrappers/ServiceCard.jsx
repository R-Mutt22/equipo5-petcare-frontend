export const ServiceCard = ({ service, onEdit, onDelete }) => {  
  return (  
    <div className="bg-white p-4 rounded-lg my-2 shadow-md">  
      <header className="flex justify-between">  
        <div>  
          <p className="font-medium text-gray-800 text-lg">  
            {service.type_service}  
          </p>  
          <p className="font-medium text-gray-600">TARIFA: ${service.rate_service}</p>  
          <p className="font-medium text-gray-600">SITTER ID: {service.id_user_service}</p>  
        </div>  
        <div className="flex gap-2">  
          <button   
            onClick={() => onEdit(service)}  
            className="btn btn-sm btn-info"  
          >  
            Editar  
          </button>  
          <button   
            onClick={() => onDelete(service.id_service)}  
            className="btn btn-sm btn-error"  
          >  
            Eliminar  
          </button>  
        </div>  
      </header>  
      {service.description_service && (  
        <p className="font-medium text-gray-600 mt-2">DESCRIPCIÓN: {service.description_service}</p>  
      )}  
    </div>  
  );  
};