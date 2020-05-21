<template>
	<div>
		<ul class="addbaselist">
	    	<li class="addbaseli">
	    			<span class="labelleft">
	    				<span class="tit_red">*</span>
	    				<span class="inlineblock">基地名称：</span>
	    			</span>		    			
	    			<a-input	
	    				class='rigput'
				        placeholder="请输入"
				        @change='layoutchangeq'
				        autocomplete="off"
				       	v-model='baseinfocont.basename'
				       	maxLength="20"
				    />
	    	</li>
	    	<li  class="addbaseli">
	    			<span class="labelleft">
	    				<span class="tit_red">*</span>
	    				<span  class="inlineblock">基地简介：</span>
	    			</span>	    			
	    			<a-input	
	    				class='rigput'
			        	placeholder="请输入"
			        	@change='layoutchangew'
			        	v-model='baseinfocont.baseintro'
			        	maxLength="15"
			      	/>
	    	</li>
			<li class="addbaseli">
    			<span class="labelleft">
    				<span class="tit_red">*</span>
    				<span>选择关联的产品：</span>
    			</span>
    			<span>
    				<a-select
			      		style="width: 300px" 
			      		@change="handleChangevalue"		      		 
						placeholder='请选择'
						v-model='baseinfocont.prodname'
			      		>
			      		<!-- @change="handleChangevalue" -->
		      		 	<a-select-option v-for='(itm,index) in addselect' :key='index' >
		      		 		{{itm.prodname}}
		      		 	</a-select-option>			    	
				  	</a-select>
			      	<div class="selectdv">
			      		<span>{{prodtype}}所在地：{{baseinfocont.area}}</span><br />
			      		<span>{{prodtype}}面积：{{baseinfocont.plantArea}}</span><br />
			      		<span>{{prodtype}}产量：{{baseinfocont.plantYield}}</span><br />
						<span>已关联基地数：{{baseinfocont.baseCount}}</span>
			      	</div>
    			</span>
    		</li>
			<li class="addbaseli">
				<p class="labelleft">
					<span class="tit_red">*</span>
					<span>上传基地轮播图：</span>
				</p>
				<p style="line-height: 32px;">最多5张(建议尺寸：696*390)</p>
			</li>	
	    	<li class="addbaseli">
				<filescom  :datatype='childtypea' @childimga='childimga' ></filescom>
			</li>
			<li class="addbaseli">
				<div style='flex-direction: column;align-items: flex-start;'>		
					<div style="margin-bottom: 15px;">
						<span class="tit_red">*</span>
						<span>选择基地关联的硬件设备</span>
					</div>
					<div
						v-for="(item,i) in devicelist" :key='i'
						style="display: inline-block;margin-right: 10px;" 
					>
						<p class="deviceimgs">
							<img :src="item.cover" />
						</p>
						<p>
							<input type="checkbox" :checked="item.bol" @change="relevabaseid(item,i)"/>
							<span>{{item.title}}</span>
						</p>											
					</div>
				</div>
			</li>
			<li class="addbaseli">
				<div style="display: flex;align-items: center;">				
					<p style="display: flex;align-items: center;padding: 15px 0;">
						<span class="tit_red" >*</span>
						上传基地详细信息图：
					</p>
					<p >宽度建议尺寸 696</p>
				</div>
			</li>
			<li class="addbaseli">
				<filescom :datatype='childtypeb' @childimgb='childimgb'></filescom>
			</li>
			<li>
				<div class="btnbox">
					<a-button @click='returns'>取消</a-button>
					<a-button @click='handleOk' type="primary">确定</a-button>
				</div>
			</li>
	    </ul>
	</div>
</template>

<script>
import Url from '../../../../../common/urlapi.js'	;
import filescom from '@/components/publicmodule/files/files';//上传图片
	
