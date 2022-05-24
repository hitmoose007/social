import React from "react";
import profiledata from "../profiledata";
import Profile from "../components/profile";

export default function Chats() {
  const [formData, setFormData] = React.useState({
    content: "",
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
  function handleSubmit() {
    console.log("posted");
  }
  return (
    <div className="chattingPage">
      <div className="chats">
          <div className="chatHeader">
        <Profile name="Ali Abdullah" img={profiledata.img} />
          </div>
          <div className="chatBody">
          <div className="chatp">
          <p id="them">Hi</p>
          <p id="you">Hello</p>
          </div>
        <form>
          <input
            type="text"
            placeholder="..."
            name="content"
            onChange={handleChange}
            value={formData.content}
            />
          <input
            id="submit"
            className="submit"
            type="submit"
            value="Send"
            onClick={handleSubmit}
            />
        </form>
            </div>
      </div>
      <div className="chatlist">
          <input placeholder="Search"></input>
          <div>
              <Profile name="Ali Abdullah" img={profiledata.img} />
          </div>
      </div>
    </div>
  );
}
