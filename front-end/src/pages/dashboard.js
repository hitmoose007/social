import React from "react";
import Header from "../components/header";
import { withRouter } from "react-router-dom";
import authHeader from "../services/authHeaderFront";
import axios from "axios";

function  Dashboard(){
    const [allUsers, setAllUsers] = React.useState([]);
    React.useEffect(()=>{
        axios.get('http://localhost:5000/api/users/', { headers: authHeader()})
        .then(response =>{
            console.log(response.data)
            setAllUsers(response.data)})
        .catch(error => console.log(error))
    },[])
    const mappedUsers = allUsers.map(user =>(
        <h1>{user.id}</h1>
    ))
    console.log(mappedUsers.length)
    return(
        <div>
            <Header show={true} />
            {
                mappedUsers.length>0?<h1>{mappedUsers}</h1>:<h1>You are not logged in!</h1>
            }
        </div>
    )
}

export default withRouter(Dashboard);