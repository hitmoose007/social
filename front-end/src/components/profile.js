import React from "react";

export default function Profile(props){
    return(
        <div className="profile">
            <div className="profiledetails">
            <img src={props.img} alt="pic"/>
            <p>{props.name}</p>
            <p>{props.bio}</p>
            </div>
            <div className="profilefollowing">
            <button>Following {props.following}</button>
            <button>Followers {props.followers}</button>
            </div>
        </div>
    )
}