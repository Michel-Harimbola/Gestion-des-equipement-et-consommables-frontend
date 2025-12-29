import axios from "axios";
import { getLoadingInstance } from "../context/LoadingContextHandler";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
   baseURL: "http://localhost:3001/api",
   timeout: 5000,
});


const loading = getLoadingInstance();

axiosInstance.interceptors.request.use((config) => {
    loading?.setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    loading?.setIsLoading(false);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((res) => {
    loading?.setIsLoading(false);
    return res;
}, (error) => {
    loading?.setIsLoading(false);
    toast.error(error.response?.data?.message);
    return Promise.reject(error);
});

export default axiosInstance;