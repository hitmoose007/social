import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";


export default function Login() {
  const history = useHistory()
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
  async function handleSubmit(event){
    event.preventDefault()
    const { data } = await axios.post("http://localhost:5000/api/auth/login", {
      email: formData.email,
      password: formData.password,
    }).catch(error=>{
      alert('Invalid Credentials');
    })

      if (data.token) {
        localStorage.setItem('user',JSON.stringify(data))
      }
        window.location.reload()
      }
    
  return (
    <div className="container">
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
        <Link to="/register">
          <button className="regBtn">
            <span>Register</span>
          </button>
        </Link>
        </form>
      </div>
    </div>
  );
}

