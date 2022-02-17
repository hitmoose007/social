import React from "react";
import Header from "../components/header";
import { FaUserCircle } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";


export default function Login({setToken}) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });


  console.log(JSON.stringify(formData));
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  async function handleSubmit(event){
      event.preventDefault()
      axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      }).then(response=>{
          if (response.data.token) {
            localStorage.setItem('user',JSON.stringify(response.data))
          }
      })
    }
    
  return (
    <div className="container">
      <Header />
      <div className="reg">
        <Link to="/register">
        <a>Register</a>
              <FaCashRegister />
          </Link>
        </div>
      <div className="form">
        <h1>
          <FaUserCircle />
        </h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <input className="submit" type="submit" value="Login" onClick={handleSubmit}/>
        </form>

      </div>
    </div>
  );
}

