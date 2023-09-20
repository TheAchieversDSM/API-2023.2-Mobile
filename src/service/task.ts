import { AxiosError, AxiosResponse } from "axios";
import { ICreateTasks, IGetTasksUser } from "../interfaces/task";
import { api } from "./api";

class Task {
    async createTask(data: ICreateTasks) {
        try {
            return await api
                .post("/task/create", data)
                .then((res: AxiosResponse | any) => {
                    console.log(res);
                    
                    if (res.status == 201) {                        
                        return { erro: "", validacao: true };                        
                    }
                })
                .catch((err: AxiosError | any) => {
                    console.log(err);
                    
                    if (err.response) {
                        if (err.response.status === 409) {
                            const authenticationError = err.response.data.error;

                            return { erro: authenticationError, validacao: false };
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    async getTaskUser(data: IGetTasksUser){
        try {
            const response = await api.get(`/task/getByUserId/${data.userId}`);
            // if (response.status === 200) {
            //     console.log("erehtrthjytrew")
            //     // A resposta da API deve conter as tarefas do usuário
            //     const tasks = response.data; // Substitua 'tasks' pelo nome correto do campo nas respostas da API
            //     return tasks;
            // }
            return response;

        } catch (error) {
            console.error(error);
        }
    }
}

const serviceTask = new Task();

export default serviceTask;