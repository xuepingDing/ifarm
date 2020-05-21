<template>
<div>	
	<div style="margin-bottom: 20px;">
	    <a-button type="primary" @click="showModal">新增产品推荐</a-button>
	    <!--<a-modal
	      title="新增筹定"
	      v-model="visible"
	      @ok="handleOk"
	      width='70%'
	      
	    >	
	    	<div style="margin-bottom: 20px;">
				<span>排序：</span>
				<a-input-number :min="1" :max="9999999" v-model="homesort" @change="homesorta" />
			</div>
		    <div>
				<p>
					<span class="tit_red" >*</span>
					<span>上传首页轮播图：最多一张(建议尺寸：750x750)</span>	
				</p>
				<filescom :datatype='childtypea' @childimga='childimga'></filescom>
			</div>
		    <a-table 
		    	:columns="columns2" 
		    	:dataSource="data2" 
		    	bordered 
		    	:scroll="{ y: 300 }" 
		    	:rowSelection="{type:'radio',onChange:onchangesetup}"
		    	>
			    <template slot="pkgname" slot-scope="text">
			      <a href="javascript:;">{{text}}</a>
			    </template>
			    <template slot="pkgimgs" slot-scope="text, record, index" >
			    	<img style="max-width: 50px;max-height: 30px;" :src="record.pkgimgs.split('|')[0]" />

			    </template>
			</a-table>
		    
	    </a-modal>-->
	</div>
  <a-table :columns="columns" :dataSource="data" bordered >
    <template v-for="col in ['sequence']" :slot="col" slot-scope="text, record, ">
      <div :key="col">
      	
        <a-input
          	v-if="record.editable"
          	style="margin: -1px 0"
          	:value="text" 
          	@change="e => handleChange(e.target.value, record.key, col)"
        />
        <p v-else @dblclick="() => edit(record.key,record)">{{text}}</p>				
      </div>
		
    </template>
    <!--排序-->
    <template slot="liston" slot-scope="text, record, index">
    	{{index+1}}
    </template>
    <template slot="imgpath" slot-scope="text, record, ">
    	
    	<img  style="max-width: 80px;max-height: 50px;" :src='record.imgpath' />
    	
    </template>
    
    <template slot="operation" slot-scope="text, record, ">

      <div class='editable-row-operations'>
        <span v-if="record.editable">
          <a @click="() => save(record.key,record)">确定</a>
          <!--<a-popconfirm title='一定要取消?' @confirm="() => cancel(record.key)" class='ddd123'>-->
            <a @click="() => cancel(record.key)">取消</a>
          <!--</a-popconfirm>-->
        </span>
        <span v-else>
          	<a-button type="primary" @click="() => edit(record.key)">编辑</a-button>
          	<a-popconfirm
          		title='一定要删除?'
                    @confirm="() => onDelete(record.key)">

        			<a-button type="danger">删除</a-button>
        	</a-popconfirm>
        </span>
      </div>
    </template>
  </a-table>
</div>
</template>
<script>
import Url from '../../../common/urlapi.js'	;
import filescom from '@/components/publicmodule/files/files';//上传图片

//表格-thead（头部）
const columns = [
{
  title: '排序',
  dataIndex: 'sequence',
  align:'center',
  width: '15%',
  scopedSlots: { customRender: 'sequence' },
},
{
  title: '产品名称',
  dataIndex: 'titles',
  width: '25%',
  align:'center',
  scopedSlots: { customRender: 'titles' },
}, {
  title: '产品图片',
  dataIndex: 'imgpath',
  align:'center',
  width: '15%',
  scopedSlots: { customRender: 'imgpath' },
},
//{
//title: '操作管理员',
//dataIndex: 'adminuser',
//align:'center',
//width: '20%',
//scopedSlots: { customRender: 'adminuser' },
//},
{
  title: '操作',
  align:'center',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}];
