
// Add a request interceptor
import axios from 'axios';
axios.interceptors.request.use(function (config) {
    // 在请求发送之前做些什么
    const token = localStorage.getItem("token")
    config.headers.Authorization=`Bearer ${token}`
    return config;
}, function (error) {
    // 对请求错误做些什么
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    const {status} = error.response
    if(status===401){
        window.location.href="#/login"
    }
    return Promise.reject(error);
});