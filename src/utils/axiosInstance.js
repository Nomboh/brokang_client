import axios from "axios";
const axiosInstance = () =>
  axios.create({
    baseURL: "https://brokang-api.onrender.com/api/v1",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  });
export default axiosInstance;
