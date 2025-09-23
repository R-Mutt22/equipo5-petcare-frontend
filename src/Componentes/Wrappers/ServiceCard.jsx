export const ServiceCard = ({ service, isOwner, onMakeBooking, onEdit, onDelete }) => {    
  return (    
    <div className="bg-white p-4 rounded-lg my-2 shadow-md">    
      <header className="flex justify-between">    
        <div>    
          <p className="font-medium text-gray-800 text-lg">    
            {service.type}    
          </p>    
          <p className="font-medium text-gray-600">TARIFA: ${service.rate}</p>    
          <p className="font-medium text-gray-600">SITTER: {service.owners?.name}</p>    
        </div>    
        <div className="flex gap-2">    
          {isOwner ? (  
            // Botón para owners  
            <button     
              onClick={onMakeBooking}    
              className="btn btn-sm btn-primary bg-[#407c87] hover:bg-[#2d5a63] border-none"    
            >    
              Hacer Reserva    
            </button>    
          ) : (  
            // Botones para sitters  
            <>  
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
            </>  
          )}  
        </div>    
      </header>    
      {service.description && (    
        <p className="font-medium text-gray-600 mt-2">DESCRIPCIÓN: {service.description}</p>    
      )}    
    </div>    
  );    
};