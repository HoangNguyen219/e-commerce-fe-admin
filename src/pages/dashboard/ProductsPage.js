import React, { useEffect } from 'react';
import { ProductList, SearchContainer } from '../../components';
import { useProductsContext } from '../../context/product_context';

const ProductsPage = () => {
  const { handleChange, unsetEdit } = useProductsContext();
  useEffect(() => {
    handleChange({ name: 'text', value: '' });
    unsetEdit();
  }, []);
  return (
    <>
      <SearchContainer />
      <ProductList />
    </>
  );
};

export default ProductsPage;
