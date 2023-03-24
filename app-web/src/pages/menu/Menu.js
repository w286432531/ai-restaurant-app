import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../../components/item/Item";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./Menu.scss";
import useMenuStore from "../../store/menuReducer";

const Menu = () => {
  const [showAllCategory, setShowAllCategory] = useState(true);
  const [currentCategoryId, setCurrentCategoryId] = useState([]);

  const selectCategory = (categoryId) => {
    setShowAllCategory(false);
    setCurrentCategoryId(categoryId);
  };

  const selectAllCategory = () => {
    setShowAllCategory(true);
  };

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["WholeMenu"],
    () => axios.get("/api/category/").then((res) => res.data)
    
  );
  //use react-loading-skeleton
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  let allItems = [];
  for (let d of data) {
    allItems.push(d.items);
    // console.log(d.items);
  }
  let categoryItems = []
  if (!showAllCategory){
    categoryItems = allItems.filter(
      (category) => category[0].categoryId === currentCategoryId
    );
    console.log(categoryItems);
  } 

  return (
    <Container>
      <Row>
        <Col sm={3} className="category-box">
          <ul className="nav flex-column ju">
            <li className="nav-item" onClick={() => selectAllCategory()}>
              Show all
            </li>
            {data.map((category) => (
              <li
                className="nav-item"
                key={category.id}
                onClick={() => selectCategory(category.id)}
              >
                {category.categoryName}
              </li>
            ))}
          </ul>
        </Col>
        <Col sm={9}>
          <Row className="text-center">
            {showAllCategory
              ? allItems.map((items) =>
                  items.map((item) => (
                    <Col key={item.id} sm={12} md={6} lg={4}>
                      <Item item={item} />
                    </Col>
                  ))
                )
              : categoryItems[0].map((item) => (
                  <Col key={item.id} sm={12} md={6} lg={4}>
                    <Item item={item} />
                  </Col>
                ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
