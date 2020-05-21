<template>
	<div>
		<div>
            <ul class="addgift"  style='overflow-y: auto;'>
            	<li>
            		
                	 <a-divider orientation="left" style='color: #000000;font-weight: bolder;'>产品基本信息</a-divider>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>产品名称：</span>
                    </p>
                    <div>
                    <!-- @change='layoutchangea' -->
                        <a-input placeholder="请输入"
                            autocomplete="off"
                            v-model="giftpkg.pkgname"
                            maxLength="20" 
                        />
                    </div>

                </li>
                <li>
                    <p class="addleftgift">
                    <span>&nbsp;&nbsp;&nbsp;产品简介：</span>
                    </p>
                    <div style="width: 400px;">
                    <!--@change='layoutchanges'-->
                    <a-input placeholder="请输入"
                            autocomplete="off"
                            v-model="giftpkg.pkgintro"
                            maxLength="50" />
                    </div>

                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>礼品卡名称：</span>
                    </p>
                    <div>
                    <!--@change='layoutchanged'-->
                    <a-input placeholder="请输入"
                            autocomplete="off"
                            v-model='giftpkg.cardname'
                            maxLength="20" />
                    </div>

                </li>
                <li>
                    <p class="addleftgift" >
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">是否允许定制包装：</span>
                    </p>
                    <div>
                    <a-switch @change='onChangebol'
                                :checked='isfou'
                                checkedChildren="允许"
                                unCheckedChildren="不允许" 
                                :disabled="disabledbol"
                                />
                    </div>
                </li>
                
                <li>
                    <p class="addleftgift" >
                    <span class="tit_red" >*</span>
                    <span >默认产品价格：</span>
                    </p>
                    <div>
                    <a-input-number :max='9999999'   @change='layoutchangef' @blur="lbprice"
                                    :min='0'
                                    v-model='giftpkg.defaultprice'
                                     
                    />
                    <span >元</span>
                    </div>
                </li>  
                <li v-show='isfou'>
                    <p class="addleftgift">
                    <span class="tit_red" >*</span>
                    <span >定制产品包装价格：</span>
                    </p>
                    <div>
                    <a-input-number :max='9999999'  @change='layoutchangeg'
                                    :min='0'
                                    v-model='giftpkg.custprice' 
                                />
                    <span >元</span>
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">产品总份数：</span>
                    </p>
                    <div>
                    <a-input-number  @change='layoutchangeh'  
                                    :min='0' 
                                    :max='99999999'
                                    :maxlength='8'
                                    v-model='giftpkg.number' 
                                    :disabled="disabledbol" 
                                    
                                    :precision='0'
                    />
                    <span :class="disabledcolor">份</span>
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">最低筹定达成百分比：</span>
                    </p>
                    <div>
                    <a-input-number :max='100'  @change='layoutchangej'  
                                    :min='0'
                                    v-model='giftpkg.mininum' 
                                    :disabled="disabledbol"
                                    :precision='0'
                                    />
                    <span :class="disabledcolor">%</span>
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">兑换礼包物流费用：</span>
                    </p>
                    <div>
                        <a-input-number :max='999999999'  @change='lbyunfei'   @blur='onlbfy'
                                        :min='0'
                                        v-model='giftpkg.pkgYunFei' 
                                        :disabled="disabledbol"
                                        />
                        <span :class="disabledcolor">元</span>               
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">领取实体卡物流费用：</span>
                    </p>
                    <div>
                        <a-input-number :max='999999999'  @change='cardyunfei'  @blur='onstkfy'
                                        :min='0'
                                        v-model='giftpkg.cardYunFei' 
                                        :disabled="disabledbol"
                                        />
                        <span :class="disabledcolor">元</span> 
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>添加产品标签：</span>
                    </p>
					
					<br />
					<br />
					<a-select 
						mode="tags" 
						:size="size"
						style="width: 400px" 
						@change="handleChange" 
						placeholder="请输入"
						v-model="pkgtag"
						>
					    
					</a-select>
                </li>
                <li>
                    <p class="addleftgift">
                        <span class="tit_red"  :class="disabledcolor">*</span>
                        <span :class="disabledcolor">关联乡村的基地：</span>
                    </p>
                    <div>
                    <div style="display: flex;">
                        <a-select style="width: 170px"
                                @change='giftnamea'
                                :disabled="disabledbol">
                            <a-select-option v-for="(item,i) in basecont"
                                            :key='i' >
                                {{item.basename}}
                            </a-select-option>
                        </a-select>
                        <a-button style='margin-left: 5px;'  @click='addbtn' :disabled="disabledbol">新增</a-button>
                    </div>
                    </div>

                </li>
                <li>
                    <p class="addleftgift"></p>
                    <div class="addjd"
                        style="width: 240px;">
                    <a-table :columns="columnser"
                            :dataSource="data2"
                            bordered>
                        <template 
                                slot="basename"
                                slot-scope="text"> 
                        <span>{{text}}</span>
                        </template>
                        <!--<template slot="operation"
                                slot-scope="text, record, ">
                        <a-popconfirm title='一定要删除?'
                                        :disabled="disabledbol"
                                        @confirm="() => deletebase(record)"
                                        class="editboxsflex">
                            <a-button type="danger" >删除</a-button>
                        </a-popconfirm>

                        </template>-->
                    </a-table>
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">筹定时长：</span>
                    </p>

                    <div class="timeblock" >
                        <a-input-number  @change='cdtimera'  
	                                    :min='0' 
	                                    :max='99999999'
	                                    :maxlength='8'
	                                    v-model='cdtimea'                                    
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">日</span>
	                    <a-input-number  @change='cdtimerb'  
	                                    :min='0' 
	                                    :max='23'
	                                   	 v-model='cdtimeb'                             
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">时</span>
	                    <a-input-number  @change='cdtimerc'  
	                                    :min='0' 
	                                    :max='59'
	                                     v-model='cdtimec'                                   
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">分</span>
                        
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">选择基地专属期限时长：</span>
                    </p>
                    <div class="timeblock" >
                    	<a-input-number  @change='jdtimera' 
	                                    :min='0' 
	                                    :max='99999999'
	                                    :maxlength='8'
	                                     v-model='jdtimea'                                   
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">日</span>
	                    <a-input-number  @change='jdtimerb'
	                                    :min='0' 
	                                    :max='23'
										:maxlength='2'
	                                     v-model='jdtimeb'                                  
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">时</span>
	                    <a-input-number @change='jdtimerc'
	                                    :min='0' 
	                                    :max='59'
	                                    :maxlength='2'
	                                    v-model='jdtimec'                                  
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">分</span>
                        
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">选择礼品卡最佳兑换时间段：</span>
                    </p>
                    <div  class="timeblock" >
                        <a-range-picker style='width: 320px;'
                            :showTime="{ format: 'HH:mm:ss' }"
                        format="YYYY-MM-DD HH:mm:ss"              @change='layoutchangez' />
                        <p class="timecont" v-show="timesbol"  :class="disabledcolor">{{giftpkg.cardbegindate}}~{{giftpkg.cardenddate}}</p>
                    </div>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red" :class="disabledcolor">*</span>
                    <span :class="disabledcolor">礼品卡有效期时长：</span>
                    </p>
                    <div  class="timeblock" >
                    	<a-input-number  @change='lpktimera'
	                                    :min='0' 
	                                    :max='99999999'
	                                    :maxlength='8'
	                                    v-model='lpktimea'                                    
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">日</span>
	                    <a-input-number @change='lpktimerb'
	                                    :min='0' 
	                                    :max='23'
	                                    v-model='lpktimeb'                                    
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">时</span>
	                    <a-input-number @change='lpktimerc'
	                                    :min='0' 
	                                    :max='59'
	                                    v-model='lpktimec'                                    
	                                    :precision='0'
	                                    :disabled="disabledbol"
	                    />
	                    <span :class="disabledcolor">分</span>
                        
                    </div>
                    
                </li>
                <li>
                	<a-divider orientation="left" style='color: #000000;font-weight: bolder;'>产品图片信息</a-divider>
                </li>
                <li>
                    <p class="addleftgift">
	                    <span class="tit_red">*</span>
	                    <span>上传产品轮播图：</span>
                    </p>
                    <p  class="hscolor">最多5张(建议尺寸：750x750)</p>
                </li>
                <li>
                    <filescom :datatype='childtypea'
                            @childimga='childimga'></filescom>
                </li>
                <li>
                    <p class="addleftgift">
	                   	标题一文案 ：
                    </p>
                    
                    <a-input maxLength="6" style='width: 300px;' v-model='giftpkg.producttitle' placeholder="产品描述" />
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>上传产品详细信息图文：</span>
                    </p>
                    <p class="hscolor">
                        	建议尺寸宽696
                    </p>
                </li>
                <li>
                    <filescom :datatype='childtyped'
                            @childimgd='childimgd'></filescom>
                </li>
                <li>
                    <p class="addleftgift">
	                   	标题二文案 ：
                    </p>
                    
                    <a-input maxLength="6" style='width: 300px;' v-model='giftpkg.paybacktitle' placeholder="筹定回报" />
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>上传礼品卡图：</span>
                    </p>
                    <p class="hscolor">最多5张(建议尺寸：656x416)</p>
                </li>
                <li>
                    <filescom :datatype='childtypeb'
                            @childimgb='childimgb'></filescom>
                </li>
                
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>礼品卡尺寸(cm)：</span>
                    </p>
                    <p>
                   		 长：
                    	<a-input-number :max='999999999'
                                    :min='0'
                                    @change="cardw"
                                    v-model='cardswidth' />
                    	宽：
                    	<a-input-number :max='999999999'
                                    :min='0'
                                    @change="cardh"
                                    v-model='cardsheight' />
                    </p>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>礼品卡包装尺寸(cm)：</span>
                    </p>
                    <p>
                    长：
                    <a-input-number :max='999999999'
                                    :min='0'
                                    @change="cardboxw"
                                    v-model='lpkbzwidth' />
                    宽：
                    <a-input-number :max='999999999'
                                    :min='0'
                                    @change="cardboxh"
                                    v-model='lpkbzheight' />
                    </p>
                </li>
                
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>上传包装图：</span>
                    </p>
                    <p class="hscolor">最多5张(建议尺寸：696*696)</p>
                </li>
                <li>
                    <filescom :datatype='childtypec'
                            @childimgc='childimgc'></filescom>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>包装尺寸(cm)：</span>
                    </p>
                    <p>
                    长：
                    <a-input-number :max='999999999'
                                    :min='0'
                                    @change="giftbagw"
                                    v-model='lbwidth' />
                    宽：
                    <a-input-number :max='999999999'
                                    :min='0'
                                    @change="giftbagh"
                                    v-model='lbheight' />
                    高：
                    <a-input-number :max='99999999'
                                    :min='0'
                                    v-model='lbhou'
                                    @change='giftlbhou' />
                    </p>
                </li>
                <li>
                    <p class="addleftgift">
                    <span class="tit_red">*</span>
                    <span>包装重量：</span>
                    </p>
                    <p>
                    <a-input-number :max='999999999'
                                    :min='0'
                                    @change="giftbagkg"
                                    v-model='giftpkg.giftPackageWeight' />
                    (kg/盒)
                    </p>
                </li>
                <li>
                    <p class="addleftgift"> <span>礼包内容：</span>
                    </p>
                    <div style="width:360px">
                    <a-textarea style=" height: 100px;resize: none"
                                maxLength="150"
                                v-model="giftpkg.pkgcontent" />
                    </div>
                </li>
                <li>
                	<a-divider orientation="left" style='color: #000000;font-weight: bolder;'>其他关联信息</a-divider>
                </li>
                <li>
                    <p class="addleftgift">转发文案：</p>
                    <a-input style='width: 360px;'
                            maxLength="20"
                            v-model='giftpkg.forwardtext' />
                </li>
                <li>
                    <p class="addleftgift">
	                   	产品详情页(乡村农场端)购买按钮文案 ：
                    </p>
                    <a-input maxLength='5' style='width: 360px;' placeholder="请输入" v-model='giftpkg.btnText1' />
                </li>
                <li>
                    <p class="addleftgift">
	                   	产品详情页(社区农场端)购买按钮文案 ：
                    </p>
                    <a-input maxLength="5" style='width: 360px;' placeholder="请输入" v-model='giftpkg.btnText2' />
                </li>
                <li>
                    <p class="addleftgift">
	                   	组织筹定页购买按钮文案 ：
                    </p>
                    <a-input maxLength="5" style='width: 360px;' placeholder="请输入" v-model='giftpkg.btnText3' />
                </li>
                <li>
                    <p class="addleftgift">
	                   	组织筹定页视频标题 ：
                    </p>
                    <a-input style='width: 360px;' maxLength="15" placeholder="请输入" v-model='giftpkg.videoTitle' />
                </li>
                <li style="margin-bottom: 5px;">
                    <p class="addleftgift">
	                   	上传组织筹定页视频 ：
                    </p>
                    <p></p>
                </li>          
                <li style="margin-bottom: 10px;">
                	<div>
                		<p class="hscolor" >（视频最大50M，支持mp4,3gp,m3u8格式）</p>
	                	<filevideo @videoids='videoidd' v-if='giftpkg.videoPatch==null'></filevideo>
	                	<p v-else="">{{giftpkg.videoPatch}}</p>
                	</div>
                	
                </li>
                
                <li style="margin-bottom: 0;">
                    <p class="addleftgift">
                    	<span class="tit_red">*</span>
                    	<span>编辑专属权信息：</span>
                    	
                    </p>
                    <p>
	                    
                    </p>
                </li>
                <!--<li>
                	<editzsq></editzsq>
                </li>-->
                <!-- <li>
                	<ul>
                		<li v-for=" (ites,i) in giftpkg.privateinfoList"
                			:key='i' style="display: flex;align-items: center;padding: 10px 0;border-bottom: 1px solid #ccc;"
                			
                			>
                			<img :src="ites.imgPatch" style="width: 60px;height: 60px;margin-right: 20px;"/>
                			<div>
                				<p style="color: #888;">{{ites.title}}</p>
                				<p style="width: 400px;color: #000;margin-right: 15px;">{{ites.memo}}</p>
                			</div>
                			<a-popconfirm title="确定删除该专属吗"
                              @confirm="() => deleteinfo(i)"
                              >
                				<a-button type="danger" >删除</a-button>
                			</a-popconfirm>
                			<br />
                			
                		</li>
                		
                	</ul>
                </li>
                <li>
                    <filescom :datatype='childtypee'   @childimge='childimge'></filescom>
                    <p style="display: flex;flex-direction: column;margin-left: 20px;">
                    	<a-input style='width: 360px;' placeholder="请输入专属权标题" v-model='prinfolist.title'/>
                    	<a-textarea 
                    		style=" width: 360px;height: 78px;resize: none;margin-top: 8px;"
                            maxLength="50" placeholder="请输入专属权描述"
                            v-model='prinfolist.memo'
                        />
                    </p>
                    <a-button type="primary" @click='addinfo' style='margin-left: 10px;'>新增专属权</a-button>
                </li> -->
                
            </ul>
            <div style="margin-bottom: 20px;">
            	<editzsq @datacont='dataconts'></editzsq>
            </div>
        </div>
        <div class="btnboxd">
        	<a-button  @click="returns" >取消</a-button>
            <a-button type="primary" @click="handleOk" style='margin-left: 50px;'>保存</a-button>
        </div>        
	</div>
