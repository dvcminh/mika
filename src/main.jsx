import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './pages/home/Home.jsx';
import SingleProduct from './pages/SingleProduct.jsx';
import ProductList from './pages/ProductList.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import ManageCustomerPage from './pages/Admin/ManageCustomer/ManageCustomer.jsx';
import SearchResult from './pages/SearchResult.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/category/:categoryName",
        element: <ProductList />,
      },
      {
        path: "/category/:categoryName/:subcategoryName",
        element: <ProductList />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/search",
        element: <SearchResult />
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/managecustomer",
            element: <ManageCustomerPage />
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

)
