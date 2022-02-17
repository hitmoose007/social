import React from "react";
import Header from "../components/header";
import { withRouter } from "react-router-dom";
import authHeader from "../services/authHeaderFront";
import axios from "axios";

function  Dashboard(){
    const [user, setUser] = React.useState(null);
    axios.get('http://localhost:5000/api/users/', { headers: authHeader()})
    .then(response =>{
        console.log(response.data) })
    return(
        <div>
            <Header />
            <h1>Dashboard</h1>
        </div>
    )
}

export default withRouter(Dashboard);