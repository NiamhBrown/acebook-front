import { Link } from "react-router-dom";
import logo from "../../assets/mount.png";


import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home">
      <img />
      <div className="content">
        <h1>Welcome to Acebook!</h1>
        <Link className="signup-link" to="/signup">Sign Up</Link>
        <Link className="signup-link" to="/login">Log In</Link>
      </div>
    </div>
  );
};
// src={logo} alt="page logo" className="logo_img"
