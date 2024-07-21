import React from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out w-[250px]`}
    >
      <div className="flex justify-end p-4">
        <FontAwesomeIcon
          icon={faTimes}
          className="text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Link to="/" className="nav-items">
          Home
        </Link>
        <Link to="/user-products" className="nav-items">
          Products
        </Link>
        <Link to="/addproducts" className="nav-items">
          Add Products
        </Link>
        <Link to="/deleted-products" className="nav-items">
          Deleted Products
        </Link>
        <span className="nav-items">Contact</span>
        <div className="logout-btn">LOGOUT</div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
