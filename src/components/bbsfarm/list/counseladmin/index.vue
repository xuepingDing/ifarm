<template>
	<div>
		
		<p>筹定管理</p><br />
		<a-table :columns="columns" :dataSource="data" bordered>
			<template slot="pkgimgs" slot-scope="text, record,">
				<img :src="record.pkgimgs" style="width: 100px;height: 80px;" />
			</template>
			
			<template slot="operation" slot-scope="text, record,">
				<a-button type="primary" @click="lookdetails(record)">查看详情</a-button>
			</template>
		</a-table>
	</div>
</template>

<script>
import Url from '../../../../common/urlapi.js'	;
export default{
	data(){
		return{
			tokenn:'',
			columns : [
				{
					title: 'id',
					dataIndex: 'id',
					align: "center",
					//sorter: (a, b) => a.name.length - b.name.length,
				},
				{
					title: '筹定的产品名称',
					dataIndex: 'pkgname',
					align: "center",
					//sorter: (a, b) => a.age - b.age,
				}, 
				{
					title: '产品首图',
					dataIndex: 'pkgimgs',
					scopedSlots: { customRender: 'pkgimgs' },
					align: "center",
				}, 
				{
					title: '筹定份数',
					dataIndex: 'number',
					align: "center",
				},
				{
					title: '当前筹定总金额',
					dataIndex: 'totalMoney',
					align: "center",
				},
				{
					title: '筹定进度',
					dataIndex: 'percentage',
					align: "center",
				},
				{
					title: '参与筹定人数',
					dataIndex: 'userCount',
					align: "center",
				},
				{
					title: '筹定发起人',
					dataIndex: 'nikeName',
					align: "center",
				},
				{
					title: '筹定截止日期',
					dataIndex: 'endDate',
					align: "center",
				},
				{
					title: '当前状态',
					dataIndex: 'statxt',
					align: "center",
				},
				{
					title: '操作',
					dataIndex: 'operation',
					scopedSlots: { customRender: 'operation' },
					align: "center",
				},
			],
			data:[
//				{
//					key:99999999,
//					id:0,
//					pkgname:'卤蛋',
//					pkgimgs:'https://udbimg.oss-cn-shenzhen.aliyuncs.com/model/9afa03bac973190cd541e4b227616d3c',
//					number:'100',
//					totalMoney:'120',
//					percentage:'20%',
//					userCount:'3',
//					nikeName:'小书包',
//					endDate:'2019/10/23',
//					statxt:'筹定中',
//				}
			],
			
		}
	},	
	components: {
		
	},
	created(){
		this.tokenn = sessionStorage.getItem('access_token');	
	  	this.$store.commit('modifytitle',
			{
				arry:[
					{
						txt:'社区农场管理',
						path:'',
					},
					{
						txt:'社区农场列表',
						path:'/index/bbslist'
					},
					{
						txt:'筹定管理',
						path:'/index/bbslist/counseladmin'
					},
				],

			}
		);
		this.list();
	},
	methods:{
		lookdetails(rd){
			console.log(rd);
			sessionStorage.setItem('detailsid',rd.id);
			this.$router.push({
    			path:'counseladmin/lookdetails'
    		})
		},
		list(){
			let farmid = sessionStorage.getItem("sqfarmId");
			this.$http.get(Url.httpHost+'/ylncadmin/groupbuy?access_token='+this.tokenn,
				{
					params:{
						farmId:farmid
					}
				}
			)
			.then((res)=>{
				console.log(res);
				if (res.data.code == 200){
					this.data = [];
					if(res.data.result.rows.length > 0 ){
						let arrcont = res.data.result.rows;
						
						this.data = [];
						
						arrcont.map((row, i) => {
							let sta = '';
							if(row.status == -1){
								sta = '筹定失败';
							}
							if(row.status == 0){
								sta = '筹定中';
							}
							if(row.status == 1 ){
								sta = '筹定成功';
							}
							if( row.pkgname == null ){
								row.pkgname = '未填写'
							}
//							if( row.pkgimgs == null ){
//								row.pkgimgs = 'https://udbimg.oss-cn-shenzhen.aliyuncs.com/model/9afa03bac973190cd541e4b227616d3c'
//							} 
							if( row.number == null ){
								row.number = '0'
							}
							
							if( row.totalMoney == null ){
								row.totalMoney = '0'
							} 
							if( row.percentage == null ){
								row.percentage = '0'
							} 
							if( row.userCount == null ){
								row.userCount = '0'
							}
							
							this.data.push({
								key : i,
								id : row.id,
								pkgname : row.pkgname,
								pkgimgs : row.pkgimgs,
								number : row.number,
								totalMoney : row.totalMoney,
								percentage : row.percentage+'%',
								userCount : row.userCount ,
								nikeName : row.nikeName ,
								endDate : row.endDate ,
//								status : row.status,
								statxt:sta
							})
							
							

						})
					}else{
						this.$message.error('没有数据~~')
					}
				}
			})
			.catch((err) => {
				console.log(err);
				
			})
		},
	}
}
</script>