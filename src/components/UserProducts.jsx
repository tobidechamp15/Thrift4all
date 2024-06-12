import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, userId } from "./firebase/config";

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
  }, []); // empty dependency array to ensure the effect runs only once

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.productName}</h3>
            <p>Price: {product.price}</p>
            <p>Description: {product.productDescription}</p>
            <a href={product.businessLink}>Business Page</a>
            {product.imageSrc && (
              <img src={product.imageSrc} alt={product.productName} />
            )}
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default UserProducts;
