<template>
<div>	
	<p>银行卡订单管理</p>
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
  	<a-table 
  		:columns="columns" 
  		:dataSource="data" 
  		@change="onChange" 
  		bordered 
  		:pagination="{showQuickJumper:true,showSizeChanger:true}"
  		>
  		<template slot='statustxt' slot-scope="text, record, index">
  			{{text.replace(/\d+$/,'')}}
  		</template>
  		<template slot="operation" slot-scope="text, record, index">	
  			<!--{{index}}<br />-->
  			<!--{{record}}-->
  			<!--checkbol:{{record.checkbol}}<br />-->
  			<!--historybol:{{record.historybol}}<br />-->  			
  			<!--conbol:{{record.conbol}}<br />-->  			
  			<!--moneybol:{{record.moneybol}}<br />-->
  			<!--{{record.dnf}}-->
			<a-button v-show='record.checkbol' type="primary" style='margin: 5px 0;'@click='gocheck(record)'>核对支付信息</a-button>
			<a-button v-show='record.historybol' type="primary" @click='gohistory(record)'>历史支付信息</a-button>
			<a-button v-show='record.conbol' type="primary" style='margin: 5px 0;' @click='goconfirm(record)'>确认退款</a-button>
			<a-button v-show='record.moneybol' type="primary" @click='gomoneyinfo(record)'>退款信息</a-button>
			<a-button type="primary" style='margin: 5px 0;' @click="showModal(record)">订单详情</a-button>					
		</template>
  	</a-table>
  	<!--详情-->
  	<a-modal 
  		title="订单详情" 
  		v-model="visible" 
  		
  		:footer='false'
  		:maskClosable='true'
  	>
      	<orderinfo  :tochild="parentval" :orderid='orderids'></orderinfo>     	
    </a-modal>
