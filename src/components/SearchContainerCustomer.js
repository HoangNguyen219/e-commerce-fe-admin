import React from 'react';
import { FormRow, FormRowSelect } from '.';
import { useOrdersContext } from '../context/order_context';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { customerSorts } from '../utils/constants';
import { useUserContext } from '../context/user_context';

const SearchContainerCustomer = () => {
  const { customer, sort, handleChange, clearFilters } = useOrdersContext();

  const { isLoading } = useUserContext();
  const [localCustomer, setLocalCustomer] = useState(customer);

  useEffect(() => {
    setLocalCustomer(customer);
  }, [customer]);

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalCustomer('');
    clearFilters();
  };

  const debounce = (callback) => {
    let timeoutID;
    return (e) => {
      callback(e);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };

  const optimizedDebounceCustomer = useMemo(
    () =>
      debounce((e) => {
        setLocalCustomer(e.target.value);
      }),
    []
  );

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="customer"
            labelText="customer"
            value={localCustomer}
            handleChange={optimizedDebounceCustomer}
          />

          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={customerSorts}
          />
          {/* clear button */}
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainerCustomer;
