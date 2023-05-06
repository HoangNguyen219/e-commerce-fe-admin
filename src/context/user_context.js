import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
} from '../actions';
import axios from 'axios';
import { auth_url } from '../utils/constants';

const user = localStorage.getItem('user');

export const initialState = {
  showSidebar: false,
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const displayAlert = (message) => {
    dispatch({ type: DISPLAY_ALERT, payload: message });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(`${auth_url}/login`, currentUser);
      const user = response.data.user;
      if (user.role === 'admin') {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user,
        });
        addUserToLocalStorage(user);
      } else {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: 'Unauthorized to access this route',
        });
      }
    } catch (error) {
      console.log(error.response);
      let msg = error.response.data.msg
        ? error.response.data.msg
        : error.message;
      dispatch({ type: LOGIN_USER_ERROR, payload: msg });
    }
    clearAlert();
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
