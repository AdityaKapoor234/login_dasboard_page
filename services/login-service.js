import axios from "axios";
import { LOGIN, SIGNUP } from "../utils/constant";


export class loginAPI {

    static login(data) {
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return axios.post(`${LOGIN}`, data, httpOptions)
    }

    static signup(data) {
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return axios.post(`${SIGNUP}`, data, httpOptions)
    }


}
export default loginAPI;