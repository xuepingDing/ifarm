<template>
	<div>
		<adddata :dataobj= "dataobja"></adddata>
	</div>
</template>

<script>
import adddata from '@/components/appletsadmin/home/adddata/adddata';//新增

export default{
	data(){
		return{
			dataobja:{
				type:1,
				title:'产品推荐',
				selectbol:false,
				imgbol:true,
				path:'/index/setup',
				
			}
		}
	},
	components: {
		adddata,
	},
	created(){
		this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'小程序运营管理',
						path:'',
					},
					{
						txt:'乡村农场管理',
						path:''
					},
					{
						txt:'最新产品推荐',
						path:'/index/setup'
					},
					{
						txt:'新增产品推荐',
						path:'/index/setup/addsetup'
					},
				],
			}
		)
	}
}
</script>
