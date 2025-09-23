import React, { useState } from "react";
// Importamos los íconos necesarios
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { contactValidationSchema } from "../utils/validationSchemas";
import { Toast } from "../Componentes/UI/Toast";
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;

emailjs.init(PUBLIC_KEY);

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
  // Estados para las notificaciones
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Función para mostrar notificaciones
  const showNotification = (message, type = "success") => {
    setNotification({
      isVisible: true,
      message,
      type,
    });

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 5000);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "Consulta General",
      message: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);

        // Enviar email usando EmailJS
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: values.name, // {{from_name}}
            from_email: values.email, // {{from_email}}
            subject: values.subject, // {{subject}}
            message: values.message, // {{message}}
            time: new Date().toLocaleString("es-ES", {
              timeZone: "America/Argentina/Buenos_Aires",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }), // {{time}}
          },
          PUBLIC_KEY
        );

        showNotification(
          "¡Mensaje enviado correctamente! Te responderemos pronto. 🐾",
          "success"
        );
        resetForm();
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        showNotification(
          "Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.",
          "error"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

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
      <Toast
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />
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

          {/* Columna Derecha: Formulario con Formik */}
          <div>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-hb mb-2"
                >
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 bg-c rounded-md border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-ts`}
                  placeholder="Tu Nombre"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-hb mb-2"
                >
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 bg-c rounded-md border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-ts`}
                  placeholder="tu@email.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-bold text-hb mb-2"
                >
                  Asunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 bg-c rounded-md border ${
                    formik.touched.subject && formik.errors.subject
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-ts`}
                >
                  <option value="Consulta General">Consulta General</option>
                  <option value="Soporte sobre una Reserva">
                    Soporte sobre una Reserva
                  </option>
                  <option value="Problemas con la Plataforma">
                    Problemas con la Plataforma
                  </option>
                  <option value="Quiero ser Cuidador">
                    Quiero ser Cuidador
                  </option>
                </select>
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-hb mb-2"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 bg-c rounded-md border ${
                    formik.touched.message && formik.errors.message
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-ts`}
                  placeholder="Escribe tu mensaje aquí..."
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={`w-full bg-ts text-w font-bold py-3 px-6 rounded-lg transition-colors ${
                    formik.isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-opacity-80"
                  }`}
                >
                  {formik.isSubmitting ? "Enviando..." : "Enviar Mensaje"}
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016712231899!2d-58.384145324549!3d-34.60373887295427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x5d3359a45903357!2sObelisco!5e0!3m2!1ses!2sar!4v16788865 Obelisco de Buenos Aires"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la oficina en Buenos Aires"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
};
