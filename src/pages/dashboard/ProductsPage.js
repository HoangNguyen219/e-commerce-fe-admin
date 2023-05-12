import React, { useEffect } from 'react';
import { ProductList, SearchContainer } from '../../components';
import { useProductsContext } from '../../context/product_context';

const ProductsPage = () => {
  const { fetchData, handleChange } = useProductsContext();
  useEffect(() => {
    handleChange({ name: 'text', value: '' });
    fetchData();
  }, []);
  return (
    <>
      <SearchContainer />
      <ProductList />
    </>
  );
};

export default ProductsPage;
