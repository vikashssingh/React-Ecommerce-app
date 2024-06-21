import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products/Products";
import OrderPage from "./Components/Orders/OrderPage";
import CartPage from "./Components/Cart/CartPage";
import SignIn from "./Components/Forms/SingIn";
import SignUp from "./Components/Forms/SingUp";
import { AuthProvider } from "./Contexts/AuthContext";
import { CartProvider } from "./Contexts/CartContext";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import './tostify.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main App component
export default function App() {
  // Setting up router for navigation
  const router = createBrowserRouter([
    {
      // Home route with Navbar
      path: "/",
      element: <Navbar />,
      // Show ErrorPage on errors
      errorElement: <ErrorPage />,
      // Nested routes within the home route
      children: [
        // Main page showing Products
        { index: true, element: <Products /> },
        // SignIn page
        { path: "signin", element: <SignIn /> },
        // SignUp page
        { path: "/signup", element: <SignUp /> },
        // User's orders page
        { path: "users/:uid/orders", element: <OrderPage /> },
        // User's shopping cart page
        { path: "users/:uid/myCart", element: <CartPage /> },
      ],
    },
  ]);

  // Wrapping the app with authentication and cart providers
  return (
    <>
      {/* Authenticate users */}
      <AuthProvider>
        {/* Manage shopping cart state */}
        <CartProvider>
          {/* Use the router */}
          <RouterProvider router={router} />
          {/* Notification container for toasts */}
          <ToastContainer /> 
        </CartProvider>
      </AuthProvider>
    </>
  );
}
