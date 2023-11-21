import {AxiosError, AxiosResponse} from "axios";
import {
  ICreateUser,
  IGetAllUsers,
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

  async getAllUsers() {
    try {
      const response = await api.get(`/user/getAll`);
      return response;
    } catch (error) {
      console.error(error);
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
      return await api
        .put(`/user/updateUser/${data.userId}`, data)
        .then(() => ({
          data: "Informações atualizadas com sucesso!",
          status: 200,
        }))
        .catch((err: AxiosError | any) => {
          if (err.response) {
            if (err.response.status === 400)
              return {data: err.response.data, status: err.response.status};
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}

const serviceUser = new User();

export default serviceUser;


//easter egg