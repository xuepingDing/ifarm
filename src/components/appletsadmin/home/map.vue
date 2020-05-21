<template>
<div>	
	<div style="margin-bottom: 20px;">
	    <a-button type="primary" @click="showModal">新增轮播图</a-button>
	    
	</div>		
							  
<a-table :columns="columns" :dataSource="data" bordered >    
      <template v-for="col in ['sequence']" :slot="col" slot-scope="text, record, index">
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
    <template slot="imgpath" slot-scope="text, record, index">
    	
    	<img  style="max-width: 80px;max-height: 50px;" :src='record.imgpath' />

    </template>
    <template slot="bol" slot-scope="text, record, index">
    	<a-switch  checkedChildren="启用" unCheckedChildren="禁用" @change='onChange(record,index)' :defaultChecked='record.bols' />

    </template>
    
    <template slot="operation" slot-scope="text, record, index">

      <div class='editable-row-operations'>
        <span v-if="record.editable">
          <a @click="() => save(record.key,record)">确定</a>
          <!--<a-popconfirm title='一定要取消?' @confirm="() => cancel(record.key)" class='ddd123'>-->
            <a @click="() => cancel(record.key)">取消</a>
          <!--</a-popconfirm>-->
        </span>
        <span v-else>

          <a-button type="primary" @click="() => edit(record.key,record)">编辑</a-button>
          <a-popconfirm
          		title='一定要删除?'
                    @confirm="() => onDelete(record.key,index)">

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
		title: '标题',
		dataIndex: 'titles',
		width: '20%',
		align:'center',
		scopedSlots: { customRender: 'titles' },
	}, 
	{
		title: '图片',
		dataIndex: 'imgpath',
		align:'center',
		width: '15%',
		scopedSlots: { customRender: 'imgpath' },
	}, 
	{
		title: '操作管理员',
		dataIndex: 'adminuser',
		align:'center',
		width: '15%',
		scopedSlots: { customRender: 'adminuser' },
	}, 
	{
		title: '是否启用',
		align:'center',
		width: '15%',
		dataIndex: 'bol',
		scopedSlots: { customRender: 'bol' },
	},
	{
		title: '操作',
		width: '20%',
		align:'center',
		dataIndex: 'operation',
		scopedSlots: { customRender: 'operation' },
	}
];
//表格-tbody（数据）
const data = [];
export default{
  	data(){
  		//编辑--取消
    	this.cacheData = data.map(item => ({ ...item }))
	    return{
	      	data,
	     	columns,

			tokenn:'',
    	}
  	},
  	components: {
		filescom,
	},
  	created(){
//		alert(Url.httpHost);
		this.tokenn = sessionStorage.getItem('access_token');
  		//面包屑
	  	this.$store.commit('modifytitle',
			{
//				titlecont:['小程序运营管理','','']			
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
						txt:'轮播图',
						path:'/index/maps'
					},
					
				]
			}
		);	
		this.refresh();//请求列表数据 	  	
  	},
  	methods:{
	  	
	  	refresh(){//刷新页面
	  		let newarr = [];

	  		this.$http.get(
//	  			URL.httpHost+URL.indexs
	  			Url.httpHost+'/ylncadmin/homepagedata'
	  		,{
				params:{
					access_token:this.tokenn,
				},
			})
			.then(res=>{
//				console.log(res.data.result.rows);
				if( res.data.code == 200 ){
					newarr = res.data.result.rows.filter(item => item.type === 0 );
//					console.log(newarr);
					newarr.map((val,index,arr)=>{
		//				console.log(val);
		//					newarr = val;
						if( val.isUse == null || val.isUse == 0){//不启用礼包
							newarr[index].bols = false;
						}else if( val.isUse == 1 ){
							newarr[index].bols = true;
						}else{
							return
						}
						newarr[index].titles = val.title;		
						newarr[index].key = index;														
					})
					this.data = newarr;
//					console.log( this.data );
				}				
			})
			.catch(err=>{
				console.log(err);
				console.log(err.response);
				this.$message.error(err.response.data.msg);
//				if( err.response.status == 405 ){
//					this.$router.push({
//	                  	path: '/login'
//	                })
//				}
			})			
	  	},
	  	//输入框被修改（键盘弹起事件），value当前输入框的值，key下标，column属性（例如：标题或图片）
	    handleChange(value,key,column){
//	    	console.log(value);	    	    	
	      const newData = [...this.data]
	      const target = newData.filter(item => key === item.key)[0]
	      if (target) {
	        target[column] = value
	        this.data = newData
	      }
	    },
	    edit(key,item){//编辑
	    	let that = this;
	    	const newData = [...that.data]
		    const target = newData.filter(item => key === item.key)[0]
		      if (target) {
		        target.editable = true
		        that.data = newData
		    }
//	    	console.log(key+"---");
//	    	console.log(item)	      
	    },
	    save(key,itemcont){//编辑--确定
	      	console.log(itemcont);
	    	let that = this;
	      	const newData = [...that.data];
	      	const target = newData.filter(item => key === item.key)[0];
	      	
	      	let cont = {};
			cont.id = itemcont.id;
			cont.sequence = itemcont.sequence;
	//    	console.log(newData);
	//		console.log(target)     	
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
	//  		that.$message.error(err.response.data.message);
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
	    onDelete(key,i){//删除
	    	let that = this;
	      	const dataSource = [...that.data];
	//    	console.log(key);
	//    	console.log(dataSource)                     
	      	let deletecont = dataSource.filter(item => item.key == key);		
			that.$http({
				url:Url.httpHost+'/ylncadmin/homepagedata/'+deletecont[0].id,
				method:'DELETE',
	//			data:cont,
				headers:{
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
	  	showModal(){//新增弹框事件
	  		this.$router.push({
    			path:'maps/addmap'
    		})
			
	    },
	    onChange( rec,i ){//开关
	    	let that = this;
			let cont = {};		
			cont.id = rec.id;			
//	    	console.log(rec.id);
//	    	console.log(rec );
	    		
			if( rec.bols == false ){			
				cont.isUse = 1;
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
//					console.log(res);
					if(res.data.code == 200 ){
						that.$message.success('已启用！');
						let datas=that.data
//						console.log(datas)
						datas.map((item,index)=>{
	//						console.log(item[index].id)
							if( item.id == rec.id ){
								item.isUse = 1;
								item.bols = true;
							}
						})
						this.data=datas
					}					
				})
				.catch(err=>{
					that.$message.error('修改失败！！！');
	//				that.$message.error(err.response.data.message)
				})
			}
			else if(rec.bols==true){
				cont.isUse = 0;
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
//					console.log(res);
					that.$message.error('已禁用！');
					let datas=that.data
//						console.log(datas)
						datas.map((item,index)=>{
	//						console.log(item[index].id)
							if( item.id == rec.id ){
								item.isUse = 0;
								item.bols = false;
							}
						})
						this.data=datas
				})
				.catch(err=>{
					that.$message.error('修改失败！！！');
					console.log(err)
	//				that.$message.error(err.response.data.message)
				})
			}					   		    				
	    },

  	},  
}
</script>
<style scoped>
/*点击编辑后显示的确定按钮*/	
.editable-row-operations a:nth-child(1){
  margin-right: 8px;
}
</style>
