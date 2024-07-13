import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, userId } from "./firebase/config";
import Navbar from "./Navbar";

const DeletedProducts = () => {
  const [deletedProducts, setDeletedProducts] = useState([]);

  useEffect(() => {
    const fetchDeletedProducts = async () => {
      try {
        const deletedProductRef = collection(
          db,
          "deletedProducts",
          userId,
          "userDeletedProducts"
        );
        const data = await getDocs(deletedProductRef);
        const fetchedDeletedProducts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDeletedProducts(fetchedDeletedProducts);
      } catch (err) {
        console.error("Error fetching deleted products: ", err);
      }
    };

    fetchDeletedProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div>
        <h1 className="text-2xl font-bold">Deleted Products</h1>
      </div>
      {deletedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {deletedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white mt-4 hover:shadow-lg transition-shadow duration-500 hover:scale-105 ease-in-out rounded-lg overflow-hidden productCard shadow-md"
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
        </div>
      ) : (
        <p className="text-center text-gray-500">No deleted products found.</p>
      )}
    </div>
  );
};

export default DeletedProducts;
