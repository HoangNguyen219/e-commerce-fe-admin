import React from 'react';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/product_context';

const AddButton = () => {
  const { typePath } = useProductsContext();

  return (
    <>
      {typePath === 'categories' ? (
        <Link to="/add-category" className="btn btn-safe mg-left">
          Add Category
        </Link>
      ) : (
        <Link to="/add-company" className="btn btn-safe mg-left">
          Add Company
        </Link>
      )}
    </>
  );
};

export default AddButton;
