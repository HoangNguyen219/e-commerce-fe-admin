import React, { useEffect } from 'react';
import { OrderList, SearchContainerOrder } from '../../components';
import { useOrdersContext } from '../../context/order_context';

const OrdersPage = () => {
  const { clearFilters } = useOrdersContext();
  useEffect(() => {
    clearFilters();
  }, []);
  return (
    <>
      <SearchContainerOrder />
      <OrderList />
    </>
  );
};

export default OrdersPage;
