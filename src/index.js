import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import { ProductProvider } from "./components/ProductContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddProducts from "./components/AddProducts";
import UserProducts from "./components/UserProducts";
import Landing from "./components/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/products",
    element: <AllProducts />,
  },
  {
    path: "/productDetails",
    element: <ProductDetail />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/addproducts",
    element: <AddProducts />,
  },
  {
    path: "/user-products",
    element: <UserProducts />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductProvider>
    <RouterProvider router={router} />
  </ProductProvider>
);
