export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  rPassword: string;
}

export interface IGetUser {
  userId: number;
}

export interface IGetAllUsers {
  userId: number;
  email: string;
}

export interface IGetUserByIdResp {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  reloadUser: () => void;
}