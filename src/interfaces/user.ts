export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  rPassword: string;
}

export interface IGetUser {
  userId: number;
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