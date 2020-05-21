<template>
	<div>
		<a-divider orientation="left">订单信息</a-divider>
		
		<ul class="orderlist">
      		<li>
      			<span>订单状态：</span>
      			<span>{{order.status.replace(/\d+$/,'')}}</span>
      		</li>
      		<li>
      			<span>订单单号：</span>
      			<span>{{order.numb}}</span>
      		</li>
      		<li>
      			<span>下单时间：</span>
      			<span>{{order.time}}</span>
      		</li>
      	</ul>
      	<div class="shopcont">
      		<div class="shopbox">
      			<span>商品</span>
      			<span>数量</span>
      			<span>单价</span>
      			<span>总价</span>
      		</div>
      		<a-divider />
      		<div class="shopbox">
      			<p>
      				<img style="width: 30px;height: 30px;" :src="order.img" />
      				<span>{{order.name}}</span>
      			</p>
      			<p>{{order.count}}</p>
      			<p>￥{{order.price}}</p>
      			<p>￥{{order.price*order.count}}</p>
      		</div>
      		<a-divider />
      		
      		<p class="righttxt"><span class="bomtit">运费：</span>{{order.yunfei}}</p>
      		<p class="righttxt"><span class="bomtit">商品总价：</span>￥{{order.price*order.count}}</p>
      		<p class="righttxt"><span class="bomtit">共计：</span>￥{{order.totals}}</p>
      	</div>
		
	</div>
</template>

<script>
import Url from '../../../../common/urlapi.js'	;

export default{
	data(){
		return{
			order:{
	    		status : '',
	    		numb : '',
	    		time : '',
	    		img:'https://udbimg.oss-cn-shenzhen.aliyuncs.com/model/895e79d6ed708101e1a78dd4d95bda67',
	    		name : '',
	    		count:0,
	    		price:0,
	    		yunfei:'',
				tokenn:'',
				totals:0,//总计
				objcont:{},

	    	},

		}
	},
	props: ['orderid','tochild'],
	created(){
		this.tokenn = sessionStorage.getItem('access_token');			  	
	},
	methods:{
		
		
		
	},
	watch:{	
		tochild:{
			handler( newName, oldName ){
				console.log( newName );
				if( newName != null || newName != undefined ){
					this.order.status = newName;
				}
				
			},
			immediate: true,
	      	deep: true
		},
	    orderid:{
	    	handler(newName, oldName){
	    		console.log(newName);
	    		if( newName.id != null ){
					this.tokenn = sessionStorage.getItem('access_token');
					
	    			this.$http.get(Url.httpHost+'/ylncadmin/orderinfo/'+ newName.id,{
						params:{
							access_token : this.tokenn
						}
					})
					.then(res=>{
						console.log(res);
						let newarr = JSON.parse( JSON.stringify(res.data.result) );
						console.log( newarr );
						this.$emit('openid', newarr.openid)
						
						this.order.time = newarr.addtime;
						this.order.numb = newarr.orderno;
						this.order.count = newarr.buycount;
						this.order.price = newarr.price;
						this.order.name = newarr.pkgname;
						this.order.img = newarr.pkgimgs.split('|')[0];
						if( newarr.yunfei <= 0 ){
							this.order.yunfei = '无';
							this.order.totals = this.order.price * this.order.count;//总计
						}else{
							this.order.yunfei = '￥'+ newarr.yunfei;
							this.order.totals = this.order.price * this.order.count + this.order.yunfei;//总计
						}
						
//						console.log( this.order.status );
						
//						if( newarr.state == 0 ){
//							this.order.status = '等待用户支付确认';
//							console.log('等待用户支付确认');
//						}
//						else if( newarr.state == 1 && newarr.notifystatus == 1 ){
//							this.order.status = '等待工作人员确认' ;			
//							console.log('等待工作人员确认');
//						}
//						else if( newarr.state == 1 && newarr.notifystatus == -1 ){
//							this.order.status = '审核失败';
//							console.log('审核失败');
//						} 
//						else if( newarr.state == 1 && newarr.notifystatus < -1 ){
//							this.order.status = '已取消';
//							console.log('已取消');
//						} 
//						else if( newarr.state == 1 && newarr.notifystatus == 2 ){
//							if( val.status == -1 ){
//								if( newarr.refundState == 2 ){
//									this.order.status = '筹定失败,已退款';
//									console.log('筹定失败,已退款');
//								}else{
//									this.order.status = '筹定失败,待退款' ;
//									console.log('筹定失败,待退款');
//								}						
//							}else if( newarr.status == 1  ){
//								this.order.status = '筹定成功,已发放';
//								console.log('筹定成功,已发放');
//							}else{//val.status == 0
//								this.order.status = '筹定中,暂未发放';
//								console.log('筹定中');
//							}					
//						} 						
//						else{
//							return false;
//						}		
						
						console.log( this.order.status );
					})
					.catch(err=>{
						console.log(err);
						console.log(err.response);
					})
	    		}
	    		
	    	},
	    	immediate: true,
	      	deep: true
	    }
	    
	}
	
}
</script>

<style>
/*订单详情*/
.orderlist > li{
	line-height: 30px;
}
.shopbox:nth-child(1){
	margin-top: 50px;
}
.shopbox {
	display: flex;
}
.shopbox>p,.shopbox>span{
	flex: 1;
	text-align: center;
}
.shopbox>p:nth-child(1),.shopbox>span:nth-child(1){
	flex: 2;
}
.righttxt{
	text-align: end;
	padding-right: 40px;
}
.bomtit{
	display: inline-block;
	width: 80px;
	text-align: left;
}	
</style>