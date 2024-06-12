import React from "react";
import clothIcon from "../assets/ClothingIcon.svg";
import shoeIcon from "../assets/ShoesIcon.svg";
import speakerIcon from "../assets/Speaker.svg";
import arrow from "../assets/Arrow.svg";

const FilterOptions = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-2 overflow- xsm:w-[100%] w-[70%] ">
        <div className="flex flex-col gap-1 m-2 cursor-pointer transition-all ease-in-out hover:bg-[#dddbdb] rounded-[25px] justify-between border-1 border-[#B31430] w-[450px] h-[200px] items-center bg-[#B715321A] p-3">
          <img src={clothIcon} className=" w-auto h-full" />
          <p className="optionName">Clothing</p>
        </div>
        <div className="flex flex-col gap-1 m-2 justify-between cursor-pointer transition-all ease-in-out hover:bg-[#dddbdb] rounded-[25px] border-1 border-[#B31430] w-[450px] h-[200px] items-center bg-[#B715321A] p-3">
          <img src={shoeIcon} className=" w-auto h-full" />
          <p className="optionName">Shoe</p>
        </div>
        <div className="flex flex-col justify-between gap-1 m-2 cursor-pointer transition-all ease-in-out hover:bg-[#dddbdb] rounded-[25px] border-1 border-[#B31430] w-[450px] h-[200px] items-center bg-[#B715321A] p-3">
          <img src={speakerIcon} className=" w-auto h-full" />
          <p className="optionName">Speaker</p>
        </div>
        <div className="flex flex-col gap-1 m-2 cursor-pointer transition-all ease-in-out hover:bg-[#dddbdb] justify-between rounded-[25px] border-1 border-[#B31430] w-[450px] h-[200px] items-center bg-[#B715321A] p-3">
          <span className=" font-normal text-xs font-[Pacifico]">View all</span>
          <img src={arrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
