import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SET_LOADING,
  TOGGLE_SIDEBAR,
} from '../actions';
import axios from 'axios';
import { ALERT_DANGER, ALERT_SUCCESS, auth_url } from '../utils/constants';

const user = localStorage.getItem('user');

export const initialState = {
  showSidebar: false,
  isLoading: false,
  alert: { showAlert: false, alertType: '', alertText: '' },
  user: user ? JSON.parse(user) : null,
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      const response = await axios.post(`${auth_url}/login`, currentUser);
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
        addUserToLocalStorage(user);
      } else {
        displayAlert({
          alertType: ALERT_DANGER,
          alertText: 'Unauthorized to access this route',
        });
      }
    } catch (error) {
      console.log(error.response);
      let msg = error.response.data.msg || error.message;
      displayAlert({
        alertType: ALERT_DANGER,
        alertText: msg,
      });
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER });
    try {
      await axios.get(`${auth_url}/logout`);
    } catch (error) {}
    removeUserFromLocalStorage();
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
