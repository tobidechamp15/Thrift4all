import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import FilterOptions from "./FilterOptions";
import DisplayProducts from "./DisplayProducts";

const AllProducts = () => (
  <div className="m-3 ">
    <Navbar />
    <Search />
    <FilterOptions />
    <DisplayProducts />
  </div>
);

export default AllProducts;
