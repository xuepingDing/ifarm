<template>
	<div>
		<div>
			<div
			  
		    >		   	
			    <div style="display: flex;flex-wrap: wrap;">
			    	<div class="showbox" v-for='(item,i) in addimg' :key='i'>
			    		<img class="showimg" v-if="addimg.length > 0" :src="item" />
			    		<div class="deleteback" >
			    			<a-icon type="eye" 
			    				@click='meye(i)'/>
			    			<a-icon type="delete" 
			    				theme="outlined" 
			    				@click="deletesvg(i)"
			    				style='' />
			    		</div>
			    	</div>
					<div class="upfiles" v-if="maximg">
						<input type="file" 
							class="flie_input"
							@change="change" 
							:value="val"
							accept="image/*"
							/>
						<div class="flie_click">
							<a-icon :type="upicontype" />
	        				<div class="ant-upload-text">{{uptxt}}</div>
						</div>
					</div>
					
				</div>
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      				<img alt="example" style="width: 100%" :src="previewImage" />
    			</a-modal>
		    </div>
			
			
			
		</div>
		
		
			
	</div>
</template>

<script>
import Url from '../../../common/urlapi.js'	;
export default{
	
	data(){
		return{
			stra:'',
			strb:'',
			addimg:[],//页面显示图片数组
			maximg:true,
			val:'',
			upicontype:'plus',
			uptxt:'上传',
			previewVisible:false,//图片放大--显示
			previewImage:'',
		}
	},
	props:['datatype'],
	crated(){
//		console.log(this.datatype);
		
	},		
	methods:{		
		change(e){
//			console.log(e);
//			console.log(this.datatype);
//			console.log(Url.filest+'/upload');
			let that = this;
			let files = e.target.files[0];
//			console.log( files );
			let name_ = e.target.value;
			let type_ = name_.split('.');
//			console.log(type_);		
			if( type_[1] == 'jpg' || type_[1] == 'png' ||type_[1] == 'jpeg' ){
				let tokenn = sessionStorage.getItem('access_token');
//				console.log(tokenn);				
				let formd = new FormData();
				formd.append('file',files);
//				console.log('loading');
				that.upicontype = 'loading';
				that.uptxt = '上传中···';
				if( files != undefined ){
//					console.log('?')
//					that.val = '';
					that.$http({
				      	method:'POST',
				      	url: Url.httpHost+'/ylncadmin/upload',
				      	data:formd,
				      	headers: {
					            	"Authorization": "bearer "+tokenn,				            	
					        },			      				
				    })
					.then(res=>{
//				    	console.log(res);
//				    	console.log(res.data.result);
				    	if( res.status == 200 && res.data.code == 200){
				    		that.upicontype = 'plus';
							that.uptxt = '上传';
				    		that.val = '';
				    		let strimg;
				    		let imgbox = '';
							imgbox = res.data.result;
	//						console.log(imgbox);
							that.addimg.push(imgbox);
//							console.log(that.addimg);
							
							if( this.addimg.length == this.datatype.leng ){
								this.maximg = false;
							}else{
								this.maximg = true;
							}
							
							strimg = that.addimg.join("|");//把当前选择的图片数组转 string
							that.datatype.arrimg = strimg;
				    		if( that.datatype.type == 1 ){
				    			that.$emit('childimga',strimg);
				    		}
				    		else if( that.datatype.type == 2 ){
//				    			console.log(strimg)
				    			that.$emit('childimgb',strimg);
				    		}
							else if( that.datatype.type == 3 ){
//				    			console.log(strimg)
				    			that.$emit('childimgc',strimg);
				    		}
							else if( that.datatype.type == 4 ){
				    			
				    			that.$emit('childimgd',strimg);
				    		}
							else if( that.datatype.type == 5 ){
//				    			console.log(strimg)
				    			that.$emit('childimge',strimg);
				    		}
							else{
								return false;
							}
				    		
				    	}
				    })
					.catch(err=>{		
						that.val = '';
						console.log(err);
						console.log(err.response)
						console.log(err.response.data);
						that.$message.error('图片上传失败');
						that.upicontype = 'plus';
						that.uptxt = '上传';

						that.$message.error(err.response.data.message);
					})
				}
				else{
					that.val = '';
				}
				
			}
			else{
//				setTimeout(function(){
					that.val = '';
//				},100)
				
				this.$message.error('上传图片格式不正确，请重新上传jpg/png格式图片')
			}

			
			

			
		},		
		meye(i){
			this.previewVisible = true;
			this.previewImage = this.addimg[i];
		},
		handleCancel() {
        	this.previewVisible = false;
      	},
		deletesvg(i){//删除
//			console.log(i)
			let arrimg = this.addimg;
//			this.addimg = arrimg.filter(item => item !== this.addimg[i] );
			this.addimg.splice(i,1);
//			console.log( this.addimg );
			
			if( this.addimg.length == this.datatype.leng ){
				this.maximg = false;
			}else{
				this.maximg = true;
			}
			
			let strimg = this.addimg.join("|");//把当前选择的图片数组转 string						
    		if( this.datatype.type == 1 ){
//				console.log(strimg)
    			this.$emit('childimga',strimg);
    		}
    		else if( this.datatype.type == 2 ){
//  			console.log(strimg)
    			this.$emit('childimgb',strimg);
    		}
			else if( this.datatype.type == 3 ){
//  			console.log(strimg)
    			this.$emit('childimgc',strimg);
    		}
			else if( this.datatype.type == 4 ){
//  			console.log(strimg)
    			this.$emit('childimgd',strimg);
    		}
			else if( this.datatype.type == 5 ){
//  			console.log(strimg)
    			this.$emit('childimge',strimg);
    		}
			else{
				return false;
			}
			
		}
	},
	watch:{ 	
	    datatype:{
	      	handler(newName, oldName) {
//	   	    	console.log(newName);
//				let that = this;
				
				
				if (newName.arrimg != 'no') {
//					console.log('编辑-------------------');
//					console.log(newName);										
						
//					if( this.addimg.length == this.datatype.leng ){
//						this.maximg = false;
//					}else{
//						this.maximg = true;
//					}
					
					if(newName.type == 1 ){
						this.addimg = newName.arrimg.split('|');
//						console.log(this.addimg);
//						console.log(this.datatype);
						if( this.addimg.length == this.datatype.leng){
							this.maximg = false;
						}else{
							this.maximg = true;
						}
					}
					else if(newName.type == 2 ){
						this.addimg = newName.arrimg.split('|');
//						console.log(this.addimg);
						if( this.addimg.length == this.datatype.leng){
							this.maximg = false;
						}else{
							this.maximg = true;
						}
					}
					else if(newName.type == 3 ){
						this.addimg = newName.arrimg.split('|');
//						console.log(this.addimg);
						if( this.addimg.length == this.datatype.leng){
							this.maximg = false;
						}else{
							this.maximg = true;
						}
					}
					else if(newName.type == 4 ){
						this.addimg = newName.arrimg.split('|');
//						console.log(this.addimg);
						if( this.addimg.length == this.datatype.leng){
							this.maximg = false;
						}else{
							this.maximg = true;
						}
					}else if(newName.type == 5 ){
						this.addimg = newName.arrimg.split('|');
//						console.log(this.addimg);
						if( this.addimg.length == this.datatype.leng){
							this.maximg = false;
						}else{
							this.maximg = true;
						}
					}else{
						return;
					}
					
		       	}		        
				else{
//					console.log(newName);
					this.addimg = [];
					this.maximg = true;
//					this.$message.success('图片清空了');
//					console.log(this.addimg);
				}		        
	      	},
	      	immediate: true,
	      	deep: true
	    }
	}
	
}
</script>

