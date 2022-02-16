import { BrowserRouter as Router, Routes, Route,Redirect } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Chats from "./pages/chats";
import authHeaderFront from "./services/authHeaderFront";



function App() {

  console.log(authHeaderFront()["x-auth-token"]===JSON.parse(localStorage.getItem("user")).token)
  return (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/dashboard" exact component={Dashboard} isAuth={authHeaderFront()["x-auth-token"]===JSON.parse(localStorage.getItem("user")).token}/>
        <ProtectedRoute path="/chats" exact component={Chats} isAuth={authHeaderFront()["x-auth-token"]===JSON.parse(localStorage.getItem("user")).token}/>
   </Router>
  );
}

export default App;
