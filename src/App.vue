<template>
  <div id="app">
  	<a-locale-provider :locale="locale"> 		
    	<router-view/>
    </a-locale-provider >

  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import login from '@/view/login/login'
import index from '@/view/index/index';

export default {
  name: 'App',
  data () {
    return {
      locale: zhCN,
    }
  },
  components:{
		login,
  	index,
  	
  },
  created(){
  	
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  
}

</style>
