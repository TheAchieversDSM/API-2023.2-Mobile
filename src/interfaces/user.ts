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
