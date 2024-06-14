import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import backIcon from "../assets/backIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const ProductDetail = () => {
  const { selectedProduct } = useContext(ProductContext);
  if (!selectedProduct) {
    return <Navigate to="/" />;
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img src={backIcon} className="h-8 w-8" alt="Back" />
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/" className="nav-item">
                  Home
                </Link>
                <Link to="/user-products" className="nav-item">
                  Products
                </Link>
                <Link to="/addproducts" className="nav-item">
                  Add Products
                </Link>
                <span className="nav-item">Contact</span>
                <Link to="/" className="logout-btn">
                  LOGOUT
                </Link>
              </div>
              <div className="md:hidden flex items-center">
                <FontAwesomeIcon
                  icon={faBars}
                  size="lg"
                  className="text-gray-500"
                  onClick={toggleSidebar}
                />
              </div>
            </div>
          </div>
        </nav>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* Product Details */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-semibold text-center mb-8 font-[Pacifico]">
            Product Details
          </h1>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <img
                src={selectedProduct.imageSrc}
                alt={selectedProduct.productName}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedProduct.productName}
              </h2>
              <p className="text-2xl font-semibold text-indigo-600 mb-4">
                #{selectedProduct.price}
              </p>
              <p className="text-gray-700 text-lg mb-4">
                {selectedProduct.productDescription}
              </p>
              <p className="text-gray-600">
                Brand:
                <span className="font-bold">{selectedProduct.userName}</span>
              </p>
              <a
                href={selectedProduct.businessLink}
                className="text-blue-500 hover:underline mt-4 block"
              >
                Connect with Seller
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