</template>

<script>

import Url from '../../../../../common/urlapi.js';
import filescom from '@/components/publicmodule/files/files';//上传图片
import filevideo from '@/components/baseadmin/body/gift/add/filevideo';//上传视频
import editzsq from '@/components/baseadmin/body/gift/add/editzsq';//新增/编辑-专属权
export default{
    data() {
        return {
        	size: 'default',//添加产品标签
            timesbol:false,
            tokenn : '',
            disabledbol : false,//不可编辑定制按钮
            disabledcolor : '',//不可编辑状态颜色
//          disabledbols : false,//不可编辑定制按钮
//          disabledcolors : '',//不可编辑状态颜色
            isfou : false,//是否定制
            basecont : [],//基地列表-未关联礼包
            addtxtid : null,//新增基地
            cardswidth : 0 ,//礼品卡长
            cardsheight : 0,//礼品卡宽
            lpkbzwidth : 0,//礼品卡包装长
            lpkbzheight : 0,//礼品卡包装宽
            lbwidth:0,//礼包长
            lbheight:0,//礼包宽    
            lbhou:0,//礼包高
//			lbkg:0,
			pkgtag:[],//标签
			
			cdtimea:0,//筹定有效时长
			cdtimeb:0,
			cdtimec:0,
			jdtimea:0,//基地有效时长
			jdtimeb:0,
			jdtimec:0,
			lpktimea:0,//礼品卡有效时长
			lpktimeb:0,
			lpktimec:0,
			
            giftpkg: {//新增的数据
            	basebodyid:'',//主体id
                pkgYunFei : 0,//礼包运费
                cardYunFei : 0,//实体卡运费
                pkgname : '',//礼包名称
                pkgintro : '',//礼包简介
                cardname : '',//礼品卡名称
                iscustomized : 0,//是否定制 0否-1是
                defaultprice : 0,//默认礼包价格
                custprice : 0,//定制价格
                number : 0,//份数
                mininum : 0,//最低定制达成百分比
                pkgtag:'',//标签
                forwardtext : '',//转发文案
                pkgcontent : '',//礼包内容
                validDate:'0*0*0',//筹定有效时长
                baseValidDate:'0*0*0',//基地有效时长
                cardValidDate:'0*0*0',//礼品卡有效时长
                cardbegindate : '',//礼品卡最佳兑换开始时间
                cardenddate : '',//礼品卡最佳兑换结束时间
                bannerimgs : '',//轮播图
                cardImgs : '',//礼品卡图
                pkgimgs : '',//礼包图
                pkgdetail : '',//礼包详情图
                giftPackageSize : '0*0*0',//礼包尺寸长*宽cm
                giftPackageWeight : 0,//礼包重量kg/盒
                cardSize : '0*0',//礼品卡尺寸
                cardPackSize : '0*0',//礼品卡包装尺寸长*宽
                baseids : '',//关联基地	     
                isuse : 1,//礼包上下架
                status : 1,//状态
                btnText1:'发起筹定',//产品详情页(商家农场端)购买按钮文案，默认为“发起筹定”
                btnText2:'去购买',//产品详情页(社区农场端)购买按钮文案，默认为“去购买”
                btnText3:'去购买',//组织筹定页购买按钮文案，默认为“去购买”
                videoTitle:null,//视频标题
                videoPatch:null,//视频路径
                videoid:'',//阿里云视频id
                privateinfoList:[
//              	{
//              		memo:'描述一阿萨德会计分录送快递发简历上看到就分手都来看看看看看啊是看得见繁华描述一',//描述
//              		imgPatch:'https://udbimg.oss-cn-shenzhen.aliyuncs.com/model/bc2ebf063d78b36f3873baf80c14f34a',//图片路径
//              		titleText:'biaoti一',//标题
//              	}
                ],
                paybacktitle:'筹定回报',//筹定回报标题文案2
                producttitle:'产品描述',//产品标题文案1

            },
            prinfolist:
        	{
        		memo:'',//描述
        		imgPatch:'',//图片路径
        		title:'',//标题
        	}
            ,
            childtypea : {//编辑的时候，上传图片，类型，张数，图片
                type: 1,
                leng: 5,
                arrimg: 'no',
            },
            childtypeb : {
                type: 2,
                leng: 5,
                arrimg: 'no',
            },
            childtypec : {
                type: 3,
                leng: 5,
                arrimg: 'no',
            },
            childtyped : {
                type: 4,
                leng: 20,
                arrimg: 'no',
            },
            childtypee : {
                type: 5,
                leng: 1,
                arrimg: 'no',
            },
            columnser : [
                {
                    title: '编号',
                    align: 'center',
                    dataIndex: 'id',
                    width: '20%',
                    scopedSlots: { customRender: 'id' },
                },
                {
                    title: '基地名称',
                    align: 'center',
                    dataIndex: 'basename',
                    width: '50%',
                    scopedSlots: { customRender: 'basename' },
                },
//              {
//                  title: '操作',
//                  align: 'center',
//                  width: '30%',
//                  dataIndex: 'operation',
//                  scopedSlots: { customRender: 'operation' },
//              }
            ],
            data2 : [],
            titlearr:['商家运营管理',' 乡村农场管理','产品管理','新增'],
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
				{
					txt:'新增产品',
					path:'/index/body/giftbag/add'
				},
			],
            giftstat : 0,
            baselistt:[],//所有基地
            
        }
    },
	components: {
        filescom,//上传图片
        filevideo,//上传视频
        editzsq,//编辑专属权
    },
    created(){
        this.tokenn = sessionStorage.getItem('access_token'); 
        let baseid = sessionStorage.getItem('baseids');//主体id
        this.giftpkg.basebodyid = baseid; 
        this.$store.commit('modifytitle',
            {
                arry: this.arry
            }
        );
        this.resetbase();//基地列表

        let giftsta = sessionStorage.getItem('giftedit');//0新增，1编辑
        this.giftstat = giftsta;
        if( giftsta == 0 ){//新增
            this.arry[3].txt = '新增产品';
            this.timesbol = false;//编辑时时间显示
            this.clearinput();//清空
            console.log('新增');     
            
            this.disabledcolor = '';
            this.disabledbol = false;
        }
        else{//编辑
        	console.log('编辑');
            this.arry[3].txt = '编辑产品';
            this.gifteditcont();//编辑礼包--赋值
            this.timesbol = true;//编辑时时间显示
            this.pkgtag = this.giftpkg.pkgtag.split(',');//标签
            this.disabledcolor = 'disabledcolor';
            this.disabledbol = true;

        }
    },
    methods: {   
    	dataconts(item){
    		console.log(item);
    		this.giftpkg.privateinfoList = item;
    	},
//    	addinfo(){//新增专属权
//    		console.log(this.prinfolist.memo);
//    		console.log(this.prinfolist.imgPatch);
//    		console.log(this.prinfolist.title);
//  //		console.log(this.giftpkg.privateinfoList);
//    		if(this.prinfolist.memo == ''){
//    			this.$message.error('请输入专属描述，再新增');
//    		}
//    		else if(this.prinfolist.imgPatch == ''){
//    			this.$message.error('请添加专属图片，再新增');
//    		}
//    		else if( this.prinfolist.title == ''){
//				this.$message.error('请输入专属标题，再新增');		
//        	}
//    		else{        		
//        		this.giftpkg.privateinfoList.push({
//	    			memo:this.prinfolist.memo,//描述
//	        		imgPatch:this.prinfolist.imgPatch,//图片路径
//	        		title:this.prinfolist.title
//	    		})
//        	}
//    		console.log(this.giftpkg.privateinfoList);
//    		this.prinfolist.memo = '';
//		    this.prinfolist.title = '';
//		    this.childtypee.arrimg = 'no';//
//   	},
//    	deleteinfo(i){
//    		this.giftpkg.privateinfoList.splice(i,1);
//    		console.log('删除 '+i+this.giftpkg.privateinfoList);
//    	},
          handleChange(value) {//添加产品标签
	        console.log(value);
	        if( value.length > 3 ){
	        	this.pkgtag = value.splice(0,3);
	        }else{
	        	this.pkgtag = value;
	        }
	        this.giftpkg.pkgtag = this.pkgtag.join(',');
//	        console.log(this.pkgtag);
	    },	    
        gifteditcont(){//编辑礼包--赋值
            let giftcont = JSON.parse( sessionStorage.getItem('editcont') );
//          console.log( giftcont );
            // this.giftpkg.pkgname = giftcont.pkgname;
            
            this.$http.get(Url.httpHost + '/ylncadmin/giftpkg/'+giftcont.id, {
		        params: {
		          access_token: this.tokenn,		          
		        }
		    })
            .then(res=>{
            	console.log(res);
            })
            .catch(err=>{
            	console.log(err);
            })
            
            
            this.giftpkg = giftcont;
            
            if (this.giftpkg.iscustomized == 0) {//是否定制
                //  		this.giftpkg.madebol = false;
                this.isfou = false;
                //  		//console.log(this.isfou);
            } else if (this.giftpkg.iscustomized == 1) {
                this.isfou = true;
                //  		//console.log(this.isfou);
                //  		this.giftpkg.madebol = true; 
            } else {
                return
            }          
                
            this.childtypea.arrimg = giftcont.bannerimgs;//轮播图
            this.childtypeb.arrimg = giftcont.cardImgs;//礼品卡图
            this.childtypec.arrimg = giftcont.pkgimgs;//.join('|');//礼包图
            this.childtyped.arrimg = giftcont.pkgdetail;//详情

            this.cardswidth = giftcont.cardSize.split("*")[0];
            this.cardsheight = giftcont.cardSize.split("*")[1];
            this.lpkbzwidth = giftcont.cardPackSize.split("*")[0];
            this.lpkbzheight = giftcont.cardPackSize.split("*")[1];
            this.lbwidth = giftcont.giftPackageSize.split("*")[0];
            this.lbheight = giftcont.giftPackageSize.split("*")[1];
            this.lbhou = giftcont.giftPackageSize.split("*")[2];   
            //this.lbkg = giftcont.giftPackageWeight;//.split("*")[0];
            this.cdtimea = giftcont.validDate.split(':')[0];
            this.cdtimeb = giftcont.validDate.split(':')[1];
            this.cdtimec = giftcont.validDate.split(':')[2];
            this.jdtimea = giftcont.baseValidDate.split(':')[0];
            this.jdtimeb = giftcont.baseValidDate.split(':')[1];
            this.jdtimec = giftcont.baseValidDate.split(':')[2];
            this.lpktimea = giftcont.cardValidDate.split(':')[0];
            this.lpktimeb = giftcont.cardValidDate.split(':')[1];
            this.lpktimec = giftcont.cardValidDate.split(':')[2];
            
        },
        onChangebol(val){//是否定制
            console.log(val);
            this.isfou = val;
            if ( val == false ){
                this.giftpkg.iscustomized = 0;
            }else{
                this.giftpkg.iscustomized = 1;
            }
        },
        layoutchangeg(val){//定制价格
            console.log(val);
            // if ( val > 0 ) {
            //     this.giftpkg.custprice = this.giftpkg.custprice.toFixed(2);
            // }
        },
        layoutchangef(val){//礼包价格
            console.log(val);
            // this.giftpkg.defaultprice = val;
            // if( val > 0 ){
            //     this.giftpkg.defaultprice = this.giftpkg.defaultprice.toFixed(2);
            // }
        },
        lbprice(val){//失去焦点
            // if( val.path[0].value - 0 > 0 ){
            //     this.giftpkg.defaultprice = this.giftpkg.defaultprice.toFixed(2);
            // }
        },    
        layoutchangeh(value){//礼包分数
            console.log(value);
        },
        layoutchangej(val){
            console.log(val);
        },
        lbyunfei(val){
            console.log(val);
           
        },
        onlbfy(val){//礼包费用--失去焦点
            console.log(val);
            console.log(val.path[0].value);
            
        },
        cardyunfei(val){//实体卡费用
            console.log(val);
            
        },
        onstkfy(val){//实体卡费用--失去焦点
            console.log(val);
            
        },
        giftnamea (indexs) {//关联基地
        	// console.log( indexs );//下标
            this.addtxtid = this.basecont[indexs].id;
            console.log(this.addtxtid);
        },
        resetbase () {//基地信息  		
        	let bodyidd = sessionStorage.getItem('baseids');
            this.$http.get(Url.httpHost + '/ylncadmin/baseinfo', {
                params: {
                    access_token: this.tokenn,
                    bodyid:bodyidd
                },
            })
            .then(res => {
//  			console.log(res);
                if (res.data.code == 200) {
                    if (res.data.result.rows.length > 0) {
                        // let basedata = JSON.stringify(res.data.result.rows);
                        let linkedno = JSON.parse(JSON.stringify(res.data.result.rows));
//                      console.log(linkedno);//所有基地
                        this.baselistt = linkedno;
                        
                        let kon = linkedno;//.filter(item => item.isRelate != 1);//1是已关联礼包的基地
//                      console.log(kon);//、0未关联礼包的基地
                        this.basecont = kon;
                        
                        let giftstas = sessionStorage.getItem('giftedit');//0新增，1编辑
                        if( giftstas == 1 ){//编辑状态
                            //关联基地
                            let baselist = [];//关联基地的id
                            let basecontbox = [];
                            let baseboxs = this.baselistt;//全部基地信息
                                
                            baselist = this.giftpkg.baseids.split(',');
                            //  	//console.log( this.giftpkg.baseids );
                            console.log(baselist);
                            baselist.map((val, index) => {
                                baseboxs.map((valid, i) => {
                                    valid.key = i;
                                    if (val == valid.id) {
                                        basecontbox.push(valid);
                                    }
                                })
                            })
                            this.data2 = basecontbox;
//                          console.log(this.data2 );
                        }
                    }
                    else {
                        this.basecont = [];
                    }
                }
                else {
                    this.basecont = [];
                }
            })
            .catch(err => {
                console.log(err);
            //			this.$message.error(err.response.data.message);
            })
        },
        addbtn () {//新增	
            let baseinf = this.basecont;//未关联的基地
            let bindids = [];
            let objname = {
                basename: '',
                key: '',
                id: '',
            };
            if (this.addtxtid != null) {//点击新增--下拉框已选择了基地
                baseinf.map((val, index) => {
                    if (this.addtxtid == val.id) {
                        //console.log( val.id );
                        objname.basename = val.basename
                        objname.key = val.id;
                        objname.id = val.id;
                        if (this.giftpkg.baseids != '') {
                            bindids = this.giftpkg.baseids.split(',');
                            //console.log( bindids );
                            if (bindids.indexOf(val.id.toString()) > -1) {
                                this.$message.error('已新增');
                            }
                            else {
                                this.data2.push(objname);
                                bindids.push(val.id)//.join(',');
                                this.giftpkg.baseids = bindids.join(',')
                                //console.log( bindids );
                                //console.log( this.giftpkg.baseids );
                            }
                        }
                        else {//第一次新增
                            this.data2.push(objname);
                            bindids.push(val.id)//.join(',');
                            this.giftpkg.baseids = bindids.join(',')
                            //console.log( bindids );
                            //console.log( this.giftpkg.baseids );
                        }
                    }
                })
            }
            else {
                this.$message.error('请选择关联基地');
            }
        //		//console.log(this.data2);//列表的数据
        },
        deletebase (record) {//删除新增的关联基地
            const dataSource = [...this.data2];
            this.data2 = dataSource.filter(item => item.key != record.key);
            let deletebaseid = this.giftpkg.baseids;
            //console.log(deletebaseid);
            //console.log( record.id );    
            this.giftpkg.baseids = this.giftpkg.baseids.split(',').filter(item => item != record.id).join(',');
            this.resetbase();//解除关联           	
        },
        
        layoutchangez (time, timeString) {//礼品卡最佳兑换时间段
            console.log( time, timeString );
            // this.timec = timeString[0] + ' ~ ' + timeString[1];//显示 
            this.giftpkg.cardbegindate = timeString[0] ;
            this.giftpkg.cardenddate = timeString[1] ;
        },
        
        cdtimera(val){//筹定时长
        	console.log(val);
        	this.giftpkg.validDate = val+':'+this.cdtimeb+':'+this.cdtimec;
        	console.log(this.giftpkg.validDate)
        },
        cdtimerb(val){
        	console.log(val);
        	this.giftpkg.validDate = this.cdtimea+':'+val+':'+this.cdtimec;
        	console.log(this.giftpkg.validDate)
        },
        cdtimerc(val){
        	console.log(val);
        	this.giftpkg.validDate = this.cdtimea+':'+this.cdtimeb+':'+val;
        	console.log(this.giftpkg.validDate);
        },
        jdtimera(val){//基地有效时长
        	console.log(val);
        	this.giftpkg.baseValidDate = val+':'+this.jdtimeb+':'+this.jdtimec;
        	console.log(this.giftpkg.baseValidDate);
        },
        jdtimerb(val){
        	console.log(val);
        	this.giftpkg.baseValidDate = this.jdtimea+':'+val+':'+this.jdtimec;
        	console.log(this.giftpkg.baseValidDate);
        },
        jdtimerc(val){
        	console.log(val);
        	this.giftpkg.baseValidDate = this.jdtimea+':'+this.jdtimeb+':'+val;
        	console.log(this.giftpkg.baseValidDate);
        },
        lpktimera(val){//礼品卡时长
        	console.log(val);
        	this.giftpkg.cardValidDate = val+':'+this.lpktimeb+':'+this.lpktimec;
        	console.log(this.giftpkg.cardValidDate);
        },
        lpktimerb(val){
        	console.log(val);
        	this.giftpkg.cardValidDate = this.lpktimea+':'+val+':'+this.lpktimec;
        	console.log(this.giftpkg.cardValidDate);
        },
        lpktimerc(val){
        	console.log(val);
        	this.giftpkg.cardValidDate = this.lpktimea+':'+this.lpktimeb+':'+val;
        	console.log(this.giftpkg.cardValidDate);
        },
        
        
        //自定义事件（子传父值）
        childimga (item) {
        	console.log(item);
            this.giftpkg.bannerimgs = item;
        },
        childimgb (item) {
        	console.log(item);
            this.giftpkg.cardImgs = item;
        },
        childimgc (item) {
        	console.log(item);
            this.giftpkg.pkgimgs = item;
        },
        childimgd (item) {
    		console.log(item);
            this.giftpkg.pkgdetail = item;
        },
        childimge (item) {
    		console.log(item);
            this.prinfolist.imgPatch = item;
        },
        videoidd(item){
        	console.log(item);
        	this.giftpkg.videoid = item;
        },
        cardw (val) {//礼品卡长
            console.log(val);
            if( val < 0 ){
                val = 0;
            }
            this.cardswidth = val;
            this.giftpkg.cardSize = val + "*" + this.cardsheight;
        	console.log( this.giftpkg.cardSize );
        },
        cardh (val) {//礼品卡宽
            console.log(val);
            if( val < 0 ){
                val = 0;
            }
            this.cardsheight = val;
            this.giftpkg.cardSize = this.cardswidth + "*" + val;
    		console.log( this.giftpkg.cardSize );
        },
        cardboxw (val) {//礼品卡包装长
            console.log(val);
            if( val < 0 ){
                val = 0;
            }
            this.lpkbzwidth = val;
            this.giftpkg.cardPackSize = val + '*' + this.lpkbzheight;
    		console.log( this.giftpkg.cardPackSize )
        },
        cardboxh (val) {//礼品卡包装宽
            console.log(val);
            if( val < 0 ){
                val = 0;
            }
            this.lpkbzheight = val;
            this.giftpkg.cardPackSize = this.lpkbzwidth + '*' + val;
    		console.log( this.giftpkg.cardPackSize )
        },
        giftbagw (val) {//礼包长
            console.log(val);
            if( val < 0 ){
                val = 0;
            }        
//          this.lbwidth = val;
            this.giftpkg.giftPackageSize = val + '*' + this.lbheight +'*'+ this.lbhou;
                 		console.log(this.giftpkg.giftPackageSize)
        },
        giftbagh (val) {//礼包宽
            console.log(val);
            if( val < 0 ){
                val = 0;
            }
//          this.lbheight = val;
            this.giftpkg.giftPackageSize = this.lbwidth + '*' + val + '*' +this.lbhou;
          	console.log(this.giftpkg.giftPackageSize)
        },
        giftlbhou (val) {//高
            console.log(val);
            if( val < 0 ){
                val = 0;
            }
//          this.lbhou = val;
            this.giftpkg.giftPackageSize = this.lbwidth + '*' + this.lbheight + '*' + val;
              console.log( this.giftpkg.giftPackageSize )
        },
        giftbagkg (val) {//礼包重量
            console.log(val);        
//          if( val < 0 ){
//              val = 0;
//          }
            //this.lbkg = val;
//          this.giftpkg.giftPackageWeight = val;
        },
        returns(){//返回列表
            this.$router.push({
                path:'/index/body/giftbag'
            })
        },
        handleOk (e) {
            let that = this;
            console.log(that.giftpkg); 
            if (that.giftpkg.pkgname == '') {//请填写礼包信息
                that.$message.error('请填写礼包信息');
            }
            else if (that.giftpkg.cardname == '') {//请填写礼品卡名称
                that.$message.error('请填写礼品卡名称');
            }
            else if (that.giftpkg.defaultprice < 0 || that.giftpkg.defaultprice == undefined ) {//请填写礼包价格
                that.$message.error('请填写礼包价格');
                console.log(that.giftpkg.defaultprice);                
            }
            else if (that.isfou == true && that.giftpkg.custprice < 0 || that.giftpkg.custprice == undefined ) {//请填写礼包定制价格
                that.$message.error('请填写礼包定制价格');
            }
            else if (that.giftpkg.number < 0) {//请填写礼包份数
                that.$message.error('请填写礼包份数');
            }
            else if (that.giftpkg.mininum < 0) {//请填写礼包最低筹定达成百分比
                that.$message.error('请填写礼包最低筹定达成百分比');
            }
            else if (that.giftpkg.pkgYunFei < 0 ||  that.giftpkg.pkgYunFei == undefined ) {//请填写兑换礼包物流费用
                that.$message.error('请填写兑换礼包物流费用');
                console.log(that.giftpkg.pkgYunFei );
                
            }
            else if (that.giftpkg.cardYunFei < 0 || that.giftpkg.cardYunFei == undefined ) {//请填写领取实体卡物流费用
                that.$message.error('请填写领取实体卡物流费用');
                console.log(that.giftpkg.cardYunFei );
                
            }
            else if(that.pkgtag.length < 1 ){//产品标签
            	that.$message.error('请新增产品标签');
            }
            else if (that.giftpkg.baseids == '') {//请新增关联基地
                that.$message.error('请新增关联基地');
            }
            else if ( that.cdtimea == undefined || that.cdtimeb == undefined || that.cdtimec == undefined ) {//筹定时长
                that.$message.error('请填写筹定时长');
                console.log( that.cdtimea );
                console.log( that.cdtimeb );
                console.log( that.cdtimec );
            }
            else if ( that.jdtimea == undefined || that.jdtimeb == undefined || that.jdtimec == undefined ) {//筹定时长
                that.$message.error('请填写基地有效时长');
                console.log( that.jdtimea );
                console.log( that.jdtimeb );
                console.log( that.jdtimec );
            }
            else if ( that.giftpkg.cardbegindate == '' || that.giftpkg.cardenddate == '' ) {//礼品卡开始时间
                that.$message.error('请填写礼品卡兑换时间');
            }
            else if ( that.lpktimea == undefined || that.lpktimeb == undefined || that.lpktimec == undefined ) {//筹定时长
                that.$message.error('请填写礼品卡有效时长');
                console.log( that.lpktimea );
                console.log( that.lpktimeb );
                console.log( that.lpktimec );
            }
            else if (that.giftpkg.bannerimgs == '') {//礼包轮播图
                that.$message.error('请上传产品轮播图');
            }
            else if (that.giftpkg.cardImgs == '') {//礼包轮播图
                that.$message.error('请上传礼品卡图片');
            }
            else if (that.giftpkg.pkgimgs == '') {//礼包轮播图
                that.$message.error('请上传礼包图片');
            }
            else if (that.giftpkg.pkgdetail == '') {//礼包轮播图
                that.$message.error('请上传礼包详情图片');
            }
            else if (that.cardswidth < 0 || that.cardsheight < 0 || that.cardswidth == undefined || that.cardsheight == undefined || that.cardswidth == null || that.cardsheight == null) {//礼品卡尺寸
                that.$message.error('请填写礼品卡尺寸');
            }
            else if (that.lpkbzwidth < 0 || that.lpkbzheight < 0 || that.lpkbzwidth == undefined || that.lpkbzheight == undefined || that.lpkbzwidth == null || that.lpkbzheight == null ) {//礼品卡包装尺寸
                that.$message.error('请填写礼品卡包装尺寸');
            }
            else if (that.lbwidth < 0 || that.lbheight < 0 || that.lbhou < 0 || that.lbwidth == undefined || that.lbheight == undefined || that.lbhou == undefined ) {//礼包尺寸
                that.$message.error('请填写礼包尺寸');
            }
            else if (that.giftpkg.giftPackageWeight < 0 || that.giftpkg.giftPackageWeight == undefined ) {//礼包
                that.$message.error('请填写礼包重量');
            }
            else if( that.giftpkg.privateinfoList.length < 1 ){
            	that.$message.error('请完善专属权信息');
            }
//          else if( that.giftpkg.privateinfoList.length > 0 ){
            	
//          	let fruits = ["Banana", "Orange", "Apple", "Mango"];
//          	if( fruits.indexOf("Apple") > -1 ){//元素在数组中的位置,如果没与搜索到则返回 -1
//          		alert('请保存专属权信息');
//          	}
//          	that.giftpkg.privateinfoList.map(val=>{
//          		if( val.editable == true ){
//          			that.$message.info('请保存专属权信息');
//          			return;
//          		}else{
//          			console.log('//')
//          			
//          		}
//          	})
//          }
            else{
            	let conts = that.giftpkg.privateinfoList;
            	let arrs = [];
            	conts.map(val=>{
            		arrs.push(val.editable);
            	})
            	console.log(arrs);
            	if( arrs.indexOf(true) > -1 ){
            		that.$message.info('请保存专属权信息');
            		return false;
            	}
//          	else{
//          		alert('ok')
//          	}
            	
            	
                
                //新增事件
                if (that.giftstat == 0) {
                    let formd = JSON.stringify(that.giftpkg);
                    console.log(formd);
                    console.log( that.giftpkg );
                    that.$http({
                        method: 'POST',
                        url: Url.httpHost + '/ylncadmin/giftpkg',
                        data: formd,
                        headers: {
                        'content-type': 'application/json',
                        "Authorization": "bearer " + that.tokenn,
                        },
                    })
                    .then((res) => {
            			console.log(res);
                        if (res.data.code == 200) {
                            // that.clearinput();//清空输入框
                            // that.resetbase();//基地
                            that.$message.success('新增成功');
                            that.$router.push({
                                path:'/index/body/giftbag'
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err.response);
                        console.log(err.response.data.message);
                        that.$message.error(err.response.data.message);
                    })
                }
                else {//编辑修改事件
                			
                    let was = JSON.parse(JSON.stringify(that.giftpkg));
                    console.log(was);
                    that.giftpkgto = was;
                    //  that.giftpkgto.id = that.editgiftid;
                    console.log('编辑---')
                        console.log( that.giftpkgto );
                    that.$http({
                        method: 'PUT',
                        url: Url.httpHost + '/ylncadmin/giftpkg',
                        data: was,
                        headers: {
                        'content-type': 'application/json',
                        "Authorization": "bearer " + that.tokenn,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        if (res.data.code == 200) {
                            
                            that.$message.success('修改成功');
                            that.$router.push({
                                path:'/index/body/giftbag'
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        console.log(err.response.data.message);
                        that.$message.error(err.response.data.message);
                    })
                }
           	}
        },
        //清空输入框
        clearinput () {
            let that = this;
            that.giftpkg.pkgname = '';
            that.giftpkg.pkgintro = '';
            that.giftpkg.cardname = '';
            that.giftpkg.iscustomized = 0;//是否定制 0否-1是
            //		that.giftpkg.madebol = false;//是否允许定制
            that.isfou = false;

            that.giftpkg.defaultprice = 0;
            that.giftpkg.custprice = 0;//定制价格
            that.giftpkg.number = 0;
            that.giftpkg.mininum = 0;

            that.giftpkg.isuse = 1;
            that.giftpkg.status = 1;
            that.giftpkg.forwardtext = '',//转发文案
                that.giftpkg.pkgcontent = '',//礼包内容
                that.timea = '';
            that.timeb = '';
            that.timec = '';
            that.timed = '';
            that.pkgtag = [];//礼包标签
			
            that.giftpkg.bannerimgs = '';//轮播图
            that.giftpkg.cardImgs = '';//礼品卡图
            that.giftpkg.pkgimgs = '';//礼包图
            that.giftpkg.pkgdetail = '';//礼包详情图
            //时间
            that.giftpkg.cardbegindate = '';
            that.giftpkg.cardenddate = '';
            //尺寸
            that.giftpkg.cardSize = '0*0';
            that.giftpkg.cardPackSize = '0*0';
            that.giftpkg.giftPackageSize = '0*0*0';
            that.giftpkg.giftPackageWeight = 0;

            that.giftpkg.baseids = '';//关联基地
            that.cardswidth = 0;
            that.cardsheight = 0;
            that.lpkbzwidth = 0;
            that.lpkbzheight = 0;
            that.lbwidth = 0;
            that.lbheight = 0;
            that.lbhou = 0;
//          that.lbkg = 0;
            that.data2 = [];
            this.childtypea.arrimg = 'no';//轮播图
            this.childtypeb.arrimg = 'no';//礼品卡图
            this.childtypec.arrimg = 'no';//礼包图
            this.childtyped.arrimg = 'no';//详情	
            this.childtypee.arrimg = 'no';//编辑专属权图片
            
            this.prinfolist.des = '';//编辑专属权描述
		    this.prinfolist.title = '';//编辑专属权标题
        },
    },
}
</script>

<style>
.addgift > li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.addgift li .addleftgift {
  width: 45%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 0 !important;
}
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
.timeblock{
    position: relative;
}
.timecont{
    position: absolute;
    top: 0;
    left: 0;
    width: 320px;
    line-height: 32px;
    background: #eee;
    padding: 0 8px;
    border-radius: 3px;
    z-index: 999;
}
/* 不可编辑状态 内容颜色 */
.disabledcolor{
  color: #ccc;
}
.btnboxd{
    display: flex;
    justify-content: center;
}
.hscolor{
	color: #CCCCCC;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>