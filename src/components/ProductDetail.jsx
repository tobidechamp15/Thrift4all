import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

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
        <Navbar />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
