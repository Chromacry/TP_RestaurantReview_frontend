import { DataValues } from "../../types/CommonType";
import { LoginUserValues } from "../../types/LoginUserType";
import http from "../apiServices";

export const loginApi = async (inputData: LoginUserValues) => {
    return await http.post("/account/user/login", inputData)
}
export const signupApi = async (inputData: any) => {
    return await http.post("/account/user/create", inputData)
}

export const deleteUserApi = async (inputData: any) => {
    return await http.delete("/account/user/delete", inputData)
}

export const getUserApi = async (inputData: any) => {
    return await http.post("/account/user/get", inputData)
}

export const checkTokenApi = async (inputData : DataValues) => {
    return await http.post("/account/user/check", inputData)
}
export const updateUserApi = async (inputData : any) => {
    return await http.put("/account/user/update", inputData)
}

export const forgetpasswordApi = async (inputData: any) => {
    return await http.post("/account/user/forgetpassword", inputData)
}

export const resetpasswordApi = async (inputData: any) => {
    return await http.patch("/account/user/resetpassword", inputData)
}