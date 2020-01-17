import axios from 'axios';
import qs from 'qs';
import CNToast from './Toast';

// 在使用axios时，注意到配置选项中包含params和data两者，以为他们是相同的，实则不然。
// 因为params是添加到url的请求字符串中的，用于get请求。 
// 而data是添加到请求体（body）中的， 用于post请求。

// 配置axios
axios.baseURL = '/api';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.responseType = 'json';
axios.defaults.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
};

// 请求拦截处理
axios.interceptors.request.use((config)=> {
    // 在发送请求之前做些什么, 添加Toast请求提示; 
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

  // 响应拦截处理
axios.interceptors.response.use((response)=> {
    CNToast.dismiss();
    // 对响应数据做点什么
    return response;
}, function (error) {
    CNToast.dismiss();
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 返回error对象中stauts对应提示
const erroMessage = (error)=>{
    if (error && error.response) {
        switch (error.response.status) {
            case 400: error.message = '错误请求'; break;
            case 404: error.message = '请求错误，未找到资源'; break;
            case 408: error.message = '请求超时'; break;
            case 502: error.message = '网络错误'; break;
            default: error.message = `连接错误${error.response.status}`;
        }
    } else {
        error.message = '网络出现问题，请稍后再试'
    }
    // toast提示
    console.log('响应错误', error)
}

export default class Network {
    static post(url, params = {}) {
        CNToast.loading();

        return new Promise((resolve, reject)=>{
            axios.request({
                method:'POST',
                url: url,
                data: qs.stringify(params)
            })
            .then((response)=>{
                resolve(response);
            })
            .catch((error)=>{
                erroMessage(error);
                reject(error);
            })
        })
    };

    static get(url, params = {}) {
        CNToast.loading();
        
        return new Promise((resolve, reject)=>{
            axios.get(url, {params: params})
            .then((response)=>{
                resolve(response);
            })
            .catch((error)=>{
                // catch作用, 如果前面有任何的promise 执行失败, 则立即终止, 马上进入 catch中
                erroMessage(error);
                reject(error);
            })
        })
    }
}