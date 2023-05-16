import currencyFormatter from "./formatter";
const parseOrdersData = (orders) => {
  let tmpOrders = structuredClone(orders);
  for (let i = 0; i < tmpOrders.length; i++) {
    let order = tmpOrders[i];
    let tmpDate = new Date(order.orderCreatedAt);
    let day = tmpDate.getDate();
    let month = tmpDate.getMonth()+1;
    let year = tmpDate.getFullYear();
    let dateString = `${month}-${day}-${year}`;
    let tmpTotal = currencyFormatter(order.total);
    let tmpPaymentAmount = currencyFormatter(order.paymentAmount);
    tmpOrders[i].orderCreatedAt = dateString;
    tmpOrders[i].total = tmpTotal;
    tmpOrders[i].paymentAmount = tmpPaymentAmount;
    for (let i = 0; i < order.items.length; i++) {
      order.items[i].itemPrice = currencyFormatter(order.items[i].itemPrice);
    }
  }
  return tmpOrders;
};

export default parseOrdersData;
