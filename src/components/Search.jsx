import React from "react";
import filterIcon from "../assets/Filter.svg";
import addIcon from "../assets/addIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div className="flex items-center mx-3 my-5">
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
      <img src={addIcon} className="cursor-pointer " />
    </div>
  );
};

export default Search;
