import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import { ProductProvider } from "./components/ProductContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllProducts />,
  },
  {
    path: "/productDetails",
    element: <ProductDetail />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductProvider>
    <RouterProvider router={router} />
  </ProductProvider>
);
