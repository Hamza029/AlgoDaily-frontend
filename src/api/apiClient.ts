import axios, { AxiosInstance } from "axios";
import env from "../config/env";

const apiClient: AxiosInstance = axios.create({
  baseURL: env.SERVER_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

export default apiClient;
