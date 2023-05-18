import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_SIDEBAR,
} from '../actions';
import authFetch from '../utils/authFetch';
import { ALERT_DANGER, ALERT_SUCCESS, auth_url } from '../utils/constants';

const user = localStorage.getItem('user');

export const initialState = {
  showSidebar: false,
  isLoading: false,
  alert: { showAlert: false, alertType: '', alertText: '' },
  user: user ? JSON.parse(user) : null,
  isError: false,
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
    const msg = error.response ? error.response.data.msg : '';
    displayAlert({
      alertType: ALERT_DANGER,
      alertText: msg,
    });
    setError(true);
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
