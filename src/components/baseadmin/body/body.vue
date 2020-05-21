<!--基地主体管理-->
<template>
<div>	
  <a-table :columns="columns" :dataSource="data" bordered >
    <template v-for="col in ['img']" :slot="col" slot-scope="text, record, index">
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -1px 0"
          :value="text" 
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>{{text}}</template>				
      </div>		
    </template>        
    <template slot="operation" slot-scope="text, record, index">
      <div class='editable-row-operations actionbox' >  
		<a-button type="primary" @click="baseids(record)" >
				产品管理
		</a-button>   
		<a-button type="primary" @click="baseadmin(record)" style="margin:5px;">
				基地管理
		</a-button>
        
      </div>
    </template>
</a-table>
	
</div>
</template>
<script>
import Url from '../../../common/urlapi.js';

const columns = [
{
  title: 'id',
  dataIndex: 'id',
  width: '5%',
  align:'center',
},
{
  title: '主体名称',
  dataIndex: 'username',
  width: '10%',
  align:'center',
},
{
  title: '农场名称',
  dataIndex: 'farmname',
  width: '10%',
  align:'center',
}, {
  title: '农场联系方式',
  dataIndex: 'mobile',
  align:'center',
  width: '15%',
},
{
  title: '产品数量',
  dataIndex: 'productcount',
  align:'center',
},
{
  title: '基地数量',
  dataIndex: 'baseinfocount',
  align:'center',
  width: '10%',
},
{
  title: '操作',
  dataIndex: 'operation',
  align:'center',
  scopedSlots: { customRender: 'operation' },
}
];
const data = [];

export default {
  	data () {
	    return {
	      	data,
	      	columns,
	      	bodyindex:0,//点击的下标
			tokenn:'',
    	}
  	},
  	created(){
			let that = this;
			let newarr = [];
			that.tokenn = sessionStorage.getItem('access_token');
			that.$http.get(Url.httpHost+'/ylncadmin/basebody/list',{
				params:{
					access_token:that.tokenn,
					chkstate:1
				}
			})
			.then(res=>{
				console.log(res.data.result.rows);
				newarr = res.data.result.rows;
				newarr.map((val,index)=>{{
					newarr[index].key = index;
					if( val.farmname == '' || val.farmname == null ){
						val.farmname = '未填写';
					}
					if( val.productcount == '' || val.productcount == null ){
						val.productcount = 0;
					}
					if( val.baseinfocount == '' || val.baseinfocount == null ){
						val.baseinfocount = 0;
					}
				}})
//			newarr = newarr.chkstate.filter(ite =>item == 1);
				that.data = newarr;
			})
			.catch(err=>{
				console.log(err.response);
				that.$message.error(err.response.data.message);
			})
		
	  	that.$store.commit('modifytitle',
				{
					arry:[
						{
							txt:'商家运营管理',
							path:'',
						},
						{
							txt:'乡村农场管理',
							path:'/index/body'
						},						
					],
								
				}
			);
  	},
  	components: {
//		baseadmins,
	},
  	methods: {
  		baseadmin(record){//基地管理事件
			console.log(record);
			//产品（主体）id存session
			sessionStorage.setItem('baseid',record.id);
			sessionStorage.setItem('userid',record.userid);	
			this.$router.push({
    			path:'body/baseadmin'
    		})
  		},
  		baseids(record){//产品管理
  			console.log(record.id);
  			sessionStorage.setItem('baseids',record.id);
  			sessionStorage.setItem('userids',record.userid);
  			this.$router.push({
    			path:'body/giftbag'
    		})
  		},
   },
}

</script>

