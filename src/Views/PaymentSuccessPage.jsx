
import React, { useEffect } from 'react';      
import { useLocation, useNavigate } from 'react-router-dom';      
import { Card } from '../Componentes/UI/Card';      
import { Button } from '../Componentes/UI/Button';      
import { useBookings } from '../Context/BookingContext';      
      
export const PaymentSuccessPage = () => {      
  const location = useLocation();      
  const navigate = useNavigate();      
  const { createBooking } = useBookings();      
        
  const bookingData = location.state?.bookingData;      
  const paymentMethod = location.state?.paymentMethod;      
      
  useEffect(() => {      
    // Crear la reserva después del pago exitoso      
    const processBooking = async () => {      
      if (bookingData) {      
        try {      
          // Mapear los datos al formato esperado por el backend  
          const mappedBookingData = {  
            id_user: bookingData.id_user,  
            id_service: bookingData.id_service,  
            id_pet: bookingData.id_pet,  
            startTime: bookingData.start_date, // Cambiar nombre del campo  
            endTime: bookingData.end_date,     // Cambiar nombre del campo  
            status: bookingData.status,  
            specialRequest: bookingData.special_requests, // Cambiar nombre del campo  
            totalPrice: bookingData.total_price           // Cambiar nombre del campo  
          };  
            
          await createBooking(mappedBookingData);      
          console.log('Reserva creada exitosamente después del pago');      
        } catch (error) {      
          console.error('Error creando la reserva:', error);      
        }      
      }      
    };      
          
    processBooking();      
  }, [bookingData, createBooking]);      
      
  const getServiceName = (bookingData) => {      
    return bookingData?.serviceInfo?.type || 'Servicio';      
  };      
      
  const getPetName = (bookingData) => {      
    return bookingData?.petInfo?.name || 'Mascota';      
  };    
    
  const getSitterName = (bookingData) => {    
    return bookingData?.serviceInfo?.owners?.name || 'N/A';    
  };    
      
  if (!bookingData) {      
    return (      
      <div className="min-h-screen bg-[#eef1f6] flex items-center justify-center py-8">      
        <Card title="Error" className="w-full max-w-lg text-center">      
          <div className="space-y-4">      
            <div className="text-6xl">⚠️</div>      
            <p className="text-gray-600">No se encontraron datos de la reserva</p>      
            <Button      
              variant="primary"      
              className="w-full"      
              onClick={() => navigate('/search-services')}      
            >      
              Buscar Servicios      
            </Button>      
          </div>      
        </Card>      
      </div>      
    );      
  }      
      
  return (      
    <div className="min-h-screen bg-[#eef1f6] flex items-center justify-center py-8">      
      <Card title="¡Pago Exitoso!" className="w-full max-w-lg text-center">      
        <div className="space-y-4">      
          <div className="text-6xl">✅</div>      
          <h2 className="text-2xl font-bold text-green-600">      
            Tu reserva ha sido confirmada      
          </h2>      
                
          {/* Resumen de la reserva actualizado */}      
          <div className="bg-green-50 p-4 rounded border border-green-200 text-left">      
            <h3 className="font-semibold text-green-800 mb-2">Detalles de la Reserva</h3>      
            <div className="space-y-1 text-sm text-green-700">      
              <p><strong>Servicio:</strong> {getServiceName(bookingData)}</p>      
              <p><strong>Mascota:</strong> {getPetName(bookingData)}</p>    
              <p><strong>Sitter:</strong> {getSitterName(bookingData)}</p>    
              <p><strong>Fecha inicio:</strong> {new Date(bookingData.start_date).toLocaleString()}</p>      
              <p><strong>Fecha fin:</strong> {new Date(bookingData.end_date).toLocaleString()}</p>      
              <p><strong>Total pagado:</strong> ${bookingData.total_price}</p>      
              {paymentMethod && <p><strong>Método de pago:</strong> {paymentMethod}</p>}    
              {bookingData.special_requests && (    
                <p><strong>Solicitudes especiales:</strong> {bookingData.special_requests}</p>    
              )}    
            </div>      
          </div>      
      
          <p className="text-gray-600">      
            Recibirás un email de confirmación con todos los detalles.      
          </p>      
                
          <div className="flex gap-3">      
            <Button      
              variant="secondary"      
              className="flex-1"      
              onClick={() => navigate('/search-services')}      
            >      
              Buscar Servicios      
            </Button>      
            <Button      
              variant="primary"      
              className="flex-1"      
              onClick={() => navigate('/bookings-list')}  
            >      
              Ver Mis Reservas      
            </Button>      
          </div>      
        </div>      
      </Card>      
    </div>      
  );      
};