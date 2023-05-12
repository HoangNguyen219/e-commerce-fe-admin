import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/product_context';
import Category from './Category';
import Loading from './Loading';
import { useUserContext } from '../context/user_context';
const CategoryList = () => {
  const { categories, getCategories, text, sort } = useProductsContext();
  const { isLoading, alert } = useUserContext();

  useEffect(() => {
    getCategories();
  }, [text, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (alert.showAlert) {
    return <h2 style={{ textTransform: 'none' }}>There was an error...</h2>;
  }

  if (categories.length < 1) {
    return (
      <h2 style={{ textTransform: 'none' }}>No categories to display...</h2>
    );
  }
  return (
    <>
      <h5 className="inline">
        {categories.length} categor{categories.length > 1 ? 'ies' : 'y'} found
        <Link to="/add-category" className="btn btn-safe mg-left">
          Add Category
        </Link>
      </h5>

      <Category categories={categories} />
    </>
  );
};

export default CategoryList;
