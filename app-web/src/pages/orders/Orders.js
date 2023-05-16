import React, { useEffect, useState } from "react";
import { useUserInfoStore } from "../../store/userReducer";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserOrdersTable from "../../components/userOrdersTable/UserOrdersTable";
import parseOrdersData from "../../utility/parseOrdersData";
const Orders = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const { isLogin, user } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
  }));
  console.log(user);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate, isLogin]);

  useEffect(() => {
    if (user && user.orders.length > 0) {
      const orders = parseOrdersData(user.orders);
      setOrderData(orders);
    }
  }, [user, user?.orders]);

  if (!user) {
    return <p>Loading...</p>;
  } else if (user.orders.length === 0) {
    return (
      <Container>
        <h1>No previous orders.</h1>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>orders</h1>
        <UserOrdersTable data={orderData} />
      </Container>
    );
  }
};

export default Orders;
