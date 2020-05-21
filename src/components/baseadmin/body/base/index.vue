<template>
<div>	
	<a-button type="primary" @click="addbase" style="margin-bottom: 10px;" >新增基地</a-button>
	    
	<a-table :columns="columns" :dataSource="data" bordered >
	    <template v-for="col in ['basenamea','baseintroa']" :slot="col" slot-scope="text,">
		    <div :key="col">      	      
		        <template >{{text}}</template>		
		    </div>	
	    </template>
    
	    <template slot="status" slot-scope="text, record,">
	    	<div>
	    		<span  v-if="record.status == 0 ">正常</span>
	    		<span  v-else-if="record.status == 1 ">下架</span>   		
	    	</div>
	    </template>
    
	    <template slot="operation" slot-scope="text, record, index">
	      <div class='editable-row-operations'>        
	        <span>		
	          	<a-button type="primary" @click="() => edit(record,index)">编辑</a-button>
	        	<!--<a-popconfirm
	          		title='一定要删除?'
	                @confirm="() => onDelete(record.key)"
	            >
	          		<a-button type="danger">删除</a-button>
		        </a-popconfirm>-->
	        </span>
	      </div>
	    </template>
  	</a-table>
</div>
</template>
<script>
import Url from '../../../../common/urlapi.js'	;

