<template>
	<div>
		<a-table :columns="columns" :dataSource="data" @change="onChange" bordered>
			<template slot="operation" slot-scope="text, record, index">
					<a-button type="primary" @click="lookdetail(record)">查看详情</a-button>
					<a-popconfirm v-if="record.state == 0"
						style='margin: 5px 0;'
						title='确定开票吗？开票后请及时邮寄发票哦。'
						@confirm="() => onopen(record)">
						<a-button :type="invstype" >开票</a-button>
					</a-popconfirm>
					<a-button disabled v-else>已开票</a-button>
					<!-- {{record}} -->
			</template>
		</a-table>
	</div>
</template>

<script>
import Url from '../../../common/urlapi.js'	;
export default{
	name: "invoiceordercont",
	components:{
	},
	data(){
		return {
			data:[
				// {
				// 	key:0,
				// 	id:'3215',
				// 	companyname:'德信数据',
				// 	invamount:12,
				// 	invtype:0,
				// 	totalprices:'shunfeng010',
				// 	addtime:'2019/0912 10:10:10',
				// 	statetxt:'已开票',
				// 	state:1,
				// },				
			],
			columns : [
				{
					title: '发票id',
					dataIndex: 'id',
					align:'center'
					//sorter: (a, b) => a.name.length - b.name.length,
				}, 
				{
					title: '公司名称',
					dataIndex: 'invname',
					//sorter: (a, b) => a.age - b.age,companyname
				}, 
				{
					title: '发票金额（元）',
					dataIndex: 'invamount',
					align:'center'
				}, 
				{
					title: '发票类型',
					dataIndex: 'types',
				}, 
				{
					title: '开票时间',
					dataIndex: 'addtime',
				},
				{
					title: '开票状态',
					dataIndex: 'statetxt',
					align:'center',
					filters: [		  
						{
							text: '待开票',
							value: '待开票',
				//		    value:2,
						}, {
							text: '已开票',
							value: '已开票',
				//		    value:3,
						},	  
					],
					// specify the condition of filtering result
					// here is that finding the name started with `value`
					onFilter: (value, record) => record.statustxt.indexOf(value) == 0,
				},
				{
					title: '操作',
					align:'center',
					dataIndex: 'operation',
					scopedSlots: { customRender: 'operation' },
				}
			],
			tokenn:'',
			invstype:'primary',//开票
		}
	},
	created(){
		this.tokenn = sessionStorage.getItem('access_token');	
	  	this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'订单管理',
						path:'',
					},
					{
						txt:'发票订单管理',
						path:'/index/invoiceorder'
					},
					
				],
//				titlecont:['订单管理','发票订单管理']			
			}
		);
		this.invlist();
		this.data.map( (val,i)=>{
			if( val.invtype == 0 ){
				val.types = '普通发票';	
			}
			else{
				val.types = '专用发票';	
			}
		})
	},
	methods: {
		invlist(){//发票记录--列表
			this.$http.get(Url.httpHost+'/ylncadmin/invrecord?access_token='+this.tokenn,)
			.then((response) => {
				console.log(response);
				if(response.data.code == 200){
					if (response.data.result.rows.length > 0){
						this.data = response.data.result.rows;
						console.log(this.data);
						this.data.map( (val,i)=>{
							val.key = i;
							if( val.invtype == 0 ){
								val.types = '普通发票';	
							}
							else{
								val.types = '专用发票';	
							}

							if( val.state == 0 ){
								val.statetxt = '待开票'
							}else {
								val.statetxt = '已开票'
							}
						})	
					}
					
				}
			})
			
		},
		onChange(pagination, filters, sorter) {
//		  //console.log('params', pagination, filters, sorter);
		},
		lookdetail(record){
			console.log(record);
			sessionStorage.setItem("fapiaoid",record.id);
			// this.$message.info('This is a 详情');
			this.$router.push({
				path:'invoiceorder/details'
			})
		},
		onopen(record){
			let cont = {id:record.id,state:1};
			this.$http({
				url:Url.httpHost+'/ylncadmin/invrecord/',
				method:'PUT',
				data:cont,
				headers: {
					'content-type':'application/json',
					"Authorization": "bearer "+this.tokenn,				            	
				},
			})
			.then((res)=>{
				console.log(res);
				if(res.data.code == 200){
					this.invlist();
				}
			})
			.catch((err) => {
				console.log(err);
				
			})

			this.$message.info('开发票');
		},
	}
}
</script>