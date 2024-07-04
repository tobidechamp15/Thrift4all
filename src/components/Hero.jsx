import React from "react";
import shopNow from "../assets/shopNow.svg";
import socials from "../assets/socials.svg";

const Hero = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-[168px] gap-2">
      <div className="flex gap-1">
        <span className="text-[64px] font-bold leading-6 text-white xsm:text-[40px]">
          Welcome to
        </span>
        <span className="logoStyles text-[64px] leading-6 xsm:text-[40px]">
          Thrift4all
        </span>
      </div>
      <span className=" font-bold text-[32px] leading-10 text-center max-w-[514px] mt-[54px] text-white  ">
        Your Ultimate Destination for Thrift Shopping Online!
      </span>
      <img src={shopNow} className="my-8 cursor-pointer" />
      <div className="flex w-fit my-4 justify-end self-end flex-col gap-3">
        <span className="font-[Pacifico] font-normal text-2xl leading-6 text-[#900000] w-fit">
          Follow Us:
        </span>
        <img src={socials} className="w-[200px] " />
      </div>
    </div>
  );
};

export default Hero;
