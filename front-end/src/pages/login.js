import React from "react";
import Header from "../components/header";
import { FaUserCircle } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  console.log(formData);
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
      let res = fetch("http://localhost:5000/users/", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password:formData.password,
        }),
      })
  }
  return (
    <div className="container">
      <Header />

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
