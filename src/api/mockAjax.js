// 对axios进行二次封装
import axios from 'axios';
import nprogress from 'nprogress';
import "nprogress/nprogress.css";

// 1:利用axios对象的方法create,去创建一个axios实例
// 2:request就是axios
const requests = axios.create({
    baseURL:"/mock",
    timeout:5000
});

// 请求拦截器，在发请求之前请求拦截器可以拦截到，可以在请求发出去前做一些事
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里边有一个属性非常重要，header请求头
    nprogress.start();
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'));
});

// 对外暴露
export default requests;  