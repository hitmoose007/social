import React from "react";
import Header from "../components/header";
import { FaUserCircle } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name:"",
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
      let res = fetch("http://localhost:5000/users/createUser", {
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
          <input className="submit" type="submit" value="Login" onClick={handleSubmit}/>
        </form>
      </div>
    </div>
  );
}