export default{
  	data(){
		return{
			arry : [
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
				{
					txt:'新增',
					path:'/index/body/baseadmin/add'
				},
			],
			valued:0,//选择基地关联的硬件设备,初始选择
			addselect:[],//新增基地，弹-关联产品
			childtypea:{//上传图片
	      		type:1,
	      		leng:5,
	      		arrimg:'no',
	      	},
			childtypeb:{//上传图片
	      		type:2,
	      		leng:20,
	      		arrimg:'no',
	      	},
			prodtype:'种值',
			devicelist:[],//基地关联的硬件设备
			devicebol:[],//false/true
			addbaseid:[],
			baseinfocont:{//新增基地
				basedetail:'',//基地详情
				baseimgs:'',//基地图片
				baseintro:'',//基地简介
				baselbids:'',//基地关联设备ID，多个用逗号分隔
				basename:'',//基地名称
				bodyid:null,//基地主体id
				prodid:'',//关联的产品id		
				area:'',
				plantArea:'',
				plantYield:'',
				prodname:'',
				useState:0,
				baseCount:0,//关联基地数
			},
			// editbase:{},//编辑基地
			editbaseid:'',//根据id修改
			tokenn:'',
			
			editbasecont:null,
			sessuserid:null,
			basebol:0,//新增、编辑
		}
	},
	created(){
		this.tokenn = sessionStorage.getItem('access_token');

		this.basebol = sessionStorage.getItem('basebol');//0新增 1编辑
		this.sessuserid = sessionStorage.getItem('userid');

		this.baseinfocont.bodyid = sessionStorage.getItem('baseid');//获取本地存的主体id
//		console.log( this.baseinfocont.bodyid );
//		console.log( sessionStorage.getItem('baseidss') )		
		
		// let editbase = JSON.parse(sessionStorage.getItem('editbase') );
		this.editbasecont = JSON.parse(sessionStorage.getItem('editbase') );	
		if( this.sessuserid != null ){
			this.getprod();//产品信息
			this.arrlive();//直播设备
		}

		if( this.basebol == 0 ){
			this.arry[3].txt = '新增';
			this.arry[3].path = '/index/body/baseadmin/add';
			this.baseinfocont.basename = '';//名称
			this.baseinfocont.baseintro = '';//简介
			this.restalert();//新增--清空

		}else{
			
			this.arry[3].txt = '编辑';
			this.arry[3].path = '/index/body/baseadmin/edit';			
			this.edit();//编辑

			this.$http.get(Url.httpHost+'/ylncadmin/baseinfo/'+ this.editbasecont.id ,{
				params:{
					access_token:this.tokenn,
					
				},
			})
			.then(res=>{
				console.log( res );
			})
		}

		this.$store.commit('modifytitle',
			{
				arry:this.arry
			}
		);
	
  	},
  	components:{
		filescom
	},
	methods:{
		returns(){
			this.$router.push({
				path:'/index/body/baseadmin'
			});
			this.restalert();//清空
		},
		layoutchangeq(e){//基地名称
//	    	console.log( e.target.value );
	    	this.baseinfocont.basename = e.target.value;
	    },
	   	layoutchangew(e){//基地简介
//	    	console.log( e.target.value );
	    	this.baseinfocont.baseintro = e.target.value;
	    },
		getprod(){//----关联产品的信息
			let prodarr = [];
			this.$http.get(Url.httpHost+'/ylncadmin/product',{
				params:{
					access_token : this.tokenn,
					userId : this.sessuserid
				}
			})
			.then(resp=>{
				console.log(resp);
				if( resp.data.code == 200 ){
					prodarr = resp.data.result;
					this.addselect = prodarr;//当前用户下的全部产品
					console.log( '用户的全部产品*****************************************' );
					console.log( this.addselect );
	//				console.log( prodarr[0] );
					if( prodarr[0].prodtypecode == 8001 || prodarr[0].prodtypecode == 8002 ||prodarr[0].prodtypecode == 8003 ){
						this.prodtype = '养殖';
					}else{
						this.prodtype = '种植';
					}
					
					if( this.basebol == 0 ){//新增
						this.baseinfocont.prodname = prodarr[0].prodname;
						this.baseinfocont.area = prodarr[0].area;
						this.baseinfocont.plantArea = prodarr[0].plantArea;
						this.baseinfocont.plantYield = prodarr[0].plantYield;
						this.baseinfocont.prodid = prodarr[0].id;//
						this.baseinfocont.baseCount = prodarr[0].baseCount;
		//				console.log(that.addselect);
					}
					else{//编辑

						this.addselect.map((vals)=>{//产品关联基地数
							if (vals.id == this.editbasecont.prodid){
								this.baseinfocont.baseCount = vals.baseCount;
							}
						})	

					}

					
				}else if(res.data.code == 500){
					this.$message.error('服务器故障！！！');
				}else{
					return
				}												
			})
			.catch( errr=>{
				console.log(errr);
				// if(errr.data.code == 500){
				// 	this.$message.error('服务器故障！！！');
				// }
			})
		},
		handleChangevalue(val){//选择关联的产品赋值
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
		//自定义事件（子传父值）
	  	childimga(item){//基地轮播图
//	  		console.log(item);
	  		this.baseinfocont.baseimgs = item;
	  	},
	  	childimgb(item){//基地详情图
//	  		console.log(item);
	  		this.baseinfocont.basedetail = item;
		},	
		arrlive(){
			//新增弹框显示,获取关联设备（直播信息）
			let newarrto = [];
			// let addid = [];
			this.$http.get(Url.httpHost+'/ylncadmin/livebroadcast',{
				params:{
					access_token:this.tokenn,
					userId:this.sessuserid
				}
			})
			.then(res =>{
				console.log(res);
				if( res.data.code == 200 ){
					newarrto = res.data.result;
					// console.log(this.editbasecont.baselbids);
					console.log(newarrto);

					if(this.basebol == 1){//编辑
						let chea = this.editbasecont.baselbids.split(',');//关联的设备
				      	console.log(chea);
							      	
						chea.map((val,i)=>{	      
							newarrto.map((value,index)=>{
								if( val == value.id ){
			//	      				console.log(value.id)
									value.bol = true;
								}
							})	      		
						})	      	
					}
					else{
						newarrto.map((val,i)=>{
							val.bol = false;
							// addid.push(val.id);
						})
						
					}
					this.devicelist = newarrto;
				}
			})
			.catch((err)=>{
				console.log(err);
	//			console.log(err.response.data.message);
			})
		},  
		relevabaseid(item,i){//选择直播设备
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
		restalert(){// 取消--- 新增、编辑 清空
			let alist = this.devicelist;//设备列表	      	
	      	alist.map((val,i)=>{
				val.bol = false;
	      	})
	      	this.devicelist = alist;
//	      	console.log( this.devicelist );
	      	this.childtypea.arrimg = 'no';//基地轮播
			this.childtypeb.arrimg = 'no';//基地详情
			
			this.baseinfocont.basename = '';
	      	this.baseinfocont.baseintro = '';
	      	this.baseinfocont.baseimgs = '';
	      	this.baseinfocont.baselbids = '';//关联硬件
	      	this.baseinfocont.basedetail = '';
			
		},	
		edit() {//编辑基地
			let records = this.editbasecont;
			console.log(records);
			
        	let record = JSON.parse( JSON.stringify(records) );
//      	console.log(record);	          				
			
	      	this.baseinfocont.basename = record.basename;//名称
	      	this.baseinfocont.baseintro = record.baseintro;//简介	      		     
	      	
	      	this.childtypea.arrimg = record.baseimgs;//页面显示轮播图片
	      	this.baseinfocont.baselbids = record.baselbids;//关联基地
	      	this.childtypeb.arrimg = record.basedetail;//页面显示详情图
	      	this.baseinfocont.bodyid = record.bodyid;//基地主体id	 
//	      	this.baseinfocont.id = record.id;//基地id
	      	this.baseinfocont.basedetail = record.basedetail;//详情图
	      	this.baseinfocont.baseimgs = record.baseimgs;//轮播图	      	      	
	      	//产品
			this.baseinfocont.prodname = record.prodName;
			this.baseinfocont.prodid = record.prodid;//关联产品id
	      	this.baseinfocont.area = record.area;
	      	this.baseinfocont.plantArea = record.plantArea;
	      	this.baseinfocont.plantYield = record.plantYield;	      	
//	      	console.log( this.baseinfocont );	
	      	this.editbaseid = record.id;
		},
		handleOk() {//确认事件
			let that = this;						
			that.addbaseid=[];		    
//		    console.log(that.baseinfocont);//新增
//		    console.log(that.editbase);//、编辑
		    if( that.basebol == 0 ){//新增事件		
		    	// let formd = JSON.stringify(that.baseinfocont);
//		    		console.log(formd);
		    	if(that.baseinfocont.basename == ''){
		    		that.$message.error('请填写基地名称');
		    	}
		    	else if( that.baseinfocont.baseintro == '' ){
		    		that.$message.error('请填写基地简介');
		    	}
		    	else if( that.baseinfocont.prodid == '' ){
		    		that.$message.error('请填写关联的产品');
		    	}
		    	else if( that.baseinfocont.baseimgs == '' ){
		    		that.$message.error('请上传基地轮播图');
		    	}		    	
		    	else if( that.baseinfocont.baselbids == '' ){
		    		that.$message.error('请选择基地关联设备');
		    	}		    	
		    	else if( that.baseinfocont.basedetail == '' ){
		    		that.$message.error('请上传基地详情图片');
		    	}
		    	else if( that.baseinfocont.bodyid == '' ){
		    		that.$message.error('请先选择基地主体');
		    	}
		    	else{		
		    		let formd = JSON.stringify(that.baseinfocont);
		    		console.log(formd);
					that.$http({
				    	method:'POST',
				    	url:Url.httpHost+'/ylncadmin/baseinfo',
						data:formd,
						headers: {
							'content-type':'application/json',
				            "Authorization": "bearer "+that.tokenn,				            	
				        },
					})
					.then(res=>{
						console.log(res);
						if( res.data.code == 200 ){
//							that.visible = false;
							// this.$router.push({
							// 	path:'/index/body/baseadmin'
							// })	
//							that.refresh();//刷新数据
							// that.restalert();//清空
							this.returns();//成功后 返回 并 清空
							that.$message.success('基地新增成功');
						}						
					})
					.catch(err=>{
						console.log(err);
//						console.log(that.baseinfocont);
						that.$message.error('新增失败！！！');
					})
		    	}		    	
			}
		    else{	
//		    	console.log('编辑'); 
		    	if(that.baseinfocont.basename == ''){
		    		that.$message.error('请填写基地名称');
		    	}
		    	else if( that.baseinfocont.baseintro == '' ){
		    		that.$message.error('请填写基地简介');
		    	}
		    	else if( that.baseinfocont.prodid == '' ){
		    		that.$message.error('请填写关联的产品');
		    	}
		    	else if( that.baseinfocont.baseimgs == '' ){
		    		that.$message.error('请上传基地轮播图');
		    	}		    	
		    	else if( that.baseinfocont.baselbids == '' ){
		    		that.$message.error('请选择基地关联设备');
		    	}		    	
		    	else if( that.baseinfocont.basedetail == '' ){
		    		that.$message.error('请上传基地详情图片');
		    	}
		    	else{
		    		let edi = JSON.stringify(this.baseinfocont);
		        	let edt = JSON.parse(edi);	      	
			      	that.editbase = edt; 
			      	that.editbase.id = that.editbaseid;
//			      	console.log( that.editbase );
			      	
		    		let formd = JSON.stringify(that.editbase);
//		    		console.log(formd);
		    		that.$http({
				    	method:'PUT',
				    	url:Url.httpHost+'/ylncadmin/baseinfo',
						data:formd,
						headers: {
							'content-type':'application/json',
				            "Authorization": "bearer "+that.tokenn,				            	
				        },
					})
					.then(res=>{
//						console.log(res);
						if( res.data.code == 200 ){
							this.returns();//成功后 返回 并 清空
							that.$message.success('基地编辑成功');
						}else if(res.data.code == 500){
							that.$message.error(res.data.message);
						}						
					})
					.catch(err=>{
						console.log(err);
						// if(err.data.code == 500){
						// 	that.$message.error(res.data.message);
						// }						
					})		    				    		
		    	}
			}	   
	    },
	},
}  	
</script>

<style>
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
/* 底部按钮 */
.btnbox{
	display: flex;
	justify-content: center;
}
.btnbox .ant-btn:nth-child(2){
	margin-left:50px;

}
</style>