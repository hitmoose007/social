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
import LoginRoute from "./components/LoginRoute";
import Header from "./components/header";
import Chats from "./pages/chats";
import Landing from "./pages/landing";
import Fyp from "./pages/fyp";
import Footer from "./components/footer";

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
      <LoginRoute path="/" exact component={Landing} isAuth={isValidSession} />
      <LoginRoute path="/login" exact component={Login} isAuth={isValidSession} />
      <LoginRoute path="/register" exact component={Register} isAuth={isValidSession} />
      <ProtectedRoute
        path="/dashboard"
        exact
        component={Dashboard}
        isAuth={isValidSession}
      />
      <ProtectedRoute
        path="/fyp"
        exact
        component={Fyp}
        isAuth={isValidSession}
      />
      <ProtectedRoute
        path="/chats"
        exact
        component={Chats}
        isAuth={isValidSession}
      />
    {isValidSession&& <Footer/>}
    </Router>
  );
}

export default App;
