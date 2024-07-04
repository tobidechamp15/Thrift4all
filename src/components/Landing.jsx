import React from "react";
import LandingNav from "./LandingNav";
import Hero from "./Hero";
import About from "./About";
import Featured from "./Featured";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div>
      <div className=" pt-[72px] bg-img ">
        <div className="container">
          <LandingNav />
          <Hero />
        </div>
      </div>
      <div className="container">
        <About />
      </div>
      <Featured />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Landing;
