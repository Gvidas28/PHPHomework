import axios from "axios";

const ServerClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

ServerClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

ServerClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        }

        throw error;
    }
);

export default ServerClient;
