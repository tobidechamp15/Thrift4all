import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { ProductContext } from "./ProductContext";

const DisplayProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { setSelectedProduct } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = collection(db, "product");
        const data = await getDocs(productRef);
        const filteredProducts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(filteredProducts);
        setLoading(false); // Update loading state after data fetch
      } catch (err) {
        console.error(err);
        setLoading(false); // Handle loading state in case of error
      }
    };

    fetchData();
  }, []);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    navigate("/productDetails");
  };

  return (
    <div className="mx-4 md:mx-12 my-8">
      <div className="text-2xl font-bold mb-6">New Arrivals</div>

      {loading ? ( // Conditional rendering based on loading state
        <div className="flex items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => handleViewProduct(product)}
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.productName}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <div className="font-bold text-lg mb-2">
                  {product.productName}
                </div>
                <div className="text-gray-700 mb-2">
                  Price: #{product.price}
                </div>
                <button
                  onClick={() => handleViewProduct(product)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded focus:outline-none text-sm"
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayProducts;
