import axiosInstance from "../utils/axiosInstance";

export const seenMessage = async (msg, dispatch) => {
  try {
    const response = await axiosInstance().put("/message/seen-message", msg);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const updateMessage = async (msg, dispatch) => {
  try {
    const response = await axiosInstance().put(
      "/message/delivered-message",
      msg
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};
