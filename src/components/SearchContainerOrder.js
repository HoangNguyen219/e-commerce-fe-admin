import React from 'react';
import { FormRow, FormRowSelect } from '.';
import { useOrdersContext } from '../context/order_context';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import {
  sorts,
  processStatusList,
  paymentMethodList,
  paymentStatusList,
} from '../utils/constants';
import { formatPrice, addAll } from '../utils/helpers';
import { useUserContext } from '../context/user_context';

const SearchContainerOrder = () => {
  const {
    customer,
    min_total,
    max_total,
    total,
    processStatus,
    paymentMethod,
    paymentStatus,
    sort,
    handleChange,
    clearFilters,
  } = useOrdersContext();

  const { isLoading } = useUserContext();
  const [localSearch, setLocalSearch] = useState(customer);
  const [localTotal, setLocalTotal] = useState(total);

  const processStatusListAddAll = addAll(processStatusList);
  const paymentMethodListAddAll = addAll(paymentMethodList);
  const paymentStatusListAddAll = addAll(paymentStatusList);

  useEffect(() => {
    setLocalTotal(total);
  }, [total]);

  useEffect(() => {
    setLocalSearch(customer);
  }, [customer]);

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'total') {
      value = Number(value);
    }
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    setLocalTotal(max_total);
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

  const optimizedDebounceText = useMemo(
    () =>
      debounce((e) => {
        setLocalSearch(e.target.value);
      }),
    []
  );

  const optimizedDebounceTotal = useMemo(
    () =>
      debounce((e) => {
        setLocalTotal(e.target.value);
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
            value={localSearch}
            handleChange={optimizedDebounceText}
          />
          {/* search by processStatus */}
          <FormRowSelect
            labelText="process Status"
            name="processStatus"
            value={processStatus}
            handleChange={handleSearch}
            list={processStatusListAddAll}
          />

          {/* search by paymentMethod */}
          <FormRowSelect
            labelText="payment Method"
            name="paymentMethod"
            value={paymentMethod}
            handleChange={handleSearch}
            list={paymentMethodListAddAll}
          />

          {/* search by paymentStatus */}
          <FormRowSelect
            labelText="payment Status"
            name="paymentStatus"
            value={paymentStatus}
            handleChange={handleSearch}
            list={paymentStatusListAddAll}
          />

          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sorts}
          />
          {/* total */}
          <div className="form-row">
            <label className="form-label">total</label>
            <div className="price">
              <input
                type="range"
                name="total"
                onChange={optimizedDebounceTotal}
                min={min_total}
                max={max_total}
                value={localTotal}
              />
              <span className="price">{formatPrice(localTotal)}</span>
            </div>
          </div>
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

export default SearchContainerOrder;
