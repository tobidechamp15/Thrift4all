import React from "react";
import aboutImg from "../assets/aboutImg.svg";
import aboutImg2 from "../assets/aboutImg2.svg";

const About = () => {
  return (
    <div className=" aboutUs xsm:h-[1000px]">
      <div className="flex justify-center items-center gap-[43px] xsm:flex-col">
        <div>
          <img src={aboutImg} alt="" />
        </div>
        <div>
          <img src={aboutImg2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
