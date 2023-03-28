import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./Menu.scss";
import { useMenuStore } from "../../store/menuReducer";
import MenuItemDetail from "../../components/menuItemDetail/MenuItemDetail";
import ListCategoryItems from "../../components/listCategoryItems/ListCategoryItems";
const Menu = () => {
  const menu = useMenuStore((state) => state.menu);
  //use react-loading-skeleton
  return (
    <Container>
      <Row>
        <Col sm={3} className="category-box">
          <ul className="nav flex-column ju">
            <li className="nav-item">
              <NavLink to="" className="nav-link">
                Show all
              </NavLink>
            </li>
            {menu.map((category) => (
              <li className="nav-item" key={category.id}>
                <NavLink to={`category/${category.id}`} className="nav-link">
                  {category.categoryName}
                </NavLink>
              </li>
            ))}
          </ul>
        </Col>
        <Col sm={9}>
          <Row className="text-center">
            <Routes>
              <Route path="" element={<ListCategoryItems />} />
              <Route
                path="category/:categoryId"
                element={<ListCategoryItems />}
              />
              <Route path="menu-item/:itemId" element={<MenuItemDetail />} />
            </Routes>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
