import axios from "axios";
import CONSTANT_VALUE from "../helpers/constants/constant";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      CONSTANT_VALUE.localStorageKey.ACCESS_TOKEN
    );
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;
