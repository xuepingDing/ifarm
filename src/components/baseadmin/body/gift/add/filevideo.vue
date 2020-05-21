<template>
	<div>
		
		
		
		<!--<a-upload id='iddd' class='iddd' :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
	      	<a-button> <a-icon class='isss' type="upload" /> 选择视频上传 </a-button>
	    </a-upload>-->
	    <div class="uploadbox" v-show="selectbol">
	    	<a-button> <a-icon class='isss' type="upload" /> 选择视频上传 </a-button>
	    	<input type="file" 
					class="flie_input"
					@change="change"  
					:value="vals"
					/>
							
	    </div>
	    <div v-show="!selectbol">
	    	
	     	<p>上传进度：{{progress}}%</p>
	     	<p>{{name}}</p>
	    </div>
	    
	</div>
</template>
<!--import reqwest from 'reqwest';-->
<script>
import Url from '../../../../../common/urlapi.js';
//var uploadAuth = null ,uploadAddress = null,videoId = null;
//var maxSize=50*1024*1024;
//var progress='';//上传进度
////console.log(uptxt);
//var uploader = new AliyunUpload.Vod({
//  // 文件上传失败
//  'onUploadFailed': function (uploadInfo, code, message) {
//      console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
//  },
//  // 文件上传完成
//  'onUploadSucceed': function (uploadInfo) {
////  	uploadResult=true;
//		console.log('完成');
////		$message.success('视频上传完成');
//  },
//  // 文件上传进度
//  'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
//      progress=Math.ceil(loadedPercent * 100.00)+'%';
//      alert(progress)
////    	$message.info('视频上传进度：'+progress+'%');
//  	console.log("onUploadProgress:file视频名：" + uploadInfo.file.name + ", fileSize视频大小:" + totalSize + ", percent进度:" + Math.ceil(loadedPercent * 100.00) + "%");
//  	//修改上传进度条效果
////  	pro.update(progress);
//  
//  },
//  // STS临时账号会过期，过期时触发函数
//  'onUploadTokenExpired': function () {
//      console.log("onUploadTokenExpired");
//  },
//  onUploadCanceled:function(uploadInfo)
//  {
//      console.log("onUploadCanceled:file:" + uploadInfo.file.name);
//  },
//  // 开始上传
//  'onUploadstarted': function (uploadInfo) {
//  		//显示进度
////         console.log( uploadAuth );
////          console.log("uploadAuth:"+ uploadAuth );
//          uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress);
//      // console.log(uploadInfo);
//          console.log("====================="+ uploadInfo.file.name );
//  }
//});


