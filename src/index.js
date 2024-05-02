import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import AllProducts from './components/AllProducts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AllProducts />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
