export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  rPassword: string;
}

export interface IGetUser {
  userId: number;
}

export interface IGetUserByIdResp{
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUser{
  userId: number;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  reloadUser: () => void;
}
