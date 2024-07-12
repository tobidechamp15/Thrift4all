import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
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
        setProducts(filteredProducts);
        // setBags(products);
      } catch (err) {
        // alert(err);
        console.error(err);
      }
    };

    fetchData();
  }, [products]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const moveToDeletedProducts = async (product) => {
    try {
      const deletedProductDoc = doc(
        db,
        "deletedProducts",
        userId,
        "userDeletedProducts",
        product.id
      );
      await setDoc(deletedProductDoc, product);
    } catch (err) {
      console.error("Error moving product to deletedProducts:", err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const productDoc = doc(db, "products", userId, "userProducts", productId);
      const deletedProduct = products.find(
        (product) => product.id === productId
      );
      await moveToDeletedProducts(deletedProduct);
      await deleteDoc(productDoc);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
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
                <div className="flex justify-between ">
                  <a
                    href={product.businessLink}
                    className="text-blue-500 hover:underline mt-4 block"
                  >
                    Business Page
                  </a>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700 mt-4"
                  >
                    Delete
                  </button>
                </div>
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
