<template>
<div>	
	<div style="margin-bottom: 20px;">
	    <a-button type="primary" @click="showModal">新增农场展示</a-button>
	   
	</div>
  <a-table :columns="columns" :dataSource="data" bordered >
    <template v-for="col in ['sequence']" :slot="col" slot-scope="text, record,">
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
    
    <template slot="imgpath" slot-scope="text, record, ">
    	
    	<img  style="max-width: 80px;max-height: 50px;" :src='record.imgpath' />
    	
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

          	<a-button type="primary" @click="() => edit(record.key)">编辑</a-button>
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
  title: '乡村农场名称',
  dataIndex: 'titles',
  width: '30%',
  align:'center',
  scopedSlots: { customRender: 'titles' },
}, {
  title: '乡村农场背景图',
  align:'center',
  dataIndex: 'imgpath',
  width: '20%',
  scopedSlots: { customRender: 'imgpath' },
}, 
//{
//title: '操作管理员',
//dataIndex: 'adminuser',
//align:'center',
//width: '15%',
//scopedSlots: { customRender: 'adminuser' },
//},
{
  title: '操作',
  dataIndex: 'operation',
  align:'center',
  width: '20%',
  scopedSlots: { customRender: 'operation' },
}];

//表格-tbody（数据）
const data = [];


export default {
  data () {
  	//编辑--取消
    this.cacheData = data.map(item => ({ ...item }))
    return {
      	data,
      	columns,
      	tokenn:'',
    }
  },
  created(){
//	let that = this;	
	this.tokenn = sessionStorage.getItem('access_token');
	this.refresh();//列表数据
	
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
					txt:'乡村农场推荐',
					path:'/index/base'
				},
				
			]
		}
	);	
  	
  },
  methods: {
  	refresh(){//列表数据 		
		let newarr = [];
		this.$http.get(
			Url.httpHost+'/ylncadmin/homepagedata',{
			params:{
				access_token:this.tokenn,
			},
		})
		.then(res=>{
			console.log(res);
			if( res.data.code == 200 ){
				newarr = res.data.result.rows.filter(item => item.type === 3 );
				console.log(newarr);
				newarr.map((val,index,arr)=>{						
					newarr[index].titles = val.title;
					newarr[index].key = index;															
				})
				this.data = newarr;
//				console.log(this.data);		
			}					
		
		})
		.catch(err=>{
			console.log(err);
	//		this.$message.error(err);
		})
  	},

  	//新增弹框事件
  	showModal() {
  		this.$router.push({
			path:'base/addbase'
		})

           
    },

  	//输入框被修改（键盘弹起事件），value当前输入框的值，key下标，column属性（例如：标题或图片）
    handleChange (value, key, column) {
//  	console.log(value);
//  	console.log(key);
//  	console.log(column);
    	
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {//编辑
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key,itemcont) {//编辑--确定
		let that = this;
      	const newData = [...that.data];
      	const target = newData.filter(item => key === item.key)[0];
      	
      	let cont = {};
		cont.id = itemcont.id;
		cont.sequence = itemcont.sequence;
//    	console.log(cont);	
//    	console.log(itemcont);
//    	console.log(newData);
//		console.log(target);     	
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
//			console.log(res);
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
    cancel (key) {//编辑--取消
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    
    onDelete (key,i) {//删除
    	let that = this;
      const dataSource = [...that.data];
//    console.log(key);
//    console.log(dataSource)
      	let deletecont = dataSource.filter(item => item.key == key);

      	that.$http({
			url:Url.httpHost+'/ylncadmin/homepagedata/'+deletecont[0].id,
			method:'DELETE',
//			data:cont,
			headers: {
				'content-type':'application/json',
	            "Authorization": "bearer "+that.tokenn,				            	
	        },
	        
		})
		.then(res=>{
//			console.log(res);
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