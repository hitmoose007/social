import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:5000/api/users/", formData)
      .then((res) => {console.log(res)
      if(res.status===200)
        window.location.href = "/";
      else(alert("Email already exists/invalid email or username"))
      })
      .catch((error) => {
        alert("Email already exists/invalid email or username: "+error);
      });
  }
  return (
    <div className="container">
      <div className="form">
      <h2>Create Your Account</h2>
        <form>
          {/* <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={handleChange}
            value={formData.name}
          /> */}
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
          <input
            className="submit"
            type="submit"
            value="Register"
            onClick={handleSubmit}
          />
        <Link to="/login">
          <button className="regBtn">
            <span>Login</span>
          </button>
        </Link>
        </form>
      </div>
    </div>
  );
}
