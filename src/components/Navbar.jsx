import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="flex justify-between md:justify-around py-4 w-full items-center">
      <Link to="/" className="logoStyle">
        Thrift4all
      </Link>
      <div className="hidden md:flex gap-7 items-center justify-between my-2">
        <div className="md:flex gap-4 hidden">
          <Link to="/products" className="nav-items">
            Home
          </Link>
          <Link to="/user-products" className="nav-items">
            Products
          </Link>
          <Link to="/addproducts" className="nav-items">
            Add Products
          </Link>
          <span className="nav-items">Contact</span>
        </div>
      </div>
      <div onClick={handleLogOut} className="logout-btn hidden md:flex">
        LOGOUT
      </div>
      <FontAwesomeIcon
        icon={faBars}
        onClick={toggleSidebar}
        // size="2x"
        className="mx-[39px] block md:hidden text-2xl"
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
