import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => (
  <div className="flex justify-around m-2 my-4 w-full ">
    <div className="logoStyle">Thrift4all</div>
    <div className="flex gap-7 items-center justify-between w-[40%] my-2">
      <div className="flex gap-4">
        <span className="nav-items">Home</span>
        <span className="nav-items">Products</span>
        <span className="nav-items">Add Products</span>
        <span className="nav-items">Contact</span>
      </div>
      <div className="logout-btn">LOGOUT</div>
    </div>
    <FontAwesomeIcon
      icon={faBars}
      size="2x"
      className="mx-[39px] block md:hidden"
    />
  </div>
);

export default Navbar;
