import React from "react";
import { Link } from "react-router-dom";
import filterIcon from "../assets/Filter.svg";
import addIcon from "../assets/addIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center mx-3 my-5 xsm:w-[100%] w-[70%]">
        <img src={filterIcon} alt="" />
        <div className="flex w-full justify-center items-center relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-[40px]" />
          <input
            type="search"
            className="w-full mx-4 rounded-[50px] hover:bg-[#c29191] border-black border-2   ps-[45px] py-3 form-control outline-none"
            placeholder="Search for products"
            id=""
          />
        </div>
        <Link to="/addproducts">
          <img src={addIcon} className="cursor-pointer " />
        </Link>
      </div>
    </div>
  );
};

export default Search;
