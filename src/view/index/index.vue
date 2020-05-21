<template>
	<div>
		
		<a-layout id="components-layout-demo-custom-trigger" style='height: 100%;min-height: 100vh;'
			 >
		    <a-layout-sider
		      :trigger="null"
		      collapsible
		      v-model="collapsed"
		      style="overflow-y:auto;flex: 1;"
		    >
		        <div class="logo" style="text-align: center;color: orange;font-size: 20px;" >云恋农场</div>
					<a-menu
					  	@openChange="onOpenChange"
					  	:openKeys="openKeys"
    					
					  	mode="inline"
					  	theme="dark"
					>				  
		<!-- @openChange="onOpenChange" -->
						<a-sub-menu key="sub1">
						    <span slot="title"><a-icon type="appstore" /><span>小程序运营管理</span></span>
						    <a-sub-menu key="sub2" title="乡村农场管理">
						      	<a-menu-item key="1">
						      		<router-link to='/index/maps'>
						      			<!-- 轮播图 -->
										轮播图
						      		</router-link>
						      	</a-menu-item>
						      	<a-menu-item key="2">
						      		<router-link to='/index/setup'>
						      			最新产品推荐
						      		</router-link>
						      	</a-menu-item>
						      	<a-menu-item key="3">
						      		<router-link to='/index/base'>
						      			乡村农场推荐
						      		</router-link>						      			
						      	</a-menu-item>
						    </a-sub-menu>
						</a-sub-menu>
						<a-sub-menu key="sub3">
						    <span slot="title"><a-icon type="bank" /><span>商家运营管理</span></span>			    
						    <!-- <a-sub-menu key="sub4" title="入驻审核管理"> -->
						    	<a-menu-item key="4">
						      		<router-link to='/index/gocheck'>
						      			入驻审核管理
						      		</router-link>
						      	</a-menu-item>
						      	
						    <!-- </a-sub-menu> -->
						    <!-- <a-sub-menu key="sub5" title="基地主体管理"> -->
						    	<a-menu-item key="5">
						      		<router-link to='/index/body'>
						      			<!--基地主体管理-->乡村农场管理
						      		</router-link>
						      	</a-menu-item>
						      	
						    <!-- </a-sub-menu> -->
						</a-sub-menu>
						<a-sub-menu key="sub6" >
							<span slot="title"><a-icon type="mail" /><span>订单管理</span></span>
					        <a-menu-item key="7">
					        	<router-link to='/index/counselorder'>
						      			筹定订单管理
						      	</router-link>
					        </a-menu-item>
							<a-menu-item key="8">
					        	<router-link to='/index/realorder'>
						      			实体订单管理
						      	</router-link>
					        </a-menu-item>
							<a-menu-item key="9">
					        	<router-link to='/index/invoiceorder'>
						      			发票订单管理
						      	</router-link>
					        </a-menu-item>
					        <a-menu-item key="10">
					        	<router-link to='/index/bank'>
						      			银行卡订单管理
						      	</router-link>
					        </a-menu-item>
					    </a-sub-menu>
					   	<!-- <a-sub-menu key="sub7" >
							<span slot="title"><a-icon type="pie-chart" /><span>礼包管理</span></span>
					        <a-menu-item key="10">
								<router-link to='/index/giftbag'>
									礼包管理
								</router-link>
					        </a-menu-item>
					    </a-sub-menu> -->
						<a-sub-menu key="sub7" >
							<span slot="title"><a-icon type="desktop" /><span>礼品卡管理</span></span>
					        <a-menu-item key="11">
								<router-link to='/index/giftcard'>
									礼品卡管理
								</router-link>
					        </a-menu-item>				
					    </a-sub-menu>
						<a-sub-menu key="sub8" >
							<span slot="title"><a-icon type="deployment-unit" /><span>社区农场管理</span></span>
					        <a-menu-item key="12">
								<router-link to='/index/bbslist'>
									社区农场列表
								</router-link>
					        </a-menu-item>							
					    </a-sub-menu>
						
					</a-menu>    
		    </a-layout-sider>
		    <a-layout style='min-width: 660px;overflow-y: auto;'>
		      	<a-layout-header style="background: #f0f2f5; padding: 0">
		        	<a-icon
			            class="trigger"
			            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
			            @click="()=> collapsed = !collapsed"
		        	/>
		        	<a-popconfirm title="确认退出登录?" @confirm="signout"  okText="确定" cancelText="取消">
					    <a-icon 
			        		class="trigger"
			        		type='logout'
			        		
			        		>
			        	</a-icon>
					</a-popconfirm>
		        	
		      	</a-layout-header>
		      	<div 
			      	style="background:#fff;padding:20px 40px;"
				>
		
			      	<a-breadcrumb >
				        <a-breadcrumb-item
				        	v-for='(itm,index) in $store.state.titlecont'
				        	:key='index'
				        >
				        	
							<router-Link :to='itm.path'>
								{{itm.txt}}
							</router-Link>
				        </a-breadcrumb-item>				      
				    </a-breadcrumb>
				    
		      	</div>
		      	<a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff',  }">
		       	 	
		       	 	
		       	 	
		       	 	<keep-alive>
						<router-view v-if="$route.meta.keepAlive"></router-view>
					</keep-alive>
					<router-view v-if="!$route.meta.keepAlive"></router-view>
					
		      	</a-layout-content>
		    </a-layout>
		</a-layout>		
		
		
		
		


	
	
	</div>
</template>

<script>
import Url from '../../common/urlapi.js';
export default{
	name:'index',
	components: {
		
	},
	data () {
	    return {
	      	collapsed: false,
		  	titlecont:this.$store.state.titlecont,
			  openKeys: ['sub1'],
			  rootSubmenuKeys: ['sub1', 'sub3', 'sub6', 'sub7', 'sub8'],
	    }
	},
	methods: {
		onOpenChange (openKeys) {
			const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
			if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
				this.openKeys = openKeys
			} else {
				this.openKeys = latestOpenKey ? [latestOpenKey] : []
			}
		},
		signout(){		
			let tokenn = sessionStorage.getItem('access_token');
//			console.log('退出')
			this.$http({
	          	method:'POST',
	          	url: Url.httpHost+'/ylncadmin/signOut?access_token='+tokenn,
			})
			.then(res=>{
//				console.log(res);
				if( res.status == 200 ){
//					that.$message.success('退出登录');
					sessionStorage.setItem('access_token', '');//把token 清空
	                sessionStorage.setItem('refresh_token', '');//把token 清空
					this.$router.push({
	        			path:'/login'
	        		})
				}
			})
			.catch(err=>{
				console.log(err);
			})
		},
		
		
	  },
}	
</script>

<style>
	/*必填标识 *红色 */
.tit_red{
	color: #F63F49;
	font-size: 20px;
	vertical-align: middle;
	margin-right: 4px;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
/*logo*/
#components-layout-demo-custom-trigger .logo {
  /*height: 32px;*/
  background: rgba(255,255,255,.2);
  margin: 16px;
  padding: 5px;
}
/*herder  折叠导航--- 退出*/
.ant-layout-header{
	display: flex;
	justify-content: space-between;
}
/*表格第一列的空 span */
span.indent-level-0{
	/*display: none;*/
}

/*表格的内容高度*/
.ant-layout-content {
    /*overflow-y: auto;*/
}
</style>