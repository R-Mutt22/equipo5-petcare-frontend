export const BookingCard = ({ booking, onCancel, onEdit }) => {  
  return (  
    <div className="bg-white p-4 rounded-lg my-2 shadow-md">  
      <header className="flex justify-between">  
        <div>  
          <p className="font-medium text-gray-800 text-lg">  
            RESERVA #{booking.id_booking}  
          </p>  
          <p className="font-medium text-gray-600">USUARIO ID: {booking.id_user_booking}</p>  
          <p className="font-medium text-gray-600">SERVICIO ID: {booking.id_service_booking}</p>  
          <p className="font-medium text-gray-600">MASCOTA ID: {booking.id_pet_booking}</p>  
          <p className="font-medium text-gray-600">INICIO: {new Date(booking.start_date_booking).toLocaleString()}</p>  
          <p className="font-medium text-gray-600">FIN: {new Date(booking.end_date_booking).toLocaleString()}</p>  
          <p className="font-medium text-gray-600">PRECIO TOTAL: ${booking.total_price_booking}</p>  
          <p className="font-medium text-gray-600">ESTADO:   
            <span className={`ml-2 badge ${  
              booking.status_booking === "confirmed" ? "badge-success" :  
              booking.status_booking === "pending" ? "badge-warning" :  
              booking.status_booking === "cancelled" ? "badge-error" :  
              "badge-info"  
            }`}>  
              {booking.status_booking}  
            </span>  
          </p>  
        </div>  
        <div className="flex gap-2">  
          {booking.status_booking === "confirmed" && (  
            <>  
              <button   
                onClick={() => onEdit(booking)}  
                className="btn btn-sm btn-info"  
              >  
                Editar  
              </button>  
              <button   
                onClick={() => onCancel(booking.id_booking)}  
                className="btn btn-sm btn-error"  
              >  
                Cancelar  
              </button>  
            </>  
          )}  
        </div>  
      </header>  
      {booking.special_requests_booking && (  
        <p className="font-medium text-gray-600 mt-2">SOLICITUDES: {booking.special_requests_booking}</p>  
      )}  
    </div>  
  );  
};