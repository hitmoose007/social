import React from "react";

export default function Profile(props){
    return(
        <div className="profile">
            <img src={props.img} alt="pic"/>
            <p>{props.name}</p>
        </div>
    )
}