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
  const [showModal, setShowModal] = useState(false);

  const { cart, update, cleanCart } = useCartStore((state) => ({
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
    console.log("in place order", isLogin);
    if (!isLogin) {
      navigate("/login");
    } else {
      return await axios.post("/api/loggedInUser/placeOrder", cart).then((res) => {
        console.log("in then", res.data);
        if (res.status === 200) {
          console.log("order success");
          console.log(res.data);
          // cleanCart();
          return res.data;
        }
      });
    }
  };

  const { data, isSuccess, isLoading, isError, mutate: placeOrderMutation} = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });

  const onClickPlaceOrder = () => {
    placeOrderMutation();
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

  const addQuantity = (e, itemOptionId) => update(cart, itemOptionId, cart.cartItems[itemOptionId].quantity + 1);

  const minusQuantity = (e, itemOptionId) => update(cart, itemOptionId, cart.cartItems[itemOptionId].quantity - 1);

  const changeQuantity = (e, itemOptionId) => update(cart, itemOptionId, parseInt(e.target.value));

  if (isLoading) {
    <Container>
      <h1>Processing order.....</h1>
    </Container>;
  }
  
  if (isError) {
    return <p>Placing order failed.</p>
  }

  if (isSuccess && data) {
    return (
      <Container>
        <h1>You have successfully place a order!</h1>
        {
          Object.keys(data).map(orderData => 
            <p><b>{orderData}:</b> {data[orderData]}</p>
          )
        }
      </Container>
    );
  }

  if (
    cart && Object.keys(cart.cartItems).length === 0
  ) {
    return (
      <Container>
        <h1>Your cart is empty</h1>
      </Container>
    );
  }

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
          {Object.keys(cart.cartItems).map((itemOptionId, i) => (
            <tr key={itemOptionId}>
              <td>
                <Link
                  to={`/menu/menu-item/${cart.cartItems[itemOptionId].itemId}`}
                >
                  <img
                    className="square-image img-thumbnail"
                    src={cart.cartItems[itemOptionId].imageUrl}
                    alt=""
                  />
                </Link>
              </td>
              <td>
                <p>{cart.cartItems[itemOptionId].itemName}</p>
                <p>
                  {cart.cartItems[itemOptionId].optionName !== "base" &&
                    cart.cartItems[itemOptionId].optionName}
                </p>
              </td>
              <td>
                <QuantityControl
                  addQuantity={addQuantity}
                  minusQuantity={minusQuantity}
                  changeQuantity={changeQuantity}
                  quantity={cart.cartItems[itemOptionId].quantity}
                  itemOptionId={itemOptionId}
                />{" "}
                {currencyFormatter(cart.cartItems[itemOptionId].price)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        <p>Total:{currencyFormatter(cart.total)}</p>
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
};

export default Checkout;
