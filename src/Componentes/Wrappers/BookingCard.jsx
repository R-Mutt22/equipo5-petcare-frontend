import { dateFormatter, timeFormatter } from "../../utils/formatters";

export const BookingCard = ({ booking, onCancel, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-lg my-2 shadow-md">
      <header className="flex justify-between">
        <div>
          <p className="font-medium text-gray-800 text-lg">
            RESERVA #{booking.id}
          </p>
          <p className="font-medium text-gray-600">
            NOMBRE USUARIO: {booking.user.name}
          </p>
          <p className="font-medium text-gray-600">
            NOMBRE SERVICIO: {booking.service.type}
          </p>
          <p className="font-medium text-gray-600">
            NOMBRE MASCOTA: {booking.pet.name}
          </p>
          <p className="font-medium text-gray-600">
            INICIO: {dateFormatter.format(new Date(booking.startTime))}{" "}
            {timeFormatter.format(new Date(booking.startTime))}
          </p>
          <p className="font-medium text-gray-600">
            FIN: {dateFormatter.format(new Date(booking.endTime))}{" "}
            {timeFormatter.format(new Date(booking.endTime))}
          </p>
          <p className="font-medium text-gray-600">
            PRECIO TOTAL: ${booking.totalPrice}
          </p>
          <p className="font-medium text-gray-600">
            ESTADO:
            <span
              className={`ml-2 badge ${
                booking.status === true ? "badge-success" : "badge-error"
              }`}
            >
              {booking.status}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          {booking.status === true && (
            <>
              <button
                onClick={() => onEdit(booking)}
                className="btn btn-sm btn-info"
              >
                Editar
              </button>
              <button
                onClick={() => onCancel(booking.id, booking)}
                className="btn btn-sm btn-error"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </header>
      {booking.special_requests_booking && (
        <p className="font-medium text-gray-600 mt-2">
          SOLICITUDES: {booking.special_requests}
        </p>
      )}
    </div>
  );
};
