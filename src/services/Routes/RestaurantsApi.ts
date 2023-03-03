// import { DataValues } from "../../types/CommonType";
// import { LoginUserValues } from "../../types/LoginUserType";
import http from "../apiServices";

export const restaurantApi = async () => {
    return await http.post("/restaurant/get/all");
}

export const restaurantgetbyIDApi = async (inputData : any) => {
    return await http.post("/restaurant/get", inputData);
}

export const restaurantgetTop4Api = async () => {
    return await http.post("/restaurant/get/toprestaurant");
}

