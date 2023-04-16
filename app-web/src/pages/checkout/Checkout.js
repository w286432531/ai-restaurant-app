import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, Container, Row, Button, Table, Modal } from "react-bootstrap";
import { useUserInfoStore, useCartStore } from "../../store/userReducer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Checkout.scss";
import QuantityControl from "../../components/quantityControl/QuantityControl";
import currencyFormatter from "../../utility/formatter";

const Checkout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [processingOrder, setProcessingOrder] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [displayData, setDisplayData] = useState({
    cartItems: []
  });
  const [OrderSuccess, setOrderSuccess] = useState(false);

  const { cart, setCart, update, cleanCart } = useCartStore((state) => ({
    cart: state.cart,
    setCart: state.setCart,
    update: state.update,
    cleanCart: state.cleanCart,
  }));

  const { isLogin } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
  }));

  const closeModal = () => setShowModal(false);

  const placeOrder = async () => {
    setProcessingOrder(true);
    console.log("in place order", isLogin);
    if (!isLogin) {
      navigate("/login");
    } else {
      await axios.post("/api/loggedInUser/placeOrder", cart).then((res) => {
        console.log("in then", res.data);
        if (res.status === 200) {
          console.log("order success");
          console.log(res.data);
          // cleanCart();
          setOrderSuccess(true);
          return res.data;
        }
      });
    }
  };

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });

  const onClickPlaceOrder = () => {
    orderMutation.mutate();
  };

  const saveOrder = async () => {
    console.log("in save order", isLogin);
    if (!isLogin) {
      navigate("/login");
    } else {
      await axios.post("/api/loggedInUser/saveOrder", cart).then((res) => {
        console.log("in then", res.data);
        if (res.status === 200) {
          console.log("order success");
          console.log(res.data);
          setShowModal(true);
          return res.data;
        }
      });
    }
  };

  const addQuantity = (e, itemOptionId) => {
    let tmpQuantities = structuredClone(quantities);
    tmpQuantities[itemOptionId] = tmpQuantities[itemOptionId] + 1;
    setQuantities(tmpQuantities);
    console.log("set cart now");
    setCart(update(cart, itemOptionId, tmpQuantities[itemOptionId]));
    // let tmpQuantities = [...quantities];
    // tmpQuantities[index][1] = tmpQuantities[index][1] + 1;
    // setQuantities(tmpQuantities);
  };

  const minusQuantity = (e, itemOptionId) => {
    let tmpQuantities = structuredClone(quantities);
    tmpQuantities[itemOptionId] = tmpQuantities[itemOptionId] - 1;

    setQuantities(tmpQuantities);
    console.log("set cart now");
    setCart(update(cart, itemOptionId, tmpQuantities[itemOptionId]));
    console.log();
    // let tmpQuantities = [...quantities];
    // tmpQuantities[index][1] = tmpQuantities[index][1] - 1;
    // setQuantities(tmpQuantities);
  };

  const changeQuantity = (e, itemOptionId) => {
    let quantity = parseInt(e.target.value);
    // let tempCart = structuredClone(cart);
    let tmpQuantities = structuredClone(quantities);
    tmpQuantities[itemOptionId] = quantity;
    setQuantities(tmpQuantities);
    // tempCart.cartItems[itemOptionId].quantity = quantity;
    // setDisplayData(tempCart);
    console.log(parseInt(e.target.value));
    setCart(update(cart, itemOptionId, quantity));

    // let tmpQuantities = [...quantities];
    // tmpQuantities[index][1] = parseInt(e.target.value);
    // setQuantities(tmpQuantities);
  };

  //set up quantities state in initial render
  useEffect(() => {
    let tmpQuantities = {};
    if (Object.keys(cart.cartItems).length > 0) {
      // let tempCart = structuredClone(cart);
      // console.log("in use effect");
      for (let itemOptionId in cart.cartItems) {
        // tempCart.cartItems[itemOptionId].price = currencyFormatter(
        //   tempCart.cartItems[itemOptionId].price
        // );
        tmpQuantities[itemOptionId] = cart.cartItems[itemOptionId].quantity;
      }
      // tempCart.total = currencyFormatter(cart.total);
      // console.log("total", tempCart.total);
      // setDisplayData(tempCart);
      setQuantities(tmpQuantities);
    }
    // setQuantities(arr);
  }, [setCart, cart]);

  // Format price and total every time quantities update
  useEffect(() => {
    if (Object.keys(cart.cartItems).length > 0) {
      let tempCart = structuredClone(cart);
      for (let itemOptionId in tempCart.cartItems) {
        tempCart.cartItems[itemOptionId].price = currencyFormatter(
          tempCart.cartItems[itemOptionId].price
        );
      }
      tempCart.total = currencyFormatter(tempCart.total);
      setDisplayData(tempCart);
    }
  }, [quantities, setQuantities, cart]);

  // console.log(cart.cartItems);
  if (OrderSuccess) {
    return (
      <Container>
        <h1>You have successfully place a order!</h1>
      </Container>
    );
  } else if (processingOrder) {
    <Container>
      <h1>Processing order.....</h1>
    </Container>;
  } else if (cart.updatedAt === undefined) {
    return <p>Loading...</p>;
  } else if (
    (cart && Object.keys(cart.cartItems).length === 0) ||
    Object.keys(displayData.cartItems).length === 0
  ) {
    return (
      <Container>
        <h1>Your cart is empty</h1>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>Checkout</h1>
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Cart is saved!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Table bordered>
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              <th>Quantity X Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(displayData.cartItems).map((itemOptionId, i) => (
              <tr key={itemOptionId}>
                <td>
                  <Link
                    to={`/menu/menu-item/${displayData.cartItems[itemOptionId].itemId}`}
                  >
                    <img
                      className="square-image img-thumbnail"
                      src={displayData.cartItems[itemOptionId].imageUrl}
                      alt=""
                    />
                  </Link>
                </td>
                <td>
                  <p>{displayData.cartItems[itemOptionId].itemName}</p>
                  <p>
                    {displayData.cartItems[itemOptionId].optionName !==
                      "base" && displayData.cartItems[itemOptionId].optionName}
                  </p>
                </td>
                <td>
                  <QuantityControl
                    addQuantity={addQuantity}
                    minusQuantity={minusQuantity}
                    changeQuantity={changeQuantity}
                    quantity={quantities[itemOptionId]}
                    itemOptionId={itemOptionId}
                  />{" "}
                  {currencyFormatter(cart.cartItems[itemOptionId].price)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-end">
          <p>Total:{displayData.total}</p>
          <div>
            <Button variant="primary" onClick={saveOrder}>
              Save order
            </Button>
            <Button variant="primary" onClick={onClickPlaceOrder}>
              Place order
            </Button>
          </div>
          <br />
        </div>
      </Container>
    );
  }
};

export default Checkout;
