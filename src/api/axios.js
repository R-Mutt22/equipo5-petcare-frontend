import axios from "axios";  
  
const instance = axios.create({  
    baseURL: "http://localhost:8080",  
    withCredentials: true,  
});  
  
// Interceptor de request para incluir tokens automáticamente  
instance.interceptors.request.use(  
    (config) => {  
        // Buscar token según el tipo de usuario  
        const ownerToken = localStorage.getItem("owner_token");  
        const sitterToken = localStorage.getItem("sitter_token");  
        const adminToken = localStorage.getItem("admin_token");  
          
        const token = ownerToken || sitterToken || adminToken;  
          
        if (token) {  
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Verifier = 'petcare';  
        }  
          
        return config;  
    },  
    (error) => {  
        return Promise.reject(error);  
    }  
);  
  
// Interceptor de response para manejar tokens expirados  
instance.interceptors.response.use(  
    (response) => {  
        return response;  
    },  
    (error) => {  
        if (error.response?.status === 401) {  
            // Token expirado o inválido - limpiar localStorage  
            localStorage.removeItem("owner_token");  
            localStorage.removeItem("sitter_token");  
            localStorage.removeItem("admin_token");  
              
            // Redirigir al login  
            window.location.href = '/login';  
        }  
        return Promise.reject(error);  
    }  
);  
  
export default instance;