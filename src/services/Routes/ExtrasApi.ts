// import { DataValues } from "../../types/CommonType";
// import { LoginUserValues } from "../../types/LoginUserType";
import http from "../apiServices";

export const searchApi = async (inputData : any) => {
    return await http.post("/extra/search", inputData);
}

