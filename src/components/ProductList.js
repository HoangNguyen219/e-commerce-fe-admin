import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/product_context';
import Product from './Product';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';
import { useUserContext } from '../context/user_context';
const ProductList = () => {
  const {
    products,
    getProducts,
    text,
    categoryId,
    companyId,
    color,
    price,
    shipping,
    featured,
    sort,
    page,
    numOfPages,
    totalProducts,
    changePage,
  } = useProductsContext();

  const { isLoading, isError } = useUserContext();
  useEffect(() => {
    getProducts();
  }, [
    page,
    text,
    categoryId,
    companyId,
    color,
    price,
    shipping,
    featured,
    sort,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h4 style={{ textTransform: 'none' }}>There was an error...</h4>;
  }

  if (products.length < 1) {
    return (
      <h4 style={{ textTransform: 'none' }}>
        No products to display...
        <Link to="/add-product" className="btn btn-safe mg-left">
          Add Product
        </Link>
      </h4>
    );
  }
  return (
    <>
      <h5 className="inline">
        {totalProducts} product{totalProducts > 1 && 's'} found
        <Link to="/add-product" className="btn btn-safe mg-left">
          Add Product
        </Link>
      </h5>
      <Product products={products} />
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

export default ProductList;
