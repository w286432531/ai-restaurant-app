import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/home/Home";
import AboutUs from "../src/pages/aboutUs/AboutUs";
import Menu from "../src/pages/menu/Menu";
import ErrorPage from "../src/pages/error/Error";
import MenuItemDetail from "../src/components/menuItemDetail/MenuItemDetail";
import ListCategoryItems from "../src/components/listCategoryItems/ListCategoryItems";
import Auth from "../src/pages/auth/Auth";
import Checkout from "../src/pages/checkout/Checkout";
import Orders from "../src/pages/orders/Orders";
import AdminHome from "../src/pages/adminHome/AdminHome";
import ModifyMenu from "../src/pages/modifyMenu/ModifyMenu";
import Sales from "../src/pages/adminPages/sales/Sales";
import useUserLoggedIn from "../src/hooks/useIsUserLoggedIn";

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
