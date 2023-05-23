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

  if (action.type === SHOW_STATS_SUCCESS) {
    const { stats, popularProducts, revenue } = action.payload;
    return {
      ...state,
      stats,
      popularProducts,
      revenue,
    };
  }

  if (action.type === GET_PARAMS_SUCCESS) {
    const { params } = action.payload;
    return {
      ...state,
      params,
    };
  }

  if (action.type === SET_EDIT_PARAM) {
    const param = state.params.find((param) => param.id === action.payload.id);
    return {
      ...state,
      isEditing: true,
      param,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    let { name, value } = action.payload;
    return {
      ...state,
      [name]: value,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default user_reducer;
