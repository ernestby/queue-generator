import axios from "axios";
import store from "@/store";

const API_URL = "http://localhost:3002/";

const http = axios.create({
  baseURL: `${API_URL}`,
});

http.interceptors.request.use((config) => {
  const { headers } = config;

  if (store.state.auth.token) {
    headers.Authorization = store.state.auth.token;
  }
  return config;
}, Promise.reject);

export default http;
