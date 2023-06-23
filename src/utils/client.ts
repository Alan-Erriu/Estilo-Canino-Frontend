import axios from "axios";

const apiClient = axios.create({
    // URL para variable de entorno
    baseURL: "http://localhost:3000/"
});

export default apiClient;