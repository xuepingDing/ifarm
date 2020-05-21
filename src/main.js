// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

//全局引入完整antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

//数据请求插件axios
import axios from 'axios'
Vue.prototype.$http = axios;

//粒子背景插件
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)

Vue.config.productionTip = false

import Url from './common/urlapi.js';

//登录状态
router.beforeEach((to, from, next) => {
//Vue.prototype.token = access_token;
//alert( Url.httpHost );
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(sessionStorage.getItem('access_token')){ //判断本地是否存在access_token
      let access_token = sessionStorage.getItem('access_token');
//    alert('access_token');
      axios.get(
	  			Url.httpHost+'/ylncadmin/homepagedata'
	  		,{
				params:{
					access_token:access_token,
				},
			}).then(res=>{
				next();
			}).catch(err=>{
				console.log(err);
				console.log( err.response);
				console.log( err.response.data );
				if( err.response.data.result == 0 ){
					console.log(err.response.data.msg)
					next({
	          path:'/login'
	        })
					this.$router.push({
						path:'/login'
					})
				}else {
					console.log('000')
//        alert(err.response.data.msg)
        }
			})   
      next();
    }
    else{
      if( to.path === '/login' ){
        next();
      }
      else{
        next({
          path:'/login'
        })
      }
    }
  }
  else {
    next();
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
