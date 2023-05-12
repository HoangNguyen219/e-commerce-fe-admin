import {
  GET_PRODUCTS_SUCCESS,
  GET_DATA_SUCCESS,
  CLEAR_FILTERS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
  SET_EDIT_PRODUCT,
  UPLOAD_IMAGE_SUCCESS,
  HANDLE_SHOW_MODAL,
  HANDLE_CLOSE_MODAL,
  SET_EDIT_CATEGORY,
  SET_EDIT_COMPANY,
  GET_CATEGORIES_SUCCESS,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === GET_DATA_SUCCESS) {
    const { products, categories, companies } = action.payload;
    let maxPrice = products.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      products,
      categories,
      companies,
      ...state.filters,
      max_price: maxPrice,
      price: maxPrice,
    };
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    const { products, totalProducts, numOfPages } = action.payload;
    return {
      ...state,
      products,
      totalProducts,
      numOfPages,
    };
  }

  if (action.type === GET_CATEGORIES_SUCCESS) {
    const { categories } = action.payload;

    return {
      ...state,
      categories,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      price: state.max_price,
      shipping: 'all',
      featured: 'all',
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

  if (action.type === SET_EDIT_CATEGORY) {
    const category = state.categories.find(
      (category) => category.id === action.payload.id
    );
    return {
      ...state,
      isEditing: true,
      category,
    };
  }

  if (action.type === SET_EDIT_COMPANY) {
    const company = state.companies.find(
      (company) => company.id === action.payload.id
    );
    return {
      ...state,
      isEditing: true,
      company,
    };
  }

  if (action.type === UPLOAD_IMAGE_SUCCESS) {
    const { imageUrl, isPrimary } = action.payload;
    const updatedProduct = isPrimary
      ? { ...state.product, primaryImage: imageUrl }
      : {
          ...state.product,
          secondaryImages: [imageUrl, ...state.product.secondaryImages],
        };
    return { ...state, product: updatedProduct };
  }

  if (action.type === HANDLE_SHOW_MODAL) {
    const { callback, index } = action.payload;
    return {
      ...state,
      showModal: true,
      deleteFn: { callback, index },
    };
  }

  if (action.type === HANDLE_CLOSE_MODAL) {
    return {
      ...state,
      showModal: false,
      deleteFn: null,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default products_reducer;
