import React from "react";
import {SiGnusocial} from "react-icons/si";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";
import {SiRocketdotchat} from "react-icons/si";

export default function Header(props){
    console.log(props.show)
    return(
        <div className="header">
           <Link to="/dashboard"><div className="logo"><SiGnusocial/></div></Link>
           <input id="search" type="text" placeholder="Search" name="searchbar"></input>
            <div className="links">
            {props.show && <Link to="/chats"><button className="lgOutbtn"><SiRocketdotchat/></button></Link>}
            {props.show&&<button className="lgOutbtn" onClick={()=>{
                alert("Logging out");
                authService.Logout();
            }}>Logout</button> }
            </div>
        </div>
    )
}