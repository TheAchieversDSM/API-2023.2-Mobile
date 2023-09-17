import axios, { AxiosInstance } from "axios";
import { URL_API } from "@env";

export const api: AxiosInstance = axios.create({
  baseURL: URL_API,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});