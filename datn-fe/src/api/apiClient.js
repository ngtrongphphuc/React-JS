import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("CHANNA_TOKEN");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default apiClient;
