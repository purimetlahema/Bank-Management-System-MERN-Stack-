import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-bar">
      <Link to="/"><h2>Signup</h2></Link>
      <Link to="/login"><h2>Login</h2></Link>
      <Link to="/dashboard"><h2>Dashboard</h2></Link>
    </div>
  );
};

export default Nav;
