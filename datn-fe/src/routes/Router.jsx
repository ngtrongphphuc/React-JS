import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE_PATH } from "./route-path";
import ClientLayout from "../layouts/ClientLayout";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ListCategory from "../pages/CategoryManagement/ListCategory";
import AddCategory from "../pages/CategoryManagement/AddCategory";
import { useSelector } from "react-redux";
import EditCategory from "../pages/CategoryManagement/EditCategory";
import ListProduct from "../pages/ProductManagement/ListProduct";
import AddProduct from "../pages/ProductManagement/AddProduct";
import EditProduct from "../pages/ProductManagement/EditProduct";
import CheckoutPage from "../pages/CheckoutPage";
import ThankYouPage from "../pages/Thankyou";

const Router = () => {
  const { isLogged } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      path: ROUTE_PATH.HOME,
      element: <ClientLayout />,
      children: [
        {
          path: ROUTE_PATH.HOME,
          element: <HomePage />,
        },
        {
          path: ROUTE_PATH.PRODUCT_DETAIL(":id"),
          element: <ProductDetail />,
        },
        {
          path: ROUTE_PATH.CART,
          element: <CartPage />,
        },
        {
          path: ROUTE_PATH.CHECKOUT,
          element: <CheckoutPage />,
        },
        {
          path: ROUTE_PATH.THANK_YOU,
          element: <ThankYouPage />,
        },
      ],
    },
    {
      path: ROUTE_PATH.SIGN_IN,
      element: <SignInPage />,
    },
    {
      path: ROUTE_PATH.SIGN_UP,
      element: <SignUpPage />,
    },

    // admin
    {
      path: ROUTE_PATH.DASHBOARD,
      element: <AdminLayout />,
      loader: () => {
        if (!isLogged) {
          window.location.href = ROUTE_PATH.SIGN_IN;
        }

        return null;
      },
      children: [
        {
          path: ROUTE_PATH.DASHBOARD,
          element: <Dashboard />,
        },

        // category
        {
          path: ROUTE_PATH.CATEGORY_MANAGEMENT,
          element: <ListCategory />,
        },
        {
          path: ROUTE_PATH.ADD_CATEGORY,
          element: <AddCategory />,
        },
        {
          path: ROUTE_PATH.EDIT_CATEGORY(":id"),
          element: <EditCategory />,
        },

        // product
        {
          path: ROUTE_PATH.PRODUCT_MANAGEMENT,
          element: <ListProduct />,
        },
        {
          path: ROUTE_PATH.ADD_PRODUCT,
          element: <AddProduct />,
        },
        {
          path: ROUTE_PATH.EDIT_PRODUCT(":id"),
          element: <EditProduct />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
