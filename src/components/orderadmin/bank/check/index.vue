<template>
	<div>
		
		<check :orderid='orderids'></check>
		<orderinfo :orderid='orderids' :tochild="parentval" ></orderinfo>
		<div style="display: flex;justify-content: space-evenly;padding-top: 30px;" v-if='btnbol'>
			<a-button type="primary" @click='checkyes'>审核通过</a-button>
			<a-button type="primary" @click='checkno'>审核不通过</a-button>
		</div>
		<a-modal
	      	title="请输入不通过理由"
	      	:visible="visible"
	      	@ok="handleOk"	      	
	      	@cancel="handleCancel"
	      	:maskClosable='false'
	    >
	    	<a-textarea placeholder="请输入" v-model='valtxt' maxLength="12" style='max-height: 60px;line-height: 30px;' :rows="2" />
	    </a-modal>
	</div>
</template>

<script>
	import Url from '../../../../common/urlapi.js'	;
import check from '@/components/orderadmin/bank/public/bankinfo';//上传图片
import orderinfo from '@/components/orderadmin/bank/public/orderinfo';//银行卡  - 订单信息
export default{
	
	data(){
		return{
			tokenn:'',
			visible:false,
			valtxt:'',//审核理由
			btnbol:false,
//			cont:'',//汇款信息
			checkids:'',//审核id
			orderno:'',//审核订单号
			
			parentval:null,
			
			orderids:null,
		}
	},
	created(){
		this.tokenn = sessionStorage.getItem('access_token');
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
						txt:'核对支付信息',
						path:'/index/bank/check'
					},
				],			
			}
		);		
		
		sessionStorage.setItem('banktxt','汇款信息');
		
		this.orderids = JSON.parse( sessionStorage.getItem('orderinfoid') );
		console.log( this.orderids );
		this.parentval = this.orderids.txt;		
		
		this.$http.get(Url.httpHost+'/ylncadmin/orderinfo/cardOrderlist?access_token='+this.tokenn,)
		.then(res=>{
			let arry = JSON.parse( JSON.stringify(res.data.result.rows) );
			arry.map(val=>{
//				console.log(val);
				if( val.orderno == this.orderids.orderno ){
					console.log(val);
					if(val.state == 0){
						if( val.notifystatus <= -1 ){
							this.parentval = '已取消';
							this.btnbol = false;
						}else{
							this.parentval = '等待用户支付确认';
							this.btnbol = false;
						}
					}
					else if( val.state == 1 && val.notifystatus == 1 ){
						this.parentval = '等待工作人员确认';
						this.btnbol = true;
//						console.log('等待工作人员确认');
					}
//					 if( val.state == 1 && val.notifystatus == 2 ){
//						if( val.status == 0 ){
//							this.parentval = '正在筹定，暂未发放';	
//							this.btnbol = false;
//							console.log('正在筹定，暂未发放');
//						}
//					}
					else if( val.state == 1 && val.notifystatus == -1 ){
						this.parentval = '审核失败';
						this.btnbol = false;
					}
					else if( val.state == 1 && val.notifystatus < -1 ){
						this.parentval = '已取消';
						this.btnbol = false;
					}
					else if( val.state == 1 && val.notifystatus == 2 ){
						if( val.status == -1 ){
							if( val.refundState == 2 ){
								this.parentval = '筹定失败,已退款';
								this.btnbol = false;		
							}else{						
								this.parentval = '筹定失败,待退款' ;
								this.btnbol = false;
							}						
						}else if( val.status == 1  ){
							this.parentval = '筹定成功,已发放';
							this.btnbol = false;
						}else{//val.status == 0
							this.parentval = '筹定中,暂未发放';
							this.btnbol = false;
						}
					}
					else{
						console.log(val.state);
						console.log(val.notifystatus);
						console.log(val.status);
						console.log(val.refundState );
						this.parentval = '';
						this.btnbol = false;
						console.log('状态未知*************');
					}					
				}
	
			})
			
			
		})
		
		
		
		
//		this.cont = JSON.parse( sessionStorage.getItem('checkinfo') );
		
//		this.objorder = JSON.parse( sessionStorage.getItem('orderinfoid') );//订单信息（id和状态）
//		this.orderno = sessionStorage.getItem('checkinfoorderno');//审核订单号
	},
	components: {
		check,
		orderinfo,
	},
	methods: {
      	checkyes(){
      		this.checkids = sessionStorage.getItem('checkid');//审核id
      		console.log('通过');
      		this.$http.put(Url.httpHost+'/ylncadmin/remit/check?access_token='+this.tokenn
      		+'&checkStatus=1'+'&chkNote=通过'+'&id='+this.checkids)
	  		.then(res=>{
	  			console.log(res);
	  			if( res.data.code == 200 ){
	  				this.$message.success();
	  				this.btnbol = false;
					this.parentval = '正在筹定，暂未发放';
				}

	  		})
	  		.catch(err=>{
	  			console.log(err);
	  			console.log(err.response)
	  		})

      	},
      	checkno(){
      		console.log('不通过');
      		this.visible = !this.visible;
      	},
      	handleOk(){//审核不通过=确定
      		console.log( this.valtxt );
      		if( this.valtxt != '' ){

				this.checkids = sessionStorage.getItem('checkid');//审核id
      			this.visible = !this.visible;
      			
      			this.$http.put(Url.httpHost+'/ylncadmin/remit/check?access_token='+this.tokenn
      			+'&checkStatus=0'+'&chkNote='+this.valtxt+'&id='+this.checkids)
		  		.then(res=>{
		  			console.log(res);
		  			if( res.data.code == 200 ){
						this.$message.success();
						this.btnbol = false;
						this.parentval = '审核失败';
					}
	
		  		})
		  		.catch(err=>{
		  			console.log(err);
		  			console.log(err.response)
		  		})
      			
      			
      			
      			
      		}else{
      			this.$message.info('请填写不通过理由');
      		}

      	},
      	handleCancel(){//取消
      		this.visible = !this.visible;
      		this.valtxt = '';
      	},
    },
}
</script>

<style>

</style>