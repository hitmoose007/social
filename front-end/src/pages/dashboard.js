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
    <div>
      <Profile
        img={profiledata.img}
        name={profiledata.name}
        bio={profiledata.bio}
        followers={profiledata.followers}
        following={profiledata.following}
      />
      <hr></hr>
      <div className="postList">{posts}</div>
    </div>
  );
}

export default withRouter(Dashboard);
