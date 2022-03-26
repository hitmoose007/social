import React from "react";
import {FcLike} from "react-icons/fc";

export default function Posts(props) {
  return (
    <div className="posts">
      <img src={props.img} alt="pic"/>
      <p><FcLike/> {props.likes}</p>
        <p>{props.caption}</p>
    </div>
  );
}