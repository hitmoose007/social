import React from "react";
import { Link } from "react-router-dom";
import { SiGnusocial } from "react-icons/si";
import { SiRocketdotchat } from "react-icons/si";
import { AiOutlinePicRight } from "react-icons/ai";

export default function Footer() {
  return (
    <footer>
      <div class="footer">
        <div class="row">
          <div class="item">
            <h3>Where do you want to go?</h3>
            <ul id="ul">
              <li>
                <Link to="/dashboard">
                  <div className="logo">
                    <SiGnusocial />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/fyp">
                  <div className="logo">
                    <SiRocketdotchat />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/chats">
                  <div className="logo">
                    <AiOutlinePicRight />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p class="copyright">Hit or Miss © 2018</p>
      </div>
    </footer>
  );
}
