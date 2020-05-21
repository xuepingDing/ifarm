<template>
	<div >
	    <h2>新增{{dataobj.title}}</h2>
    	<a-select
    		labelInValue
    		:defaultValue="{ key: 'gift' }"
    		style="width: 180px;margin-bottom: 20px;"
    		@select='selectmap'
    		v-show='dataobj.selectbol'
    		>
		    <a-select-option value="gift">产品详情页</a-select-option>
		    <a-select-option value="farm">乡村农场页</a-select-option>
		</a-select>
		<div style="margin-bottom: 20px;">
			<span>排序：</span>
			<a-input-number :min="1" :max="9999999" v-model="homesort" @change="homesorta" />
		</div>

		<div v-if="dataobj.imgbol">
			<p>
				<span class="tit_red" >*</span>
				<span>上传{{dataobj.title}}：最多一张（建议尺寸{{gifSize}}）</span>
			</p>
			<filescom :datatype='childtypea' @childimga='childimga'></filescom>
		</div>
	    <a-table
	    	:columns="columns2"
	    	:dataSource="data2"
	    	bordered
	    	:rowSelection="{type:'radio',onChange:onchangetab}"
	    	style='margin-top: 20px;'
	    	:pagination="{showQuickJumper:true,showSizeChanger:true}"
	    >
		    <template slot="pkgname" slot-scope="text">
		      <a href="javascript:;">{{text}}</a>
		    </template>
		    <template slot="pkgimgs" slot-scope="text, record," >
		    	<img style="max-width: 50px;max-height: 30px;" :src="record.pkgimgs.split('|')[0]" />
		    </template>
		</a-table>

	    <div style="display: flex;justify-content: center;margin-top: 20px;">
	    	<a-button @click='returnlist' size='large' >取消</a-button>
	    	<a-button type="primary"
	    		size='large'
	    		@click='handleOk'
	    		style='margin-left: 20px;'
	    		>确定</a-button>

	    </div>
	</div>
</template>

