<template>
	<div>
		
		<check :orderid='orderids'></check>
		<orderinfo :orderid='orderids' :tochild="parentval"></orderinfo>
	</div>
</template>

<script>
import check from '@/components/orderadmin/bank/public/bankinfo';//上传图片
import orderinfo from '@/components/orderadmin/bank/public/orderinfo';//银行卡  - 订单信息
export default{
	
	data(){
		return{
			orderids:null,
			
			parentval:null,
		}
	},

	created(){
		this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'订单管理',
						path:'',
					},
					{
						txt:'银行卡订单管理',
						path:'/index/bank'
					},
					{
						txt:'历史支付信息',
						path:'/index/bank/history'
					},
				],			
			}
		);
		sessionStorage.setItem('banktxt','汇款信息');
		
		this.orderids = JSON.parse( sessionStorage.getItem('orderinfoid') );
		console.log( this.orderids );
		this.parentval = this.orderids.txt;

	},
	components: {
		check,
		orderinfo,
	},

	methods: {
      	
    },
    
}
</script>

<style>

</style>