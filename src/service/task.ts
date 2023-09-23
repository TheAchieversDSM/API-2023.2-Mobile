import { ICreateTasks, IGetTasksUser, IGetTasksUserDate, IUpdateTask } from "../interfaces/task";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "./api";

class Task {
    async createTask(data: ICreateTasks) {
        try {
            return await api
                .post("/task/create", data)
                .then((res: AxiosResponse | any) => {
                    if (res.status == 201) {                        
                        return { erro: "", validacao: true };                        
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

    async getTaskUser(data: IGetTasksUser) {
        try {
            const response = await api.get(`/task/getByUserId/${data.userId}`);
            return response;

        } catch (error) {
            console.error(error);
        }
    }

    async getTaskUserDate(data: IGetTasksUserDate) {
        try {
            const response = await api.get(`/task/getExpiredTasks/${data.userId}/${data.deadline}`);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    }

    async updateTask(data: IUpdateTask) {
        try {
            const response = await api.put(`/task/update/${data.id}`, data);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTask(id: number) {
        try {
            const response = await api.delete(`/task/delete/${id}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}

const serviceTask = new Task();

export default serviceTask;