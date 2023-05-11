import { useContext, useEffect, useReducer } from 'react';
import {
  GET_PRODUCTS_SUCCESS,
  CLEAR_FILTERS,
  GET_DATA_SUCCESS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
  SET_EDIT_PRODUCT,
  UPLOAD_IMAGE_SUCCESS,
  HANDLE_SHOW_MODAL,
  HANDLE_CLOSE_MODAL,
} from '../actions';
import reducer from '../reducers/products_reducer';
import React from 'react';
import axios from 'axios';
import { ALERT_DANGER, ALERT_SUCCESS, baseUrl } from '../utils/constants';
import { useUserContext } from './user_context';

const ProductsContext = React.createContext();
const initialState = {
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
  shipping: 'all',
  featured: 'all',
  product: {},
  isEditting: false,
  showModal: false,
  deleteFn: null,
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { logoutUser, displayAlert, setLoading } = useUserContext();

  const authFetch = axios.create({
    baseURL: baseUrl,
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        productsResponse,
        categoriesResponse,
        companiesResponse,
      ] = await Promise.all([
        authFetch.get('/products'),
        authFetch.get('/categories'),
        authFetch.get('/companies'),
      ]);
      const products = productsResponse.data.products;
      const categories = categoriesResponse.data.categories;
      const companies = companiesResponse.data.companies;
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: { products, categories, companies },
      });
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
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
      featured,
      sort,
    } = state;

    let url = `/products?page=${page}&text=${text}&companyId=${companyId}&categoryId=${categoryId}&color=${color}&price=${price}&shipping=${shipping}&featured=${featured}&sort=${sort}`;
    setLoading(true);
    try {
      const { data } = await authFetch.get(url);
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
      handleError(error);
    }
    setLoading(false);
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
    console.log(state.product);
  };

  const uploadImage = async ({ file, isPrimary }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const response = await authFetch.post(
        `products/uploadImage`,
        formData,
        config
      );
      dispatch({
        type: UPLOAD_IMAGE_SUCCESS,
        payload: { imageUrl: response.data.image, isPrimary },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      handleError(error);
    }
  };

  const editProduct = async (values) => {
    setLoading(true);
    try {
      await authFetch.patch(`/products/${state.product.id}`, {
        ...values,
        primaryImage: state.product.primaryImage,
        secondaryImages: state.product.secondaryImages,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Product updated! Redirect...',
      });
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const createProduct = async (values) => {
    setLoading(true);
    try {
      await authFetch.post('/products', {
        ...values,
        primaryImage: state.product.primaryImage,
        secondaryImages: state.product.secondaryImages,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Product added! Redirect...',
      });
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const handleError = (error) => {
    const msg = error.response.data.msg;
    displayAlert({
      alertType: ALERT_DANGER,
      alertText: msg,
    });
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await authFetch.delete(`/products/${id}`);
      getProducts();
    } catch (error) {
      if (error.response.status === 401) return;
      handleError(error);
    }
    setLoading(false);
  };

  const handleShowModal = (callback, index) => {
    dispatch({ type: HANDLE_SHOW_MODAL, payload: { callback, index } });
  };

  const handleCloseModal = () => {
    dispatch({ type: HANDLE_CLOSE_MODAL });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        clearFilters,
        getProducts,
        handleChange,
        changePage,
        setEditProduct,
        uploadImage,
        editProduct,
        createProduct,
        deleteProduct,
        handleShowModal,
        handleCloseModal,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
