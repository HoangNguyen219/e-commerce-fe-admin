import React, { useEffect } from 'react';
import { CustomerList, SearchContainerCustomer } from '../../components';
import { useOrdersContext } from '../../context/order_context';

const CustomersPage = () => {
  const { clearFilters } = useOrdersContext();
  useEffect(() => {
    setTimeout(() => {
      clearFilters();
    }, 100);
  }, []);
  return (
    <>
      <SearchContainerCustomer />
      <CustomerList />
    </>
  );
};

export default CustomersPage;
