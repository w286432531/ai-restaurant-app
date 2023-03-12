import React from "react";
import { Routes, Route  } from "react-router-dom";
import Home from "../home/Home";
import AboutUs from "../aboutUs/AboutUs";
import Menu from "../menu/Menu";
import ErrorPage from "../error/Error";
import MenuItemDetail from "../menuItemDetail/MenuItemDetail";

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