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
      <Link
        to="/"
        className="text-3xl font-bold text-gray-800 hover:text-gray-900 transition duration-300"
      >
        Thrift4all
      </Link>
      <div className="hidden md:flex gap-7 items-center">
        <div className="md:flex gap-4">
          <Link
            to="/products"
            className="text-lg text-gray-600 hover:text-gray-900 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/user-products"
            className="text-lg text-gray-600 hover:text-gray-900 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/addproducts"
            className="text-lg text-gray-600 hover:text-gray-900 transition duration-300"
          >
            Add Products
          </Link>
          <span className="text-lg text-gray-600">Contact</span>
        </div>
      </div>
      <div
        onClick={handleLogOut}
        className="text-lg text-red-600 cursor-pointer hidden md:block"
      >
        LOGOUT
      </div>
      <FontAwesomeIcon
        icon={faBars}
        onClick={toggleSidebar}
        className="block md:hidden text-3xl text-gray-800 hover:text-gray-900 transition duration-300"
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
