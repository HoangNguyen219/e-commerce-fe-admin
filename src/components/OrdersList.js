import React, { useEffect } from 'react';
import { useUserContext } from '../context/user_context';
import { useOrdersContext } from '../context/order_context';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Order from './Order';

const OrderList = () => {
  const { isLoading, isError } = useUserContext();
  const {
    getOrders,
    orders: { orders },
    page,
    sort,
    total,
    processStatus,
    paymentMethod,
    paymentStatus,
    customer,
  } = useOrdersContext();

  useEffect(() => {
    getOrders();
  }, [
    page,
    sort,
    total,
    processStatus,
    paymentMethod,
    paymentStatus,
    customer,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h4 style={{ textTransform: 'none' }}>There was an error...</h4>;
  }

  if (orders.length < 1) {
    return <h4 style={{ textTransform: 'none' }}>No orders to display...</h4>;
  }
  return (
    <>
      <h5 className="inline">
        {orders.length} order
        {orders.length > 1 && 's'} found
      </h5>
      <Order orders={orders} />
    </>
  );
};

export default OrderList;
