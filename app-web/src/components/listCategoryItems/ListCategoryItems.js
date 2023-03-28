import React from "react";
import { Col } from "react-bootstrap";
import Item from "../item/Item";
import { useParams } from "react-router";
import { useAllItemStore } from "../../store/menuReducer";
const ListCategoryItems = () => {
  const allItems = useAllItemStore((state) => state.allItems);
  let params = useParams();
  let items = params.categoryId
    ? allItems.filter((item) => item.categoryId === parseInt(params.categoryId))
    : allItems;
  console.log(items);
  if (!items) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {items.map((item) => (
        <Col key={item.id} sm={12} md={6} lg={4}>
          <Item item={item} />
        </Col>
      ))}
    </>
  );
};

export default ListCategoryItems;
