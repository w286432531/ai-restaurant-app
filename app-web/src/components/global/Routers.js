import React from "react";
import { Routes, Route  } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Menu from "../pages/Menu";
import ErrorPage from "../pages/Error";
import MenuItemDetail from "../pages/MenuItemDetail";

const Routers = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-item/:itemId" element={<MenuItemDetail/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    );
}
export default Routers