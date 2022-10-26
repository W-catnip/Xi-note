// 封装axios
import router from '@/router';
import axios from 'axios';
import serverConfig from './config';
import Message from '../components/Message/Message'

// 创建axios实例
const serviceAxios = axios.create({
  baseURL: serverConfig.baseURL,
  timeout: 10000,
})

// 请求拦截
serviceAxios.interceptors.request.use(
  (config) => {
    // 将请求头添加token
    // confing.url可拿到当前页面路径，出去登陆页面，其它的页面携带token
    if (config.method == 'post') {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    if (config.url !== '/login') {
      let token = localStorage.getItem('token')
      // 请求头携带token
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error)
  })

// 响应拦截
serviceAxios.interceptors.response.use(
  (response) => {
    // 给部分请求弹窗显示状态
    if (response.config.method !== 'get') {
      if (response.data.status !== 0) {
        Message.error(response.data.message)
      } else {
        Message.success(response.data.message)
      }
    }
    return response.data;
  },
  (error) => {
    // 如果token过期，则将页面跳转到登录页面
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login'
          })
      }
    }
    Message.error(error.response)
    return Promise.reject(error.response)
  }
)

export default serviceAxios;