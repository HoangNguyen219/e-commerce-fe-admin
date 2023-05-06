import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
} from '../actions';
import { initialState } from '../context/user_context';
import { ALERT_DANGER, ALERT_SUCCESS } from '../utils/constants';

const user_reducer = (state, action) => {
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: ALERT_DANGER,
      alertText: action.payload,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_SUCCESS,
      alertText: 'Login successful! Redirecting...',
      user: action.payload,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_DANGER,
      alertText: action.payload,
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
