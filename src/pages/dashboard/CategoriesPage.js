import React, { useState, useMemo, useEffect } from 'react';
import Wrapper from '../../assets/wrappers/SearchContainer';
import { FormRow, CategoryList, FormRowSelect } from '../../components';
import { categorySorts } from '../../utils/constants';
import { useProductsContext } from '../../context/product_context';

const CategoriesPage = ({ typePath }) => {
  const {
    handleChange,
    text,
    isLoading,
    clearFilters,
    sort,
    setTypePath,
    unsetEdit,
  } = useProductsContext();

  useEffect(() => {
    setTypePath(typePath);
    clearFilters();
  }, [typePath]);

  const [localSearch, setLocalSearch] = useState(text);

  useEffect(() => {
    unsetEdit();
  }, []);

  useEffect(() => {
    setLocalSearch(text);
  }, [text]);

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

  const handleSearch = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters();
  };

  return (
    <>
      <Wrapper>
        <form className="form">
          <h4>search form</h4>
          <div className="form-center">
            <FormRow
              type="text"
              name="text"
              labelText="text"
              value={localSearch}
              handleChange={optimizedDebounceText}
            />
            {/* sort */}
            <FormRowSelect
              labelText="sort"
              name="sort"
              value={sort}
              handleChange={handleSearch}
              list={categorySorts}
            />
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
      <CategoryList />
    </>
  );
};

export default CategoriesPage;
