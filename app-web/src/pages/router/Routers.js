import React from "react";
import { Routes, Route  } from "react-router-dom";
import Home from "../home/Home";
import AboutUs from "../aboutUs/AboutUs";
import Menu from "../menu/Menu";
import ErrorPage from "../error/Error";
import MenuItemDetail from "../../components/menuItemDetail/MenuItemDetail";
import ListCategoryItems from "../../components/listCategoryItems/ListCategoryItems";
import UserForm from "../userForm/UserForm";
const Routers = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/menu/*" element={<Menu />}>
          <Route path="menu-item/:itemId" element={<MenuItemDetail />} />
          <Route path="category/:categoryId" element={<ListCategoryItems />} />
        </Route>
        <Route path="/login" element={<UserForm page ='login' />} />
        <Route path="/register" element={<UserForm page ='register' />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
}

export default Routers