

import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});


// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {

    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }


    // Agar FormData hai to Content-Type mat set karo
    // Browser automatically multipart/form-data boundary set karega
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } 
    else {
      config.headers["Content-Type"] = "application/json";
    }


    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// Response Interceptor
axiosInstance.interceptors.response.use(

  (response) => {
    return response;
  },


  (error) => {

    if (error.response) {

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      else if (error.response.status === 500) {
        console.error(
          "Server error. Please try again later."
        );
      }

    }

    else if (error.code === "ECONNABORTED") {

      console.error(
        "Request timeout. Please try again."
      );

    }


    return Promise.reject(error);

  }

);


export default axiosInstance;