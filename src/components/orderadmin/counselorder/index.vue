<template>
<div>	
	<p>筹定订单管理</p>
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
  	<a-table :columns="columns" :dataSource="data" @change="onChange" bordered></a-table>
</div>
</template>
<script>
import Url from '../../../common/urlapi.js'	;	
	
const columns = [
{
  title: '订单编号',
  dataIndex: 'orderno',
  align:'center',
  
//sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: '礼品卡名称',
  dataIndex: 'cardname',
  align:'center',
//sorter: (a, b) => a.age - b.age,
}, {
  title: '数量',
  dataIndex: 'buycount',
  align:'center',
}, {
  title: '订单总额(元)',
  dataIndex: 'totalprices',
  align:'center',
}, {
  title: '买家名称',
  dataIndex: 'nickname',
  align:'center',
}, {
  	title: '订单状态',
  	dataIndex: 'statustxt',
  	align:'center',
  	filters: [		  
		  {
		    text: '筹定中，暂未发放',
		    value: '筹定中，暂未发放',
//		    value:2,
		  }, {
		    text: '筹定成功，已发放',
		    value: '筹定成功，已发放',
//		    value:3,
		  }, {
		    text: '筹定失败，已退款',
		    value: '筹定失败，已退款',
//		    value:4,
		  },		  
	],
  // specify the condition of filtering result
  // here is that finding the name started with `value`
	onFilter: (value, record) => record.statustxt.indexOf(value) == 0,
}
];
const data = [];
export default {
  data() {
    return {
      data,
      columns,
      tokenn:'',
      ordercont:'',
      searchorder:'',//输入框
    }
  },
  	created(){
		let that = this;
		
		let tokenn = sessionStorage.getItem('access_token');	
	  	this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'订单管理',
						path:'',
					},
					{
						txt:'筹定订单管理',
						path:'/index/counselorder'
					},
					
				],
//				titlecont:['订单管理','筹定订单管理']			
			}
		);	
	  	that.$http.get(Url.httpHost+'/ylncadmin/orderinfo/cardorderlist?access_token='+tokenn,)
	  	.then(res=>{
			console.log(res);
			let newarr = [];
			let arry = [];
	  		let objj = JSON.stringify(res.data.result.rows);
	  		newarr = JSON.parse(objj);
			console.log(newarr);
			newarr.map((val,index)=>{
				val.key = index;
				if( val.status == 0 ){
					val.statustxt = '筹定中，暂未发放';
					arry.push(val);
				}
				else if( val.status == 1 ){
					val.statustxt = '筹定成功，已发放';
					arry.push(val);
				}
				else if( val.status == 2 ){
					val.statustxt = '筹定失败，已退款';
					arry.push(val);
				}  			
				else{
					return false;
				}
			});
			that.data = arry;
			that.ordercont = arry;
//			console.log(that.data);  		
	  	})
	  	.catch(err=>{
	  		console.log(err.response);
	  	})	  		  	
	},
  	methods:{
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
