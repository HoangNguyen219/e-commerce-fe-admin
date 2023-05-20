import React from 'react';
import { FormRow, FormRowSelect } from '.';
import { useOrdersContext } from '../context/order_context';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { reviewSorts, ratingList } from '../utils/constants';
import { formatPrice, addAll } from '../utils/helpers';
import { useUserContext } from '../context/user_context';

const SearchContainerReview = () => {
  const {
    customer,
    sort,
    product,
    rating,
    handleChange,
    clearFilters,
  } = useOrdersContext();

  const { isLoading } = useUserContext();
  const [localCustomer, setLocalCustomer] = useState(customer);
  const [localproduct, setLocalproduct] = useState(product);

  const ratingListAddAll = addAll(ratingList);

  useEffect(() => {
    setLocalproduct(product);
  }, [product]);

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
    setLocalproduct('');
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

  const optimizedDebounceProduct = useMemo(
    () =>
      debounce((e) => {
        setLocalproduct(e.target.value);
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

          <FormRow
            type="text"
            name="product"
            labelText="product name"
            value={localproduct}
            handleChange={optimizedDebounceProduct}
          />

          {/* search by rating */}
          <FormRowSelect
            labelText="Rating"
            name="rating"
            value={rating}
            handleChange={handleSearch}
            list={ratingListAddAll}
          />

          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={reviewSorts}
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

export default SearchContainerReview;
