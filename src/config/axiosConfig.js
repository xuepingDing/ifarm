import axios from 'axios'
import Qs from 'qs'
import {
  BASE_URL
} from '../api/config'
import router from '../router/index'
import http from '../api/api'
// axios默认配置
axios.defaults.timeout = 15000
// axios.defaults.baseURL = BASE_URL
axios.defaults.transformRequest = function (data) {
  if (data.password||data.grant_type) {
    data = Qs.stringify(data)
    // console.log('触发qs');
  } else {
    data = JSON.stringify(data)
  }

  return data
}

// 请求拦截
// axios.interceptors.request.use(
//   config => {
//     if (config.method === 'POST' || config.method === "put"|| config.method === 'delete') {
//       console.log(99999);
//       // 序列化
//       // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//       // config.headers['Content-Type'] = 'application/json'
//     }

//     // 判断是否存在token，如果存在的话，则每个http header都加上token
//     // config.headers['X-Token'] = '714C7F6445BB4776A9F768866002CBF3';
//     // if (localStorage.token) {
//     //   config.headers['X-Token'] = localStorage.token
//     //   // config.headers['X-Token'] = '896358055C8745458799E64ECC32AB6A';
//     // }
//     // console.log(config);
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })

// 路由响应拦截
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {

  // router.replace({
  //   path: '/',
  //   query: {
  //     redirect: router.currentRoute.fullPath
  //   }
  // })

  // 对响应错误做点什么
  if (error.response) {
 
    switch (error.response.data.message) {
      case "无效的token":
        let refresh_token = sessionStorage.getItem('refresh_token')
        http.api({
          url: `oauth/token`,
          method: 'POST',
          headers: {
            "Authorization": "Basic dWRiOnVkYg==",
          },
          data: {
            refresh_token,
            "grant_type": 'refresh_token'
          }
        }).then(res => {
          if (res.status == 200) {
            sessionStorage.setItem('access_token', res.data.access_token)
            sessionStorage.setItem('refresh_token', res.data.refresh_token)
          }
        })

        break;

    }
  }
  return Promise.reject(error);
});

export default axios
