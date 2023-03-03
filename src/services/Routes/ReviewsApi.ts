// import { DataValues } from "../../types/CommonType";
// import { LoginUserValues } from "../../types/LoginUserType";
import http from "../apiServices";

export const reviewApi = async () => {
    return await http.post("/review/get/all");
}

export const reviewsgetbyRestaurantIDApi = async (inputData: any) => {
    return await http.post("/review/get/all/restaurant", inputData);
}

export const reviewscreatebyIDApi = async (inputData: any) => {
    return await http.post("/review/create", inputData);
}

export const reviewsupdatebyIDApi = async (inputData: any) => {
    return await http.put("/review/update", inputData);
}

export const reviewsdeletebyIDApi = async (inputData: any) => {
    return await http.delete("/review/delete", inputData);
}

export const reviewsgetLatestReviewApi = async () => {
    return await http.post("/review/get/latestreview");
}

