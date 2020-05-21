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
				type:0,
				title:'轮播图',	
				selectbol:true,
				imgbol:true,
				path:'/index/maps',
				
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
						txt:'轮播图',
						path:'/index/maps'
					},
					{
						txt:'新增轮播图',
						path:'/index/maps/addmap'
					},
				]

			}
		)
	}
}

</script>
