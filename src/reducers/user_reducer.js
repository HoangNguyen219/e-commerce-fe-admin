import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_SIDEBAR,
} from '../actions';
import { initialState } from '../context/user_context';

const user_reducer = (state, action) => {
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    const { alertText, alertType } = action.payload;
    return {
      ...state,
      alert: {
        showAlert: true,
        alertType,
        alertText,
      },
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      alert: {
        showAlert: false,
        alertType: '',
        alertText: '',
      },
    };
  }

  if (action.type === SET_LOADING) {
    const { isLoading } = action.payload;
    return {
      ...state,
      isLoading,
    };
  }

  if (action.type === SET_ERROR) {
    const { isError } = action.payload;
    return {
      ...state,
      isError,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default user_reducer;
