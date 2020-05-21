<template>
	<div>
		
		<a-divider orientation="left">请填写汇款信息</a-divider>	
		
		
		<ul class="banklist">
			<li>
				<p>
					<span>用户联系方式：</span>
					<span>{{tels}}</span>
				</p>
				
				<p style="color: #999;">请联系用户获取转账账号信息</p>
			</li>

			<li>
				<p>
					<span class="tit_red">*</span>
					<span>汇款日期</span>
				</p>
				<a-date-picker class='rigput'  @change="onChange" />
			</li>
			<li>
				<p>
					<span class="tit_red">*</span>
					<span>汇款人</span>
				</p>
				<a-input class='rigput'
				        placeholder="请输入"
				       	v-model='hkr'
				       	maxLength="6"/>
			</li>
			<li>
				<p>
					<span class="tit_red">*</span>
					<span>交易流水号</span>
				</p>
				<a-input class='rigput'
				        placeholder="请输入"
				       	v-model='numb'
				       	maxLength="30"/>
			</li>
			<li>
				<p>
					<span class="tit_red">*</span>
					<span>交易行名称</span>
				</p>
				<a-input class='rigput'
				        placeholder="请输入"
				       	v-model='name'
				       	maxLength="30"/>
			</li>
			<li>
				<p>
					<span class="tit_red">*</span>
					<span>支付金额</span>
				</p>
				<a-input-number class='rigput'
				        placeholder="请输入"
				       	v-model='moneys'
				       	@change='moneya'
				       	:min="0"
				       	:max='9999999999'
				       	maxLength="10"/>
			</li>
			<li>
				<p>					
					<span>汇款备注</span>
				</p>
				<a-textarea placeholder="请输入" 
					class='rigput' maxLength="50" 
					v-model="content"
					style='max-height: 120px;line-height: 30px;' :rows="4" />
			</li>
			<li>
				<p>对账单照片</p>
				<filescom :datatype='childtypea' @childimga='childimga'></filescom>
			</li>
			
			
		</ul>
		<div>
			<orderinfo @openid="opid" :orderid='orderids'  :tochild="parentval"></orderinfo>
		</div>
		<div style="text-align: center;">
			<a-button type="primary" @click='returnbox'>确认退款</a-button>		
		</div>
		
	</div>
</template>

<script>
import Url from '../../../../common/urlapi.js'	;

import filescom from '@/components/publicmodule/files/files';//上传图片
import orderinfo from '@/components/orderadmin/bank/public/orderinfo';//银行卡  - 订单信息
export default{
	
	data(){
		return{
			orderids:null,
			parentval:null,
			
			tels:'',//电话
			hkr:'',//汇款人
			numb:'',//流水号
			name:'',//名称
			moneys:0,//金额
			content:'',//备注
			
			tokenn:'',
			childtypea:{//上传图片
	      		type:1,
	      		leng:1,
	      		arrimg:'no',
	      	},
	      	
	      	obj:{
	      		orderno:'',//订单号
	      		remitDate:'',//汇款日期
	      		remitter:'',//汇款人
	      		remitNumber:'',//交易流水号
	      		bankName:'',//交易行名称
	      		remitType:1,//汇款类型：0支付1退款
	      		remitAmount:'',//汇款金额
	      		remitNote:'',//汇款备注
	      		remitImg:'',//账单图片
	      		openId:'',
	      	}
		}
	},
	created(){
		this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'订单管理',
						path:'',
					},
					{
						txt:'银行卡订单管理',
						path:'/index/bank'
					},
					{
						txt:'确认退款',
						path:'/index/bank/confirm'
					},
				],			
			}
		);
		this.tokenn = sessionStorage.getItem('access_token');
		
//		this.tels = JSON.parse(sessionStorage.getItem('orderinfoid') ).mobile;//手机号
//		this.obj.orderno = sessionStorage.getItem('infonumber');//订单号
		console.log( JSON.parse( sessionStorage.getItem('orderinfoid') ) );
		
		this.orderids = JSON.parse( sessionStorage.getItem('orderinfoid') );
		this.obj.orderno = this.orderids.orderno;
		this.tels = this.orderids.mobile;
		
		this.parentval = this.orderids.txt;
		console.log( this.orderids );
	
	},
	components: {
		filescom,
		orderinfo,
	},
	methods: {
		opid(id){
			console.log(id);
			this.obj.openId = id;
		},
      	onChange( data,dateString) {//日期
        	console.log( dateString);
        	this.obj.remitDate = dateString;
      	},      	
      	moneya(val){//金额
      		console.log(val);
//    		console.log(this.moneys);
      		this.obj.remitAmount = val;
      	},
      	childimga(item){//账单图片
			console.log(item);
			this.obj.remitImg = item;
	  	},
	  	returnbox(){//确认退款
	  		this.obj.remitter = this.hkr;
	  		this.obj.remitNumber = this.numb;//流水号
	  		this.obj.bankName = this.name;
	  		this.obj.remitter = this.hkr;
	  		this.obj.remitNote = this.content;
	  		this.obj.remitAmount = this.moneys;
	  		
	  		if( this.obj.orderno == '' ){
	  			this.$message.info('订单号未获取到');
	  		}else if( this.obj.remitDate == '' ){
	  			this.$message.info('汇款日期未获取到');
	  		}else if( this.obj.remitter == '' ){
	  			this.$message.info('汇款人未获取到');
	  		}else if( this.obj.remitNumber == '' ){
	  			this.$message.info('交易流水号未获取到');
	  		}else if( this.obj.bankName == '' ){
	  			this.$message.info('交易行名称未获取到');
	  		}else if( this.obj.remitAmount == '' ){
	  			this.$message.info('汇款金额未获取到');
	  		}
//	  		else if( this.obj.remitNote == '' ){
//	  			this.$message.info('汇款备注未获取到');
//	  		}else if( this.obj.remitImg == '' ){
//	  			this.$message.info('账单图片未获取到');
//	  		}
	  		else{
	//	  		this.$http.post(Url.httpHost+'/ylncadmin/remit/?access_token='+this.tokenn)
				let formd = JSON.stringify(this.obj);
				this.$http({
                    method: 'POST',
                    url: Url.httpHost + '/ylncadmin/remit',
                    data: formd,
                    headers: {
                    'content-type': 'application/json',
                    "Authorization": "bearer " + this.tokenn,
                    },
                })
		  		.then(res=>{
		  			console.log(res);
		  			if(res.data.code == 200 ){
		  				this.$router.push({
		                  	path: '/index/bank'
		                })
		  			}
		  		})
		  		.catch(err=>{
		  			console.log( err );
		  			console.log( err.response );
		  			this.$message.error(err.response.data.message)
		  		})
		  		
	//	  		this.$router.push({
	//				path:'/index/bank'
	//			});	  			
	  		}
	  		
	  		console.log( this.obj );

	  	}
    },
}
</script>

<style>
.banklist{
	display: flex;
	flex-wrap: wrap;
}	
.banklist >li{
	margin: 10px 10px;
	/*flex: 1;*/
	width: 300px;
}
.banklist >li p{
	line-height: 30px;
}
.rigput{
    width: 300px;
}	
</style>