import {
  ICreateTasks,
  IGetTasksUser,
  IGetTasksUserDate,
  IGetTasksUserResp,
  IUpdateTask,
  IUpdateTimeSpent,
} from "../interfaces/task";
import { AxiosError, AxiosResponse } from "axios";
import { comparePriority } from "../utils/utils";
import { api } from "./api";
import { File, ISFile } from "../interfaces/file";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./firebase";

class Task {

  private async generateFileName(file: File) {
    const now = new Date();
    const unixTime = Math.floor(now.getTime() / 1000);
    const fileSplited = file.originalname.split(".");
    return `${fileSplited[0]}${unixTime}.${fileSplited[1]}`;
  }

  private async uploadFile(file: File, name: string) {
    const fileRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(fileRef, file.buffer);
    return new Promise(async (resolve, reject) => {
      try {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              fileName: name,
              fileSize: file.size,
              fileType: name.split(".")[1],
              url: downloadURL,
            });
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async createTask(data: ICreateTasks) {
    try {
      return await api
        .post("/task/create", data)
        .then((res: AxiosResponse | any) => {
          if (res.status == 200) {
            const taskId = res.data.data.id;

            return { taskId, erro: "", validacao: true };
          } else {
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
    try {
      const update = await api.post(
        `/task/UpdateHistorico/${data.id}/${data.userId}`,
        data
      );
      const response = await api.put(`/task/update/${data.id}`, data);
      return { response, update };
    } catch (error) {
      console.error(error);
    }
  }

  async shareTask(taskId: number, usersIds: number[]) {
    try {
      const response = await api.post(`/task/shareTask/${taskId}`, { usersIds });
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

  async deleteTask(id: number, userId: number) {
    try {
      const response = await api.delete(`/task/delete/${id}/${userId}`);
      console.log("Exclusão realizada com sucesso")
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

  async getHistoricTask(id: number) {
    try {
      const response = await api.get(`/task/getHistoricTask/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getHistoricByUser(id: number) {
    try {
      const response = await api.get(`/task/getHistoricTaskByUser/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getHistoricByOwner(id: number) {
    try {
      const response = await api.get(`/task/getHisotricTaskByOwner/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getHistoricDeleteByUser(id: number) {
    try {
      const response = await api.get(`/task/getDeleteHistoricTaskByUser/${id}`);      
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFiles(id: number, data: File[]) {
    try {
      const files = await Promise.all(
        data.map(async (file) => {
          try {
            const name = await this.generateFileName(file);
            const uploadedFile = await this.uploadFile(file, name);
            return uploadedFile;
          } catch (error) {
            console.error(`Error uploading file: ${error}`);
            return null;
          }
        })
      );
      const filteredFiles = files.filter((file) => file !== null);
      const response = await api.post(`/task/fileUpload/${id}`, filteredFiles);
      return response.data;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  }

  async deleteFile(idTask: number, idFile: number) {
    try {
      const response = await api.delete(`/task/fileDelete/${idTask}/${idFile}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const serviceTask = new Task();

export default serviceTask;
