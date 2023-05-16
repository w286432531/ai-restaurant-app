import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import AboutUs from "../pages/aboutUs/AboutUs";
import Menu from "../pages/menu/Menu";
import ErrorPage from "../pages/error/Error";
import MenuItemDetail from "../components/menuItemDetail/MenuItemDetail";
import ListCategoryItems from "../components/listCategoryItems/ListCategoryItems";
import Auth from "../pages/auth/Auth";
import Checkout from "../pages/checkout/Checkout";
import Orders from "../pages/orders/Orders";
import AdminHome from "../pages/adminPages/adminHome/AdminHome";
import ModifyMenu from "../pages/adminPages/modifyMenu/ModifyMenu";
import Sales from "../pages/adminPages/sales/Sales";
import useUserLoggedIn from "../hooks/useIsUserLoggedIn";

const Routers = () => {
  const isLoggedIn = useUserLoggedIn();
  if (isLoggedIn.loading) {
    return <div>Loading.....</div>;
  }
  return isLoggedIn.userRole > 1 ? (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/edit-menu" element={<ModifyMenu />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/menu/*" element={<Menu />}>
        <Route path="menu-item/:itemId" element={<MenuItemDetail />} />
        <Route path="category/:categoryId" element={<ListCategoryItems />} />
      </Route>
      <Route path="/login" element={<Auth page="login" />} />
      <Route path="/register" element={<Auth page="register" />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
