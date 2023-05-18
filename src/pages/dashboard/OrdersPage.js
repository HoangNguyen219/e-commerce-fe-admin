import React, { useEffect } from 'react';
import { OrderList, SearchContainerOrder } from '../../components';
import { useOrdersContext } from '../../context/order_context';

const OrdersPage = () => {
  const { handleChange } = useOrdersContext();
  useEffect(() => {
    handleChange({ name: 'text', value: '' });
  }, []);
  return (
    <>
      <SearchContainerOrder />
      <OrderList />
    </>
  );
};

export default OrdersPage;
