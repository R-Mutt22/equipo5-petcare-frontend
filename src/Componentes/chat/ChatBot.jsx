import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { minLength, object, pipe, string } from "valibot";
import { useChatStore } from "../../store/useChatStore";
import { useRef, useState, useEffect } from "react";
import { consultarIA } from "../../services/consultarIA";

const schema = object({
  texto: pipe(string(), minLength(1, "El mensaje no puede estar vacio")),
});

export const ChatBot = () => {
  const mensajes = useChatStore((state) => state.mensajes);
  const agregarMensaje = useChatStore((state) => state.agregarMensaje);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(schema),
  });

  const [cargando, setCargando] = useState(false);
  const scrollRef = useRef(null);

  const manejarEnvio = async (entrada) => {
    agregarMensaje({
      id: Date.now(),
      rol: "usuario",
      texto: entrada,
    });
    setCargando(true);
    try {
      const respuesta = await consultarIA({
        soloUsuario: entrada,
        incluirHistorial: true,
      });
      agregarMensaje({
        id: Date.now() + 1,
        rol: "bot",
        texto: respuesta,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  return (
    <div className="flex flex-col h-96 bg-w text-gray-800 rounded-lg shadow-lg border border-c">
      {/* Header del chat */}
      <header className="bg-hb px-4 py-3 flex justify-between items-center shadow-md rounded-t-lg">
        <h1 className="text-lg font-semibold text-w">Chat Pet Care</h1>
      </header>

      {/* Área de mensajes */}
      <main className="flex-1 p-4 overflow-y-auto bg-w">
        <div className="flex flex-col space-y-4">
          {mensajes.map((mensaje) => (
            <div
              key={mensaje.id}
              className={`flex ${
                mensaje.rol === "usuario" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`w-fit max-w-[85%] px-4 py-2 rounded-xl shadow  
                ${
                  mensaje.rol === "usuario"
                    ? "bg-ts text-w"
                    : "bg-c text-hb border border-gray-200"
                }`}
              >
                {mensaje.texto}
              </div>
            </div>
          ))}
          {cargando && (
            <div className="italic text-ts">El bot está escribiendo...</div>
          )}
          <div ref={scrollRef} />
        </div>
      </main>

      {/* Footer con formulario */}
      <footer className="px-4 py-3 border-t border-c space-y-2 rounded-b-lg bg-w">
        <form
          onSubmit={handleSubmit((data) => {
            manejarEnvio(data.texto);
            reset();
          })}
          className="flex gap-2"
        >
          <input
            {...register("texto")}
            placeholder="Escribí tu consulta..."
            className="flex-1 px-3 py-2 rounded-lg bg-c text-hb placeholder-gray-500 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ts"
          />
          <button
            type="submit"
            className="bg-hb hover:bg-ts text-w px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Enviar
          </button>
        </form>
        {errors.texto && (
          <p className="text-red-500 text-xs">{errors.texto.message}</p>
        )}
      </footer>
    </div>
  );
};
