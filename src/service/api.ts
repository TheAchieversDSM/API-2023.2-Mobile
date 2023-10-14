import axios, {AxiosInstance} from "axios";
import {URL_API, APP_MODE, AZURE_API} from "@env";

const url: string = APP_MODE == "main" ? AZURE_API : URL_API;

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.15.5:5000",
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
      console.log(response.data);
      console.log(response.status);
      return response;
    } catch (err: any) {
      return err.response;
    }
  }
}

const apiStatus = new API();

export {apiStatus, api};
