import { create } from "zustand";  
  
export const useChatStore = create((set) => ({  
    mensajes: [  
        {  
            id: 1,  
            rol: "bot",  
            texto: "¡Hola! Soy tu asistente técnico de Pet Care para perros y gatos. Te ayudo con el uso de la plataforma: registro de mascotas, reservas de servicios y navegación. ¿Eres dueño de mascotas o cuidador?"  
        }  
    ],  
    agregarMensaje: (mensaje) => set((state) => ({  
        mensajes: [  
            ...state.mensajes, mensaje  
        ]  
    }))  
}));