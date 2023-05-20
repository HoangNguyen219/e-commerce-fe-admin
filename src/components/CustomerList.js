import React, { useEffect } from 'react';
import { useUserContext } from '../context/user_context';
import { useOrdersContext } from '../context/order_context';
import Loading from './Loading';
import Customer from './Customer';
import PageBtnContainer from './PageBtnContainer';

const CustomerList = () => {
  const { isLoading, isError } = useUserContext();
  const {
    getCustomers,
    customers: { customers, totalCustomers, numOfPages },
    page,
    sort,
    customer,
    changePage,
  } = useOrdersContext();

  useEffect(() => {
    getCustomers();
  }, [page, sort, customer]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h4 style={{ textTransform: 'none' }}>There was an error...</h4>;
  }

  if (customers.length < 1) {
    return (
      <h4 style={{ textTransform: 'none' }}>No customers to display...</h4>
    );
  }
  return (
    <>
      <h5 className="inline">
        {totalCustomers} review
        {totalCustomers > 1 && 's'} found
      </h5>
      <Customer customers={customers} />
      {numOfPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfPages}
          page={page}
          changePage={changePage}
        />
      )}
    </>
  );
};

export default CustomerList;
