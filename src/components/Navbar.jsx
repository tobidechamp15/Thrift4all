import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => (
  <div className="flex justify-between md:justify-around py-4 w-full items-center">
    <div className="logoStyle">Thrift4all</div>
    <div className="hidden md:flex gap-7 items-center justify-between w-[40%] my-2">
      <div className="md:flex gap-4 hidden">
        <span className="nav-items">Home</span>
        <Link to="/user-products" className="nav-items">
          Products
        </Link>
        <Link to="/addproducts" className="nav-items">
          Add Products
        </Link>
        <span className="nav-items">Contact</span>
      </div>
    </div>
    <div className="logout-btn hidden md:flex">LOGOUT</div>
    <FontAwesomeIcon
      icon={faBars}
      // size="2x"
      className="mx-[39px] block md:hidden text-2xl"
    />
  </div>
);

export default Navbar;
