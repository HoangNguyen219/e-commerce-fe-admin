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
  GET_CATEGORIES_SUCCESS,
  CHANGE_TYPE_PATH,
  UNSET_EDIT,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === CHANGE_TYPE_PATH) {
    const { typePath } = action.payload;
    return {
      ...state,
      typePath,
    };
  }

  if (action.type === UNSET_EDIT) {
    return {
      ...state,
      isEditing: false,
      product: { secondaryImages: [] },
      category: {},
    };
  }

  if (action.type === GET_DATA_SUCCESS) {
    const { products, categories, companies, maxPrice } = action.payload;
    return {
      ...state,
      products,
      categories,
      companies,
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
    const { dataCatCom } = action.payload;

    return {
      ...state,
      dataCatCom,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      text: '',
      companyId: 'all',
      categoryId: 'all',
      color: 'all',
      price: state.max_price,
      featured: 'all',
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
    const category = state.dataCatCom.find(
      (category) => category.id === action.payload.id
    );
    return {
      ...state,
      isEditing: true,
      category,
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
