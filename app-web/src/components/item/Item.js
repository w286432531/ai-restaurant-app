import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./item.scss";
const Item = ({ item }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/menu/menu-item/${item.id}`}>
        {item.imageUrl !== ''&&<Card.Img
          src={item.imageUrl}
          variant="top"
          className="square-image img-fluid"
        />}
      </Link>

      <Card.Body>
        <Link to={`/menu/menu-item/${item.id}`}>
          <Card.Title as="div">
            <strong>{item.itemName}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as="h3">${item.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Item;
