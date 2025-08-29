import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api", //Modificar cuando se tenga el dominio backend
    withCredentials: true,
});

export default instance;