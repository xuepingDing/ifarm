<template>
	<div>
		
		
		<a-table :columns="columns" :dataSource="data" bordered>
			
		</a-table>
	</div>
</template>

<script>
import Url from '../../../../../common/urlapi.js'	;
export default{
	data(){
		return{
			tokenn:'',
			columns : [
				{
					title: 'id',
					dataIndex: 'id',
					align: "center",
					//sorter: (a, b) => a.name.length - b.name.length,
				},
				{
					title: '筹定人',
					dataIndex: 'pkgname',
					align: "center",
					//sorter: (a, b) => a.age - b.age,
				}, 				
				{
					title: '筹定份数',
					dataIndex: 'number',
					align: "center",
				},
				{
					title: '筹定总金额',
					dataIndex: 'totalMoney',
					align: "center",
				},				
			],
			data:[
//				{
//					key:99999999,
//					id:0,
//					pkgname:'卤蛋',
//					number:'100',
//					totalMoney:'120',
//					
//				}
			],
			
		}
	},	
	components: {
		
	},
	created(){
		this.tokenn = sessionStorage.getItem('access_token');	
	  	this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'社区农场管理',
						path:'',
					},
					{
						txt:'社区农场列表',
						path:'/index/bbslist'
					},
					{
						txt:'筹定管理',
						path:'/index/bbslist/counseladmin'
					},
					{
						txt:'查看详情',
						path:'/index/bbslist/counseladmin/lookdetails'
					},
				],

			}
		);
		this.list();
	},
	methods:{
		
		list(){
			let id = sessionStorage.getItem('detailsid');
			this.$http.get(Url.httpHost+'/ylncadmin/orderinfo/buydetaillist',{
				params:{
					access_token:this.tokenn,
					groupBuyId:id
				}
			})
			.then(res=>{
				console.log(res);
				if (res.data.code == 200){
					if(res.data.result.rows.length > 0 ){
						let arrcont = res.data.result.rows;
						this.data = [];
						arrcont.map((row, i) => {
							if( row.number == null ){
								row.number = 0;
							}
							this.data.push(
								{
									key : i,
									id : row.id,
									pkgname : row.nikeName,
									number : row.number,
									totalMoney : row.totalPrices
								}
							)
						})
					}else{
						this.$message.error('没有数据~~')
					}
				}
			})
			.catch(err=>{
				console.log(err);
			})
			
//			let id = sessionStorage.getItem('detailsid');
//			this.$http.get(Url.httpHost+'/ylncadmin/groupbuy/'+id,{
//				params:{
//					access_token:this.tokenn,
//				}
//			})
//			.then((res)=>{
//				console.log(res);
//				console.log(res.data.result);
//				if (res.data.code == 200){
//					if(res.data.result.rows.length > 0 ){
//						let arrcont = res.data.result.rows;
//						arrcont.map((row, i) => {
//							this.data.push({
//								key : i,
//								id : row.id,
//								pkgname : '卤蛋',
//								number : '100',
//								totalMoney : '120',
//							})
//						})
//					}
//				}
//			})
//			.catch((err) => {
//				console.log(err);				
//			})
		},
	}
}
</script>