export default{
	data(){
		return{
			tokenn:'',
			
			selectbol:true,
			progress:0,//进度			
			name:'',
        	fileList:[],
        	vals:'',
        	uploader:null,
        	uploadAuth:null,
        	uploadAddress : null,
        	videoId : null,
		}
	},
	
	created(){
		this.tokenn = sessionStorage.getItem('access_token'); 

		var maxSize=50*1024*1024;
		var progress = '';//上传进度
		let that = this;
		that.uploader = new AliyunUpload.Vod({
		    // 文件上传失败
		    'onUploadFailed': function (uploadInfo, code, message) {
		        console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
		    },
		    // 文件上传完成
		    'onUploadSucceed': function (uploadInfo) {
		//  	uploadResult=true;
				console.log('完成');
		//		$message.success('视频上传完成');
		    },
		    // 文件上传进度
		    'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
		        progress=Math.ceil(loadedPercent * 100.00);
		        that.progress = progress;
//		        alert(progress)
		//    	$message.info('视频上传进度：'+progress+'%');
		    	console.log("onUploadProgress:file视频名：" + uploadInfo.file.name + ", fileSize视频大小:" + totalSize + ", percent进度:" + Math.ceil(loadedPercent * 100.00) + "%");
		    	//修改上传进度条效果
		//  	pro.update(progress);
		    
		    },
		    // STS临时账号会过期，过期时触发函数
		    'onUploadTokenExpired': function () {
		        console.log("onUploadTokenExpired");
		    },
		    onUploadCanceled:function(uploadInfo)
		    {
		        console.log("onUploadCanceled:file:" + uploadInfo.file.name);
		    },
		    // 开始上传
		    'onUploadstarted': function (uploadInfo) {
		    		//显示进度
		//         console.log( uploadAuth );
		//          console.log("uploadAuth:"+ uploadAuth );
		            that.uploader.setUploadAuthAndAddress(uploadInfo, that.uploadAuth, that.uploadAddress);
		        // console.log(uploadInfo);
		            console.log("====================="+ uploadInfo.file.name );
		    }
		});
			
	},
	
	methods:{
		change(e){
			console.log( e.target.files[0] );
			let file =  e.target.files[0] ;
			console.log(file);
	    	if( file.size > 52428800 ){
	    		this.$message.error('视频过大，上限为50mb');
	    		return false;
	    	}
	    	
	    	let names = file.name;
	    	this.name = names;
	    	let endname = names.split('.')[1];
	    	console.log(endname);
	    	console.log(endname == 'mp4' );
	    	console.log(endname == 'm3u8' );
	    	console.log(endname == '3gp' );
	    	
	    	if( endname == 'mp4' || endname == 'm3u8' || endname == '3gp' ){
				this.selectbol = !this.selectbol;	
//				this.$message.error('选择的视频格式不对');
//				this.vals = '';
//	    		return false;
	    	}else{
//	    		this.selectbol = !this.selectbol;
	    		this.$message.error('选择的视频格式不对');
				this.vals = '';
	    		return false;
	    	}
	    	
	    	let userData = '{"Vod":{"UserData":{"IsShowWaterMark":"false","Priority":"7"}}}';
	    	this.uploader.addFile(file, null, null, null, userData);//添加选择的文件
	    	let filename = file.name;
	    	this.$http({
                method: 'POST',
                url: Url.httpHost + '/ylncadmin/authvideo',
                data:  filename,
                headers: {
	                'content-type': 'application/json',
	                "Authorization": "bearer " + this.tokenn
                },
            }).then((res)=>{
            	console.log(res)
//          	console.log(res.data.result.uploadAuth);
//          	console.log(res.data.result.uploadAddress);
            	
            	this.uploadAuth = res.data.result.uploadAuth;
            	this.uploadAddress=res.data.result.uploadAddress;
            	this.videoId=res.data.result.videoId;
//          	this.videoId = videoId;
//          	this.$message.info(videoId);
//          	this.$message.info(this.videoId);
            	console.log(this.videoId);
//          	console.log(this.videoId);
            	this.$emit('videoids',this.videoId);
//          	console.log("uploadAuth:"+ uploadAuth );
				//调用开始上传----
            	this.uploader.startUpload();
            })
            .catch((err)=>{
            	console.log(err.response);
            })
			
		},
		handleRemove(file) {
	        const index = this.fileList.indexOf(file);
	        const newFileList = this.fileList.slice();
	        newFileList.splice(index, 1);
	        this.fileList = newFileList;
	    },
	    beforeUpload(file) {
	    	console.log(file);
	    	if( file.size > 52428800 ){
	    		this.$message.error('视频过大，上限为50mb');
	    		return false;
	    	}
	    	let userData = '{"Vod":{"UserData":{"IsShowWaterMark":"false","Priority":"7"}}}';
	    	this.uploader.addFile(file, null, null, null, userData);//添加选择的文件
	    	let filename = file.name;
	    	this.$http({
                method: 'POST',
                url: Url.httpHost + '/ylncadmin/authvideo',
                data:  filename,
                headers: {
	                'content-type': 'application/json',
	                "Authorization": "bearer " + this.tokenn
                },
            }).then((res)=>{
            	console.log(res)
//          	console.log(res.data.result.uploadAuth);
//          	console.log(res.data.result.uploadAddress);
            	
            	this.uploadAuth = res.data.result.uploadAuth;
            	this.uploadAddress=res.data.result.uploadAddress;
            	this.videoId=res.data.result.videoId;
//          	this.videoId = videoId;
//          	this.$message.info(videoId);
//          	this.$message.info(this.videoId);
            	console.log(this.videoId);
//          	console.log(this.videoId);
            	this.$emit('videoids',this.videoId);
//          	console.log("uploadAuth:"+ uploadAuth );
				//调用开始上传----
            	this.uploader.startUpload();
            })
            .catch((err)=>{
            	console.log(err.response);
            })
	    	
	        this.fileList = [...this.fileList, file];
	        return false;
	    },
	    
		
		
	}	
}
</script>

<style>
.iddddd .ant-upload-list .ant-upload-list-item .ant-upload-list-item-info{
	padding: 0 20px 0 5px!important;
}
.uploadbox{
	width: 138px;
	height: 32px;
	position: relative;
}
.flie_input{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 999;
	opacity: 0;
}
</style>