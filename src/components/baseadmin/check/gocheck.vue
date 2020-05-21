<template>
<div>	
	
	<a-modal 
		v-model='visible'
		title="审核信息"		    	
      	:footer="null"
      
		>
		<div style="max-height: 400px;overflow: auto;">
			<p>
				<span class="title_text">申请人名称：</span>
				<span>{{names}}</span>
			</p>
			<p>
				<span class="title_text">申请人联系方式：</span>
				<span>{{numb}}</span>
			</p>
			
			<div class="devicelist" 
				
				 >
				 <p class="title_text">申请人硬件设备状态：</p>
				<div class="device_cont" v-for="(itm,indexi) in device" :key='indexi'>
					<p class="device_pbox">
						<img class="device_img" :src='itm.cover'/>
					</p>
					<span>{{itm.title}}</span><br />
					<span class="livestatus">{{itm.status == 0?'离线':'在线'}}</span>
				</div>
			</div>
			
			<div>
				<!--v-if='device.length > 0 '-->
				<p  class="title_text">申请人产品信息：</p>
				<ul class="combox">
					<li class="textcont" v-for="(item,index) in textcont" :key='index'>
						<p class="imag">
							<img  :src="item.prodimg" />
						</p>
						
						<div class="messagelist">
							<p>
								<span>产品名称：</span>
								<span>{{item.prodname}}</span>
							</p>
							<p>
								<span>{{item.typearea}}：</span>
								<span>{{item.plantArea}}</span>
							</p>
							<p>
								<span>{{item.typeyield}}：</span>
								<span>{{item.plantYield}}</span>
							</p>
						</div>
					</li>
				</ul>
			</div>
			
		
		</div>		
		
		<div style="display: flex;justify-content: flex-end;">
			<a-popconfirm title="您确定审核通过吗?"
				@confirm="succok"  
				okText="确定" 
				cancelText="取消"
				style='margin-right: 15px;'
				>
			    <a-button type="primary" >审核通过</a-button>
			</a-popconfirm>
			<!--<a-popconfirm title="您确定不审核吗?" @confirm="waits"  okText="确定" cancelText="取消">
			    <a-button style='margin: 0  15px;' >待会再来审核</a-button>
			</a-popconfirm>-->
			<div>
				<a-button type="danger" @click='cancelno'>审核不通过</a-button>
				<a-modal			
					title='审核不通过原因'
			      	v-model="novisible"
			      	@ok="nochek"			    	
			    >		
			    	<a-textarea 
			    		placeholder="请填写不通过的原因：" 
			    		:autosize="{ minRows: 4, maxRows: 6 }"
			    		maxlength='100' 
						v-model='textareaval'
						
						@pressEnter='nog'
			    		 />
				</a-modal>
			</div>
		</div>		
	</a-modal>
	
  <a-table :columns="columns" :dataSource="data" bordered >
    <template v-for="col in ['img']" :slot="col" slot-scope="text, record, index">
      <div :key="col">
      	
        <a-input
          v-if="record.editable"
          style="margin: -1px 0"
          :value="text" 
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>{{text}}</template>

				
      </div>
		
    </template>
    
    <template slot="chkstate" slot-scope="text, record, index">
    	<div>
    		<span  v-if="record.chkstate == 0 ">未审核</span>
    		<span  v-else-if="record.chkstate == 1 ">审核通过</span>
    		<span  v-else-if="record.chkstate == 2 ">审核未通过
    			<br />
    			<span style="color: #999;font-size: 12px;">原因：{{record.memo}}</span>
    		</span>
    		<span v-else></span>
    	</div>
    </template>
    
    <template slot="operation" slot-scope="text, record, index">

      <div class='editable-row-operations'>
        <!--<span>
        	<a-popconfirm title='确定去审核?' @confirm="() =>showModal(record)" >
            	<a-button type="primary" >去审核</a-button>
        	</a-popconfirm>
        </span>-->
        <!--<p>{{record}}</p>-->
        <span v-if="record.chkstate == 0 " >
        	<a-popconfirm title='确定去审核?' @confirm="() =>showModal(record)" >
            	<a-button type="primary" >去审核</a-button>
        	</a-popconfirm>
        </span>
        
        <span v-else-if="record.chkstate == 1 || record.chkstate == 2" style="padding: 0 15px;color: #000;"
        	
        	>----</span>
        <!--@click="showModal(record)"-->
      </div>
    </template>
  </a-table>
</div>
</template>
<script>
	import Url from '../../../common/urlapi.js'	;

//表格-thead（头部）
const columns = [
{
  title: 'id',
  dataIndex: 'id',
  width: '5%',
  scopedSlots: { customRender: 'id' },
},
{
  title: '申请人名称',
  dataIndex: 'username',
  width: '20%',
  scopedSlots: { customRender: 'username' },
}, {
  title: '申请人联系方式',
  dataIndex: 'mobile',
  width: '23%',
  scopedSlots: { customRender: 'mobile' },
}, {
  title: '申请时间',
  dataIndex: 'addtime',
  width: '20%',
  scopedSlots: { customRender: 'addtime' },
},

{
  title: '状态',
  dataIndex: 'chkstate',
  width: '18%',
  scopedSlots: { customRender: 'chkstate' },
},{
  title: '操作',
  dataIndex: 'operation',
  width: '20%',
  scopedSlots: { customRender: 'operation' },
}
]
//表格-tbody（数据）
const data = [];

