import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAllItemStore } from "../../store/menuReducer";
import ItemOption from "../itemOption/ItemOption";
import { Row, Col } from "react-bootstrap";
import "./MenuItemDetail.scss";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import { useCartStore } from "../../store/userReducer";
const MenuItemDetail = () => {
  const allItems = useAllItemStore((state) => state.allItems);
  const [item, setItem] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [singleOption, setSingleOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { cart, setCart, modifyCart } = useCartStore((state) => ({
    cart: state.cart,
    setCart: state.setCart,
    modifyCart: state.modifyCart,
  }));
  // const item = allItems.filter((item) => item.id === parseInt(params.itemId))[0];
  // const ingredients = item.ingredients.map((ingredient) => ingredient.ingredient.ingredientName);
  // const singleOption = item.options.length === 1;
  // console.log("is single option", singleOption);
  // console.log(ingredients);
  // console.log(item);
  const selectOption = (e) => {
    const optionId = parseInt(e.target.value);
    console.log(optionId);
    setSelectedOption(optionId);
    let price = item.options.filter((option) => optionId === option.id)[0]
      .price;
    setSelectedOptionPrice(price);
  };
  const addQuantity = () => {
    setQuantity(quantity + 1);
  };
  const minusQuantity = () => {
    let newQuantity = quantity - 1 > 0 ? quantity - 1 : 1;
    setQuantity(newQuantity);
  };
  const changeQuantity = (e) => {
    let newQuantity = e.target.value > 0 ? e.target.value : 1;
    setQuantity(newQuantity);
  };
  const addToCart = () => {
    let optionId = selectedOption === null ? item.options[0].id: selectedOption;
    let price = selectedOptionPrice === null? item.options[0].price:selectedOptionPrice;
    // console.log(
    //   optionId,
    //   quantity,
    //   item.itemName,
    //   price,
    //   cart
    // );
    setCart(
      modifyCart(
        optionId,
        quantity,
        item.itemName,
        price,
        cart
      )
    );
  };
  useEffect(() => {
    setItem(allItems.filter((item) => item.id === parseInt(params.itemId))[0]);
  }, [params, allItems]);
  useEffect(() => {
    if (item) {
      console.log(item);
      setIngredients(
        item.ingredients.map(
          (ingredient) => ingredient.ingredient.ingredientName
        )
      );

      setSingleOption(item.options.length === 1);
      //TODO need to fix this so when the page rerender it doesn't reset
    }
  }, [setItem, item]);
  if (item === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1 className="text-capitalize">{item.itemName}</h1>
        <p>{item.description}</p>
        <p></p>
        <ul className="item-list" onChange={selectOption}>
          {item.options.map((option, index) => (
            <li key={index} className="list-item">
              <ItemOption
                option={option}
                singleOption={singleOption}
                index={index}
              />
            </li>
          ))}
        </ul>
        <Row>
          <Col className="input-group quantity-input-group">
            <span
              className="input-group-text btn btn-secondary"
              onClick={minusQuantity}
            >
              <MinusIcon />
            </span>
            <input
              id="quantity-input"
              type="number"
              name="quantity"
              className="input-number"
              value={quantity}
              min="1"
              max="10"
              onChange={changeQuantity}
            />
            <span
              className="input-group-text btn btn-secondary"
              onClick={addQuantity}
            >
              <PlusIcon />
            </span>
          </Col>
          <Col>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </Col>
        </Row>
        <p>Ingredients: {ingredients.join(",")}</p>
        <img
          src={item.imageUrl}
          alt={item.itemName}
          className="item-image image-fluid"
        />
      </>
    );
  }
};
export default MenuItemDetail;
