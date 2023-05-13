import React, { useEffect } from 'react';
import { useProductsContext } from '../context/product_context';
import Category from './Category';
import Loading from './Loading';
import AddButton from './AddButton';
import { useUserContext } from '../context/user_context';
import { CATEGORIES } from '../utils/constants';
const CategoryList = () => {
  const {
    dataCatCom,
    getCategories,
    text,
    sort,
    typePath,
  } = useProductsContext();
  const { isLoading, alert } = useUserContext();

  useEffect(() => {
    getCategories();
  }, [text, sort, typePath]);

  if (isLoading) {
    return <Loading />;
  }

  if (alert.showAlert) {
    return <h5 style={{ textTransform: 'none' }}>There was an error...</h5>;
  }

  if (dataCatCom.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        No {typePath} to display...
        <AddButton />
      </h5>
    );
  }
  return (
    <>
      <h5 className="inline">
        {dataCatCom.length} {typePath === CATEGORIES ? 'categor' : 'compan'}
        {dataCatCom.length > 1 ? 'ies' : 'y'} found
        <AddButton />
      </h5>

      <Category categories={dataCatCom} />
    </>
  );
};

export default CategoryList;
