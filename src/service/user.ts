import {AxiosError, AxiosResponse} from "axios";
import {
  ICreateUser,
  IGetUser,
  IGetUserByIdResp,
  IUpdateUser,
} from "../interfaces/user";
import {api} from "./api";

class User {
  async createUser(data: ICreateUser) {
    try {
      return await api
        .post("/user/create", data)
        .then((res: AxiosResponse | any) => {
          if (res.status == 201) {
            return {erro: "", validacao: true};
          }
        })
        .catch((err: AxiosError | any) => {
          if (err.response) {
            if (err.response.status === 409) {
              const authenticationError = err.response.data.error;
              return {erro: authenticationError, validacao: false};
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(data: IGetUser) {
    try {
      const response = await api.get(`/user/getById/${data.userId}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(data: IUpdateUser) {
    try {
      const response = await api.put(`/user/updateUser/${data.userId}`, data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const serviceUser = new User();

export default serviceUser;
