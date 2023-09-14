import * as SecureStore from 'expo-secure-store'
import { APP_SECRET } from "@env"
import { ICreateUser } from '../interfaces/user'

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