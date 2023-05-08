import React, { useEffect } from 'react';
import { useProductsContext } from '../context/product_context';
import ListView from './ListView';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';
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
    sort,
    page,
    numOfPages,
    totalProducts,
    products_loading: loading,
  } = useProductsContext();
  useEffect(() => {
    getProducts();
  }, [page, text, categoryId, companyId, color, price, shipping, sort]);

  if (loading) {
    return <Loading />;
  }

  if (products.length < 1) {
    return <h2 style={{ textTransform: 'none' }}>No products to display...</h2>;
  }
  return (
    <>
      <h5>
        {totalProducts} product{products.length > 1 && 's'} found
      </h5>
      <ListView products={products} />
      {numOfPages > 1 && <PageBtnContainer />}
    </>
  );
};

export default ProductList;
