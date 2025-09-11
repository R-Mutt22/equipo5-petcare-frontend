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
          await createBooking(bookingData);  
          console.log('Reserva creada exitosamente después del pago');  
        } catch (error) {  
          console.error('Error creando la reserva:', error);  
        }  
      }  
    };  
      
    processBooking();  
  }, [bookingData, createBooking]);  
  
  const getServiceName = (serviceId) => {  
    const services = {  
      1: 'Paseo',  
      2: 'Hospedaje',   
      3: 'Cuidado Diario',  
      4: 'Visita'  
    };  
    return services[serviceId] || 'Servicio';  
  };  
  
  const getPetName = (petId) => {  
    const pets = {  
      1: 'Max',  
      2: 'Luna',  
      3: 'Zeus'  
    };  
    return pets[petId] || 'Mascota';  
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
              onClick={() => navigate('/create-booking')}  
            >  
              Crear Nueva Reserva  
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
            
          {/* Resumen de la reserva */}  
          <div className="bg-green-50 p-4 rounded border border-green-200 text-left">  
            <h3 className="font-semibold text-green-800 mb-2">Detalles de la Reserva</h3>  
            <div className="space-y-1 text-sm text-green-700">  
              <p><strong>Servicio:</strong> {getServiceName(bookingData.id_service)}</p>  
              <p><strong>Mascota:</strong> {getPetName(bookingData.id_pet)}</p>  
              <p><strong>Fecha inicio:</strong> {new Date(bookingData.start_date).toLocaleString()}</p>  
              <p><strong>Fecha fin:</strong> {new Date(bookingData.end_date).toLocaleString()}</p>  
              <p><strong>Total pagado:</strong> ${bookingData.total_price}</p>  
              {paymentMethod && <p><strong>Método de pago:</strong> {paymentMethod}</p>}  
            </div>  
          </div>  
  
          <p className="text-gray-600">  
            Recibirás un email de confirmación con todos los detalles.  
          </p>  
            
          <div className="flex gap-3">  
            <Button  
              variant="secondary"  
              className="flex-1"  
              onClick={() => navigate('/create-booking')}  
            >  
              Nueva Reserva  
            </Button>  
            <Button  
              variant="primary"  
              className="flex-1"  
              onClick={() => navigate('/my-bookings')}  
            >  
              Ver Mis Reservas  
            </Button>  
          </div>  
        </div>  
      </Card>  
    </div>  
  );  
};