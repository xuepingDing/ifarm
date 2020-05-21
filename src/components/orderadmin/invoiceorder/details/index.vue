<template>
	<div>
        <!-- 发票详情 -->
		<p class="invtit">
			<span>发票信息</span>
			<span>{{invrecord.addtime}}</span>
		</p>
		<a-divider />
		<ul class="invlist">
			<li>
				<span>发票类型：</span>
				<span>{{invrecord.invtype == 0 ?'普通发票':'专用发票'}}</span>
			</li>
			<li>
				<span>发票抬头：</span>
				<span>{{invrecord.invname}}</span>
			</li>
			<li>
				<span>纳税人识别号：</span>
				<span>{{invrecord.idnumber}}</span>
			</li>
			<li>
				<span>公司名称：</span>
				<span>{{invrecord.invname}}</span>
			</li>
			<li>
				<span>公司地址：</span>
				<span>{{invrecord.companyaddress}}</span>
			</li>
			<li>
				<span>电话：</span>
				<span>{{invrecord.companyphone}}</span>
			</li>
			<li>
				<span>银行账号：</span>
				<span>{{invrecord.bankaccount}}</span>
			</li>
			<li>
				<span>开户行：</span>
				<span>{{invrecord.openbank}}</span>
			</li>
			<li>
				<span>发票内容：</span>
				<span>{{invrecord.invcontent}}</span>
			</li>
			<li>
				<span>发票金额：</span>
				<span>{{invrecord.invamount}}</span>
			</li>
		</ul>

		<p  class="invtit">收货信息</p><a-divider />
		<ul class="invlist">
			<li>
				<span>收货地址：</span>
				<span>{{invrecord.recvaddress}}</span>
			</li>
			<li>
				<span>收货人：</span>
				<span>{{invrecord.recvname}}</span>
			</li>
			<li>
				<span>收货电话：</span>
				<span>{{invrecord.recvmobile}}</span>
			</li>
		</ul>

		<p class="invtit">
			<span>订单信息（共{{invrecord.list.length}}个订单）</span>
			<span>总计：{{invrecord.totalprice}}元</span>	
		</p>
		<a-divider />

		<a-table :columns="columns" :dataSource="data" bordered>
			<template slot="shopping" slot-scope="text, record, index">
				<div>
					<img style="width:40px;height:30px;" :src="record.imgs" />
					<span>{{record.name}}</span>
				</div>
			</template>
		</a-table>

	</div>
</template>

<script>
import Url from '../../../../common/urlapi.js'	;
export default{
	name: "invdetailscont",
	components:{
		// invdetails,
	},
	data(){
		return {
			
			invrecord:{
				addtime:'',
				invtype:'',//0普通发票，1专用发票
				invname:'',//抬头
				idnumber:'',//纳税人识别号
				companyname:'',//公司名称
				companyaddress:'',//地址
				companyphone:'',//电话
				bankaccount:'',//银行
				openbank:'',//开户行
				invcontent:'',//内容
				invamount:'',//金额
				recvaddress:'',//收货地址
				recvname:'',//人
				recvmobile:'',//电话
				list:[],//订单
				totalprice:0,//总计
			},
			columns:[
				{
					title: '商品',
					dataIndex: 'shopping',
					scopedSlots: { customRender: 'shopping' },
					align:'center',
				},
				{
					title: '数量',
					dataIndex: 'num',
					align:'center',
				},
				{
					title: '实付',
					align:'center',
					dataIndex: 'totalprices',
				},
			],
			data:[

			],
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
						txt:'发票订单管理',
						path:'/index/invoiceorder'
					},
					{
						txt:'发票详情',
						path:'/index/invoiceorder/details'
					},
				],

			}
		);
		this.list();
	},
	methods:{
		list(){
			let id = sessionStorage.getItem("fapiaoid");
			// this.$http.get(Url.httpHost+'/ylncadmin/invrecord?access_token='+this.tokenn,)
			this.$http.get(Url.httpHost+'/ylncadmin/invrecord/'+id,
				{
					params:{
						access_token: this.tokenn
					}
				}
			)
			.then((res) => {
				console.log(res);
				if(res.data.result !== null){
					let fpcont = JSON.parse(JSON.stringify(res.data.result));
					this.invrecord.addtime = fpcont.addtime;
					this.invrecord.invtype = fpcont.invtype;
					this.invrecord.invname = fpcont.invname;
					this.invrecord.idnumber = fpcont.idnumber;
					this.invrecord.companyname = fpcont.companyname;
					this.invrecord.companyaddress = fpcont.companyaddress;
					this.invrecord.companyphone = fpcont.companyphone;
					this.invrecord.bankaccount = fpcont.bankaccount;
					this.invrecord.openbank = fpcont.openbank;
					this.invrecord.invcontent = fpcont.invcontent;
					this.invrecord.invamount = fpcont.invamount;
					this.invrecord.recvaddress = fpcont.recvaddress;
					this.invrecord.recvname = fpcont.recvname;
					this.invrecord.recvmobile = fpcont.recvmobile;
					this.invrecord.list = fpcont.orderlist;
					
					this.invrecord.list.map((item,i)=>{
						this.invrecord.totalprice+= (item.totalprices-0);
						this.data.push({
							key: i,
							num : item.buycount,
							totalprices : item.totalprices,
							imgs : item.pkgimgs.split('|')[0],
							name : item.pkgname
						})
					})

					
				}
			})
			.catch((err) => {
				console.log(err.response);
				
			})

		}
	},
}
</script>

<style>
.invtit{
	color: #000;
	font-weight: 600;
	font-size: 16px;
	display: flex;
	justify-content: space-between;
}	
.invlist li{
	/* color: blue; */
	line-height: 36px;
	
} 
.invlist li span:nth-child(1){
	color: #999;
}
</style>