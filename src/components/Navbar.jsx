import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => (
  <div className="flex justify-between m-2 my-4">
    <span />
    <div className="logoStyle">Thrift4all</div>
    <span />
    <FontAwesomeIcon icon={faBars} size="2x" className="mx-[39px]" />
  </div>
);

export default Navbar;
