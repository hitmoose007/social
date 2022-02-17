import { BrowserRouter as Router, Routes, Route,Redirect } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Chats from "./pages/chats";



function App() {

  return (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" exact component={Dashboard}/>
   </Router>
  );
}

export default App;
