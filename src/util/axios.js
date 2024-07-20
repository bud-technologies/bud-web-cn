import axios from "axios";
// 创建axios实例
const service = axios.create({
    baseURL: '/', // api的base_url
    // withCredentials: true,
    timeout: 15000 // 请求超时时间
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

// request拦截器
service.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      // Do something with request error
      Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
      const data = response.data;
      // console.log(response) ;
      return data;
    },
    error => {
      return Promise.reject(error);
    }
);

export default service;
