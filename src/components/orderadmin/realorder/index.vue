<template>
<div>	
	<p>实体订单管理</p>
	<div style="display: flex;align-items: center;">
		<span>订单查询：</span>
		<a-input-search
	      placeholder="输入订单号"
	      style="margin: 20px ; width: 60%;"
	      @search="onSearchs"
	      enterButton
	      v-model='searchorder'
	    />
	    <a-button type="primary" @click='allorder'>全部订单</a-button>
	</div>    
  	<a-table :columns="columns" :dataSource="data" @change="onChange" bordered>
			<template slot="operation" slot-scope="text, record, index">					
				<a-button type="primary" v-if="record.state == 1"  @click="onsends(record,index)">发货</a-button>					
				<a-button type="primary" v-if="record.state == 2" @click="onmodifi(record,index)" style='margin: 5px 0;'>修改物流单号</a-button>					
				<a-button type="primary" @click="onlook(record,index)" style='margin: 5px 0;'>查看</a-button>					
			</template>
	</a-table>
</div>
</template>
<script>
import Url from '../../../common/urlapi.js'	;	
	
export default {
  data() {
    return {
	  	data:[],
	  	columns : [
			{
			title: '订单编号',
			dataIndex: 'orderno',
			
			//sorter: (a, b) => a.name.length - b.name.length,
			}, {
			title: '商品名称',
			dataIndex: 'pkgname',
			//sorter: (a, b) => a.age - b.age,
			}, {
			title: '商品数量',
			dataIndex: 'buycount',
			align: "center",
			}, 
			{
			title: '单价',
			dataIndex: 'price',
			align: "center",
			}, 
			{//
			title: '订单总额(元)',
			align: "center",
			dataIndex: 'totalprices',
			}, {
			title: '收货人',
			align: "center",
			dataIndex: 'consignee',
			}, 
			{
				title: '订单状态',
				align: "center",
				dataIndex: 'statustxt',
				filters: [		  
					// {
					// 	text: '待支付',
					// 	value: '待支付',
					// }, 
					{
						text: '待发货',
						value: '待发货',
			//		    value:3,
					}, 
					{
						text: '待收货',
						value: '待收货',
			//		    value:4,0待支付、1待发货、2待确认收货、3已完成
					},	
					{
						text: '已完成',
						value: '已完成',
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
      	ordercont:'',
	  	searchorder:'',//输入框
    }
  },
  	created(){
		let that = this;
		let newarr = [];
		
		this.tokenn = sessionStorage.getItem('access_token');	
	  	this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'订单管理',
						path:'',
					},
					{
						txt:'实体订单管理',
						path:'/index/realorder'
					},
					
				],
//				titlecont:['订单管理','实体订单管理']			
			}
		);	
	  	this.listcont();	  		  	
	},
  	methods:{
		listcont(){//列表数据
			let arry = [];
			this.$http.get(Url.httpHost+'/ylncadmin/orderinfo?access_token='+this.tokenn,
				{
					params:{
						sourcetype: 2
					}
				}
			)
			.then(res=>{
				console.log(res);
				let objj = JSON.parse(JSON.stringify(res.data.result.rows) );
				// newarr = JSON.parse(objj);
				 console.log(objj);
				objj.map((val,index)=>{
					val.key = index;
					// if( val.state == 0 ){//0待支付、1待发货、2待确认收货、3已完成	
					// 	val.statustxt = '待支付';
					// 	arry.push(val);
					// }
					// else 
					if( val.price == null){
						val.price =0;
						console.log('null')
					}
					
					if( val.state == 1 ){
						val.statustxt = '待发货';
						arry.push(val);
					}
					else if( val.state == 2 ){
						val.statustxt = '待收货';
						arry.push(val);
					}
					else if( val.state == 3 ){
						val.statustxt = '已完成';
						arry.push(val);
					}  			
					else{
						return false;
					}
				})
				this.data = arry;
				this.ordercont = arry;
				console.log(this.data);  		
			})
			.catch(err=>{
				//console.log(err);
			})
		}, 
  		onSearchs(value){
//			//console.log(value);
			let contbox = [];
			let cont = JSON.stringify(this.ordercont);
			contbox = JSON.parse(cont);
//			//console.log(contbox);
					
			if( value == '' ){
				this.$message.error('先输入订单编号');
			}else{
				this.data = contbox.filter(item=>item.orderno == value );
				//console.log( this.data )
				
			}	
  		},
  		allorder(){
  			this.data = this.ordercont;
  			this.searchorder = '';
  		},
  		onChange(pagination, filters, sorter) {
//		  //console.log('params', pagination, filters, sorter);
		},
		onsends(rd,index){//发货
			console.log(rd,index);
			sessionStorage.setItem('orderdetailsid',rd.id);
			let orderobj = JSON.stringify( {orderno:rd.orderno,consignee:rd.consignee,address:rd.address,expressName:'',expressno:''} );
			sessionStorage.setItem('ordersendcont',orderobj);//发货信息
			this.$router.push({
    			path:'realorder/sends'
    		})
		},
		onlook(rd, index){//查看订单详情
			console.log(rd);
			sessionStorage.setItem('orderdetailsid',rd.id);
			this.$router.push({
    			path:'realorder/lookorderdetails'
    		})
		},
		onmodifi(rd, index){//修改物流单号
			console.log(rd,index);
			let objt = JSON.stringify({orderno:rd.orderno,consignee:rd.consignee,address:rd.address,expressName:rd.expressName,expressno:rd.expressno});
			sessionStorage.setItem('ordersendcont',objt);
			this.$router.push({
    			path:'realorder/sends'
    		})

		}
  	},
  
}

</script>
<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
