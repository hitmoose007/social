import React from "react";
import { withRouter } from "react-router-dom";
import Posts from "../components/posts";
import Profile from "../components/profile";
import data from "../data";
import profiledata from "../profiledata";

function Dashboard() {
  const [formData,setFormData]=React.useState({
    content:"",
  })
  console.log(profiledata.img);
  const posts = data.map((item) => {
    return <Posts id={item.id} {...item} />;
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  function handleSubmit(){
    console.log("posted")
  }
  return (
    <div className="dashboard">
      <div className="postList">
      <div className="posts">
      <Profile
      name="moosah"
      img={profiledata.img}
      />
      <form>
          <input type="text" placeholder="Title of your post" name="content" onChange={handleChange} value={formData.title}></input>
          <input type="text" placeholder="Whats on your mind?" name="content" onChange={handleChange} value={formData.content} />
          <input className="submit" type="submit" value="post" onClick={handleSubmit}/>
        </form>
      </div>
        {posts}</div>
    </div>
  );
}

export default withRouter(Dashboard);
