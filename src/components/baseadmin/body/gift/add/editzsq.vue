<template>
	<div>
		<a-table :columns="columns" :dataSource="data" bordered width='100%' @change='pagchange'>
			<template slot="imgPatch" slot-scope="text, record, index">
				<filescom :datatype="childtypee[index+pagindex]"
                            @childimga='childimga'
                            style='display: inline-block;'
                            :data-index='index'
                            ></filescom>
                            
			</template>
		    <template
		      	v-for="col in [ 'titleText', 'memo']"
		      	:slot="col"
		      	slot-scope="text, record, "
		    >
		      	<div :key="col">
		        	<a-input
		          	v-if="record.editable"
		          	style="margin: -5px 0"
		          	:value="text"
		          	@change="e => handleChange(e.target.value, record.key, col)"
		        	/>
		        	<template v-else
		          	>{{text}}</template
		        	>
		      	</div>
		    </template>
		    <template slot="operation" slot-scope="text, record, index">
				<!--{{record}}-->
		    	<div v-if="record.addbol" class="editable-row-operations">
		    		
		    		<a @click="addbox(record,record.key,index)">添加</a>
		    		<a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record.key,index)">
		          		<a>删除</a>
		          	</a-popconfirm>
		    	</div>
			    <div v-else class="editable-row-operations">
			        <span v-if="record.editable">
			          	<a @click="() => save(record,record.key)">保存</a>
		            	<a @click="cancel(record.key,index)">取消</a>
			        </span>
			        <span v-else>
			          	<a @click="() => edit(record.key)">编辑</a>
			          	<a-popconfirm title="确定删除吗?" @confirm="() => onDelete(record.key,index)">
			          		<a>删除</a>
			          	</a-popconfirm>
			        </span>
			    </div>
		    </template>
		</a-table>
		<a-button type="dashed" block @click='addzsq'><a-icon type="plus" />新增专属权</a-button>
	</div>
</template>
<script>
import filescom from '@/components/baseadmin/files/files';//上传图片