<script>
import Url from '../../../../common/urlapi.js';
import filescom from '@/components/publicmodule/files/files';//上传图片
export default{
	data(){
		return{

			boxbol:false,

			childtypea:{//编辑的时候，上传图片，类型，张数，图片
	      		type:1,
	      		leng:1,
	      		arrimg:'no',
	      	},
	      	selectcont:{//选择的内容--初始化默认礼包
	      		type:0,//0轮播图，1首页礼包列表，2基地
	      		title:'',
	      		seurceid:'',//源id
	      		linktype:1,//类型，1礼包，2农场
	      		imgpath:'',
	      		sequence:'',//排序
	      		isUse:1
	      	},
	      	inindex:null,//当前选择的下标--新增
	      	typekey:'gift',//选择的类型--默认是礼包
			tokenn:'',
			data2:[],
			columns2 : [
				{
				  title: '产品名称',
				  dataIndex: 'pkgname',
				  width: '45%',
				  align:'center',
				  scopedSlots: { customRender: 'pkgname' },
				},
				{
				  title: '产品图片',
				  dataIndex: 'pkgimgs',
				  width: '45%',
				  align:'center',
				  scopedSlots: { customRender: 'pkgimgs' },
				}
			],
	      	homesort:99,//排序输入框
	      	tokenn:'',
	      	linktypenc:[],//新增时   基地
	      	linktypelb:[],//新增时   礼包
	      	gifSize:'',
//	      	selectcont:{},//当前选择
		}
	},
	components: {
		filescom,
	},
	props:['dataobj'],
	created(){
		this.tokenn = sessionStorage.getItem('access_token');
		this.childtypea.arrimg = 'no';
  		this.homesort = 99;//排序
  		this.selectcont.imgpath = '';
  		this.selectcont.sequence = this.homesort;//排序

	},
	watch:{
	    dataobj:{
	      	handler(newName, oldName) {
	   	    	console.log(newName);
				this.tokenn = sessionStorage.getItem('access_token');
				this.selectcont.type = newName.type;

				if( newName.type == 0 ){//轮播图
//					this.$message.error('轮播图')
					this.giftlist();
//					console.log(this.tokenn);
		//			696*824
					this.gifSize='696*324'
				}
				else if( newName.type == 1 ){//最新筹定
//					this.$message.error('最新筹定')
					this.giftlist();
					//248*248
					this.gifSize='248*248'
				}
				else if( newName.type == 3  ){//基地展示

//					this.$message.error('基地')
					this.baselist();
//					this.data2 = this.linktypenc;
					this.columns2[0].title = '乡村农场名称';
					this.columns2[1].title = '农场背景图';
//					console.log(this.data2);
//					console.log(this.linktypenc);
				}
				else{
					return false;
				}
	      	},
	      	immediate: true,
	      	deep: true
	    }
	},
	methods:{
		giftlist(){//礼包
			let newarr = [];
			this.$http.get(Url.httpHost+'/ylncadmin/giftpkg',{
				params:{
					access_token:this.tokenn,
				}
			})
			.then(resn=>{
	//				console.log(resn.data.result.rows);
				this.linktypelb = resn.data.result.rows;
				newarr = resn.data.result.rows;
				newarr.map((val,index)=>{
					newarr[index].key = index;
				})
				this.data2 = newarr;
	//				console.log(that.linktypelb);
			})
			.catch(erro=>{
				console.log(erro.response)

				// this.$message.error(erro.response.data.message);
			})
		},
		baselist(){//基地主体
			let newarr2 = [];
			this.$http.get(Url.httpHost+'/ylncadmin/basebody/list',{
				params:{
					access_token:this.tokenn,
					chkstate:1
				}
			})
			.then(resn=>{
				console.log(resn);
//				console.log(resn.data.result.rows);
				newarr2 = JSON.parse( JSON.stringify(resn.data.result.rows) );
				console.log( newarr2 );
				let arrs = [];
				newarr2.map((val,index)=>{
					if( val.backimage == null || val.farmname == null ){
//						newarr2.splice(index,1);
						return false;
					}else{
						arrs.push({
							pkgimgs : val.backimage,
							pkgname : val.farmname,
							key : index,
              				id:val.id
						})
//						this.data2.push({
//							pkgimgs : val.backimage,
//							pkgname : val.farmname,
//							key : index,
//            				id:val.id
//						})

					}
				});
				console.log( newarr2 );
				console.log(arrs);
				this.linktypenc = JSON.parse( JSON.stringify(arrs) );
				this.data2 = this.linktypenc;
				console.log(this.data2);
			})
			.catch(erro=>{
				console.log(erro);
	//			that.$message.error(erro.response.data.message);
			});
		},
		returnlist(){
			this.$router.push({
    			path:this.dataobj.path
    		})
		},
		//自定义事件（子传父值）
	  	childimga(item){
//			console.log(item);
			this.selectcont.imgpath = item;
	//		this.childtypea.arrimg = item;
	  	},
		//排序输入框
	  	homesorta(val){
	  		console.log(val);
			this.homesort = val;
			this.selectcont.sequence = this.homesort;
	  	},
	  	adddata(){
	  		let formd = JSON.stringify(this.selectcont);
        	console.log(JSON.parse(formd))
	  		this.$http({
		    	method:'POST',
		    	url:Url.httpHost+'/ylncadmin/homepagedata',
				data:formd,
				headers: {
					'content-type':'application/json',
		            "Authorization": "bearer "+this.tokenn,
		        },
			})
			.then(res=>{
					console.log(res);
				if( res.data.code == 200 ){
					this.$message.success('添加成功');
					this.$router.push({
		    			path:this.dataobj.path
		    		})
				}
			})
			.catch(err=>{
				console.log(err.response)
				this.$message.error(err.response.data.message);
			})
	  	},
		handleOk(e){//新增----确定按钮
	//    	console.log(e);
			let that = this;
//			console.log( that.data2 );
			//首次默认
	//		that.selectcont.type = 0;
			console.log(that.selectcont);
			if( that.selectcont.type == 0 || that.selectcont.type == 1  ){

				if( that.selectcont.imgpath == '' ){

					that.$message.error('未添加图片');
				}else if( that.inindex == null ){//农场没有数据
					that.$message.error('未选择新增项，请选择！！！');
				}else{

					this.adddata();//新增数据
				}

			}
			else{
				if( that.inindex == null ){//农场没有数据
					that.$message.error('未选择新增项，请选择！！！');
				}else{

					this.adddata();//新增数据
				}
			}

	    },
		onchangetab(selectedRowKeys,selectedRows){//单选
	    	console.log(selectedRowKeys);
	    	console.log( selectedRows );
//	    	console.log(this.data2);

	    	this.inindex = selectedRowKeys[0] ;
        	console.log(this.inindex);
//      	return;
	    	this.selectcont.title = selectedRows[0].pkgname;//this.data2[this.inindex].pkgname;//
		    this.selectcont.seurceid = selectedRows[0].id;// this.data2[this.inindex].id;
		    
		    console.log(this.selectcont);
		    
	    	if( this.selectcont.type == 3 ){
//	    		console.log(this.data2[this.inindex].pkgimgs );
				this.selectcont.imgpath = selectedRows[0].pkgimgs.split('|')[0];
				this.selectcont.linktype = 3;//类型-基地主体（乡村农场）
//				this.selectcont.seurceid = this.data2[this.inindex].seurceid;//类型-基地
			}
	    	else if( this.selectcont.type == 0 ){
				if( this.typekey == 'gift' ){
	//	    		this.selectcont.type = 0;
//		  			this.selectcont.title = this.data2[this.inindex].pkgname;
		    		this.selectcont.linktype = 1;//类型-产品（礼包）
//		  			this.selectcont.seurceid = this.data2[this.inindex].id;
	//		    	console.log( this.selectcont );
		    	}else{
	//	    		this.data2 = [];
		    		this.selectcont.linktype = 3;//类型-基地主体（乡村农场）
	//	    		this.selectcont.type = 0;//
//		    		this.selectcont.title = this.data2[this.inindex].pkgname;//
//		    		this.selectcont.seurceid = this.data2[this.inindex].id;
	//	    		console.log(this.selectcont );
		    	}
			}else{
				this.selectcont.linktype = 1;//类型-礼包
			}

	    },
		selectmap(val){//选择--产品 /乡村农场
			 console.log(val);
			// console.log(this.inindex);

			if( val.key == 'gift' ){//礼包
	    		this.typekey = 'gift';
	    		this.data2 = this.linktypelb;
				this.columns2[0].title = '产品名称';
				this.columns2[1].title = '产品图片';
	    		console.log(this.data2);
	    		if( this.inindex != null ){
//		    		this.selectcont.type = 0;//类型：轮播图
		  			this.selectcont.title = this.data2[this.inindex].pkgname;
		    		this.selectcont.linktype = 1;//类型：礼包
		  			this.selectcont.seurceid = this.data2[this.inindex].id;
//		    		console.log( this.selectcont );
	    		}
	    	}
			else if( val.key == 'farm' ){//基地
				this.baselist();//乡村农场数据
	    		this.typekey = 'farm';
//	    		this.data2 = this.linktypenc;
//	    		console.log(this.linktypenc);
//	    		console.log(this.data2);
	    		this.columns2[0].title = '乡村农场名称';
				this.columns2[1].title = '农场背景图';
	    		if( this.inindex != null ){
	    			this.selectcont.linktype = 2;//类型：农场
//		    		this.selectcont.type = 0;//类型：轮播图
		    		this.selectcont.title = this.data2[this.inindex].pkgname;//农场没有数据basename
		    		this.selectcont.seurceid = this.data2[this.inindex].id;//农场没有数据
		    		console.log(this.selectcont );
	    		}else{
	    			console.log( this.selectcont );
	    		}
	    	}else{
	    		return;
	    	}
		}
	}
}
</script>

