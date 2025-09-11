import React, { useState, useEffect } from 'react';  
import { useLocation, useNavigate } from 'react-router-dom';  
import { Card } from '../Componentes/UI/Card';  
import { Button } from '../Componentes/UI/Button';  
import { LoadingSpinner } from '../Componentes/UI/LoadingSpinner';  
  
export const PaymentPage = () => {  
  const location = useLocation();  
  const navigate = useNavigate();  
  const [isProcessing, setIsProcessing] = useState(false);  
    
  // Datos de la reserva del formulario anterior  
  const bookingData = location.state?.bookingData;  
  
  useEffect(() => {  
    if (!bookingData) {  
      navigate('/create-booking');  
    }  
  }, [bookingData, navigate]);  
  
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
  
  const handleMockPayment = async (paymentMethod) => {  
    setIsProcessing(true);  
      
    // Simular procesamiento de pago  
    await new Promise(resolve => setTimeout(resolve, 3000));  
      
    // Simular resultado exitoso (90% de probabilidad)  
    const isSuccess = Math.random() > 0.1;  
      
    if (isSuccess) {  
      navigate('/payment-success', {   
        state: {   
          bookingData,  
          paymentMethod,  
          message: 'Pago procesado exitosamente'   
        }  
      });  
    } else {  
      navigate('/payment-failure', {  
        state: {  
          bookingData,  
          errorMessage: 'El pago fue rechazado. Intenta con otro método.'  
        }  
      });  
    }  
  };  
  
  if (!bookingData) {  
    return <LoadingSpinner />;  
  }  
  
  if (isProcessing) {  
    return (  
      <div className="min-h-screen bg-[#eef1f6] flex items-center justify-center py-8">  
        <Card title="Procesando Pago" className="w-full max-w-lg text-center">  
          <div className="space-y-4">  
            <LoadingSpinner />  
            <p className="text-gray-600">  
              Procesando tu pago, por favor espera...  
            </p>  
          </div>  
        </Card>  
      </div>  
    );  
  }  
  
  return (  
    <div className="min-h-screen bg-[#eef1f6] flex items-center justify-center py-8">  
      <Card title="Procesar Pago - Mockup" className="w-full max-w-lg">  
        <div className="space-y-6">  
            
          {/* Banner de mockup */}  
          <div className="bg-orange-50 p-3 rounded border border-orange-200">  
            <p className="text-sm text-orange-800 text-center">  
              🚧 <strong>MODO DEMO</strong> - Esta es una simulación de pago  
            </p>  
          </div>  
  
          {/* Resumen de la reserva */}  
          <div className="bg-blue-50 p-4 rounded border border-blue-200">  
            <h3 className="font-semibold text-blue-800 mb-2">Resumen de la Reserva</h3>  
            <div className="space-y-1 text-sm text-blue-700">  
              <p><strong>Servicio:</strong> {getServiceName(bookingData.id_service)}</p>  
              <p><strong>Mascota:</strong> {getPetName(bookingData.id_pet)}</p>  
              <p><strong>Fecha inicio:</strong> {new Date(bookingData.start_date).toLocaleString()}</p>  
              <p><strong>Fecha fin:</strong> {new Date(bookingData.end_date).toLocaleString()}</p>  
              <p><strong>Total a pagar:</strong> ${bookingData.total_price}</p>  
            </div>  
          </div>  
  
          {/* Simulación de métodos de pago */}  
          <div className="space-y-3">  
            <h3 className="font-semibold text-gray-800">Selecciona un método de pago:</h3>  
              
            <Button  
              variant="primary"  
              className="w-full justify-start"  
              onClick={() => handleMockPayment('Tarjeta de Crédito')}  
            >  
              💳 Tarjeta de Crédito/Débito  
            </Button>  
              
            <Button  
              variant="secondary"  
              className="w-full justify-start"  
              onClick={() => handleMockPayment('Transferencia')}  
            >  
              🏦 Transferencia Bancaria  
            </Button>  
              
            <Button  
              variant="secondary"  
              className="w-full justify-start"  
              onClick={() => handleMockPayment('Efectivo')}  
            >  
              💵 Efectivo (Rapipago/Pago Fácil)  
            </Button>  
              
            <Button  
              variant="secondary"  
              className="w-full justify-start"  
              onClick={() => handleMockPayment('Mercado Pago')}  
            >  
              🔵 Mercado Pago  
            </Button>  
          </div>  
  
          {/* Botón de navegación */}  
          <div className="flex gap-3">  
            <Button  
              variant="secondary"  
              className="flex-1"  
              onClick={() => navigate(-1)}  
            >  
              Volver al Formulario  
            </Button>  
          </div>  
  
          {/* Información de seguridad mockup */}  
          <div className="text-xs text-gray-500 text-center">  
            <p>🔒 Simulación de pago seguro</p>  
            <p>En producción se integraría con Mercado Pago real</p>  
          </div>  
        </div>  
      </Card>  
    </div>  
  );  
};