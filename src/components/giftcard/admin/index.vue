<template>
	<div>
		<a-table :columns="columns" :dataSource="data" @change="onChange" bordered>
			<template slot="operation" slot-scope="text, record,">
				<!--{{record}}-->
				<a-button type="primary" @click="nextlist(record)">礼品卡列表</a-button>
			</template>
		</a-table>
        
	</div>
</template>

<script>
import Url from '../../../common/urlapi.js'	;
export default{
	name: "giftcardadmin",
	components: {
		
	},
	data(){
		return{
			columns : [
				{
					title: 'id',
					dataIndex: 'id',
					align: "center",
					//sorter: (a, b) => a.name.length - b.name.length,
				},
				{
					title: '筹定的农场',
					dataIndex: 'orgname',
					align: "center",
				},
				{
					title: '筹定产品',
					dataIndex: 'pkgname',
					align: "center",
					//sorter: (a, b) => a.age - b.age,
				}, 
				{
					title: '礼品卡总数',
					dataIndex: 'cardcount',
					align: "center",
				}, 
				{
					title: '已兑换',
					dataIndex: 'exchangecount',
					align: "center",
				},
				{
					title: '已注销',
					dataIndex: 'cancelcount',
					align: "center",
				},
				
				{
					title: '当前状态',
					dataIndex: 'statustxt',
					align: "center",
				},
				{
					title: '有效期',
					dataIndex: 'cardvaliddate',
					align: "center",
				},
				{
					title: '最佳兑换时间段',
					dataIndex: 'nicknamet',
					align: "center",
				},
				{
					title: '操作',
					dataIndex: 'operation',
					scopedSlots: { customRender: 'operation' },
					align: "center",
				},
			],
			data :[
				// {
				// 	key: 1,
				// 	orderno:'56',
				// 	cardname:'df234ef3',
				// 	buycount:'f3fw3',				
				// 	nickname:'hghj8',
				// 	nicknamew:'jyuk9',
				// 	nicknamer:'dfv3',
				// 	nicknamet:'fgb786e',
				// 	statustxt:'筹定成功，已发放',	
				// }
			],
			tokenn:'',	
		}
	},
	created(){
		this.tokenn = sessionStorage.getItem('access_token');	
	  	this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'礼品卡管理',
						path:'',
					},
					{
						txt:'礼品卡管理列表',
						path:'/index/giftcard'
					},
					
				],

			}
		);
		this.list();
	},
	methods:{
		list(){
			this.$http.get(Url.httpHost+'/ylncadmin/usercards/pkgcardslist?access_token='+this.tokenn,)
			.then((res)=>{
				console.log(res);
				if (res.data.code == 200){
					// console.log('礼品卡管理');
					if(res.data.result.rows.length > 0 ){
						let arrcont = res.data.result.rows;
						arrcont.map((row, i) => {
							let sta = '';
							if( row.cancelcount == row.cardcount ){
								sta = '所有礼品卡已注销';
							}
							else if(row.status == 1){
								sta = '正常';
							}
							else if(row.status == 2){
								sta = '已兑换完毕';
							}
							else if(row.status == 3 ){
								sta = '已过期';
							}
							else{
								return;
							}
							let datatime = row.cardvaliddate.split(':');
							this.data.push({
								key: i,
								id:row.id,
								pkgname : row.pkgname,
								cardcount : row.cardcount,
								exchangecount : row.exchangecount,
								orgname : row.farmname,
								cardvaliddate : row.cardvalidbegindate+'~'+row.cardvalidenddate,
								nicknamet : row.cardbegindate+' ~ '+row.cardenddate,
								statustxt : sta,
								giftpkgid : row.giftpkgid,
								cancelcount:row.cancelcount,//注销数量
							})
							
							

						})
					}
				}
			})
			.catch((err) => {
				console.log(err.response);
				
			})
		},
		onChange(pagination, filters, sorter) {
			console.log('params', pagination, filters, sorter);
		},
		nextlist(record){
			console.log(record);
			sessionStorage.setItem("giftpkgid",record.giftpkgid);
			sessionStorage.setItem("groupBuyId",record.id);
			
			this.$router.push({
    			path:'giftcard/giftcardlist'
    		})

		},

	},

}
</script>