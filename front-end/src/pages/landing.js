import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <div className="landingHeader">
        <Link to="/login">
          <button className="landBtn">
            <span>Login</span>
          </button>
        </Link>
        <Link to="/register">
          <button className="landBtn">
            <span>Register</span>
          </button>
        </Link>
      </div>
      <div className="landingContent">
        <h1>Hit Or Miss</h1>
        <p>
          A social media application much like Facebook and Instagram but
          addressing all their downsides and fixing them. Good things of both
          downsides of neither!
          and i am amazing and and and and and and a
          A social media application much like Facebook and Instagram but
          addressing all their downsides and fixing them. Good things of both
          downsides of neither!
          and i am amazing and and and and and and a
        </p>
        <Link to="/register">
          <button className="landBtn">
            <span>Join us Today!</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
