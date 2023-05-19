import {
  GET_DATA_SUCCESS,
  CLEAR_FILTERS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
  GET_ORDERS_SUCCESS,
  GET_SINGLE_ORDER,
} from '../actions';

const orders_reducer = (state, action) => {
  if (action.type === GET_DATA_SUCCESS) {
    const { orders, reviews, customers } = action.payload;
    let maxTotal = orders.map((order) => order.total);
    maxTotal = Math.max(...maxTotal);
    return {
      ...state,
      orders: { ...state.orders, orders },
      reviews: { ...state.reviews, reviews },
      customers: { ...state.customers, customers },
      max_total: maxTotal,
      total: maxTotal,
    };
  }

  if (action.type === GET_ORDERS_SUCCESS) {
    const { orders, totalProducts, numOfPages } = action.payload;
    return {
      ...state,
      orders: {
        orders,
        totalProducts,
        numOfPages,
      },
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      customer: '',
      processStatus: 'all',
      paymentMethod: 'all',
      paymentStatus: 'all',
      total: state.max_total,
      sort: 'latest',
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

  if (action.type === GET_SINGLE_ORDER) {
    const { order } = action.payload;
    return {
      ...state,
      order,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default orders_reducer;
