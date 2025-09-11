import React from 'react';
import { Link } from 'react-router-dom';
// Importamos los íconos necesarios
import { FaDog, FaHome, FaWalking, FaStethoscope, FaCheckCircle, FaSearch, FaCalendarAlt, FaPaw } from 'react-icons/fa';

// --- DATOS DE LOS SERVICIOS ---
// Estructura de datos detallada para cada servicio
const servicesData = [
  {
    icon: <FaHome className="text-ts text-5xl" />,
    title: "Hospedaje en Casa del Cuidador",
    description: "La alternativa perfecta a las jaulas. Tu mascota se queda en un hogar cálido y seguro con un cuidador verificado, recibiendo atención personalizada y mucho cariño.",
    image: "https://images.unsplash.com/photo-1597626133663-53df9633b799?q=80&w=2070&auto=format&fit=crop",
    features: ["Atención 24/7", "Ambiente libre de jaulas", "Socialización con otras mascotas (opcional )", "Actualizaciones diarias con fotos"],
    link: "/buscar/hospedaje"
  },
  {
    icon: <FaWalking className="text-ts text-5xl" />,
    title: "Paseos Personalizados",
    description: "Mantén a tu perro activo, saludable y feliz con nuestros paseos energizantes. Un cuidador de confianza lo recogerá para una aventura diaria, adaptada a su nivel de energía.",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1974&auto=format&fit=crop",
    features: ["Paseos de 30, 45 o 60 minutos", "Resumen del paseo con fotos", "Cuidadores con experiencia"],
    link: "/buscar/paseos"
  },
  {
    icon: <FaDog className="text-ts text-5xl" />,
    title: "Guardería de Día",
    description: "¿Tu mascota se siente sola en casa? En nuestra guardería de día, podrá jugar, socializar y recibir mimos mientras tú trabajas. Volverá a casa feliz y relajado.",
    image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=1974&auto=format&fit=crop",
    features: ["Juego supervisado todo el día", "Instalaciones seguras y limpias", "Ideal para socialización", "Horarios flexibles"],
    link: "/buscar/guarderia"
  }
];

// --- DATOS DEL PROCESO ---
const processSteps = [
    { icon: <FaSearch />, title: "Busca y Compara", description: "Encuentra cuidadores cerca de ti y lee sus perfiles y reseñas." },
    { icon: <FaCalendarAlt />, title: "Reserva y Paga", description: "Elige las fechas y realiza el pago de forma segura a través de la plataforma." },
    { icon: <FaPaw />, title: "Disfruta con Tranquilidad", description: "Tu mascota recibe el mejor cuidado y tú recibes actualizaciones constantes." }
];

export const ServicePage = ( ) => {
  return (
    <div className="bg-w text-hb">
      {/* 1. Header Principal */}
      <header className="bg-c text-center py-16 md:py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-hb">
            Soluciones de Cuidado para Cada Mascota
          </h1>
          <p className="text-lg text-ts mt-4 max-w-3xl mx-auto">
            Desde hospedajes amorosos hasta paseos llenos de energía, tenemos el servicio perfecto para mantener a tu mejor amigo feliz, seguro y saludable.
          </p>
        </div>
      </header>

      {/* 2. Listado Detallado de Servicios */}
      <main className="container mx-auto px-6 py-16">
        <div className="space-y-20">
          {servicesData.map((service, index) => (
            <section key={index} className="grid md:grid-cols-2 gap-10 items-center">
              {/* Alternar la posición de la imagen */}
              <div className={`order-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <img src={service.image} alt={service.title} className="rounded-lg shadow-xl w-full h-auto object-cover" style={{maxHeight: '400px'}}/>
              </div>
              <div className={`order-2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h2 className="text-3xl font-bold text-hb ml-4">{service.title}</h2>
                </div>
                <p className="text-ts mb-6">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-ts">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={service.link} className="bg-hb text-w font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                  Buscar {service.title.split(' ')[0]}
                </Link>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* 3. Proceso Simplificado */}
      <section className="bg-c py-20">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-hb mb-12">Reservar es Así de Fácil</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-ts text-w w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-hb mb-2">{step.title}</h3>
                <p className="text-ts max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sección de Garantía */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-white rounded-lg shadow-xl p-10 grid md:grid-cols-3 gap-8 text-center">
            <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6">
                <h3 className="text-xl font-bold text-hb mb-2">Seguro Veterinario Premium</h3>
                <p className="text-ts">Cada reserva está protegida por nuestra cobertura de emergencia para tu total tranquilidad.</p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-gray-200 py-6 md:py-0 md:px-6">
                <h3 className="text-xl font-bold text-hb mb-2">Soporte 24/7</h3>
                <p className="text-ts">Nuestro equipo de soporte está siempre disponible para ayudarte ante cualquier duda o imprevisto.</p>
            </div>
            <div className="pt-6 md:pt-0 md:pl-6">
                <h3 className="text-xl font-bold text-hb mb-2">Cuidadores Verificados</h3>
                <p className="text-ts">Solo el 15% de los aplicantes superan nuestro riguroso proceso de selección y verificación.</p>
            </div>
        </div>
      </section>

    </div>
  );
};


