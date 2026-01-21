import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/login";
      console.log(`${err.data.code}: ${err.data.message}`);
    }
    return Promise.reject(err);
  },
);
export default axios;
