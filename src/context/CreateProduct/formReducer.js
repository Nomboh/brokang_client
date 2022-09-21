import { CREATE_ACTION_TYPES } from "./formAction";

export const initialState = {
  images: [],
  tags: [],
  status: "",
  price: 0,
  name: "",
  description: "",
  userId: "",
  transactionMethod: "card",
  shipping: [],
  category: "",
  subCategory: "",
  state: "sale",
};

export const createFormReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ACTION_TYPES.ADD_IMAGES:
      return {
        ...state,
        images: [...action.payload],
      };

    case CREATE_ACTION_TYPES.REMOVE_IMAGES:
      return {
        ...state,
        images: state.images.filter(img => img !== action.payload),
      };

    case CREATE_ACTION_TYPES.ADD_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case CREATE_ACTION_TYPES.ADD_INPUTS:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case CREATE_ACTION_TYPES.ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };

    case CREATE_ACTION_TYPES.REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };

    case CREATE_ACTION_TYPES.ADD_SHIPPING:
      return {
        ...state,
        shipping: [action.payload],
      };

    case CREATE_ACTION_TYPES.ADD_CAT:
      return {
        ...state,
        category: action.payload,
      };

    case CREATE_ACTION_TYPES.ADD_SUB_CAT:
      return {
        ...state,
        subCategory: action.payload,
      };

    case CREATE_ACTION_TYPES.ADD_USERID:
      return {
        ...state,
        userId: action.payload,
      };

    case CREATE_ACTION_TYPES.RESET_ITEMS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
