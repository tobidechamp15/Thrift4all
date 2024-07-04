import React from "react";
import { Link } from "react-router-dom";

const LandingNav = () => {
  return (
    <div className="flex justify-between">
      <Link to="/" className="logoStyle">
        Thrift4all
      </Link>
      <div className=" hidden lg:flex gap-[40px] py-3 px-[50px] bg-white rounded-lg">
        <span className="land-items">Home</span>
        <span className="land-items">About</span>
        <span className="land-items">Products</span>
        <span className="land-items">Services</span>
      </div>
      <Link to="/signup" className="btn btn-danger px-[52px] py-3">
        Sign Up
      </Link>
    </div>
  );
};

export default LandingNav;
