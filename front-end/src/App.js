import { BrowserRouter as Router, Routes, Route,Redirect } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Chats from "./pages/chats";



function App() {
  const [isAuth, setIsAuth] = React.useState(JSON.parse(localStorage.getItem("isAuth"))||false);
  React.useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
    console.log(localStorage.getItem("isAuth"));
  },[isAuth]);

  return (
    <Router>
        <Route path="/" exact component={() => (<Login setToken={setIsAuth} />)} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/dashboard" exact component={Dashboard} isAuth={JSON.parse(localStorage.getItem("isAuth"))}/>
        <ProtectedRoute path="/chats" exact component={Chats} isAuth={JSON.parse(localStorage.getItem("isAuth"))}/>
   </Router>
  );
}

export default App;
