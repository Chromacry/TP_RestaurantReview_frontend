import axios from "axios";
import { BASE_URL } from "../constants/ApiConstants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["SecretToken"] = "Bear " + process.env.REACT_APP_SECRET_TOKEN || "";
// axios.defaults.headers.common["AccessToken"] = "access_token";

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
}