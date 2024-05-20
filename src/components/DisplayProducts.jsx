import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";

const DisplayProducts = () => {
  const [bags, setBags] = useState([]);

  // Call the async function to initiate data fetching
  const product = collection(db, "product");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(product);
        const filteredProducts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(filteredProducts);
        filteredProducts.map((products) => {
          console.log(products.bags);
          setBags(products.bags);
        });
      } catch (err) {
        alert(err);
        console.error(err);
      }
    };

    fetchData();
  }, [bags]); // empty dependency array to ensure the effect runs only once

  return (
    <>
      <div className="font-normal text-[32px] font-[Pacifico] mx-[120px] my-[50px] ">
        New Arrivals
      </div>
      <div className="flex mx-[120px] gap-4 movies flex-wrap justify-center items-start">
        {bags.map((bag, i) => (
          <div
            key={i}
            className="flex flex-col productContainer border-1 border-[rgba(179, 20, 48, 1)] p-2  "
          >
            <div className="imageContainer">
              <img
                src={bag.image}
                className="w-full rounded-[12px] h-full bg-slate-300"
              />
            </div>
            <span className="flex m-2 w-[250px]">{bag.name}</span>
            <span className="flex m-2 font-bold">${bag.price}</span>
            <div className="cursor-pointer flex items-center justify-center font-bold text-green-400">
              View Products
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayProducts;
