import React from 'react';
// Importamos los íconos que usaremos
import { FaHeart, FaShieldAlt, FaUsers, FaPaw } from 'react-icons/fa';

// Datos de ejemplo para el equipo. Puedes reemplazarlos con los datos reales.
const teamMembers = [
  {
    name: "Christian Ivan Cachero",
    role: "Desarrollador Backend",
    image: "",
    bio: "Completar..."
  },
  {
    name: "Sergio Zuñiga Fraga",
    role: "Desarrollador Backend y Frontend",
    image: "",
    bio: "Completar..."
  },
  {
    name: "Matias Nehuen Malpartida",
    role: "Desarrollador Backend",
    image: "",
    bio: "Completar..."
  },
  {
    name: "Matías Zelarayán",
    role: "Desarrollador Frontend",
    image: "",
    bio: "Completar..."
  },
  {
    name: "Cristhian Rodrigo Sosa Zurita",
    role: "Desarrollador Frontend",
    image: "", 
    bio: "Completar..."
  }
];

// Datos para la sección de valores
const values = [
    {
        icon: <FaHeart className="text-ts text-4xl" />,
        title: "Amor por los Animales",
        description: "Cada decisión que tomamos está impulsada por un profundo respeto y amor por los animales."
    },
    {
        icon: <FaShieldAlt className="text-ts text-4xl" />,
        title: "Seguridad Primero",
        description: "Implementamos rigurosos controles de seguridad y verificación para garantizar el bienestar de tu mascota."
    },
    {
        icon: <FaUsers className="text-ts text-4xl" />,
        title: "Comunidad de Confianza",
        description: "Fomentamos una comunidad basada en la transparencia, la honestidad y el apoyo mutuo."
    }
]

export const AboutUs = ( ) => {
  return (
    <div className="bg-w text-hb">
      {/* 1. Header de la Misión */}
      <header className="bg-c text-center py-16 md:py-24">
        <div className="container mx-auto px-6">
          <FaPaw className="text-5xl text-hb mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-hb">
            Conectando Corazones, Cuidando Familias
          </h1>
          <p className="text-lg text-ts mt-4 max-w-3xl mx-auto">
            Nuestra misión es simple: ofrecer a cada mascota el mismo amor, cuidado y atención que recibiría en su propio hogar, y brindar a sus dueños una tranquilidad absoluta.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        {/* 2. Nuestra Historia */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop" 
              alt="Perro feliz jugando" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="text-lg">
            <h2 className="text-3xl font-bold text-hb mb-4">El Inicio de PetCare</h2>
            <p className="text-ts mb-4">
              PetCare nació de una necesidad personal. Como dueños de mascotas, sabíamos lo difícil que es encontrar a alguien de confianza para cuidar de nuestros compañeros peludos. Queríamos más que un simple servicio; buscábamos una extensión de nuestra familia.
            </p>
            <p className="text-ts">
              Por eso creamos una plataforma donde cada cuidador es seleccionado por su pasión y experiencia, y cada mascota es tratada como la estrella que es. Somos una comunidad construida sobre la confianza y el amor incondicional por los animales.
            </p>
          </div>
        </section>

        {/* 3. Conoce al Equipo */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-hb mb-12">Las Personas Detrás de las Patitas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index ) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:-translate-y-2">
                <img 
                  src={member.image} 
                  alt={`Foto de ${member.name}`} 
                  className="w-32 h-32 rounded-full mx-auto object-cover object-center mb-4 border-4 border-c"
                />
                <h3 className="text-xl font-bold text-hb">{member.name}</h3>
                <p className="text-ts font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Nuestros Valores */}
        <section className="mt-24 bg-c rounded-lg py-16">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-3xl font-bold text-hb mb-12">Nuestros Pilares</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {values.map((value, index) => (
                        <div key={index}>
                            <div className="flex justify-center mb-4">{value.icon}</div>
                            <h3 className="text-xl font-bold text-hb mb-2">{value.title}</h3>
                            <p className="text-ts">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 5. Llamado a la Acción (CTA) */}
        <section className="text-center mt-24 py-16">
            <h2 className="text-3xl font-bold text-hb">¿Listo para unirte a la familia PetCare?</h2>
            <p className="text-ts mt-4 mb-8 max-w-2xl mx-auto">
                Ya sea que necesites un cuidador de confianza o quieras ofrecer tu amor por las mascotas, hay un lugar para ti en nuestra comunidad.
            </p>
            <div className="flex justify-center gap-4">
                <button className="bg-ts text-w font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors">
                    Buscar un Cuidador
                </button>
                <button className="bg-hb text-w font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors">
                    Conviértete en Cuidador
                </button>
            </div>
        </section>
      </main>
    </div>
  );
};

