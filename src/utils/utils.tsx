import * as SecureStore from 'expo-secure-store'
import { APP_SECRET } from "@env"
import { ICreateUser } from '../interfaces/user'
import jwt_decode from 'jwt-decode'
import { JsonWebToken } from '../interfaces/auth'

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