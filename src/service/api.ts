import axios, {AxiosInstance} from "axios";
import {URL_API, APP_MODE, AZURE_API} from "@env";

const url: string = APP_MODE == "main" ? AZURE_API : URL_API;


const api: AxiosInstance = axios.create({
  baseURL: url,
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

  async checkTasks(userId: number) {
    try {
      const response = await api.get(`/status/renewCyclicTasks/${userId}`);
      return response;
    } catch (err: any) {
      return err.response;
    }
  }
}

const apiStatus = new API();

export {apiStatus, api};
