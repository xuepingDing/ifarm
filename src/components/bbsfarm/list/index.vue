<template>
	<div>
		
		
		
		<a-table v-if='wubbol' :columns="columns" :dataSource="data" @change="onChange" bordered>
			<template slot="operation" slot-scope="text, record,">
				<a-button type="primary" @click="nextlist(record)">筹定管理</a-button>
			</template>
		</a-table>
        <titles v-else></titles>
        
	</div>
</template>

<script>
import Url from '../../../common/urlapi.js'	;
import titles from '@/components/publicmodule/title/index';

export default{
	name: "giftcardadmin",
	components: {
		titles,
	},
	data(){
//		this.cacheData = data.map(item => ({ ...item }))
		return{		
			wubbol:true,
			data:[
//				 {
//				 	key: 9999999991,
//				 	id:0,
//				 	farmname:'凤仪之诏',
//				 	nickname:'峡谷龙王',
//				 	mobile:'1314654654',				
//				 	member:'小书包',
//				 	doingcount:'筹定中9',
//				 	successcount:'成功8',
//				 	failcount:'失败7',
//				 }
			],
      		columns:[
				{
					title: 'id',
					dataIndex: 'id',
					align: "center",
					scopedSlots: { customRender: 'id' },
					//sorter: (a, b) => a.name.length - b.name.length,
				},
				{
					title: '社区农场名称',
					dataIndex: 'farmname',
					align: "center",
					scopedSlots: { customRender: 'farmname' },
					//sorter: (a, b) => a.age - b.age,
				}, 
				{
					title: '农场主昵称',
					dataIndex: 'nickname',
					align: "center",
					scopedSlots: { customRender: 'nickname' },
				}, 
				{
					title: '农场主联系方式',
					dataIndex: 'mobile',
					align: "center",
					scopedSlots: { customRender: 'mobile' },
				},
				{
					title: '农场成员',
					dataIndex: 'usercount',
					align: "center",
					scopedSlots: { customRender: 'usercount' },
				},
				{
					title: '筹定中的产品数',
					dataIndex: 'doingcount',
					align: "center",
					scopedSlots: { customRender: 'doingcount' },
				},
				{
					title: '筹定成功的产品数',
					dataIndex: 'successcount',
					align: "center",
					scopedSlots: { customRender: 'successcount' },
				},
				{
					title: '筹定失败的产品数',
					dataIndex: 'failcount',
					align: "center",
					scopedSlots: { customRender: 'failcount' },
				},
				{
					title: '操作',
					dataIndex: 'operation',
					scopedSlots: { customRender: 'operation' },
					align: "center",
				},
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
						txt:'社区农场管理',
						path:'',
					},
					{
						txt:'社区农场列表',
						path:'/index/bbslist'
					},
				],

			}
		);
		this.list();
	},
	methods:{
		list(){
			this.$http.get(Url.httpHost+'/ylncadmin/farm?access_token='+this.tokenn,)
			.then((res)=>{
				console.log(res);
				if (res.data.code == 200){
					// console.log('礼品卡管理');
					if(res.data.result.rows.length > 0 ){
						let arrcont = res.data.result.rows;
						this.data = [];
						arrcont.map((row, i) => {
							
//							if(row.farmName == null ){
//								row.farmName = '未填写';
//							} 
//							if(row.nickname == null ){
//								row.nickname = '未填写';
//							}
//							if(row.mobile == null ){
//								row.mobile = '未填写';
//							}
//							if(row.usercount == null ){
//								row.usercount = '0';
//							}
							if(row.doingcount == null ){
								row.doingcount = '0';
							}
							if(row.successcount == null ){
								row.successcount = '0';
							}
							if(row.failcount == null ){
								row.failcount = '0';
							}
							this.data.push({
								key : i,
								id : row.id,
								farmname : row.farmName,
							 	nickname : row.nickname,
							 	mobile : row.mobile,				
							 	usercount : row.usercount,
							 	doingcount : row.doingcount,
							 	successcount : row.successcount,
							 	failcount : row.failcount,
							})
						})
						console.log(this.data);
					}
				}
			})
			.catch((err) => {
				console.log(err.response);
				this.wubbol = !this.wubbol;
			})
		},
		onChange(pagination, filters, sorter) {
			console.log('params', pagination, filters, sorter);
		},
		nextlist(record){
			console.log(record);
			console.log('筹定管理')
			sessionStorage.setItem("sqfarmId",record.id);//社区农场id
			this.$router.push({
    			path:'bbslist/counseladmin'
    		})

		},

	},

}
</script>