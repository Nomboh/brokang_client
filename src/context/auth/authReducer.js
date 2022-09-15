import { ACTION_TYPES } from "./actions";

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        loading: true,
        user: null,
        error: null,
      };

    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case ACTION_TYPES.FETCH_ERROR:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };

    case ACTION_TYPES.LOGOUT:
      return {
        loading: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
