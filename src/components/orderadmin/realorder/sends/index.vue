<template>
	<div id="sends">
       <!-- <p>{{title}}</p> -->
        <div class="margint">
           <span class="pleft">订单号：</span>
           <span>
               {{orderno}}
           </span>
           
        </div>
        <div class="margint">
           <span class="pleft">收货人：</span>
           <span>
               {{consignee}}
           </span>
           
        </div>
        <div class="margint">
           <span class="pleft">收货地址：</span>
           <span>
               {{address}}
           </span>
           
        </div>
        <div class="margint">
            <span class="pleft">选择快递：</span>
            <a-select :value='itemscont' 
                showSearch
                style="width: 300px" 
                @change="handleChange">
                <a-select-option 
                    v-for="item in selects"
                    :key='item' 
                >{{item}}</a-select-option>
            </a-select>
        </div>
        <div class="margint">
           <span class="pleft">填写物流单号：</span>
           <a-input
            v-model="fillnum"
            placeholder="请填写物流单号"
            maxLength="25"
            style="width: 300px"
            />
        </div>
        <div class = "btnbox">
            <!-- <a-popconfirm
                title='确定返回列表吗?'
                @confirm="() => onsendno()"> -->
                <a-button style="margin-right:50px" @click="onsendno">取消</a-button>
            <!-- </a-popconfirm> -->
            
            <!-- <a-popconfirm
                title='确定发货吗?'
                @confirm="() => onsendok()"> -->
                <a-button type="primary" @click="onsendok">确定</a-button>
            <!-- </a-popconfirm> -->
            
    
        </div>

	</div>
</template>

<script>
import Url from '../../../../common/urlapi.js'	;
export default{
    name: "sends",
	components:{

    },
    data() {
        return {
            orderno:'11234654561',//订单号
            consignee:'小明',//收货人
            address: "深圳市龙岗区坂田街道天安云谷三栋A座",//收货地址
            fillnum:'',//填写
            itemscont:'',
            selects:['顺丰速递','圆通快递','申通快递','中通快递','韵达快递','百世快递','天天快递','邮政快递','EMS','宅急送','德邦快递'],
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
						txt:'发货',
						path:'/index/realorder/sends'
					},
				],
				titlecont:['订单管理','实体订单管理','发货']			
			}
        );
        // this.itemscont = this.selects[0];

        let sessorderobj = JSON.parse( sessionStorage.getItem("ordersendcont") );
        console.log(sessorderobj);
        this.orderno = sessorderobj.orderno;
        this.consignee = sessorderobj.consignee;
        this.address = sessorderobj.address
        this.itemscont = sessorderobj.expressName;
        this.fillnum = sessorderobj.expressno;
    },
    methods: {
        handleChange(value) {
            console.log(value); 
            this.itemscont= value;
        },
        onsendok(){//发货
            if( this.itemscont == '' ){
                this.$message.info('先选择快递');       
            }
            else if (this.fillnum == ''){
                this.$message.info('先填写物流单号');
            }else{
                let id = sessionStorage.getItem('orderdetailsid');
                let cont = {expressName:'',expressNo:'',orderNo:2};
                cont.expressName = this.itemscont;//快递名称
                cont.expressNo = this.fillnum;//物流单号
                cont.orderNo = this.orderno;//订单号
                console.log(cont);
                // let conts = JSON.parse(JSON.stringify(cont));    
                this.$http({
                    url:Url.httpHost+'/ylncadmin/orderinfo/shipping',
                    method:'PUT',
                    params:cont,
                    headers: {
                        'content-type':'application/json',
                        "Authorization": "bearer "+this.tokenn,				            	
                    },
                })
                .then((res)=>{
                    console.log(res);
                    if( res.data.code == 200 ){
                        this.$message.success('发货成功');
                        this.$router.push({
                            path:'/index/realorder'
                        })
                        // let expres = JSON.stringify({name:this.itemscont,numb:this.fillnum});    
                        // sessionStorage.setItem("expres",expres);//快递公司*单号            
                    }else{
                        this.$message.info(res.data.message);
                    }
                    
                })
                .catch((err) => {
                    console.log(err.response);
                    this.$message.error('发货失败！！！');
                    
                })            
                    // Url.httpHost+'/ylncadmin/orderinfo/'+id,//+'/?access_token='+this.tokenn,   //订单详情
                    // {
                    //     params:{
                    //         access_token: this.tokenn
                    //     }
                    // }
                

                // this.$http({
                //     url:Url.httpHost+'/ylncadmin/basebody',
                //     method:'PUT',
                //     data:cont,
                //     headers: {
                //         'content-type':'application/json',
                //         "Authorization": "bearer "+this.tokenn,				            	
                //     },
                // })

            }
        },
        onsendno(){//取消--返回列表
            this.$router.push({
    			path:'/index/realorder'
    		})
        },
    }
}
</script>
<style >
.pleft{
    /* width: 120px; */
    text-align: right;
    width: 50%;
}
#sends .margint{
    margin-bottom: 26px ;
    display: flex;
    justify-content: start;
    align-items: center;
}
.btnbox{
    /* width: 50%; */
    display: flex;
    justify-content: center;
}
</style>