const columns = [
	{
		title: '图片',
		dataIndex: 'imgPatch',
		width: '25%',
		align:'center',
		scopedSlots: { customRender: 'imgPatch' },
	},
	{
		title: '标题',
		dataIndex: 'titleText',
		width: '15%',
		align:'center',
		scopedSlots: { customRender: 'titleText' },
	},
	{
		title: '描述',
		dataIndex: 'memo',
		width: '40%',
		align:'center',
		scopedSlots: { customRender: 'memo' },
	},
	{
		title: '操作',
		dataIndex: 'operation',
		width: '20%',
		align:'center',
		scopedSlots: { customRender: 'operation' },
	},
];
const data = [
//		{
//			key : 0,
//	      	imgPatch : 'https://udbimg.oss-cn-shenzhen.aliyuncs.com/model/40e3a15f8b2b6ff6a6c0cfb60ddaf446',
//	      	titleText : 32,
//		    memo : '001',
////		    editable: true,
////		    index : 0
//		},
];
export default {
    data() {
    	//编辑--取消
      	this.cacheData = data.map(item => ({ ...item }));
  		return {
        	data,
        	columns,
        	//编辑的时候，上传图片，类型，张数，图片
        	childtypee : [],
        	pagindex:0,//页码
        	arrdata : [],//完整数据--传回父组件
        	arrimgs:[],//存列表上传的图片（图片组件删除时这里不删除，重新上传覆盖,删除数据才会删除），取消的时候用来给列表赋值图片
  		};
    },
    created(){
    	let giftsta = sessionStorage.getItem('giftedit');//0新增，1编辑
    	if( giftsta == 0 ){//新增
    		this.data = [];
    		console.log('xin**************************');
    	}else{//编辑
    		console.log('编辑----------')
    		let giftcont = JSON.parse( sessionStorage.getItem('editcont') );
    		console.log(giftcont);
      		if( giftcont.privateinfoList.length > 0 ){
				giftcont.privateinfoList.map((val,indexss)=>{
//					val.titles = val.title;
//					val.titles = val.titleText;
					val.editable = false;
					val.key = indexss;
				})
				this.data = giftcont.privateinfoList;
				this.arrdata = this.data;
				console.log(this.data);
				this.data.map((val,i)=>{
		    		this.childtypee.push({
		    			type: i,
		                leng: 1,
		                arrimg: val.imgPatch
		    		})
		    		this.arrimgs.push(val.imgPatch);
		    	})
				this.$emit('datacont',this.arrdata);
//				console.log( this.arrimgs );//编辑的情况：先给图片数组初始化
//				console.log( this.data );
//				console.log( this.arrdata );
    		}else{
    			this.data = [];
    		}
    	}
    },
    components : {
        filescom,//上传图片
        
    },
    methods: {
    	//分页、排序、筛选变化时触发
    	pagchange( pagination, filters, sorter ,cont){
//  		console.log(ite);
    		console.log( pagination );
//			console.log(cont);
			let indexs = ( pagination.current - 1 ) * 10;
			this.pagindex = indexs;
    	},
    	childimga (itemimg,i) {//自定义：上传图片子组件传来图片
        	console.log(itemimg);
        	console.log( i );
//      	this.data[i].imgPatch = itemimg;
//      	this.arrdata[i].imgPatch = itemimg;
			
			const newData = [...this.data];
		    const target = newData.filter(item => this.data[i].key === item.key)[0];
		    console.log(newData);
			console.log(target);
		    
			if( itemimg == ''){
		        this.childtypee[i+this.pagindex].arrimg = 'no';
//		        this.data[i].imgPatch = '';
		        if (target) {
		          	target.editable = true;
		          	target.imgPatch = '';
		          	this.data = newData;
		        }
			}
			else{						      
		        this.data[i].imgPatch = itemimg;
		        this.arrimgs[i] = itemimg;
		        this.childtypee[i+this.pagindex].arrimg = itemimg;
			}			
			console.log( this.data );
			console.log( this.childtypee );
        	console.log(this.arrdata);
        	this.$emit('datacont',this.arrdata);
        },
      	handleChange(value, key, column) {
      		console.log(value);
      		console.log(key);
      		console.log( column );
      		if( column == 'titleText' ){
      			console.log(value.length)
      			if(value.length > 10){
      				
//    				value.splice(0,10);
					return;
      			}
      		}else if( column == 'memo' ){
      			if(value.length > 50){
//    				value.splice(0,50)
					return;	
      			}
      		}
      		
	        const newData = [...this.data];
	        const target = newData.filter(item => key === item.key)[0];
	        if (target) {
	          	target[column] = value;
	          	this.data = newData;
	        }
	        
      	},
      	edit(key) {//编辑
//	      	console.log(key);
	        const newData = [...this.data];
	        const target = newData.filter(item => key === item.key)[0];
	        console.log(target);
	        if (target) {
	          	target.editable = true;
	          	this.data = newData;
	        }
	        this.$emit('datacont',this.arrdata);
	        console.log( this.data );
	        console.log( this.arrdata );
	        console.log( '+++++++++++++++++++编辑++++++++++++++++++++++++++' );
      	},
      	save(rcd,key) {//保存
      		console.log(rcd);
      		if( rcd.imgPatch =='' || rcd.titleText =='' || rcd.memo ==''  ){
      			this.$message.error('请填写完整信息');
      			return;
      		}
	        const newData = [...this.data];
	        const target = newData.filter(item => key === item.key)[0];
	        if (target) {
//	        	target.title = target.titleText;
//	        	target.titleText = target.titleText;
//	          	delete target.editable;
	          	target.editable = !target.editable
	          	this.data = newData;
	          	this.cacheData = newData.map(item => ({ ...item }));
	        }
	        
	        this.arrdata = this.data;//newData.filter(ite => ite.editable != true );
	        
	        
	        this.$emit('datacont',this.arrdata);
	        console.log( this.data );
	        console.log( this.arrdata );
	        console.log( '+++++++++++++++++++保存++++++++++++++++++++++++++' );
      	},
      	cancel(key,i) {//取消
	        const newData = [...this.data];
	        
	        const target = newData.filter(item => key === item.key)[0];
	        console.log( key );
	        console.log( newData );
	        console.log( target );
	        if (target) {
	          	Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
//	          	delete target.editable;
				target.editable = false;
	          	newData[i].imgPatch = this.arrimgs[i];
	          	this.arrdata[i].imgPatch = this.arrimgs[i];
	          	this.data = newData;
	        }
	        console.log( this.childtypee[i+this.pagindex] );
	        this.childtypee[i+this.pagindex].arrimg = this.arrimgs[i];
	        console.log( this.childtypee[i+this.pagindex] );
	        console.log( this.arrimgs[i] );

	        console.log( this.data );
        	console.log(this.arrdata);
        	console.log( '+++++++++++++++++++取消++++++++++++++++++++++++++' );
      	},
      	addzsq(){//新增专属权
      		console.log('新增专属权--------------------------------------');
      		let timestamp = new Date().getTime();

			let addcont = {
			  		key : timestamp,
			      	imgPatch : '',
			      	titleText : '',
				    memo :  '',
				    addbol : true, //是否添加
				    editable : true, //是否修改
			  	}
			this.data.push(addcont);
      		this.childtypee.push({
    			type: this.data.length-0-1,//  ==下标
                leng: 1,
                arrimg: 'no',
    		});
      		console.log( this.childtypee );
      		console.log( this.data );
      		console.log( this.arrdata );
      		console.log( '+++++++++++++++++++新增++++++++++++++++++++++++++' );
      	},
      	//添加专属权
      	addbox(rd,key){
      		console.log(rd);
//    		console.log(key);
      		if(rd.memo == '' || rd.titleText == '' || rd.imgPatch == '' ){
      			this.$message.error('请填写完整信息');
      			return;
      		}
      		console.log(rd);
      		this.arrdata.push(rd);  //传回父组件数据
      		
      		this.$emit('datacont',this.arrdata);
      		const newData = [...this.data];
	        const target = newData.filter(item => key === item.key)[0];
	        console.log(target);
	        if (target) {
//	        	target.title = target.titleText;
//	        	target.titleText = target.titles;
	        	target.addbol = !target.addbol;//添加  改变   编辑状态
	        	delete target.editable;//取消 新增时的编辑效果
	          	this.data = newData;
	          	this.cacheData = newData.map(item => ({ ...item }));
	        }
      		console.log( this.data );
      		console.log( this.arrdata );
      		console.log( '++++++++++++++++++添加+++++++++++++++++++++++++++' );
      	},
      	onDelete(key,index) {//删除专属权
      		console.log( key+'xxxxxxxxxxxxxxxxxxx'+index)     		      		
      		const imgarr = [...this.childtypee];
//    		console.log( imgarr );
      		this.childtypee = imgarr.filter((item,i) => i !== index);
      		
        	const dataSource = [...this.data];
        	this.data = dataSource.filter(item => item.key !== key);
        	this.arrdata = this.data;
        	this.$emit('datacont',this.arrdata);
        	this.arrimgs.splice(index,1);
        	console.log(this.arrimgs);
    		console.log(this.childtypee);
      		console.log(this.data);
      		console.log( this.arrdata );
      		console.log( '++++++++++++++++++++++删除+++++++++++++++++++++++' );
        	
      	},
    },	
};
</script>
<style scoped>
.editable-row-operations a{
    margin-right: 8px;
}
</style>