import axios from "axios";

// get data by getServerSideProps
export const url = "http://192.168.80.164:8000";

const defaultOptions = {
  baseURL: `${url}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
};
// Create instance
const axios_common = axios.create(defaultOptions);

// Set the AUTH token for any request
axios_common.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axios_common.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (error) => {
    if (error != null && error.response.status == 401) {
      localStorage.removeItem("user");
      // window.location.pathname = "/library/login";
    }
    return Promise.reject(error);
  }
);

export default axios_common;
