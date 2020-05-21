<template>
	<div>
		<div class="orderinfo">
			<p class="titl">订单信息</p>	
			<ul >
				<li>
					<span >订单状态：</span>
					<span >{{shoppinfo.statetxt}}</span>
				</li>
				<li>
					<span >订单单号：</span>
					<span >{{shoppinfo.orderno }}</span>
				</li>
				<li>
					<span >下单时间：</span>
					<span >{{shoppinfo.addtime }}</span>
				</li>
				<li>
					<span >收货人：</span>
					<span >{{shoppinfo.consignee }}</span>
				</li>
				<li>
					<span >手机号码：</span>
					<span >{{shoppinfo.mobile }}</span>
				</li>
				<li>
					<span >收货地址：</span>
					<span >{{shoppinfo.address }}</span>
				</li>
				<li>
					<span >物流公司：</span>
					<span >{{shoppinfo.expressName }}</span>
				</li>
				<li>
					<span >发货时间：</span>
					<span >{{shoppinfo.sendtime }}</span>
				</li>
				<li>
					<span >快递单号：</span>
					<span >{{shoppinfo.expressno }}</span>
				</li>
			</ul>
			<a-divider />
		</div>

		<div class="shopinfo">
			<p class="titl">商品信息</p>	
			<ul >
				<li>
					<span >商品</span>
				</li>
				<li>
					<span >数量</span>
				</li>
				<li>
					<span >单价</span>
				</li>
				<li>
					<span >总价</span>
				</li>
			</ul>
			<a-divider />
			<ul class="shopinfoo">
				<li>
					<img :src="shoppinfo.pkgimgs.split('|')[0]" style="width:60px;height:50px;background:#eee;margin-right:5px;"/>
					<span >{{shoppinfo.pkgname}}</span>
				</li>
				<li>
					<span >x{{shoppinfo.buycount}}</span>
				</li>
				<li>
					<span >￥{{shoppinfo.price}}</span>
				</li>
				<li>
					<span >￥{{shoppinfo.totalprices}}</span>
				</li>
			</ul>
			<a-divider />
		</div>
		<div>
			<ul class = "listthre">
				<li>
					<span>运费：</span>
					<span>￥{{shoppinfo.yunfei}}</span>
				</li>
				<li>
					<span>商品总价：</span >
					<span>￥{{ shoppinfo.totalprices}}</span>
				</li>
				<li>
					<span>共计：</span>
					<span>￥{{shoppinfo.yunfei}}</span>
				</li>
			</ul>
			<a-divider />
		</div>
		<div>
			<p class="titl">物流信息</p>
			<a-timeline>
				<div v-for="(item,i) in datas" :key="i">
					<a-timeline-item 
						v-if="datas.length > 0"
					>
						<p>{{item.status}}</p>
						<p>{{item.time}}</p>
					</a-timeline-item>
				
				</div>
			</a-timeline>
		</div>	
	</div>
	
</template>

<script>
import Url from '../../../../common/urlapi.js'	;
export default{
    name: "orderdetails",
	components:{
	},
	data(){
		return {
			shoppinfo:{
				state:'待收货',//订单状态
				statetxt:'',
				orderno:45213226853132,//订单号
				addtime:'2019/09/12-10:10:10',//下单时间
				consignee:'小明',//收货人
				mobile:13123456789,//手机号码
				address:'深圳市龙岗区天安云谷',//收货地址
				expressName:'',//物流公司
				sendtime:'',//发货时间
				expressno:'',//快递单号	
				pkgimgs:'',//图片
				buycount:0,//数量
				pkgname:'',//名称
				price:0,//单价
				totalprices:0,//总价
				yunfei:0,//运费

			},
			datas:[
				// {
				// 	time:'',
				// 	status:''
				// }
			],//物流
			tokenn:'',
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
						txt:'实体订单管理',
						path:'/index/realorder'
					},
					{
						txt:'查看订单详情',
						path:'/index/realorder/lookorderdetails'
					},
				],
				titlecont:['订单管理','实体订单管理','查看订单详情']			
			}
		);
		this.listcont();
	},
	methods: {
		listcont(){//实体订单详情--orderinfo
			let id =sessionStorage.getItem( "orderdetailsid");
			this.$http.get(Url.httpHost+'/ylncadmin/orderinfo/'+id,//+'/?access_token='+this.tokenn,   //订单详情
				{
					params:{
						access_token: this.tokenn
					}
				}
			)
			.then((response) => {
				console.log(response);
				if(response.data.code == 200){
					this.shoppinfo.orderno = response.data.result.orderno;//订单单号
					this.shoppinfo.addtime = response.data.result.addtime;//下单时间
					this.shoppinfo.consignee = response.data.result.consignee;//收货人
					this.shoppinfo.mobile = response.data.result.mobile;//手机号
					this.shoppinfo.address = response.data.result.address;	//收货地址
					this.shoppinfo.expressName = response.data.result.expressName;//物流公司
					this.shoppinfo.sendtime = response.data.result.deliverytime;//发货时间
					this.shoppinfo.expressno = response.data.result.expressno;//快递单号
					
					if( response.data.result.state == 1  ){
						this.shoppinfo.statetxt = '待发货';	
					}
					else if( response.data.result.state == 2  ){
						this.shoppinfo.statetxt = '待收货';	
					}
					else if( response.data.result.state == 3  ){
						this.shoppinfo.statetxt = '已完成';	
					}
					else{
						return;
					}
					this.shoppinfo.pkgimgs = response.data.result.pkgimgs;
					this.shoppinfo.pkgname = response.data.result.pkgname;	
					this.shoppinfo.buycount = response.data.result.buycount;

					this.shoppinfo.price = response.data.result.price;
					this.shoppinfo.totalprices = response.data.result.totalprices;
					this.shoppinfo.totalprices = 0;//商品总价--先为0
					this.shoppinfo.yunfei = response.data.result.yunfei;
					if( response.data.result.expressno != '' ){//查物流
						this.$http.get(Url.httpHost+'/ylncadmin/orderinfo/getkdi/'+response.data.result.expressno,
							{
								params:{
									access_token: this.tokenn
								}
							}
						)
						.then((res) => {
							// console.log(res);
							if(res.data.data == null){//没有快递信息
								this.$message.error(res.data.msg);
							}else {
								let expresdata = JSON.parse(res.data.data.kdiInfo);
								// console.log(expresdata);
								this.datas = expresdata.result.list;

							}	
						})
					}
				}
			})
			.catch((err)=>{
				console.log(err.response);
			})
			//this.$http.get(Url.httpHost+'/ylncadmin/orderinfo?access_token='+ this.tokenn)
		},
	},
}
</script>
<style>
.orderinfo ul{
	display: flex;
	flex-wrap: wrap;
}
.orderinfo ul li{
	width: 33.33%;
	margin-bottom: 20px;
}
.shopinfo ul{
	display: flex;
}
.shopinfo ul li{
	flex:1;
}
.shopinfo .shopinfoo li{
	display: flex;
	align-items: center;
}
.titl{
	font-size: 20px;
	color: black;
	font-weight: 500;
	padding-bottom: 20px;

}
.listthre{
	display: flex;
	justify-content: center
}
.listthre li{
	/* flex: 1; */
	width: 20%;
}
</style>