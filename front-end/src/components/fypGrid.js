import React from "react";
import { Link } from "react-router-dom";

export default function FypGrid(props) {
  console.log(props.img);
  return( 
  <div className="fypGrid">
      <img src={props.img}></img>
  </div>
  )
}