const data = [];
export default{
  	data(){
	    this.cacheData = data.map(item => ({ ...item }))
	    return {
		    data,
		    columns,
//		    data2:[],
//		    columns2:[
//				{
//				  title: '礼包名称',
//				  dataIndex: 'pkgname',
//				  width: '45%',
//				  scopedSlots: { customRender: 'pkgname' },
//				}, {
//				  title: '礼包图片',
//				  dataIndex: 'pkgimgs',
//				  width: '45%',
//				  scopedSlots: { customRender: 'pkgimgs' },
//				},
//			],
//		    homesort:99,//排序输入框
//		    visible:false,
		    
//		    childtypea:{//编辑的时候，上传图片，类型，张数，图片
//	      		type:1,
//	      		leng:1,
//	      		arrimg:'no',
//	      	},
		    
//		    updatacont:{//上传的所有数据
//	      		type:1,//0轮播图，1首页礼包列表，2基地
//		      	title:'',
//		      	seurceid:'',//源id
//		      	imgpath:'',
//		      	sequence:'',//排序
//		      	isUse:1,
//	      	},
//			updataindex:null,//新增时选择项
			tokenn:'',
	    }
  	},
  	created(){
	//	let that = this;
		
	  	this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'小程序运营管理',
						path:''
					},
					{
						txt:'乡村农场管理',
						path:''
					},
					{
						txt:'最新产品推荐',
						path:'/index/setup'
					},
					
				]							
			}
		);
		this.tokenn = sessionStorage.getItem('access_token');
	  	//首页数据
		
		this.refresh();//列表数据
  	},
  	components: {
		filescom,
	},
  	methods: {
	  	//排序输入框
//	  	homesorta(val){
////	  		console.log(val);
//			this.homesort = val;
//			this.updatacont.sequence = this.homesort;			
//	  	},
  		//自定义事件（子传父值）
//	  	childimga(item){
//			console.log(item);
//			this.updatacont.imgpath = item;
//	  	},
  		refresh(){
  			let newarr = [];
  			this.$http.get(Url.httpHost+'/ylncadmin/homepagedata',{
				params:{
					access_token:this.tokenn,
				}
			})
			.then(res =>{
//				console.log(res.data.result);
				if( res.data.code == 200 ){
					newarr = res.data.result.rows.filter(item => item.type === 1 );
//					console.log( newarr );
					newarr.map((val,index)=>{
						newarr[index].titles = val.title;		
						newarr[index].key = index;								
					})
					this.data = newarr;
//					console.log( this.data );
				}
			})
			.catch(err =>{
//				console.log(err.response.data.message);
				console.log(err)
//				this.$message.error(err.response.data.message)
			})
  		},
//	  	onchangesetup(selectedRowKeys){//新增时--选择
//	  		console.log(selectedRowKeys);
//	  		this.updataindex = selectedRowKeys[0];
//	  		console.log(this.updataindex)
//	  		this.updatacont.title = this.data2[this.updataindex].pkgname;
//	//		this.updatacont.imgpath = this.data2[this.updataindex].pkgimgs.split('|')[0];
//	  		this.updatacont.seurceid = this.data2[this.updataindex].id;
//	  	},
	  	//新增弹框事件
	  	showModal(){
	  		
	  		this.$router.push({
    			path:'setup/addsetup'
    		})
	  		
	  		
//	  		console.log(this.updatacont)
//	  		this.childtypea.arrimg = 'no';
//	  		this.homesort = 99;
//	  		this.updatacont.imgpath = '';
//	  		this.updatacont.sequence = this.homesort;//排序
//	  		let that= this;
////		    that.visible = true;
//		    
//			let newarrs = [];
//	      	let tokenn = sessionStorage.getItem('access_token');
//	      	that.$http.get('apis/ylncadmin/giftpkg',{//获取礼包数据
//	      		params:{
//	      			access_token:tokenn,
//	      		}
//	      	
//	      	})
//	      	.then(res=>{
//	//    		console.log(res);
//	      		if( res.data.code == 200 ){
//	      			newarrs = res.data.result.rows;
//	      			newarrs.map((val,index)=>{
//		      			val.key = index;
//		      		})
//		      		that.data2 = newarrs;
//		      		console.log(that.data2);
//	      		}
//	      		
//	    	})
	    },
//	    handleOk(e){
//	//    console.log(e);
//			let that = this;
//	//		let tokenn = sessionStorage.getItem('access_token');
//			if( that.updatacont.imgpath == '' ){
//				that.$message.error('未上传图片');
//			}
//			else if( that.updataindex == null ){
//				that.$message.error('未选择新增项，请选择！！！');
//			}else{
//				console.log(that.updatacont)
//				let formd = JSON.stringify(that.updatacont);
//	//			console.log(formd);
//				that.$http({//首页数据
//			    	method:'POST',
//			    	url:'apis/ylncadmin/homepagedata',
//					data:formd,
//					headers: {
//						'content-type':'application/json',
//			            "Authorization": "bearer "+that.tokenn,				            	
//			        },
//				})
//				.then(res=>{
//					console.log(res);
//					if( res.data.code == 200 ){
//						that.refresh();//列表数据
////						that.visible = !that.visible;
//						that.$message.success('添加成功');
//					}
//				})
//				.catch(err=>{
//					console.log(err)
//					that.$message.error(err.response.data.message);
//				})
//			}
//
//	    },
	  	//输入框被修改（键盘弹起事件），value当前输入框的值，key下标，column属性（例如：标题或图片）
	    handleChange(value, key, column){
//	    	console.log(value);
//	    	console.log(key);
//	    	console.log(column);
	      const newData = [...this.data]
	      const target = newData.filter(item => key === item.key)[0]
	      if (target) {
	        target[column] = value
	        this.data = newData
	      }
	    },
	    edit(key){//编辑
	      const newData = [...this.data]
	      const target = newData.filter(item => key === item.key)[0]
	      if (target) {
	        target.editable = true
	        this.data = newData
	      }
	    },
	    save(key,itemcont){//编辑--确定
	      	let that = this;
	      	const newData = [...that.data];
	      	const target = newData.filter(item => key === item.key)[0];
	      	let cont = {};
			cont.id = itemcont.id;
			cont.sequence = itemcont.sequence;
//	      	console.log(cont);	
//	      	console.log(itemcont);
//	      	console.log(newData);
//			console.log(target)     	
	      	that.$http({
				url:Url.httpHost+'/ylncadmin/homepagedata',
				method:'PUT',
				data:cont,
				headers: {
					'content-type':'application/json',
		            "Authorization": "bearer "+that.tokenn,				            	
		        },
			})
			.then(res=>{
//				console.log(res);
				if(res.data.code == 200){
					if (target) {
		        		delete target.editable
		        		that.data = newData
		        		that.cacheData = newData.map(item => ({ ...item }));
		        		
		        		that.$message.success('修改成功');
		      		}
				}						
			})
	    	.catch(err=>{
	    		that.$message.error('修改失败！！！');
	    		that.$message.error(err.response.data.message);
	    	})
	    },
	    cancel(key){//编辑--取消
	      const newData = [...this.data]
	      const target = newData.filter(item => key === item.key)[0]
	      if (target) {
	        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
	        delete target.editable
	        this.data = newData
	      }
	    },
	    onDelete(key){//删除
	    	let that = this;
	      	const dataSource = [...that.data];
//	      	console.log(key);
//	      	console.log(dataSource);      	
			let deletecont = dataSource.filter(item => item.key == key);
			that.$http({
				url:Url.httpHost+'/ylncadmin/homepagedata/'+deletecont[0].id,
				method:'DELETE',
				headers: {
					'content-type':'application/json',
		            "Authorization": "bearer "+that.tokenn,				            	
		        },
			})
			.then(res=>{
//				console.log(res);
				if( res.data.code == 200 ){
					that.$message.success('删除成功');
					that.data = dataSource.filter(item => item.key !== key);
				}
			})
			.catch(err=>{
				alert(err);
				that.$message.error(err.response.data.message);
			})                        
	    },    	
  	},
}

</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
