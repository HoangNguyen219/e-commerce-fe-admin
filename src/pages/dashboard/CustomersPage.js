import React, { useEffect } from 'react';
import { CustomerList, SearchContainerCustomer } from '../../components';
import { useOrdersContext } from '../../context/order_context';

const CustomersPage = () => {
  const { clearFilters } = useOrdersContext();
  useEffect(() => {
    clearFilters();
  }, []);
  return (
    <>
      <SearchContainerCustomer />
      <CustomerList />
    </>
  );
};

export default CustomersPage;
