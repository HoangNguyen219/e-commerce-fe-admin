import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  GET_PARAMS_SUCCESS,
  HANDLE_CHANGE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SET_EDIT_PARAM,
  SET_ERROR,
  SET_LOADING,
  SHOW_STATS_SUCCESS,
  TOGGLE_SIDEBAR,
} from '../actions';
import authFetch from '../utils/authFetch';
import {
  ALERT_DANGER,
  ALERT_SUCCESS,
  auth_url,
  config_url,
  orders_url,
} from '../utils/constants';
import { dateToString } from '../utils/helpers';

const user = localStorage.getItem('user');

export const initialState = {
  showSidebar: false,
  isLoading: false,
  alert: { showAlert: false, alertType: '', alertText: '' },
  user: user ? JSON.parse(user) : null,
  isError: false,
  stats: {},
  popularProducts: [],
  revenue: [],
  startDateStr: dateToString(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
  endDateStr: dateToString(new Date()),
  params: [],
  param: {},
  isEditing: false,
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER });
    try {
      await myFetch.get(`${auth_url}/logout`);
    } catch (error) {}
    removeUserFromLocalStorage();
  };

  const myFetch = authFetch(logoutUser);

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const displayAlert = ({ alertText, alertType }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { alertText, alertType } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const setLoading = (isLoading) => {
    dispatch({ type: SET_LOADING, payload: { isLoading } });
  };

  const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };

  const loginUser = async (currentUser) => {
    setLoading(true);
    try {
      const response = await myFetch.post(`${auth_url}/login`, currentUser);
      const user = response.data.user;
      if (user.role === 'admin') {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user,
        });
        displayAlert({
          alertType: ALERT_SUCCESS,
          alertText: 'Login successful! Redirecting...',
        });
        setError(false);
        addUserToLocalStorage(user);
      } else {
        displayAlert({
          alertType: ALERT_DANGER,
          alertText: 'Unauthorized to access this route',
        });
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const setError = (isError) => {
    dispatch({ type: SET_ERROR, payload: { isError } });
  };

  const handleError = (error) => {
    let msg = 'Some thing went wrong, please try again';
    if (error.response) {
      // if (error.response.status === 401 || error.response.status === 403) {
      //   return;
      // }
      msg = error.response.data.msg;
    }
    displayAlert({
      alertType: ALERT_DANGER,
      alertText: msg,
    });
    setError(true);
  };

  const showStats = async () => {
    setLoading(true);
    try {
      const { data } = await myFetch(
        `${orders_url}/stats?startDateStr=${state.startDateStr}&endDateStr=${state.endDateStr}`
      );
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.stats,
          revenue: data.revenue,
          popularProducts: data.popularProducts,
        },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const getParams = async () => {
    setLoading(true);
    try {
      const { data } = await myFetch(`${config_url}`);
      dispatch({
        type: GET_PARAMS_SUCCESS,
        payload: {
          params: data.configs,
        },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const editParam = async (values) => {
    setLoading(true);
    try {
      await myFetch.patch(`/${config_url}/${state.param.id}`, {
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

  const createParam = async (values) => {
    setLoading(true);
    try {
      await myFetch.post(config_url, {
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

  const deleteParam = async (id) => {
    setLoading(true);
    try {
      await myFetch.delete(`/${config_url}/${id}`);
      setError(false);

      getParams();
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const setEditParam = (id) => {
    dispatch({ type: SET_EDIT_PARAM, payload: { id } });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        displayAlert,
        loginUser,
        logoutUser,
        toggleSidebar,
        setLoading,
        handleError,
        setError,
        showStats,
        handleChange,
        getParams,
        editParam,
        createParam,
        deleteParam,
        setEditParam,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
