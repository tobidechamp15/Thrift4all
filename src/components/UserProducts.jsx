import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, userId } from "./firebase/config";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const UserProducts = () => {
  const [products, setProducts] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = collection(db, "products", userId, "userProducts");
        const data = await getDocs(productRef);
        const filteredProducts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredProducts);
        setProducts(filteredProducts);
        // setBags(products);
      } catch (err) {
        // alert(err);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div>
        <h1 className="text-2xl font-bold">Products Up for sale</h1>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white mt-4 hover:shadow-lg transition-shadow duration-500  hover:scale-105 ease-in-out rounded-lg overflow-hidden productCard shadow-md"
            >
              {product.imageSrc && (
                <img
                  src={product.imageSrc}
                  alt={product.productName}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-gray-600">Price: #{product.price}</p>
                <p className="text-gray-700 mt-2">
                  {product.productDescription}
                </p>
                <a
                  href={product.businessLink}
                  className="text-blue-500 hover:underline mt-4 block"
                >
                  Business Page
                </a>
              </div>
            </div>
          ))}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default UserProducts;
