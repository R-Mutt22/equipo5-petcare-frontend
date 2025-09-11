import React, { useState } from "react";
// Importamos los íconos necesarios
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

// Componente para el acordeón de FAQ
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-c">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4"
      >
        <span className="text-lg font-semibold text-hb">{question}</span>
        <span className="text-ts text-2xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-ts">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export const ContactPage = () => {
  // Datos para el FAQ
  const faqs = [
    {
      question: "¿Cómo funciona el seguro veterinario?",
      answer:
        "Cada reserva confirmada a través de PetCare incluye un seguro premium que cubre emergencias veterinarias. Para más detalles, puedes consultar nuestros Términos y Condiciones.",
    },
    {
      question: "¿Cuál es el proceso para ser cuidador?",
      answer:
        "¡Nos encanta que quieras unirte! El proceso incluye completar tu perfil, pasar una verificación de antecedentes y una breve entrevista online. Puedes empezar haciendo clic en 'Conviértete en Cuidador' en nuestra página de inicio.",
    },
    {
      question: "¿Puedo conocer al cuidador antes de reservar?",
      answer:
        "¡Claro que sí! Recomendamos y facilitamos un 'Encuentro Previo' gratuito para que tú, tu mascota y el cuidador podáis conoceros y asegurar que es la elección perfecta.",
    },
  ];

  return (
    <div className="bg-w text-hb">
      {/* 1. Header Principal */}
      <header className="bg-c text-center py-16 md:py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-hb">
            Ponte en Contacto con Nosotros
          </h1>
          <p className="text-lg text-ts mt-4 max-w-3xl mx-auto">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para
            escucharte.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        {/* 2. Sección de Contacto Principal */}
        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
          {/* Columna Izquierda: Información */}
          <div>
            <h2 className="text-3xl font-bold text-hb mb-6">
              Información de Contacto
            </h2>
            <p className="text-ts mb-8">
              Puedes contactarnos a través de este formulario o por cualquiera
              de los siguientes canales. Nuestro equipo de soporte te responderá
              en menos de 24 horas.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-ts">
                <FaEnvelope className="text-2xl mr-4 text-hb" />
                <span>soporte@petcare.com</span>
              </div>
              <div className="flex items-center text-ts">
                <FaPhone className="text-2xl mr-4 text-hb" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center text-ts">
                <FaMapMarkerAlt className="text-2xl mr-4 text-hb" />
                <span>Av. Siempre Viva 123, Ciudad Capital</span>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-hb mb-4">
                Síguenos en Redes
              </h3>
              <div className="flex space-x-6">
                <a href="#" className="text-ts hover:text-hb transition-colors">
                  <FaWhatsapp className="text-3xl" />
                </a>
                <a href="#" className="text-ts hover:text-hb transition-colors">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#" className="text-ts hover:text-hb transition-colors">
                  <FaFacebook className="text-3xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-hb mb-2"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 bg-c rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ts"
                  placeholder="Tu Nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-hb mb-2"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-c rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ts"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-bold text-hb mb-2"
                >
                  Asunto
                </label>
                <select
                  id="subject"
                  className="w-full p-3 bg-c rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ts"
                >
                  <option>Consulta General</option>
                  <option>Soporte sobre una Reserva</option>
                  <option>Problemas con la Plataforma</option>
                  <option>Quiero ser Cuidador</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-hb mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-3 bg-c rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ts"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-ts text-w font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. Sección de Preguntas Frecuentes (FAQ) */}
        <section className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-hb text-center mb-10">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>

        {/* 4. Mapa */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-hb text-center mb-10">
            Nuestra Oficina
          </h2>
          <div className="w-full h-96 bg-gray-300 rounded-lg shadow-lg overflow-hidden">
            {/* Para un mapa real, usa un iframe de Google Maps. Este es un placeholder. */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016712231899!2d-58.384145324549!3d-34.60373887295427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x5d3359a45903357!2sObelisco!5e0!3m2!1ses!2sar!4v16788865 Obelisco de Buenos Aires"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" // Atributo de seguridad recomendado
              title="Ubicación de la oficina en Buenos Aires"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
};
