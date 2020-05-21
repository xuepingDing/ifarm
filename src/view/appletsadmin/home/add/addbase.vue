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
				type:3,
				title:'农场展示',
				selectbol:false,
				imgbol:false,
				path:'/index/base',
				
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
						path:''
					},
					{
						txt:'乡村农场管理',
						path:''
					},
					{
						txt:'乡村农场展示',
						path:'/index/base'
					},
					{
						txt:'新增农场展示',
						path:'/index/base/addbase'
					},
				]
			}
		)
	}
}

</script>
