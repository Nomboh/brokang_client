import axiosInstance from "../utils/axiosInstance";
import { ACTION_TYPES } from "./auth/actions";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: ACTION_TYPES.FETCH_START });
  try {
    const res = await axiosInstance().post("/auth/login", userCredentials);
    dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.FETCH_ERROR,
      payload: error?.response?.data,
    });
  }
};

export const logoutCall = async dispatch => {
  try {
    await axiosInstance().get("/auth/logout");
    dispatch({ type: ACTION_TYPES.LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
