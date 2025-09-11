import React from 'react';  
import { useLocation, useNavigate } from 'react-router-dom';  
import { Card } from '../Componentes/UI/Card';  
import { Button } from '../Componentes/UI/Button';  
  
export const PaymentFailurePage = () => {  
  const location = useLocation();  
  const navigate = useNavigate();  
    
  const bookingData = location.state?.bookingData;  
  const errorMessage = location.state?.errorMessage || 'Hubo un problema procesando tu pago';  
  
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
  
  return (  
    <div className="min-h-screen bg-[#eef1f6] flex items-center justify-center py-8">  
      <Card title="Pago Fallido" className="w-full max-w-lg text-center">  
        <div className="space-y-4">  
          <div className="text-6xl">❌</div>  
          <h2 className="text-2xl font-bold text-red-600">  
            No se pudo procesar el pago  
          </h2>  
          <p className="text-gray-600">  
            {errorMessage}  
          </p>  
          <p className="text-sm text-gray-500">  
            Tu reserva no ha sido creada. Puedes intentar nuevamente.  
          </p>  
  
          {/* Mostrar detalles de la reserva fallida si están disponibles */}  
          {bookingData && (  
            <div className="bg-red-50 p-4 rounded border border-red-200 text-left">  
              <h3 className="font-semibold text-red-800 mb-2">Reserva Pendiente</h3>  
              <div className="space-y-1 text-sm text-red-700">  
                <p><strong>Servicio:</strong> {getServiceName(bookingData.id_service)}</p>  
                <p><strong>Mascota:</strong> {getPetName(bookingData.id_pet)}</p>  
                <p><strong>Total:</strong> ${bookingData.total_price}</p>  
              </div>  
            </div>  
          )}  
            
          <div className="flex gap-3">  
            <Button  
              variant="secondary"  
              className="flex-1"  
              onClick={() => navigate('/create-booking')}  
            >  
              Volver al Formulario  
            </Button>  
            <Button  
              variant="primary"  
              className="flex-1"  
              onClick={() => navigate('/payment', { state: { bookingData } })}  
              disabled={!bookingData}  
            >  
              Intentar Nuevamente  
            </Button>  
          </div>  
  
          <div className="text-xs text-gray-400 mt-4">  
            <p>Si el problema persiste, contacta a soporte</p>  
          </div>  
        </div>  
      </Card>  
    </div>  
  );  
};