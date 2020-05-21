import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  	
		titlecont:[],//面包屑
//		arrpath:[],
		addgift:true,
		addbase:true,
  },
  mutations: {   
    modifytitle(sta,par){//修改面包屑
    	console.log(sta);
    	console.log(par);
    	sta.titlecont = par.arry;    	
    },    
    
  }
})
export default store