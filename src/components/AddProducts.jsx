import React, { useEffect, useState } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "./firebase/config";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Navbar from "./Navbar";

const AddProducts = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [userName, setUserName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [businessLink, setBusinessLink] = useState("");
  const [message, setMessage] = useState("");
  const [slideOut, setSlideOut] = useState(false);
  const [loading, setLoading] = useState(false);

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
          setUserName(userDoc.data().name);
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  useEffect(() => {
    if (message) {
      setSlideOut(false); // Reset slideOut state before showing message
      const timer = setTimeout(() => {
        setSlideOut(true);
        setMessage(""); // Clear message after sliding out
      }, 3000); // Slide out after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when error changes
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    setLoading(true);

    try {
      // Check for duplicate product
      const q = query(
        collection(db, "products", userId, "userProducts"),
        where("productName", "==", productName),
        where("price", "==", price),
        where("productDescription", "==", productDescription),
        where("businessLink", "==", businessLink)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setMessage("Product with the same values already exists.");
        setLoading(false);
        return;
      }

      const userProductRef = collection(db, "products", userId, "userProducts");
      await addDoc(userProductRef, {
        userName,
        productName,
        price,
        productDescription,
        businessLink,
        imageSrc,
      });
      await combinedProducts();
      setMessage("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
      setMessage("Error adding product.");
    } finally {
      setLoading(false);
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
      console.error("Error adding combined product: ", err);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col container py-4 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 text-white bg-green-500 rounded-lg shadow-lg transition-transform ${
            slideOut ? "transform translate-x-full" : ""
          }`}
        >
          {message}
        </div>
      )}
      <Navbar />
      <div>
        <span className="text-2xl font-[Pacifico] text-green-500 font-medium">
          Add Products
        </span>
      </div>
      <form
        className="w-[100%] xsm:w-full py-4 flex flex-col gap-7 items-center"
        onSubmit={handleSubmit}
      >
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full font-bold"
            placeholder=" "
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
            placeholder=" "
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
            placeholder=" "
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="name">Price</label>
        </div>
        <div
          className="border-dashed border-2 w-fit p-4 border-[#bdbdbd] flex flex-col cursor-pointer"
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
            placeholder=" "
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
            placeholder=" "
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
