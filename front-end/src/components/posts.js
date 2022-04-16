import React from "react";
import {FcLike} from "react-icons/fc";
import Profile from "./profile";

export default function Posts(props) {
  function handleSubmit(){
    console.log("commented")
  }
  return (
    <>
    <div className="posts">
    <Profile
      name="moosah"
      img="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    />
        <p>{props.caption}</p>
      <img src={props.img} alt="pic"/>
      <p className="like"><FcLike/> {props.likes}</p>
      <hr></hr>
      <p>Comments</p>
      <hr></hr>
      <form className="commentForm">
      <input placeholder="your comment"></input>
      <input className="submit" type="submit" value="comment" onClick={handleSubmit}/>
      </form>
    </div>
    </>
  );
}