export default {
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      	data,
      	columns,
      	recordcont:'',//去审核的内容
     	visible:false,
     	novisible:false,//审核不过
		tokenn:'',
		names:'福建庆丰',
		numb:'13112312312',
		textcont:[],
		device:[1,2,3,5],
		textareaval:'',//审核不通过多方输入
		typearea:'种地面积',
		typeyield:'种植产量',
    }
  },
  	components:{
//		checkalert,
  	},
  	created(){
  		
  		
//		let that = this;
		this.tokenn = sessionStorage.getItem('access_token');
		
		
	  	this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'商家运营管理',
						path:'',
					},
					{
						txt:'入住审核管理',
						path:'/index/gocheck'
					},
					
				],
						
			}
		);
		
		this.refresh();//刷新数据
  	},
  	methods: {
  		nog(e){
//			console.log(e.target.value);
  			this.textareaval = e.target.value;
  		},
  		refresh(){
  			
  			this.$http.get(Url.httpHost+'/ylncadmin/basebody',{
				params:{
					access_token:this.tokenn,
				}
			})
			.then(res=>{
//				console.log(res.data.result.rows);
				let arry = res.data.result.rows;				
				arry.map((val,index)=>{
					arry[index].key = index;
				});
				this.data = arry;
				
			})
			.catch(err=>{
				this.$message.error('失败：'+err.response.data.message);
			})
  		},
  		
	  	cancelno(){//
	  		this.novisible = true;
	  	},
	  	succok(){//审核通过
	  		this.checks(1);	  			  			  		  		
	  	},
//	  	waits(){//待会再审核
//	  		this.checks(0);	  			  			  		  		
//	  	},
	  	nochek(){//确定不通过
//	  		
			if(this.textareaval == ''){
//				alert('0');
  				this.$message.error('您未填写审核不通过原因！！！');
  			}
			else{
				this.checks(2);
			}
//			console.log(this.textareaval);
	  	},
	  	//去审核---弹框事件
	  	showModal(recordid) {
//	  		console.log(recordid);
	  		this.recordcont = recordid;
	      	this.visible = true;
	      	this.names = recordid.username;
	      	this.numb = recordid.mobile;
	      	
	      	let userid = recordid.userid;
	      	//设备
			this.$http.get(Url.httpHost+'/ylncadmin/livebroadcast',{
				params:{
					access_token:this.tokenn,
					userId:userid,
				},
			})
			.then(res=>{
//				console.log(res);
				let listo = res.data.result;
				const devicelist = listo.filter(item => item.userid === userid );
//				console.log(devicelist);
				this.device = devicelist;				
			})
			
			//产品
			this.$http.get(Url.httpHost+'/ylncadmin/product',{
				params:{
					access_token:this.tokenn,
					userId:userid,
				},
			})
			.then(res=>{
//				console.log(res);
				let listo = res.data.result;
				const productlist = listo.filter(item => item.userid === userid );
//				console.log(productlist);
				productlist.map(val=>{
					if( val.prodtypecode == 8001 || val.prodtypecode == 8002 ||val.prodtypecode == 8003 ){
						val.typearea = '养殖场占地面积';
						val.typeyield = '养殖数量';
					}else{
						val.typearea = '种植面积';
						val.typeyield = '种植产量';
					}
				})
				
				this.textcont = productlist;			
			})
	      	
	   	},
    
		checks(types){
			let cont = {};
			cont.id = this.recordcont.id;
			cont.chkstate = types;//1通过 2 不  0待审核
			if( types == 2 ){
				cont.memo = this.textareaval;
			}
			
	  		this.$http({
				url:Url.httpHost+'/ylncadmin/basebody',
				method:'PUT',
				data:cont,
				headers: {
					'content-type':'application/json',
		            "Authorization": "bearer "+this.tokenn,				            	
		        },
		        
			})
	  		.then(res=>{
	  			//console.log(res);
	  			if( res.data.code == 200 ){
	  				this.visible = !this.visible;
	  				this.novisible = false;
	  				this.textareaval = '';
	  				this.refresh();//刷新数据					
	  			}	  				  			
	  		})
			
		}
	
  	},
  
  
}

</script>
<style>
/*设备列表*/
	.device_cont{
		display: inline-block;
		margin: 10px 10px 10px 0;
		position: relative;
	}
	.device_cont .livestatus{
		width: 80px;
		position: absolute;
		top: 60px;
		line-height: 20px;
		text-align: center;
		color: #fff;
		background: rgba(0,0,0,.3);
	}
	.device_cont .device_pbox{
		width: 80px;
		height: 80px;
	}
	.device_cont .device_pbox .device_img{
		width: 100%;
		height: 100%;
		object-fit: cover;
		
	}
	.combox .textcont{
		display: flex;
		margin: 10px 0;
	}
	.imag{
		width: 100px;
		height: 100px;
		margin-right: 10px;
	}
	.imag img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.messagelist{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.title_text{
		font-size: 16px;
		color: #666;
	}
</style>
