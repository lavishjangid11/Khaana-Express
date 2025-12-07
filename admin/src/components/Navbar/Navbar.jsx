import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <div className="admin-navbar-left">
        <img className="admin-logo" src={assets.logo} alt="logo" />
        <p className="admin-subtitle">Admin Panel</p>
      </div>

      <div className="admin-navbar-right">
        <img className="admin-profile" src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;
