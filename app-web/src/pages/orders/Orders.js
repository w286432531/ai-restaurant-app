import React, { useEffect, useState } from "react";
import { useUserInfoStore } from "../../store/userReducer";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserOrdersTable from "../../components/userOrdersTable/UserOrdersTable";
import currencyFormatter from "../../utility/formatter";
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
      console.log('in use effect');
      console.log(user.orders);
      let tmpOrders = structuredClone(user.orders);
      // const formatter = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",

      //   // These options are needed to round to whole numbers if that's what you want.
      //   //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //   //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      // });
      console.log("tmpOrders");
      console.log(tmpOrders);
      for (let i = 0; i < tmpOrders.length; i++) {
        let order = tmpOrders[i];
        let tmpDate = new Date(order.orderCreatedAt);
        let day = tmpDate.getDate();
        let month = tmpDate.getMonth();
        let year = tmpDate.getFullYear();
        let dateString = `${month}-${day}-${year}`;
        console.log('using format');
        let tmpTotal = currencyFormatter(order.total);
        console.log(tmpTotal);
        let tmpPaymentAmount = currencyFormatter(order.paymentAmount);
        console.log(tmpPaymentAmount);
        tmpOrders[i].orderCreatedAt = dateString;
        tmpOrders[i].total = tmpTotal;
        tmpOrders[i].paymentAmount = tmpPaymentAmount;
        for (let i = 0; i < order.items.length; i++) {
          order.items[i].itemPrice = currencyFormatter(
            order.items[i].itemPrice
          );
        }
      }
      setOrderData(tmpOrders);
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
