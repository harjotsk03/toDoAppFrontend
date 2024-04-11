import { IUser } from "../types";
import axiosInstance from "./config";

type RegisterUserTypes = IUser

export const registerUser = async ({email, name, password}: RegisterUserTypes) => {
    try{
        const response  = await axiosInstance.post("/users/create", {
            email,
            name, 
            password,
        })
        return response.data.user
    }catch(error){
        console.log("error in registerUser", error)
        throw error
    }
}