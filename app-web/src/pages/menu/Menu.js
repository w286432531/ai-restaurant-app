import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../../components/item/Item";
import "./Menu.scss";

const menuCategory = [
  { CategoryId: 0, Name: "Appetizers" },
  { CategoryId: 1, Name: "Lunch" },
  { CategoryId: 2, Name: "Dinner" },
];

let menuItems = [
  [
    { 
      ItemId: 0, 
      Name: "Egg roll",
    },
    { ItemId: 1, Name: "Chicken wing" },
    { ItemId: 2, Name: "Spring roll" },
  ],
  [
    { ItemId: 3, Name: "Chicken with broccoli" },
    { ItemId: 4, Name: "Pepper Steak" },
    { ItemId: 5, Name: "Chicken Lo mein" },
  ],
  [
    { ItemId: 6, Name: "Sesame Chicken" },
    { ItemId: 7, Name: "General Tso Chicken" },
    { ItemId: 8, Name: "Orange Chicken" },
  ],
];

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

  useEffect(() => {
    // setShowAllCategory(false);
  }, []);

  return (
    <Container>
      <Row>
        <Col sm={3} className="category-box">
          <ul className="nav flex-column ju">
            <li className="nav-item" onClick={() => selectAllCategory()}>
              Show all
            </li>
            {menuCategory.map((x) => (
              <li
                className="nav-item"
                key={x.CategoryId}
                onClick={() => selectCategory(x.CategoryId)}
              >
                {x.Name}
              </li>
            ))}
          </ul>
        </Col>
        <Col sm={9}>
          <Row className="text-center">
            {showAllCategory
              ? menuItems.map((x) =>
                  x.map((item) => (
                    <Col key={item.ItemId} sm={12} md={6} lg={4}>
                      <Item item={item} />
                    </Col>
                  ))
                )
              : menuItems[currentCategoryId].map((item) => (
                  <Col key={item.ItemId} sm={12} md={6} lg={4}>
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
