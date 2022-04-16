import React from "react";
import { withRouter } from "react-router-dom";
import Posts from "../components/posts";
import Profile from "../components/profile";
import data from "../data";
import profiledata from "../profiledata";

function Dashboard() {
  console.log(profiledata.img);
  const posts = data.map((item) => {
    return <Posts id={item.id} {...item} />;
  });
  return (
    <div className="dashboard">
      <div className="postList">{posts}</div>
    </div>
  );
}

export default withRouter(Dashboard);
