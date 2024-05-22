import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import backIcon from "../assets/backIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {
  const { selectedProduct } = useContext(ProductContext);
  if (!selectedProduct) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex justify-around m-2 my-4 w-full ">
        <Link to="/">
          <img src={backIcon} className="w-[38px] cursor-pointer" />
        </Link>
        <div className="hidden md:flex gap-7 items-center justify-between w-[40%] my-2">
          <div className="md:flex gap-4 hidden">
            <span className="nav-items">Home</span>
            <span className="nav-items">Products</span>
            <span className="nav-items">Add Products</span>
            <span className="nav-items">Contact</span>
          </div>
          <div className="logout-btn">LOGOUT</div>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          className="mx-[39px] block md:hidden"
        />
      </div>
      <div className="flex container flex-col justify-center items-center w-full">
        <div className="flex justify-around  items-center  w-[50%] p-2 ">
          <h2 className=" text-2xl  font-normal font-[Pacifico]  text-center">
            Product Details
          </h2>
          <span></span>
        </div>
        <div className="product-details">
          <div className="imageContainer">
            <img
              src={selectedProduct.image}
              className="w-full rounded-[12px] h-full bg-slate-300"
            />
          </div>
          <h4 className="text-4xl">{selectedProduct.name}</h4>

          <p className="text-2xl">Price: ${selectedProduct.price}</p>
          <p className="text-lg">{selectedProduct.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;