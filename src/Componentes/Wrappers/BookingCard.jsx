export const BookingCard = ({ booking, onCancel, onEdit }) => {  
  return (  
    <div className="bg-white p-4 rounded-lg my-2 shadow-md">  
      <header className="flex justify-between">  
        <div>  
          <p className="font-medium text-gray-800 text-lg">  
            RESERVA #{booking.id}  
          </p>  
          <p className="font-medium text-gray-600">MASCOTA: {booking.petName}</p>  
          <p className="font-medium text-gray-600">SERVICIO: {booking.serviceName}</p>  
          <p className="font-medium text-gray-600">CUIDADOR (SITTER): {booking.sitterName}</p>  
          <p className="font-medium text-gray-600">DUEÑO (OWNER): {booking.ownerName}</p>  
          <p className="font-medium text-gray-600">FECHA: {new Date(booking.date).toLocaleDateString()}</p>  
          <p className="font-medium text-gray-600">HORA: {booking.time}</p>  
          <p className="font-medium text-gray-600">ESTADO:   
            <span className={`ml-2 badge ${  
              booking.status === "Activa" ? "badge-success" :  
              booking.status === "Pendiente" ? "badge-warning" :  
              booking.status === "Cancelada" ? "badge-error" :  
              "badge-info"  
            }`}>  
              {booking.status}  
            </span>  
          </p>  
        </div>  
        <div className="flex gap-2">  
          {booking.status === "Activa" && (  
            <>  
              <button   
                onClick={() => onEdit(booking)}  
                className="btn btn-sm btn-info"  
              >  
                Editar  
              </button>  
              <button   
                onClick={() => onCancel(booking.id)}  
                className="btn btn-sm btn-error"  
              >  
                Cancelar  
              </button>  
            </>  
          )}  
        </div>  
      </header>  
      {booking.notes && (  
        <p className="font-medium text-gray-600 mt-2">NOTAS: {booking.notes}</p>  
      )}  
    </div>  
  );  
};