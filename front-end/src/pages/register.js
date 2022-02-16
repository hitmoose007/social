import React from "react";
import Header from "../components/header";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
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

    axios.post("http://localhost:5000/api/users/register", formData)
      .then((res) => {console.log(res)
      if(res.status===200)
        window.location.href = "/";
      else(alert("Email already exists/invalid email or username"))
      })
      .catch((data) => {
        console.log(data);
      });
  }
  return (
    <div className="container">
      <Header />

      <div className="form">
        <form>
          <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
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
        </form>
      </div>
    </div>
  );
}
