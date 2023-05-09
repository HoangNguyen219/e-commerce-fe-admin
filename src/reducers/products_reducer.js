import {
  GET_PRODUCTS_SUCCESS,
  GET_DATA_BEGIN,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  CLEAR_FILTERS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
  SET_EDIT_PRODUCT,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === GET_DATA_BEGIN) {
    return { ...state, loading: true };
  }

  if (action.type === GET_DATA_SUCCESS) {
    const payload = action.payload;
    let maxPrice = payload.products.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      loading: false,
      products: payload.products,
      companies: payload.companies,
      categories: payload.categories,
      ...state.filters,
      max_price: maxPrice,
      price: maxPrice,
    };
  }

  if (action.type === GET_DATA_ERROR) {
    return { ...state, loading: false, error: true };
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      loading: false,
      products: action.payload.products,
      totalProducts: action.payload.totalProducts,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      price: state.filters.max_price,
      shipping: false,
      feature: false,
      sort: 'price-lowest',
    };
  }

  if (action.type === HANDLE_CHANGE) {
    let { name, value } = action.payload;
    value = typeof value === 'string' ? value.toLowerCase() : value;
    return {
      ...state,
      page: 1,
      [name]: value,
    };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === SET_EDIT_PRODUCT) {
    const product = state.products.find(
      (product) => product.id === action.payload.id
    );
    return {
      ...state,
      isEditing: true,
      product,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default products_reducer;
