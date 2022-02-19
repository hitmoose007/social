import React from "react";
import {SiGnusocial} from "react-icons/si";
import authService from "../services/auth.service";
export default function Header(props){
    console.log(props.show)
    return(
        <div className="header">
            <div className="logo"><SiGnusocial/></div>
            {props.show&&<button className="lgOutbtn" onClick={()=>{
                authService.Logout();
            }}>Logout</button>}
        </div>
    )
}