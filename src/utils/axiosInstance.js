import axios from "axios";
const axiosInstance = () =>
  axios.create({
    baseURL:
      process.env.REACT_APP_BROKANG_URL /* "http://localhost:8000/api/v1" */,
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  });
export default axiosInstance;
