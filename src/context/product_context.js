import { useContext, useEffect, useReducer } from 'react';
import {
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  CLEAR_FILTERS,
  GET_DATA_BEGIN,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  HANDLE_CHANGE,
  CHANGE_PAGE,
} from '../actions';
import reducer from '../reducers/products_reducer';
import React from 'react';
import axios from 'axios';
import {
  categories_url,
  companies_url,
  products_url,
} from '../utils/constants';

const ProductsContext = React.createContext();
const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  categories: [],
  companies: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  sort: 'price-lowest',
  text: '',
  companyId: 'all',
  categoryId: 'all',
  color: 'all',
  min_price: 0,
  max_price: 0,
  price: 0,
  shipping: false,
  feature: false,
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: GET_DATA_BEGIN });
    try {
      const [
        productsResponse,
        categoriesResponse,
        companiesResponse,
      ] = await Promise.all([
        axios.get(products_url),
        axios.get(categories_url),
        axios.get(companies_url),
      ]);
      const products = productsResponse.data.products;
      const categories = categoriesResponse.data.categories;
      const companies = companiesResponse.data.companies;
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: { products, categories, companies },
      });
    } catch (error) {
      dispatch({ type: GET_DATA_ERROR });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getProducts = async () => {
    const {
      page,
      text,
      companyId,
      categoryId,
      color,
      price,
      shipping,
      sort,
    } = state;

    let url = `${products_url}?page=${page}&text=${text}&companyId=${companyId}&categoryId=${categoryId}&color=${color}&price=${price}&shipping=${shipping}&sort=${sort}`;
    dispatch({ type: GET_DATA_BEGIN });
    try {
      const { data } = await axios.get(url);
      const { products, totalProducts, numOfPages } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          totalProducts,
          numOfPages,
        },
      });
    } catch (error) {
      dispatch({ type: GET_DATA_ERROR });
    }
  };

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const product = response.data.product;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        fetchSingleProduct,
        clearFilters,
        getProducts,
        handleChange,
        changePage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
