<template>
  <div>
    <div>
      <a-button type="primary"
                style="margin-bottom: 10px;"
                @click="showModal">新增产品</a-button>     
      <div>
        <a-table :columns="columns"
                 :dataSource="data"
                 bordered>
          <template v-for="col in []"
                    :slot="col"
                    slot-scope="text, ">
            <div :key="col">
              <template>{{text}}</template>
            </div>
          </template>
          <template slot="pkgimgs"
                    slot-scope="text, record, ">
            <img style="max-width: 80px;max-height: 50px;"
                 :src='record.pkgimgs[0]' />
          </template>
          <!--<template slot="status"
                    slot-scope="text, record, ">
            <div>
              <span v-if="record.status == 1 ">农场资质评审</span>
              <span v-else-if="record.status == 2 ">筹定中</span>
              <span v-else-if="record.status == 3 ">筹定中</span>
              <span v-else-if="record.status == 4 ">筹定成功</span>
              <span v-else-if="record.status == 5">筹定成功</span>
              <span v-else>***</span>
            </div>

          </template>-->

          <template slot="operation"
                    slot-scope="text, record, ">
            <div class='editable-row-operations'>
              <span class="editboxs"
                    style="display: flex;padding: 0 5px;">

              
                <a-button
                         type="primary"
                            @click="() => edit(record)"
                          class="editboxsflex">编辑</a-button>
                <a-popconfirm :title="record.isuse == 0 ?'确定重新上架吗':'确定下架吗'"
                              @confirm="() => updn(record)"
                              class="editboxsflex">
                  <a-button type="dashed"
                            v-if="record.isuse == 1 "
                            style="background: orange;color: #fff;" 
                            :disabled="disabledbols"
                            >
                    下架
                  </a-button>
                  <a-button type="dashed"
                            v-else-if="record.isuse == 0 "
                            style="background: green;color: #fff;">
                    重新上架
                  </a-button>
                  <a href="javascript:;"
                     v-else></a>
                </a-popconfirm>
                
              </span>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import Url from '../../../../common/urlapi.js';
import filescom from '@/components/publicmodule/files/files';//上传图片
//import addgift from '@/components/gift/giftadmin/addgift';//新增-编辑
//表格-thead（头部）
const columns = [
  {
  title: 'id',
  align: 'center',
  dataIndex: 'id',
  width: '3%',
  scopedSlots: { customRender: 'id' },
},
{
  title: '产品名称',
  dataIndex: 'pkgname',
  width: '10%',
  align: 'center',
  scopedSlots: { customRender: 'pkgname' },
},
{
  title: '产品首图',
  align: 'center',
  dataIndex: 'pkgimgs',
  width: '7%',
  scopedSlots: { customRender: 'pkgimgs' },
}, 
 {
  title: '产品简介',
  dataIndex: 'pkgintro',
  width: '15%',
  align: 'center',
  scopedSlots: { customRender: 'pkgintro' },
}, 
//{
//title: '管理员',
//align: 'center',
//dataIndex: 'adminuser',
//width: '8%',
//scopedSlots: { customRender: 'adminuser' },
//}, 
{
  title: '产品默认价(元)',
  align: 'center',
  dataIndex: 'defaultprice',
  width: '15%',
  scopedSlots: { customRender: 'defaultprice' },
}, 
{
  title: '产品定制价(元)',
  align: 'center',
  dataIndex: 'custprice',
  width: '15%',
  scopedSlots: { customRender: 'custprice' },
}, 
{
  title: '产品总份数',
  align: 'center',
  dataIndex: 'number',
  width: '10%',
  scopedSlots: { customRender: 'number' },
}, 
{
  title: '剩余可筹定份数',
  align: 'center',
  dataIndex: 'usablenumber',
  width: '10%',
  scopedSlots: { customRender: 'usablenumber' },
}, 
{
  title: '操作',
  align: 'center',
  dataIndex: 'operation',
	width: '15%',
  scopedSlots: { customRender: 'operation' },
}
];

