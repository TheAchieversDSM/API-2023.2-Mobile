import { ICreateSubtasks, IGetSubtasks } from "../interfaces/subtask";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "./api";

class Task {
    async createSubtask(data: ICreateSubtasks) {
        try {
            return await api
                .post("/task/create", data)
                .then((res: AxiosResponse | any) => {
                    if (res.status == 200) {                        
                        return { erro: "", validacao: true };                        
                    }else {
                        return { erro: "Erro desconhecido", validacao: false };
                    }
                })
                .catch((err: AxiosError | any) => {           
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

    async getTaskSubtask(taskId: number) {
        try {
            const response = await api.get(`/subtask/getByTask/${taskId}`);
        
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateSubtaskStatus(subtaskId: number, newCheck: boolean) {
        try {
            const response = await api.put(`/subtask/update/${subtaskId}`, {done: newCheck});

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    /* async deleteTask(id: number) {
        try {
            const response = await api.delete(`/task/delete/${id}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    } */
}

const serviceSubtask = new Task();

export default serviceSubtask;