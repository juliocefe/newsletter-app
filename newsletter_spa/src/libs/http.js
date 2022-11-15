import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 7000
});

const getAccesToken = () => {
    return window.localStorage.getItem("token");
};

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
      // Atach the token before request
      const token = getAccesToken();
      if (token !== null)
        config.headers.Authorization = `Token ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

export default instance;
