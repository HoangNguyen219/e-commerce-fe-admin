import { useContext, useReducer } from 'react';
import {
  CHANGE_PAGE,
  CLEAR_FILTERS,
  GET_CUSTOMERS_SUCCESS,
  GET_DATA_SUCCESS,
  GET_ORDERS_SUCCESS,
  GET_REVIEWS_SUCCESS,
  GET_SINGLE_ORDER,
  HANDLE_CHANGE,
} from '../actions';
import reducer from '../reducers/orders_reducer';
import React from 'react';
import {
  ALERT_SUCCESS,
  orders_url,
  reviews_url,
  users_url,
} from '../utils/constants';
import { useUserContext } from './user_context';
import { useEffect } from 'react';
import authFetch from '../utils/authFetch';

const OrdersContext = React.createContext();
const initialState = {
  page: 1,
  sort: 'latest',
  min_total: 0,
  max_total: 0,
  total: 0,
  processStatus: 'all',
  paymentMethod: 'all',
  paymentStatus: 'all',
  customer: '',
  product: '',
  rating: 'all',
  order: {},
  orders: {
    orders: [],
    totalOrders: 0,
    numOfPages: 1,
  },
  reviews: {
    reviews: [],
    totalReviews: 0,
    numOfPages: 1,
  },
  customers: {
    customers: [],
    totalCustomers: 0,
    numOfPages: 1,
  },
};

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    logoutUser,
    displayAlert,
    setLoading,
    handleError,
    setError,
  } = useUserContext();
  const myFetch = authFetch(logoutUser);

  const getOrders = async () => {
    const {
      page,
      sort,
      total,
      processStatus,
      paymentMethod,
      paymentStatus,
      customer,
    } = state;

    let url = `${orders_url}?page=${page}&total=${total}&processStatus=${processStatus}&paymentMethod=${paymentMethod}&paymentStatus=${paymentStatus}&customer=${customer}&sort=${sort}`;
    setLoading(true);
    try {
      const { data } = await myFetch.get(url);
      const { orders, totalOrders, numOfPages } = data;
      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: {
          orders,
          totalOrders,
          numOfPages,
        },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const getReviews = async () => {
    const { page, sort, customer, product, rating } = state;

    let url = `${reviews_url}?page=${page}&product=${product}&rating=${rating}&customer=${customer}&sort=${sort}`;
    setLoading(true);
    try {
      const { data } = await myFetch.get(url);
      const { reviews, totalReviews, numOfPages } = data;
      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: {
          reviews,
          totalReviews,
          numOfPages,
        },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const getCustomers = async () => {
    const { page, sort, customer } = state;

    let url = `${users_url}?page=${page}&customer=${customer}&sort=${sort}`;
    setLoading(true);
    try {
      const { data } = await myFetch.get(url);
      const { users: customers, totalUsers: totalCustomers, numOfPages } = data;
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: {
          customers,
          totalCustomers,
          numOfPages,
        },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        ordersResponse,
        reviewsResponse,
        customersResponse,
      ] = await Promise.all([
        myFetch.get(orders_url),
        myFetch.get(reviews_url),
        myFetch.get(users_url),
      ]);
      const orders = ordersResponse.data.orders;
      const reviews = reviewsResponse.data.reviews;
      const customers = customersResponse.data.users;
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: { reviews, orders, customers },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getSingleOrder = async (id) => {
    setLoading(true);
    try {
      const response = await myFetch.get(`${orders_url}/${id}`);
      dispatch({
        type: GET_SINGLE_ORDER,
        payload: { order: response.data.order },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const editOrder = async (values) => {
    setLoading(true);
    try {
      await myFetch.patch(`${orders_url}/${state.order.id}`, {
        ...values,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Order updated! Redirect...',
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  return (
    <OrdersContext.Provider
      value={{
        ...state,
        clearFilters,
        getOrders,
        handleChange,
        changePage,
        editOrder,
        getSingleOrder,
        getReviews,
        getCustomers,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersContext = () => {
  return useContext(OrdersContext);
};
