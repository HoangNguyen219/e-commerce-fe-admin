import React from 'react';
import { FormRow, FormRowSelect } from '.';
import { useProductsContext } from '../context/product_context';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { colorsObj, sorts, booleanList } from '../utils/constants';
import { formatPrice, addAll } from '../utils/helpers';
import { useUserContext } from '../context/user_context';

const SearchContainer = () => {
  const {
    text,
    categoryId,
    companyId,
    color,
    min_price,
    max_price,
    sort,
    handleChange,
    clearFilters,
    categories,
    companies,
    featured,
    price,
  } = useProductsContext();

  const { isLoading } = useUserContext();
  const [localSearch, setLocalSearch] = useState(text);
  const [localPrice, setLocalPrice] = useState(price);

  const categoriesAddAll = addAll(categories);
  const companiesAddAll = addAll(companies);
  const colorsObjAddAll = addAll(colorsObj);
  const booleanListAddAll = addAll(booleanList);

  useEffect(() => {
    setLocalPrice(price);
  }, [price]);

  useEffect(() => {
    setLocalSearch(text);
  }, [text]);

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'price') {
      value = Number(value);
    }
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    setLocalPrice(max_price);
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

  const optimizedDebouncePrice = useMemo(
    () =>
      debounce((e) => {
        setLocalPrice(e.target.value);
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
            name="text"
            labelText="text"
            value={localSearch}
            handleChange={optimizedDebounceText}
          />
          {/* search by category */}
          <FormRowSelect
            labelText="category"
            name="categoryId"
            value={categoryId}
            handleChange={handleSearch}
            list={categoriesAddAll}
          />
          {/* search by company */}
          <FormRowSelect
            labelText="company"
            name="companyId"
            value={companyId}
            handleChange={handleSearch}
            list={companiesAddAll}
          />
          {/* search by color */}
          <FormRowSelect
            labelText="color"
            name="color"
            value={color}
            handleChange={handleSearch}
            list={colorsObjAddAll}
          />
          {/* feature */}
          <FormRowSelect
            labelText="Featured"
            name="featured"
            value={featured}
            handleChange={handleSearch}
            list={booleanListAddAll}
          />
          {/* end of feature */}
          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sorts}
          />
          {/* price */}
          <div className="form-row">
            <label className="form-label">price</label>
            <div className="price">
              <input
                type="range"
                name="price"
                onChange={optimizedDebouncePrice}
                min={min_price}
                max={max_price}
                value={localPrice}
              />
              <span className="price">{formatPrice(localPrice)}</span>
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

export default SearchContainer;
