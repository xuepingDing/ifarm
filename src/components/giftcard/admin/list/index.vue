<template>
	<div>


		<div style="display: flex;align-items: center;">
			<span>礼品卡查询：</span>
			<a-input-search
		      placeholder="输入礼品卡编号或者筹定人"
		      style="margin: 20px ; width: 60%;"
		      enterButton
			  @search="onSearchs"
			  v-model="searchval"
		    />
	    	<a-button type="primary" @click="onall">全部订单</a-button>
		</div>
        
		<a-table :columns="columns" :dataSource="data" bordered>
			<template slot="operation" slot-scope="text, record,">
				<!--{{record}}-->
				<a-button disabled v-if='record.stat == 5'>已注销</a-button>
				<a-popconfirm v-else-if='record.stat == 0'
					style='margin: 5px 0;'
					title='是否确定注销此卡？'
					@confirm="() => gooff(record)">
					<a-button type="primary">注销</a-button>
				</a-popconfirm>	
				
			</template>
		</a-table>

		

	</div>
</template>

<script>
import Url from '../../../../common/urlapi.js' ;
export default{
	name: "giftcardlist",
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
				title: '礼品卡编号',
				dataIndex: 'cardno',
				align: "center",
				//sorter: (a, b) => a.age - b.age,
				}, 
				{
				title: '筹定人',
				dataIndex: 'nickname',
				align: "center", 
				}, 
				{
				title: '是否被兑换',
				dataIndex: 'isused',
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
//				{
//					key: 0,
//					id:'12',
//					cardno:'',
//					nickname:'',
//					isused:'0',
//				},
			],
			tokenn:'',
			contarr:[],
			searchval:'',
			giftpkgid:0,
			groupBuyId:0,
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
					{
						txt:'礼品卡列表',
						path:'/index/giftcard/giftcardlist'
					},
				],

			}
		);
//		let giftpkgid = 0;
		this.giftpkgid = sessionStorage.getItem("giftpkgid");
//		let groupBuyId = 0;
		this.groupBuyId = sessionStorage.getItem("groupBuyId");
		// console.log(this.giftpkgid);
		this.list();//列表数据


	},
	methods:{
		list(){//列表数据
			this.$http.get(Url.httpHost+'/ylncadmin/usercards?access_token='+this.tokenn,{
				params: {
					giftpkgid : this.giftpkgid,
					groupBuyId : this.groupBuyId
				}
			})
			.then((res) => {
				console.log(res);
				if (res.data.code == 200 ){
					if (res.data.result.rows.length > 0 ){
						let cont = JSON.parse(JSON.stringify(res.data.result.rows));
						console.log( cont )
						let arrcont = [];
						cont.map((item,i)=>{
							let used = '',usedcont = '';
							if( item.isused == 0 ){
								used = '暂未被兑换';
							}
							else if( item.isused == 1 ){
								used = '已被兑换';
							}
							else if( item.isused == 3 ){
								used = '转赠';
							}
							else if( item.isused == 4 ){
								used = '已过期';
							}
							else if( item.isused == 5 ){
								used = '已被注销';
							}
//							else{
//								return;
//							}
//							if( item.isused == 0 ){
//								used = '暂未被兑换';
//								// usedcont = '是';
//							}
							
							arrcont.push({
								key : i,
								id : item.id,
								stat : item.isused,
								cardno : item.cardno,
								nickname : item.nickname,
								isused : used,
//								isusedcont : '否'
							})
						})
						this.contarr = arrcont;
						this.data = arrcont;
						console.log(this.contarr);
						console.log(this.data);
					}else{
						this.$message.info('没有数据');
					}
				}
			})
			.catch(err=> {
				this.data = [];
				console.log(err.response);
//				console.log(err.response.status)
				if( err.response.status == 500 ){
					this.$message.error('后台服务故障，状态：'+err.response.status)
				}
				
			})
		},
		onSearchs(value){
			// this.$message.info(value);

			let contbox = this.contarr;
			if( value == '' ){
				this.$message.error('先输入礼品卡编号筹定人');
			}else{
				this.data = [];	
				// this.data = contbox.filter(item=>item.nickname == value );//筹定人-搜索
				let arrss = [];
				arrss = value.split(",");
				contbox.map((item, i) => {
					arrss.map((row, index) => {
						if( item.cardno == row ){//编号-搜索
							this.data.push(item);
							// console.log(item);
						}
						else if ( row == item.nickname ) {
							// console.log(2);
							this.data.push(item);
						} 
						else{
							return;
						}
					})
					// if( item.cardno == value ){//编号-搜索
					// 		this.data.push(item);
					// 		// console.log(item);
					// 	}
					// else if ( value == item.nickname ) {
					// 	// console.log(2);
					// 	this.data.push(item);
					// } 
					
				})
				
				
				
			}

		},
		onall(){//全部订单
			// this.$message.info("all");
			this.data = this.contarr;
			this.searchval = '';
		},
		gooff(record){//注销
			console.log( record );
			let formd = JSON.stringify({id:record.id,isused:5});
			this.$http({
				method : 'PUT',
                url : Url.httpHost + '/ylncadmin/usercards',
                data : formd,
                headers : {
                'content-type': 'application/json',
                "Authorization": "bearer " + this.tokenn,
                },
//				Url.httpHost+'/ylncadmin/usercards?access_token='+this.tokenn+'&isused=5',
			})
			.then(res=>{
				console.log(res);
				if( res.data.code == 200 ){
					this.list();//列表数据
				}
			})
			.catch(err=>{
				console.log(err)
			})
		}
	},
}
</script>