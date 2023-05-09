import React from 'react';
import { FormRow, FormRowSelect } from '.';
import { useProductsContext } from '../context/product_context';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { colorsObj, sorts } from '../utils/constants';
import { formatPrice, addAll } from '../utils/helpers';

const SearchContainer = () => {
  const {
    products_loading,
    categoryId,
    companyId,
    color,
    min_price,
    max_price,
    shipping,
    sort,
    handleChange,
    clearFilters,
    categories,
    companies,
    feature,
  } = useProductsContext();
  const [localSearch, setLocalSearch] = useState('');
  const [localPrice, setLocalPrice] = useState(0);

  const categoriesAddAll = addAll(categories);
  const companiesAddAll = addAll(companies);
  const colorsObjAddAll = addAll(colorsObj);

  useEffect(() => {
    setLocalPrice(max_price);
  }, [max_price]);

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'price') {
      value = Number(value);
    }
    if (name === 'shipping' || name === 'feature') {
      value = e.target.checked;
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

          {/* shipping */}
          <div className="form-row shipping">
            <label className="form-label" htmlFor="shipping">
              free shipping
            </label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={handleSearch}
              checked={shipping}
            />
          </div>
          {/* end of shipping */}
          {/* feature */}
          <div className="form-row shipping">
            <label className="form-label" htmlFor="feature">
              featured product
            </label>
            <input
              type="checkbox"
              name="feature"
              id="shipping"
              onChange={handleSearch}
              checked={feature}
            />
          </div>
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
            <div className="shipping">
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
            disabled={products_loading}
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
