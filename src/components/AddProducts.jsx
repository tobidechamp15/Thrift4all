import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "./firebase/config";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

const AddProducts = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [userName, setUserName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [businessLink, setBusinessLink] = useState("");

  const userId = localStorage.getItem("userId");

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          console.log(userDoc.data().name);
          setUserName(userDoc.data().name);
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  //   const getUserInfo = () => {
  //     if (userId) {
  //       const userProductRef = collection(db, "products", userId, "userProducts"); // Reference to a sub-collection under the user's document

  //       const userProductData = {
  //         userName,
  //         productName,
  //         price,
  //         productDescription,
  //         businessLink,
  //         imageSrc,
  //         // Add other user-specific data as needed
  //       };
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    try {
      const userProductRef = collection(db, "products", userId, "userProducts");
      await addDoc(userProductRef, {
        userName,
        productName,
        price,
        productDescription,
        businessLink,
        imageSrc,
      });
      combinedProducts();
      setPrice("");
      setBusinessLink("");
      setImageSrc("");
      setProductDescription("");
      setProductName("");
      setUserName(userName);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Error adding product.");
    }
  };

  const combinedProducts = async () => {
    try {
      const userCombinedProductsRef = collection(db, "product");
      await addDoc(userCombinedProductsRef, {
        userName,
        productName,
        price,
        productDescription,
        businessLink,
        imageSrc,
        userId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col container py-4">
      <Link to="/" className="w-full items-start logoStyle hidden md:flex">
        Thrift4all
      </Link>
      <Link to="/" className="flex md:hidden  w-full justify-end">
        Home
      </Link>
      <div>
        <span className=" text-2xl font-[Pacifico] text-green-500 font-medium">
          Add Products
        </span>
      </div>
      <form
        className="w-[60%] xsm:w-full py-4 flex flex-col gap-7 items-center"
        onSubmit={handleSubmit}
      >
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full font-bold"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={userName}
            disabled
          />
          <label htmlFor="name">Username</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label htmlFor="name">Product Name</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="number"
            required
            autoComplete="off"
            className="w-full no-spin"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="name">Price</label>
        </div>
        <div
          className=" border-dashed border-2 w-fit p-4 border-[#bdbdbd] flex flex-col cursor-pointer"
          onClick={handleImageClick}
        >
          {imageSrc ? (
            <img src={imageSrc} alt="Selected" className="max-w-full h-auto" />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faImage}
                className="text-[160px] text-black"
              />
              <span>Drag and Drop or Choose File here</span>
            </>
          )}
          <input
            type="file"
            required
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="inputGroup flex items-center justify-center">
          <textarea
            type="text"
            required
            autoComplete="off"
            className="w-full"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder=" " // Use a space as a placeholder to trigger the label animation
          />
          <label htmlFor="name">Product Description</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full"
            value={businessLink}
            onChange={(e) => setBusinessLink(e.target.value)}
            placeholder=" " // Use a space as a placeholder to trigger the label animation
          />
          <label htmlFor="name">Link to Business Page</label>
        </div>
        <button type="submit" className="btn btn-outline-dark">
          Add Products
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
