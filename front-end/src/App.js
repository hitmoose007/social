import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import React from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/header";
import Chats from "./pages/chats";

function App() {
  let isValidSession = false;
  const token = localStorage.getItem("user");

  if (token) {
    const user = jwtDecode(token);
    if (user) {
      const expTime = new Date(user.exp * 1000);
      const currTime = new Date();
      if (expTime <= currTime) {
        localStorage.removeItem("user");
      } else isValidSession = true;
    }
  }

  return (
    <Router>
      <Header show={isValidSession} />
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <ProtectedRoute
        path="/dashboard"
        exact
        component={Dashboard}
        isAuth={isValidSession}
      />
      <ProtectedRoute
        path="/chats"
        exact
        component={Chats}
        isAuth={isValidSession}
      />
    </Router>
  );
}

export default App;
