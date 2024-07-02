import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db, userId } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { ProductContext } from "./ProductContext";
import { useState } from "react";

const DisplayProducts = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { setSelectedProduct } = useContext(ProductContext);
  // Call the async function to initiate data fetching
  // const product = collection(db, "product");

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
        setProduct(filteredProducts);
      } catch (err) {
        // alert(err);
        console.error(err);
      }
    };

    fetchData();
  }, []); // empty dependency array to ensure the effect runs only once

  const handleViewProduct = (bag) => {
    setSelectedProduct(bag);
    navigate("/productDetails");
  };
  // handleViewProduct();

  return (
    <>
      <div className="font-normal text-[32px] font-[Pacifico] md:mx-[120px] my-[50px] ">
        New Arrivals
      </div>
      <div className="flex md:mx-[120px] gap-4 movies xsm:flex-row md:flex-wrap  xsm:items-start overflow-x-scroll mdw-">
        {product.map((bag, i) => (
          <div
            key={i}
            className="flex flex-col productContainer border-1 border-[rgba(179, 20, 48, 1)] p-2  productContainer cursor-pointer w-[250px]"
            onClick={() => handleViewProduct(bag)}
          >
            <div className="imageContainer">
              <img
                src={bag.imageSrc}
                className="w-full rounded-[12px] h-full bg-slate-300"
              />
            </div>
            <span className="flex p-2 w-[250px] text-ellipsis whitespace-nowrap overflow-hidden ">
              {bag.productName}
            </span>
            <span className="flex m-2 font-bold">#{bag.price}</span>
            <button
              onClick={() => handleViewProduct(bag)}
              className="cursor-pointer flex items-center justify-center font-bold text-green-400"
            >
              View Products
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayProducts;
