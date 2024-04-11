import axios from "axios";
import * as SecureStoe from "expo-secure-store";

require('dotenv').config();

const apiCallURL = process.env.apiCallURL;

export const BASE_URL = `${apiCallURL}`
const TIME_OUT = 30000
const BLOSSOM_TOKEN_NAME = "blossom_user_token"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export const saveToken =async (key: string, value: string) => {
    try{
        await SecureStoe.setItemAsync(key, value);
    }catch(error){
        console.log("error in saveToken", error)
        throw error
    }
}

axiosInstance.interceptors.request.use(
    async (req) => {
      try {
        const access_token = await SecureStoe.getItemAsync(BLOSSOM_TOKEN_NAME)
        req.headers.Authorization = access_token
        return req;
      } catch (error) {
        return req
      }
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const fetcher = (url: string) => 
    axiosInstance.get(url).then((res) => res.data)

export default axiosInstance
  