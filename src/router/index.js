import Vue from 'vue'
import Router from 'vue-router'

import login from '@/view/login/login';
import index from '@/view/index/index';

Vue.use(Router)

const router = new Router({
  	routes: [
		{
			path: '/',
			name: 'login',
			component: login,
			meta: {
				keepAlive: true // 需要被缓存
			}
		},
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: {
				keepAlive: true // 需要被缓存
			}
		},
		{
			path: '/index',
			name: 'index',
			component: index,
			meta:{ // 需要登录才能进入的页面可以增加一个meta属性
				requireAuth: true
			},
			children:[
				{
					path:'maps',
					component: () => import('../view/appletsadmin/home/map'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'maps/addmap',
					component: () => import('../view/appletsadmin/home/add/addmap'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'setup',
					component: () => import('../view/appletsadmin/home/setup'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'setup/addsetup',
					component: () => import('../view/appletsadmin/home/add/addsetup'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'base',
					component: () => import('../view/appletsadmin/home/base'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'base/addbase',
					component: () => import('../view/appletsadmin/home/add/addbase'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'gocheck',//入驻审核
					component: () => import('../view/baseadmin/check/gocheck'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'body',//乡村农场管理（基地主体）
					component: () => import('../view/baseadmin/body/index'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'body/baseadmin',//基地管理
					component: () => import('../view/baseadmin/body/base/index'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'body/baseadmin/add',//新增基地
					component: () => import('../view/baseadmin/body/base/add/index'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path:'body/baseadmin/edit',//编辑基地
					component: () => import('../view/baseadmin/body/base/add/index'),
					meta:{ 
							requireAuth: true
						},
				},
				{
					path: 'counselorder',//筹定订单
					component: () => import('../view/orderadmin/counselorder/index'),
					meta:{ 
							requireAuth: true
					},
					
				},
				{
					path: 'realorder',//实体订单
					component: () => import('../view/orderadmin/realorder/index'),
					meta:{ 
							requireAuth: true
					},			
				},
				{
					path: 'realorder/sends',//发货
					component: () => import('../view/orderadmin/realorder/sends/index'),
					meta:{ 
							requireAuth: true
					},
					
				},
				{
					path: 'realorder/lookorderdetails',//订单详情
					component: () => import('../view/orderadmin/realorder/lookorderdetails/index'),
					meta:{ 
							requireAuth: true
					},
				},
				{
					path: 'invoiceorder',//发票订单
					component: () => import('../view/orderadmin/invoiceorder/index'),
					meta:{ 
							requireAuth: true
					},
				},
				{
					path: 'invoiceorder/details',//发票订单--详情
					component: () => import('../view/orderadmin/invoiceorder/details/index'),
					meta:{ 
							requireAuth: true
					},
				},	
				{
					path: 'bank',//银行卡订单管理
					component: () => import('../view/orderadmin/bank/index'),
					meta:{ 
							requireAuth: true
					},
				},
				{
					path: 'bank/confirm',//银行卡订单管理--确认退款
					component: () => import('../components/orderadmin/bank/confirm/index'),
					meta:{ 
							requireAuth: true
					},
				},
				{
					path: 'bank/check',//银行卡订单管理--核对支付信息
					component: () => import('../components/orderadmin/bank/check/index'),
					meta:{ 
							requireAuth: true
					},
				},
				{
					path: 'bank/history',//银行卡订单管理--历史支付信息
					component: () => import('../components/orderadmin/bank/history/index'),
					meta:{ 
							requireAuth: true
					},
				},
				{
					path: 'bank/moneyinfo',//银行卡订单管理--退款信息
					component: () => import('../components/orderadmin/bank/moneyinfo/index'),
					meta:{ 
							requireAuth: true
					},
				},
				{
					path: 'body/giftbag',//产品列表
					component: () => import('../view/baseadmin/body/giftbag/index'),
					meta:{ 
						requireAuth: true
					},
				},
				{
					path: 'body/giftbag/add',//产品--新增
					component: () => import('../view/baseadmin/body/giftbag/add/index'),
					meta:{ 
						requireAuth: true
					},
				},
				{
					path: 'body/giftbag/edit',//产品--编辑
					component: () => import('../view/baseadmin/body/giftbag/add/index'),
					meta:{ 
						requireAuth: true
					},
				},											
				{
					path: 'giftcard',//礼品卡管理
					component: () => import('../view/giftcard/admin/index'),
					meta:{ 
						requireAuth: true
					},
				},
				{
					path: 'giftcard/giftcardlist',//礼品卡列表
					component: () => import('../view/giftcard/admin/list/index'),
					meta:{ 
						requireAuth: true
					},
				},
				{
					path: 'bbslist',//社区农场列表
					component: () => import('../view/bbsfarm/list/index'),
					meta:{ 
						requireAuth: true
					},
				},
				{
					path: 'bbslist/counseladmin',//筹定管理
					component: () => import('../components/bbsfarm/list/counseladmin/index'),
					meta:{ 
						requireAuth: true
					},
				},
				{
					path: 'bbslist/counseladmin/lookdetails',//筹定--详情
					component: () => import('../components/bbsfarm/list/counseladmin/lookdetails/index'),
					meta:{ 
						requireAuth: true
					},
				},
			]
		}
    
  	]
})

export default router