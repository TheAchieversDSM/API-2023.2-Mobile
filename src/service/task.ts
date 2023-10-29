import {
  ICreateTasks,
  IGetTasksUser,
  IGetTasksUserDate,
  IGetTasksUserResp,
  IUpdateTask,
  IUpdateTimeSpent,
} from "../interfaces/task";
import {AxiosError, AxiosResponse} from "axios";
import {comparePriority} from "../utils/utils";
import {api} from "./api";

class Task {
  async createTask(data: ICreateTasks) {
    try {
      return await api
        .post("/task/create", data)
        .then((res: AxiosResponse | any) => {
          if (res.status == 200) {
            const taskId = res.data.data.id;

            return {taskId, erro: "", validacao: true};
          } else {
            return {erro: "Erro desconhecido", validacao: false};
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

  async getTaskUser(data: IGetTasksUser) {
    try {
      const response = await api.get(
        `/task/getNonCyclicTaskByUserId/${data.userId}`
      );
      const tasks: IGetTasksUserResp[] = response.data.data;
      tasks.sort(comparePriority);
      return tasks;
    } catch (error) {
      console.error(error);
    }
  }

  async getTaskUserDate(data: IGetTasksUserDate) {
    try {
      const response = await api.get(
        `/task/getExpiredTasks/${data.userId}/${data.deadline}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateTask(data: IUpdateTask) {
    console.log(data)
    try {
      const response = await api.put(`/task/update/${data.id}`, data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async tasktimeUpdateDto(data: IUpdateTimeSpent) {
    try {
      const response = await api.put(`/task/updateTime/${data.id}`, {
        timeSpent: data.timeSpent,
      });
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

  async getYearTime(id: number, year: number) {
    try {
      const response = await api.get(`/task/getTimeSpentMonthly/${id}/${year}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

const serviceTask = new Task();

export default serviceTask;
