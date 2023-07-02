import axios from "axios";

const apiClient = axios.create({
    // URL para variable de entorno
    baseURL: "https://estilo-canino-api.onrender.com/"
});

export default apiClient;