<style scoped>
.upfiles{
	width: 100px;
	height: 100px;
	position: relative;
	border: 1px dashed #d9d9d9;
	background: #fafafa;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius:4px;
	color: #666;
}
.flie_click{
	font-size: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.upfiles:hover{
	border: 1px dashed #1890ff;
	color: #1890ff;
	
}
.flie_input{
	position: absolute;
	width: 100%;
	height: 100%;
	/*display: none!important;*/
	opacity: 0;
	z-index: 99;
}
.flie_input{
	cursor: pointer;
}
/*页面显示img*/
.showbox{
	width: 100px;
	height: 100px;
	display: inline-block;
	margin:0 5px 5px 0;
	border: 1px solid #999;
	padding: 5px;
	position: relative;
}
.showimg{
	display: inline-block;
	width: 100%;
	height: 100%;
	border-radius: 3px;
	object-fit: cover;
}
.deleteback{
	/*width: 100%;
	height: 100%;*/
	background: rgba(000,000,000,0.6);
	position: absolute;
	top: 5px;
	left: 5px;
	right: 5px;
	bottom: 5px;
	border-radius: 3px;
	display: none;
	text-align: center;
	line-height: 88px;
}
/*删除图标*/

.deleteback > .anticon {
  font-size: 24px;
  color: #C0C4CC;
}
.showbox:hover .deleteback{
	display: block;
	cursor: pointer;
}
</style>