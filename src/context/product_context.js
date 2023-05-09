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
  SET_EDIT_PRODUCT,
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
  loading: false,
  error: false,
  products: [],
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
  product: {},
  isEditting: false,
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

  const setEditProduct = (id) => {
    dispatch({ type: SET_EDIT_PRODUCT, payload: { id } });
  };

  const editJob = async () => {
    // dispatch({ type: EDIT_JOB_BEGIN });
    // try {
    //   const { position, company, jobLocation, jobType, status } = state;
    //   await authFetch.patch(`/jobs/${state.editJobId}`, {
    //     company,
    //     position,
    //     jobLocation,
    //     jobType,
    //     status,
    //   });
    //   dispatch({ type: EDIT_JOB_SUCCESS });
    //   dispatch({ type: CLEAR_VALUES });
    // } catch (error) {
    //   if (error.response.status === 401) return;
    //   dispatch({
    //     type: EDIT_JOB_ERROR,
    //     payload: { msg: error.response.data.msg },
    //   });
    // }
    // clearAlert();
  };

  const deleteJob = async (jobId) => {
    // dispatch({ type: DELETE_JOB_BEGIN });
    // try {
    //   await authFetch.delete(`/jobs/${jobId}`);
    //   getJobs();
    // } catch (error) {
    //   if (error.response.status === 401) return;
    //   dispatch({
    //     type: DELETE_JOB_ERROR,
    //     payload: { msg: error.response.data.msg },
    //   });
    // }
    // clearAlert();
  };

  const createJob = async () => {
    // dispatch({ type: CREATE_JOB_BEGIN });
    // try {
    //   const { position, company, jobLocation, jobType, status } = state;
    //   await authFetch.post('/jobs', {
    //     position,
    //     company,
    //     jobLocation,
    //     jobType,
    //     status,
    //   });
    //   dispatch({ type: CREATE_JOB_SUCCESS });
    //   dispatch({ type: CLEAR_VALUES });
    // } catch (error) {
    //   if (error.response.status === 401) return;
    //   dispatch({
    //     type: CREATE_JOB_ERROR,
    //     payload: { msg: error.response.data.msg },
    //   });
    // }
    // clearAlert();
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
        setEditProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
