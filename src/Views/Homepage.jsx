import React from "react";
// Importamos los íconos que usaremos en la sección de servicios

import {
  FaUserCheck, FaCalendarCheck, FaCameraRetro, FaHeartbeat, FaComments,
  FaStore,
  FaHome,
  FaWalking,
  FaStethoscope,
  FaDog,
  FaShieldAlt,
} from "react-icons/fa";
import HeroBackgroundImage from "../assets/images/imagen1.png";
// Datos de ejemplo para los servicios y fortalezas, para mantener el código limpio.
const services = [
  {
    icon: <FaStore className="text-hb text-4xl" />,
    title: "Cuidar a Diario",
    description: "Darle el cuidado que el cliente necesite.",
  },
  {
    icon: <FaHome className="text-hb text-4xl" />,
    title: "Hospedaje",
    description:
      "Ideal para cuando tienes que viajar, tu mascota se queda en casa de un cuidador amoroso.",
  },
  {
    icon: <FaWalking className="text-hb text-4xl" />,
    title: "Paseo",
    description:
      "Paseadores disponibles desde 30 min, mantenlo saludable con un paseo diario.",
  },
];

const strengths = [
  "El bienestar de tu mascota es nuestra prioridad.",
  "Productos y servicios confiables y de calidad para una vida más saludable.",
  "Tranquilidad con cada reserva a través de actualizaciones de fotos y video.",
  "Cobertura contra accidentes, daños materiales y a terceros incluida.",
];

const features = [
  {
    icon: <FaUserCheck className="text-hb text-4xl mx-auto mb-3" />,
    title: "Cuidadores Verificados",
    description:
      "Todos nuestros cuidadores pasan por un riguroso proceso de selección y verificación.",
  },
  {
    icon: <FaShieldAlt className="text-hb text-4xl mx-auto mb-3" />,
    title: "Seguro Veterinario Incluido",
    description:
      "Cada reserva cuenta con una cobertura premium para la tranquilidad de todos.",
  },
  {
    icon: <FaCameraRetro className="text-hb text-4xl mx-auto mb-3" />,
    title: "Actualizaciones con Fotos",
    description:
      "Recibe fotos y videos de tu mascota para que no te pierdas ni un momento de su diversión.",
  },
  {
    icon: <FaCalendarCheck className="text-hb text-4xl mx-auto mb-3" />,
    title: "Flexibilidad de Reserva",
    description:
      "Cancela sin costo hasta 3 días antes del inicio del servicio. ¡Sin complicaciones!",
  },
  {
    icon: <FaHeartbeat className="text-hb text-4xl mx-auto mb-3" />,
    title: "Soporte de Emergencia 24/7",
    description:
      "Nuestro equipo de soporte está disponible día y noche para cualquier eventualidad.",
  },
  {
    icon: <FaComments className="text-hb text-4xl mx-auto mb-3" />,
    title: "Reseñas Reales",
    description:
      "Lee las opiniones de otros dueños de mascotas para encontrar al cuidador perfecto.",
  },
];

export const Homepage = () => {
  return (
    <div className="bg-w text-gray-800">
      {/* Hero Section con Imagen de Fondo */}
      <header
        className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat"
        // Aquí está la magia: 100vh menos una altura estimada para el navbar (ej. 4rem o 64px).
        // Si tu navbar es más alto o más bajo, ajusta este valor (ej. 'calc(100vh - 80px)').
        style={{
          backgroundImage: `url(${HeroBackgroundImage})`,
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Capa de superposición para legibilidad */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Contenido del Hero */}
        <div className="relative z-5 text-center text-white px-4">
          <h1
            className="text-4xl md:text-6xl font-bold text-w"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            Cuidadores de mascotas de confianza cerca de ti
          </h1>
          <p
            className="text-lg md:text-xl mt-4 text-c font-light"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            Reserva Hospedaje sin jaulas y Paseos seguros para perros y gatos.
          </p>
          <div className="mt-8">
            <button className="bg-hb text-w font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-lg text-lg">
              Buscar cuidador
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Services Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-hb mb-2">
            Servicios para las mascotas
          </h2>
          <p className="text-ts mb-10">
            Todo lo que tu mejor amigo necesita en un solo lugar.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-hb mb-2">
                  {service.title}
                </h3>
                <p className="text-ts">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-hb mb-6">
                Una compañía en la que puedes confiar
              </h2>
              <ul className="space-y-4">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <FaShieldAlt className="text-green-500 text-xl mr-3 mt-1 flex-shrink-0" />
                    <span className="text-ts">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <button className="bg-hb text-w font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition duration-300">
                Reservar un servicio
              </button>
              <button className="bg-gray-200 text-hb font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition duration-300">
                Ver nuestras reseñas
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-hb mb-10">
            Diseñado para tu tranquilidad
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-c p-8 rounded-xl shadow-md text-center transition-transform transform hover:-translate-y-2"
              >
                {/* Ícono */}
                {feature.icon}
                {/* Título */}
                <h3 className="font-bold text-lg text-hb mt-4 mb-2">
                  {feature.title}
                </h3>
                {/* Descripción */}
                <p className="text-ts text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
