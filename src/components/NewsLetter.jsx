import React from "react";
import subscribe from "../assets/subscribe.svg";

const NewsLetter = () => {
  return (
    <div className="flex items-center flex-col justify-center gap-6 py-[60px]">
      <span className="font-bold text-center xsm:text-[30px] text-[40px] leading-10">
        Get updates on promotions
      </span>
      <span className="font-normal text-center text-[16px] leading-6">
        Subscribe to our Newsletter
      </span>
      <div className="inputGroups flex items-center justify-center">
        <input
          placeholder=" " // Use a space as a placeholder to trigger the label animation
        />
        <label htmlFor="name">Email</label>
      </div>
      <img src={subscribe} alt="" />
    </div>
  );
};

export default NewsLetter;
