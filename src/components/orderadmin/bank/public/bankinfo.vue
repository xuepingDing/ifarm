<template>

	<div>
		<a-divider orientation="left">{{banktxt}}</a-divider>
		<ul class="banklist">
			<li>
				<p>
					<!--<span class="tit_red">*</span>-->
					<span>汇款日期</span>
				</p>
				<p>{{times}}</p>
			</li>
			<li>
				<p>
					<!--<span class="tit_red">*</span>-->
					<span>汇款人</span>
				</p>
				<p>{{name}}</p>
			</li>
			<li>
				<p>
					<!--<span class="tit_red">*</span>-->
					<span>交易流水号</span>
				</p>
				<p>{{dealnumber}}</p>
			</li>
			<li>
				<p>
					<!--<span class="tit_red">*</span>-->
					<span>交易行名称</span>
				</p>
				<p>{{dealbank}}</p>
			</li>
			<li>
				<p>
					<!--<span class="tit_red">*</span>-->
					<span>支付金额</span>
				</p>
				<p>￥{{moneys}}</p>
			</li>
			<li>
				<p>
					<!--<span class="tit_red">*</span>-->
					<span>汇款备注</span>
				</p>
				<p>{{remark}}</p>
			</li>
			<li>
				<p>对账单照片</p>
				<p v-if="imgbol" class="imgbox" @click='meye'>
					<img :src="imgs" alt="未上传图片"/>
				</p>
			</li>
			
		</ul>
		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
			<img alt="example" style="width: 100%" :src="previewImage" />
		</a-modal>
	</div>

</template>

<script>
import Url from '../../../../common/urlapi.js'	;
export default{
	data(){
		return{
			imgbol:true,//是否有对账单照片
			banktxt : '汇款信息',
			times : '',//日期
			name : '',//汇款人
			dealnumber : '',//交易流水号
			dealbank : '',//交易银行名称
			moneys : '',//支付金额
			remark : '',//备注
	    	imgs : '',
	    	previewVisible : false,//图片放大--显示
			previewImage : '',
			
			tokenn : '',
		}
	},
	props: ['orderid'],
	created(){
		this.tokenn = sessionStorage.getItem('access_token');
		this.banktxt = sessionStorage.getItem('banktxt');
		
//		this.times = new Date().toLocaleDateString();
//		this.imgs = 'https://udbimg.oss-cn-shenzhen.aliyuncs.com/model/40e3a15f8b2b6ff6a6c0cfb60ddaf446';
		
//		let orderids = JSON.parse( sessionStorage.getItem('orderinfoid') );
		
		console.log( this.orderid );
		
//		let orderno = sessionStorage.getItem('infonumber') ;
		this.$http.get(Url.httpHost+'/ylncadmin/remit/detail?access_token='
		+this.tokenn+'&orderno='+this.orderid.orderno+'&remitType='+this.orderid.remitType
		)
		.then(res=>{
			console.log(res);
			
			this.times = res.data.result.remitDate;	//汇款日期
			this.name = res.data.result.remitter;	//汇款人
			this.dealnumber = res.data.result.remitNumber;	//交易流水号
			this.dealbank = res.data.result.bankName;	//交易行名称
			this.moneys = res.data.result.remitAmount;	//汇款金额
			this.remark = res.data.result.remitNote;	//汇款备注
//			this.imgs = res.data.result.remitImg;//汇款账单图片
			sessionStorage.setItem('checkid',res.data.result.id);//审核id
			console.log(res.data.result.id)
			if( res.data.result.remitImg == '' ){
				this.imgbol = false ;

			}else{
				this.imgbol = true ;
				this.imgs = res.data.result.remitImg;//汇款账单图片
			}
		})
		.catch(err=>{
			console.log(err);
			console.log(err.response);
			
		})
	
	},
	methods:{
		meye(){
			this.previewVisible = true;
			this.previewImage = this.imgs;
		},
		handleCancel() {
        	this.previewVisible = false;
      	},
	},
}
</script>

<style>
.imgbox{
	width: 100px;
	height: 60px;
	overflow: hidden;
			
}
.imgbox img{
	width: 100%;
	height: 100%;
	object-fit: cover;
}
/*汇款信息*/
.banklist{
	display: flex;
	flex-wrap: wrap;
}	
.banklist >li{
	padding: 10px 10px;
	/*flex: 1;*/
	width: 300px;
	/*border-bottom: 1px solid #ccc;*/
}
.banklist >li p{
	line-height: 30px;
}
.ant-modal-close-x {
	display: none;
}
</style>