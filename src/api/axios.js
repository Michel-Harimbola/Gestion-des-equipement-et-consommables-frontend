import axios from "axios";
import { getLoadingInstance } from "../context/LoadingContextHandler";
import { toast } from "react-toastify";

const api = axios.create({
   baseURL: "http://localhost:3000/api",
   headers: { "Content-Type": "application/json" },
   timeout: 5000,
});


const loading = getLoadingInstance();

api.interceptors.request.use((config) => {
    loading?.setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    loading?.setIsLoading(false);
    return Promise.reject(error);
});

api.interceptors.response.use((res) => {
    loading?.setIsLoading(false);
    return res;
}, (error) => {
    loading?.setIsLoading(false);
    toast.error(error.response?.data?.message || "Error occured");
    return Promise.reject(error);
});