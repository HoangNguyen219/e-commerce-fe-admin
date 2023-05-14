import { useContext, useReducer } from 'react';
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
  SET_EDIT_CATEGORY,
  GET_CATEGORIES_SUCCESS,
  CHANGE_TYPE_PATH,
  UNSET_EDIT,
} from '../actions';
import reducer from '../reducers/products_reducer';
import React from 'react';
import axios from 'axios';
import { ALERT_SUCCESS, baseUrl } from '../utils/constants';
import { useUserContext } from './user_context';
import { useEffect } from 'react';

const ProductsContext = React.createContext();
const initialState = {
  products: [],
  categories: [],
  companies: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  sort: 'latest',
  text: '',
  companyId: 'all',
  categoryId: 'all',
  color: 'all',
  min_price: 0,
  max_price: 0,
  price: 0,
  shipping: 'all',
  featured: 'all',
  product: { secondaryImages: [] },
  isEditing: false,
  showModal: false,
  deleteFn: null,
  category: {},
  dataCatCom: [],
  typePath: 'categories',
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    logoutUser,
    displayAlert,
    setLoading,
    handleError,
    setError,
  } = useUserContext();

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

  const setTypePath = (typePath) => {
    dispatch({ type: CHANGE_TYPE_PATH, payload: { typePath } });
  };

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
        payload: { categories, products, companies },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

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
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const getCategories = async () => {
    const { text, sort } = state;
    let url = `/${state.typePath}?text=${text}&sort=${sort}`;
    console.log(url);
    setLoading(true);
    try {
      const { data } = await authFetch.get(url);
      const dataCatCom = data[state.typePath];
      console.log(data);
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: {
          dataCatCom,
        },
      });
      setError(false);
    } catch (error) {
      console.log('============');
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
  };

  const setEditCategory = (id) => {
    dispatch({ type: SET_EDIT_CATEGORY, payload: { id } });
  };

  const unsetEdit = () => {
    dispatch({ type: UNSET_EDIT });
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
      setError(false);
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
      setError(false);
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
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await authFetch.delete(`/products/${id}`);
      setError(false);

      getProducts();
    } catch (error) {
      if (error.response.status === 401) return;
      handleError(error);
    }
    setLoading(false);
  };

  const editCategory = async (values) => {
    setLoading(true);
    try {
      await authFetch.patch(`/${state.typePath}/${state.category.id}`, {
        ...values,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Item updated! Redirect...',
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const createCategory = async (values) => {
    setLoading(true);
    try {
      await authFetch.post(`/${state.typePath}`, {
        ...values,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Item added! Redirect...',
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      await authFetch.delete(`/${state.typePath}/${id}`);
      setError(false);

      getCategories();
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

  useEffect(() => {
    fetchData();
  }, []);

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
        setEditCategory,
        editCategory,
        createCategory,
        getCategories,
        fetchData,
        deleteCategory,
        setTypePath,
        unsetEdit,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
