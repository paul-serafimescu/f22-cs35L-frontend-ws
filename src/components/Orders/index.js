import React, { Fragment } from 'react';

function Orders(props) {
  return (
    <Fragment>
      <h3>Your order ids: </h3>
      {props.orders.map((order, index) => (
        <p key={index}>{order.orderId}</p>
      ))}
    </Fragment>
  );
}

export default Orders;
