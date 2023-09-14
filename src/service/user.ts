import {AxiosError, AxiosResponse} from "axios";
import {ICreateUser} from "../interfaces/user";
import {api} from "./api";
import {useNavigation} from "@react-navigation/native";

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
}

const serviceUser = new User();

export default serviceUser;
