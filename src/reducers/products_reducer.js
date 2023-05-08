import {
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_DATA_BEGIN,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  CLEAR_FILTERS,
  HANDLE_CHANGE,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === GET_DATA_BEGIN) {
    return { ...state, products_loading: true };
  }

  if (action.type === GET_DATA_SUCCESS) {
    const payload = action.payload;
    let maxPrice = payload.products.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      products_loading: false,
      products: payload.products,
      companies: [{ id: 'all', name: 'All' }, ...payload.companies],
      categories: [{ id: 'all', name: 'All' }, ...payload.categories],
      ...state.filters,
      max_price: maxPrice,
      price: maxPrice,
    };
  }

  if (action.type === GET_DATA_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }

  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }

  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }

  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products_loading: false,
      products: action.payload.products,
      totalProducts: action.payload.totalProducts,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      ...state.filters,
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      price: state.filters.max_price,
      shipping: false,
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

  throw new Error(`No matching "${action.type}" - action type`);
};

export default products_reducer;