//表格-tbody（数据）
const data = [];
//新增弹框
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 4, offset: 4 },
};
export default {
  name: 'as',
  data () {
    return {
      data,//列表数据
      columns,//列表头部
      disabledbols:false,//筹定中不可下架     
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      tokenn: '',
      baseids:'',//获取产品列表数据（基地主体ID）
    }
  },
  components: {
    filescom,
  },
  created () {
    this.tokenn = sessionStorage.getItem('access_token');
    this.baseids = sessionStorage.getItem('baseids');
    this.$store.commit('modifytitle',
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
					{
						txt:'产品管理',
						path:'/index/body/giftbag'
					},
				],
      }
    );
    this.refresh();//礼包列表数据
  },
  methods: {
    refresh () {//礼包列表数据
      let that = this;
      let newarr = [];
      that.$http.get(Url.httpHost + '/ylncadmin/giftpkg/list', {
        params: {
          access_token : that.tokenn,
          basebodyid : that.baseids
        }
      })
        .then(res => {
          console.log(res);	
          if (res.data.code == 200) {
            newarr = res.data.result.rows;
            console.log(newarr);
            newarr.map((val, index) => {
              //页面显示礼包图
              val.pkgimgs = val.pkgimgs.split('|');
              newarr[index].key = index;
              if( val.usablenumber == null ){
                val.usablenumber = 0;
              }
            })

            that.data = newarr;
     				//console.log( that.data );
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    
    //新增弹框事件
    showModal () {
      sessionStorage.setItem('giftedit',0);//0新增，1编辑
      this.$router.push({
          path:'giftbag/add'
      })
      // this.visible = true;
      this.saveput = false;//新增--添加事件    
      this.istitle = '新增礼包'
      
      //修改页面是否可输入状态
      this.disabledcolor = '';
      this.disabledbol = false;
      this.disabledcolors = '';
      this.disabledbols = false;
    },
    edit (record) {//编辑    	
      console.log(record);
      record.pkgimgs = record.pkgimgs.join('|');
      let editconts = JSON.stringify( record );
      sessionStorage.setItem('editcont', editconts );
      sessionStorage.setItem('giftedit',1);//0新增，1编辑
//    sessionStorage.setItem('editstatus',record.status);
      this.$router.push({
          path:'giftbag/edit'
      })     
    },
    infos() {
        const h = this.$createElement;
        this.$error({
          title: '提示',
          content: h('div', {}, [
            h('p', '此产品正在筹定中，不可下架。'),          
          ]),
          okText: '确认',
          onOk() {},
        });
    },
    //上架/下架
    updn (record) {
     	console.log(record);		
      let cont = {};
      cont.id = record.id;
      if (record.isuse == 0) {      	
        this.recordstatus = '确定要重新上架吗?';
        cont.isuse = 1;
      }
      else if (record.isuse == 1) {
      	if( record.status == 0 ){
//    		this.$message.error('正在筹定中，不可以下架！！！');
      		this.infos();
      		return false;
      	}else{
      		this.recordstatus = '确定要下架吗?';
        	cont.isuse = 0;
      	}
        
      }
      else {
        return
      }
      this.$http({
        url: Url.httpHost + '/ylncadmin/giftpkg',
        method: 'PUT',
        data: cont,
        headers: {
          'content-type': 'application/json',
          "Authorization": "bearer " + this.tokenn,
        },

      }).then(res => {
          //			//console.log(res);
          if (res.data.code == 200) {
            this.refresh();//刷新数据
            this.$message.success('修改成功');
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err.response);
          this.$message.error(err.response.data.message);
        })

    },
    //  onDelete (key) {//删除
    //  	let that = this;      
    //    	const dataSource = [...that.data];
    ////    	//console.log(key);
    ////    	//console.log(dataSource)                     
    //    	let deletecont = dataSource.filter(item => item.key == key);
    //		that.$http({
    //			url:Url.httpHost+'/ylncadmin/giftpkg/'+deletecont[0].id,
    //			method:'DELETE',
    ////			data:cont,
    //			headers: {
    //				'content-type':'application/json',
    //	            "Authorization": "bearer "+that.tokenn,				            	
    //	        },
    //	        
    //		})
    //		.then(res=>{
    ////			//console.log(res);
    //			if( res.data.code == 200 ){
    //				that.$message.success('删除成功');
    //				that.data = dataSource.filter(item => item.key !== key);
    //				
    //			}
    //			
    //		})
    //		.catch(err=>{
    //			alert(err);
    //			that.$message.error(err.response.data.message);
    //		})
    //  },   
  }
}
</script>
<style >
.addgift li .addjd .ant-table-pagination.ant-pagination {
  display: flex;
}
.ant-form .ant-form-item {
  display: flex;
}
.editable-row-operations a {
  margin-right: 8px;
}
/**/
.tit_left {
  width: 45%;
  text-align: right;
  padding-right: 0;
}
.editboxs {
  display: flex;
}
.editboxs .editboxsflex {
  flex: 1;
  margin: 0 5px;
  line-height: 1.5;
  text-align: center;
}
.colos {
  color: #fff;
  border-radius: 3px;
  padding: 3px 5px;
}
/* 不可编辑状态 内容颜色 */
.disabledcolor{
  color: #ccc;
}
</style>
