import axios from "axios";

const serverAPI = () => {

    const axiosInstance = axios.create({
        baseURL: 'https://elockhub.onrender.com', //TODO: change later
        headers: {
            // 'Content-Type': contentType,
            "Access-Control-Allow-Origin": "*"
        },
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );


    return axiosInstance;
}

export default serverAPI;