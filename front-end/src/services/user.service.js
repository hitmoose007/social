import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:5000/api/users";
export default function getUser(){
    return axios.get(API_URL + "/getusers", { headers: authHeader() })
}