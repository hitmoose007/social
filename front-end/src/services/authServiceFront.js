import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";

const loginFront = (email, password)=> {
  return axios.post(API_URL + "/login", {
    email,
    password,
  }).then(response=>{
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
  })
}

const logoutFront=()=> {
  localStorage.removeItem("user");
}
const getCurrentUser=()=> {
  if (!localStorage.getItem("user")) {
    return null;
  }
  return JSON.parse(localStorage.getItem("user"));
}

const authServiceFront = {
  loginFront,
  logoutFront,
  getCurrentUser,}

  export default authServiceFront;