</div>
</template>
<script>
import Url from '../../../common/urlapi.js'	;	
import orderinfo from '@/components/orderadmin/bank/public/orderinfo';//银行卡  - 订单信息
export default {
	name : 'bankbox',
  	data() {
	    return {
//	    	orderids:null,//订单信息--id
	    	orderids:{
	    		orderno:null,//汇款信息
	    		remitType:0,//汇款类型：0支付1退款
	    		id:null,//订单信息id
	    	},
	    	
	    	flag:true,//是否提交表单数据
	    	
			parentval:null,
	    	checkbol : false,
	    	historybol : false,
	    	conbol : false,
	    	moneybol : false,
	    	
	    	visible : false,
	    	numbers : 9,
	      	data : [],
	      	columns : [
				{
				  	title : '订单编号',
				  	dataIndex : 'orderno',
				  	align : 'center',
				  
				//sorter: (a, b) => a.name.length - b.name.length,
				}, 
				{
				  	title : '商品名称',
				  	dataIndex : 'pkgname',
				  	align : 'center',
				//sorter: (a, b) => a.age - b.age,
				}, 
				{
				  	title : '数量',
				  	dataIndex : 'buycount',
				  	align : 'center',
				},
				{
				  	title : '单价(元)',
				  	dataIndex : 'price',
				  	align : 'center',
				},
				{
				  	title : '订单总额(元)',
				  	dataIndex : 'totalprices',
				  	align : 'center',
				}, 
				{
				  	title : '买家名称',
				  	dataIndex : 'nikeName',
				  	align : 'center',
				}, 
				{
				  	title : '订单状态',
				  	dataIndex : 'statustxt',
				  	align : 'center',
					scopedSlots : { customRender: 'statustxt' },
				  	filters	: [		  
					  	{
					    	text : '等待用户支付确认',
					    	value : '等待用户支付确认',
					  	}, 
					  	{
					    	text : '等待工作人员确认',
					    	value : '等待工作人员确认',
					  	},
					  	{
					    	text : '审核失败',
					    	value : '审核失败',
					  	},
					  	{
					    	text : '已取消',
					    	value : '已取消',
					  	},
					  	{
					    	text : '筹定成功,已发放',
					    	value : '筹定成功,已发放',
					  	},
					  	{
					    	text : '筹定成功,待退款',
					    	value : '筹定成功,待退款',
					  	}, 
					  	{
					    	text : '筹定失败,已退款',
					    	value : '筹定失败,已退款',
					  	},		  
					  	{
					    	text : '筹定中,暂未发放',
					    	value : '筹定中,暂未发放',
					  	}
					],
//					filterMultiple:false,//多选
				  // specify the condition of filtering result
				  // here is that finding the name started with `value`
					onFilter : (value, record) => record.statustxt.indexOf(value) == 0,
				},
				{
					title : '操作',
					align :'center',
					dataIndex : 'operation',
					scopedSlots : { customRender: 'operation' },
				}
			],
	      	tokenn : '',
	      	ordercont : '',//全部订单
	      	searchorder : '',//输入框
	      	numbm:0,
	      	numbn:0,
	    }
  	},
  	created(){
		let that = this;

		this.tokenn = sessionStorage.getItem('access_token');	
		
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
				],			
			}
		);	
	  	this.$http.get(Url.httpHost+'/ylncadmin/orderinfo/cardOrderlist?access_token='+this.tokenn,)
	  	.then(res=>{
			console.log(res);
			let newarr = [];
			let arry = [];
	  		newarr = JSON.parse( JSON.stringify(res.data.result.rows) );
//			console.log(newarr);
			let numbm = 0,numbn = 0;
			newarr.map((val,index)=>{
				val.key = index;
				if(val.price == null ) val.price = 0;
				if(val.totalprices == null ) val.totalprices = 0;//nikeName-consignee
				if(val.nikeName == null ) val.nikeName = '未填写';
//				arry.push(val);
//				val.txt = 'null';
				if( val.state == 0 ){
//					val.statustxt = '等待用户支付确认';
//					val.txt = '等待用户支付确认';
//					val.checkbol = false;
//		    			val.historybol = false;
//		    			val.conbol = false;
//		    			val.moneybol = false;					
//						arry.push(val);					
//					console.log('等待用户支付确认');
					if( val.notifystatus <= -1 ){
						val.dnf = '未提交';
						val.statustxt = '已取消';
						val.flag = false;
						console.log('未提交表单数据。。。');
						val.checkbol = false;
		    			val.historybol = true;
		    			val.conbol = false;
		    			val.moneybol = false;					
						arry.push(val);
					}else{
						
						val.dnf = '已提交';
						val.flag = true;
						val.statustxt = '等待用户支付确认';
						val.checkbol = false;
		    			val.historybol = false;
		    			val.conbol = false;
		    			val.moneybol = false;					
						arry.push(val);	
					}
					
				}
				else if( val.state == 1 && val.notifystatus == 1 ){
					this.numbm++;
					val.statustxt = '等待工作人员确认' ;
					val.checkbol = true;
					
//					val.txt = '等待工作人员确认' + this.numbm;

					arry.push(val);
//					console.log('等待工作人员确认');
				}
				else if( val.state == 1 && val.notifystatus == -1 ){
					val.statustxt = '审核失败';
//					val.txt = '审核失败';
					val.historybol = true;
					arry.push(val);
//					console.log('审核失败');
				} 
				else if( val.state == 1 && val.notifystatus < -1 ){
					val.statustxt = '已取消';
//					val.txt = '已取消';
					val.historybol = true;
//					console.log(this.historybol);
					arry.push(val);
//					console.log('已取消');
				} 
				else if( val.state == 1 && val.notifystatus == 2 ){
					if( val.status == -1 ){
						if( val.refundState == 2 ){
							val.statustxt = '筹定失败,已退款';
//							val.txt = '筹定失败,已退款';
							val.moneybol = true;
							arry.push(val);
//							console.log('筹定失败,已退款');
						}else{
							this.numbn++;
							val.statustxt = '筹定失败,待退款' ;
							val.conbol = true;
							
//							val.txt = '筹定失败,待退款' + this.numbn;

							arry.push(val);
//							console.log('筹定失败,待退款');
						}						
					}else if( val.status == 1  ){
						val.statustxt = '筹定成功,已发放';
//						val.txt = '筹定成功,已发放';
						val.historybol = true;
						arry.push(val);
//						console.log('筹定成功,已发放');
					}else{//val.status == 0
						val.statustxt = '筹定中,暂未发放';
//						val.txt = '筹定中';
						val.historybol = true;
						arry.push(val);
//						console.log('筹定中');
					}					
				} 						
				else{
					val.checkbol = false;
	    			val.historybol = false;
	    			val.conbol = false;
	    			val.moneybol = false;
	    			arry.push(val);
				}				
			});
			
			arry.map( val =>{
				if( val.statustxt == '等待工作人员确认' ){
					val.statustxt = '等待工作人员确认' + this.numbm ;
				}else if( val.statustxt == '筹定失败,待退款' ){
					val.statustxt = '筹定失败,待退款' + this.numbn ;
				}else{
					return;
				}
				
			} )			
			
			that.data = arry;
			that.ordercont = arry;
//			console.log('*********************************************')
//			console.log( that.columns[6].filters[1].value );
//			console.log( that.columns[6].filters[5].value );
			console.log( this.numbm );
			console.log( this.numbn );
			this.columns[6].filters[1].text = '等待工作人员确认' + this.numbm;
			this.columns[6].filters[1].value = '等待工作人员确认' + this.numbm;
			this.columns[6].filters[5].text = '筹定失败,待退款' + this.numbn;
			this.columns[6].filters[5].value = '筹定失败,待退款' + this.numbn;
			console.log(that.data);  		
	  	})
	  	.catch(err=>{
	  		console.log(err.response);
	  		this.$message.error( err.response.data.message )
	  	})	  		  	
	},
	components:{
		orderinfo,
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
  		allorder(){//全部
  			this.data = this.ordercont;
  			this.searchorder = '';
  		},
  		onChange(pagination, filters, sorter) {
		  	console.log('params', pagination, filters, sorter);
		  	console.log(filters.statustxt);		  	
		},
		//订单详情
		showModal(record) {
        	this.visible = true;
//			this.$message.success();
			console.log(record);
			//只查看订单详情，只需要订单id
			this.orderids.id = record.id;
			this.orderids.orderno = null;
			this.orderids.remitType = 0;//汇款类型：0支付1退款
			
			this.parentval = record.statustxt;
			
//			sessionStorage.setItem('orderinfoid',
//			JSON.stringify(
//			{
//				id:record.id,
//				sta:record.statustxt
//			}
//			));
			
      	},
		handleOk(e) {
	        console.log(e);
	        this.visible = false;
	   	},
	   	goconfirm(record){//确认退款
//	   		console.log('确认退款');	
	   		sessionStorage.setItem('orderinfoid',
				JSON.stringify(
					{
						id : record.id,
						remitType : 0,
						orderno : record.orderno,
						mobile : record.mobile,
						txt : record.statustxt
					}
				)
			);
	   		this.$router.push({
				path:'bank/confirm'
			});
	   	},
	   	gocheck(record){//核对支付信息
	   		console.log('核对');
//	   		sessionStorage.setItem('infonumber',record.orderno );
	   		
			sessionStorage.setItem('orderinfoid',
				JSON.stringify(
					{
						id : record.id,
						remitType : 0,
						orderno : record.orderno,
						txt : record.statustxt
					}
				)
			);
	   		
	   		this.$router.push({
				path:'bank/check'
			});
	   	},
	   	gohistory(record){//历史支付信息
//	   		console.log('历史');	 
//	   		sessionStorage.setItem('infonumber',record.orderno );
	   		console.log(record.flag)	
//	   		sessionStorage.setItem('orderinfoid',
//				JSON.stringify(
//					{
//						id : record.id,
//						remitType : 0,
//						orderno : record.orderno,
//						txt : record.statustxt
//					}
//				)
//			);
//	   		this.$router.push({
//				path:'bank/history'
//			});
//	   		let flag = false;
	   		if( record.flag == false){
	   			this.$info({
		   			title:'提示！！！',
		   			content: (
			            <div>
			              <p>此订单未提交过支付数据</p>
			            </div>
			        ),
		   			onOk() {console.log('啧，告退了')},
		   		})
	   		}else{
	   			sessionStorage.setItem('orderinfoid',
					JSON.stringify(
						{
							id : record.id,
							remitType : 0,
							orderno : record.orderno,
							txt : record.statustxt
						}
					)
				);
		   		this.$router.push({
					path:'bank/history'
				});	   			
	   		}	   		
	   	},
	   	gomoneyinfo(record){//退款信息
	   		console.log('退款信息');	
			sessionStorage.setItem('orderinfoid',
				JSON.stringify(
					{
						id : record.id,
						remitType : 1,
						orderno : record.orderno,
						txt : record.statustxt
					}
				)
			);
	   		this.$router.push({
				path:'bank/moneyinfo'
			});
	   	},
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

/*订单详情*/
.shopbox:nth-child(1){
	margin-top: 50px;
}
.shopbox {
	display: flex;
}
.shopbox>p,.shopbox>span{
	flex: 1;
	text-align: center;
}
.shopbox>p:nth-child(1),.shopbox>span:nth-child(1){
	flex: 2;
}
.righttxt{
	text-align: end;
	padding-right: 40px;
}
.bomtit{
	display: inline-block;
	width: 80px;
	text-align: left;
}
</style>


