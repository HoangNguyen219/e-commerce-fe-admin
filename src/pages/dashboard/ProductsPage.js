import React, { useEffect } from 'react';
import { ProductList, SearchContainer } from '../../components';
import { useProductsContext } from '../../context/product_context';

const ProductsPage = () => {
  const { clearFilters, unsetEdit } = useProductsContext();
  useEffect(() => {
    setTimeout(() => {
      clearFilters();
      unsetEdit();
    });
  }, []);
  return (
    <>
      <SearchContainer />
      <ProductList />
    </>
  );
};

export default ProductsPage;
