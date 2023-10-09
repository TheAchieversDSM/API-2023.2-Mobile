import { IGetTasksUserResp } from '../interfaces/task';
import { JsonWebToken } from '../interfaces/auth';
import * as SecureStore from 'expo-secure-store';
import { ICreateUser } from '../interfaces/user';
import { APP_SECRET } from "@env";
import jwt_decode from 'jwt-decode';
import { ITaskCheck, ITimeCaculate } from '../interfaces/functions';
import { IGetSubtasks } from '../interfaces/subtask';
import { sub } from 'date-fns';

export async function getItem(key: string): Promise<string | null> {
  const value = await SecureStore.getItemAsync(key)
  return value ? value : null
}

export async function setItem(key: string, value: string): Promise<void> {
  return SecureStore.setItemAsync(key, value)
}
export async function removeItem(key: string): Promise<void> {
  return SecureStore.deleteItemAsync(key)
}

export const getToken = () => getItem(APP_SECRET)
export const removeToken = () => removeItem(APP_SECRET)
export const setToken = (value: string) => setItem(APP_SECRET, value)


export const verifyPasswordMatch = ({ password, rPassword }: ICreateUser) => {
  if (password === rPassword) {
    return true;
  } else {
    return false;
  }
};

export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${year}-${month}-${day}`;
}

export const decodeJsonWebToken = (data: string): JsonWebToken => {
  const decodedToken: JsonWebToken = jwt_decode(data);
  return decodedToken
}


export const checkTokenValidity = (userToken: string, signOut: Function) => {
  const { exp } = decodeJsonWebToken(userToken)
  const expireTime = new Date(exp * 1000);
  const timeNow = new Date();
  if (expireTime < timeNow) {
    signOut()
  }
};

export function comparePriority(a: IGetTasksUserResp, b: IGetTasksUserResp): number {
  const prioritiesOrder = { High: 0, Medium: 1, Low: 2 };
  const priorityA = prioritiesOrder[a.priority];
  const priorityB = prioritiesOrder[b.priority];
  return priorityA - priorityB;
}

export function calculateDateWithTime(time: number): string {
  const dias = time / 86400;
  return dias === Math.floor(dias) ? `${dias} Dias` : `${dias.toFixed(2)} Dias`
}

export function timeCalculate(value: string): ITimeCaculate {
  const timeFind: string[] = value.split(" ");
  let resultadoEmSegundos = 0;
  let mensagem = "";

  const fatoresDeConversao: { [key: string]: number } = {
    w: 604800,
    d: 86400,
    h: 3600,
    m: 60
  };

  timeFind.forEach((time) => {
    const quantidade = parseInt(time);
    const unidade = time.slice(-1);
    if (!isNaN(quantidade) && unidade in fatoresDeConversao) {
      resultadoEmSegundos += quantidade * fatoresDeConversao[unidade];
    }
  });

  mensagem = calculateDateWithTime(resultadoEmSegundos);

  return { msg: mensagem, time: resultadoEmSegundos }
}

export function checkProgressSubTask(subTaskList: IGetSubtasks[]): number {
  const totalSubTasks = subTaskList.length;
  const totalSubTasksDone = subTaskList.filter(subTask => subTask.done).length;
  const porcentagem = totalSubTasksDone / totalSubTasks * 100;
  return porcentagem
}

export function checkTaskUser(tasks: IGetTasksUserResp[], year: string, month: string): ITaskCheck {
  let done = 0;
  let doing = 0;
  let todo = 0;
  let expirada = 0;
  let monthLength = 0;

  tasks.forEach((task: IGetTasksUserResp) => {
    let monthDeadLine = task.deadline.split('-')[1]
    let yearDeadLine = task.deadline.split('-')[0]
    monthLength += monthDeadLine == month ? 1 : 0
    done += task.status == "DONE" && yearDeadLine == year && monthDeadLine == month ? 1 : 0
    doing += task.status == "DOING" && yearDeadLine == year && monthDeadLine == month ? 1 : 0
    todo += task.status == "TO DO" && yearDeadLine == year && monthDeadLine == month ? 1 : 0
    expirada += task.status == "EXPIRED" && yearDeadLine == year && monthDeadLine == month ? 1 : 0
  })

  const percentage = (value: number, total: number) => (total === 0 ? 0 : (value / total) * 100);
  
  done = percentage(done, monthLength);
  doing = percentage(doing, monthLength);
  todo = percentage(todo, monthLength);
  expirada = percentage(expirada, monthLength);

  return { doing: doing, done: done, todo: todo, expirada: expirada }
}