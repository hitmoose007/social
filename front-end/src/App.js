import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuth, setIsAuth] = React.useState(true);

  return (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/dashboard" exact component={Dashboard} isAuth={isAuth}/>
   </Router>
  );
}

export default App;