export default{
  	data(){
	    return{
	    	bodyid:null,
	      	data:[],
	      	columns:[
				{
				  title: 'id',
				  dataIndex: 'id',
				  width: '5%',
				  scopedSlots: { customRender: 'id' },
				},
				{
				  title: '基地名称',
				  dataIndex: 'basename',
				  width: '20%',
				  scopedSlots: { customRender: 'basename' },
				},
				{
				  title: '基地简介',
				  dataIndex: 'baseintro',
				  width: '20%',
				  scopedSlots: { customRender: 'baseintro' },
				},
				{
				  title: '基地关联产品',
				  dataIndex: 'prodName',
				  align:'center',
				  width: '20%',
				  scopedSlots: { customRender: 'prodName' },
				},
				{
				  title: '添加人',
				  dataIndex: 'adminuser',
				  align:'center',
				  width: '20%',
				  scopedSlots: { customRender: 'adminuser' },
				},
				{
				  title: '操作',
				  dataIndex: 'operation',
				  align:'center',
				  width: '20%',
				  scopedSlots: { customRender: 'operation' },
				}
			],			
			tokenn:'',
	    }
  	},
  	created(){

		
		this.tokenn = sessionStorage.getItem('access_token');

		//获取本地存的主体id--查询主体下的基地
		this.bodyid = sessionStorage.getItem('baseid');
		console.log( this.bodyid );

		this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'商家运营管理',
						path:'',
					},
					{
						txt:'乡村农场管理',
						path:'/index/body'
					},
					{
						txt:'基地列表',
						path:'/index/body/baseadmin'
					},
				],

			}
		);
		
		this.refresh();//刷新列表数据			

  	},
  	components:{
//		filescom
	},
	methods:{
		addbase(){//新增
			sessionStorage.setItem('basebol',0);
			this.$message.info('新增基地');
			this.$router.push({
				path:'baseadmin/add'
			})
			
		},
		edit(records,index) {//去编辑
			console.log(records);	
			sessionStorage.setItem('basebol',1);
			sessionStorage.setItem('editbase',JSON.stringify(records));
			this.$message.info('编辑基地');
			this.$router.push({
				path:'baseadmin/edit'
			})
	   	},
		refresh(){//列表数据
			let newarr = [];
			this.$http.get(Url.httpHost+'/ylncadmin/baseinfo',{
				params:{
					access_token:this.tokenn,
					bodyid:this.bodyid,
				},
			})
			.then(res=>{
				console.log(res.data);
				if( res.data.code == 200 ){
					let	newarra = res.data.result.rows;
					// console.log(newarra);
					newarr = newarra.filter(item => item.bodyid == this.bodyid );
					console.log(newarr);
					newarr.map((val,index,arr)=>{
						newarr[index].key = index;				
					})
					this.data = newarr;
//					console.log(this.data);
				}
			})
			.catch(err=>{
				console.log(err);
//				this.$message.error('服务器异常');
			})
		},	  		  			
			        
//	    onDelete (key) {//删除
//	      	let that = this;
//	      	const dataSource = [...that.data];
//	      	console.log(key);
//	      	console.log(dataSource);      	
//	      
//			let deletecont = dataSource.filter(item => item.key == key);
//			
//			that.$http({
//				url:Url.httpHost+'/ylncadmin/baseinfo/'+deletecont[0].id,
//				method:'DELETE',
//				headers: {
//					'content-type':'application/json',
//		            "Authorization": "bearer "+that.tokenn,				            	
//		        },
//		        
//			})
//			.then(res=>{
//				console.log(res);
//				if( res.data.code == 200 ){
//					that.$message.success('删除成功');
//					that.data = dataSource.filter(item => item.key !== key);
//					
//				}
//				
//			})
//			.catch(err=>{
//				alert(err);
//				that.$message.error(err.response.data.message);
//			})
//	    },  		    
	    layoutchangeq(e){//基地名称
//	    	console.log( e.target.value );
	    	this.baseinfocont.basename = e.target.value;
	    },
	   	layoutchangew(e){//基地简介
//	    	console.log( e.target.value );
	    	this.baseinfocont.baseintro = e.target.value;
	    },
	    handleChangevalue(val){//关联的产品
	    	console.log( val );
	    	console.log( this.addselect[val] );
	    	this.baseinfocont.prodname = this.addselect[val].prodname;
	    	this.baseinfocont.area = this.addselect[val].area;
	    	this.baseinfocont.plantArea = this.addselect[val].plantArea;
	    	this.baseinfocont.plantYield = this.addselect[val].plantYield;
			this.baseinfocont.prodid = this.addselect[val].id;//产品id
			this.baseinfocont.baseCount = this.addselect[val].baseCount;
	    	
	    	if( this.addselect[val].prodtypecode == 8001 || this.addselect[val].prodtypecode == 8002 || this.addselect[val].prodtypecode == 8003 ){
	    		this.prodtype = '养殖';

	    	}else{
	    		this.prodtype = '种植';
	    	}
	    	
	    },
		relevabaseid(item,i){
			if( this.baseinfocont.baselbids != '' ){
				this.addbaseid = this.baseinfocont.baselbids.split(',');
				let idd = this.addbaseid ;
				if(item.bol){
					this.devicelist[i].bol = false;
					let a = idd.filter(ite => ite != item.id)
					this.addbaseid=a;
					this.$message.error(item.title);
				}else{
					this.devicelist[i].bol = true;
					this.addbaseid.push(item.id);
					this.$message.success(item.title);
				}
			}else{
				this.devicelist[i].bol = true;
				this.addbaseid.push(item.id);
				this.$message.success(item.title);
			}			
//			console.log(this.devicelist);
			this.baseinfocont.baselbids = this.addbaseid.join(',');			
//			console.log( this.baseinfocont.baselbids );
		},	    			
	},   
}
</script>
<style scoped>
.addbaselist .addbaseli{
	margin-bottom: 20px;
}
.addbaselist .addbaseli{
	display: flex;
}
.addbaselist .addbaseli .labelleft{
	width: 150px;
	height: 32px;
	display: flex;
	align-items: center;
}
.inlineblock{
	display: inline-block;
}
/*新增、编辑--输入框宽度*/
.rigput{
	width: 300px;
}
/*新增、编辑  内容*/
.selectdv{
	margin-top: 10px;
}
.selectdv span{
	line-height: 1.5;
}
/*选择基地关联硬件设备*/
.deviceimgs{
	width: 100px;
	height: 100px;
}
.deviceimgs img{
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>