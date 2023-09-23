import axios, {AxiosInstance} from "axios";
import {URL_API} from "@env";

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.15.3:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

class API {
  async checkApi() {
    try {
      const response = await api.get("/status/status");
      return response.status;
    } catch (err: any) {
      return err.response?.status;
    }
  }
}

const apiStatus = new API();

export {apiStatus, api};
