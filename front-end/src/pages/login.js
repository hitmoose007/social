import React from "react";
import Header from "../components/header";
import { FaUserCircle } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
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
  function handleSubmit(event){
      event.preventDefault()
      let res = fetch("http://restapi.adequateshop.com/api/authaccount/login", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        }
        );}
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
