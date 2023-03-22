import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Item = ({ item }) => {
  return (
    <Card className="my-3 p-3 rounded">
      {/* <Link to={`/item/${item._id}`}>
        <Card.Img src={item.image} variant="top" />
      </Link> */}

      <Card.Body>
        <Link to={`/item/${item.ItemId}`}>
          <Card.Title as="div">
            <strong>{item.Name}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as="h3">${item.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Item;