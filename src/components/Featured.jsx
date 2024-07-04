import React from "react";
import { useNavigate } from "react-router-dom";
import card1 from "../assets/card1.svg";
import card2 from "../assets/card2.svg";
import viewAll from "../assets/viewAll.svg";

const Featured = () => {
  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate("/products");
  };
  return (
    <div className="flex xsm:flex-col flex-wrap bg-black items-center justify-center gap-[60px] py-[93px]">
      <div className="flex flex-col gap-[24px]">
        <span className="text-white text-[40px] font-bold">
          Featured Products
        </span>
        <img
          src={viewAll}
          className="w-[160px] h-[48px] cursor-pointer"
          onClick={handleViewProducts}
        />{" "}
      </div>
      <div className="flex gap-[40px] flex-wrap items-center justify-center">
        <img src={card1} alt="" />
        <img src={card2} alt="" />
      </div>
    </div>
  );
};

export default Featured;
