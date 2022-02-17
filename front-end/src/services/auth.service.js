import axios from "axios";
const API_URL = "http://localhost:5000/api/";

export default getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };