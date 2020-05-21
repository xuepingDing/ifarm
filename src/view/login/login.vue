<template>
  <div>

    <div id="loginbox">
      <p class="p_title">
        <!--<img id="loginlogo" src="/static/img/logo.png" />-->
        云恋农场管理系统
      </p>
      <div>
        <a-form id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit">
          <a-form-item>
            <a-input v-decorator="[
			          'userName',
			          { rules: [{ required: true, message: '请输入账户' }] }
			        ]"
                     placeholder="请输入账户"
                     autocomplete="off">
              <a-icon slot="prefix"
                      type="user"
                      style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input v-decorator="[
			          'password',
			          { rules: [{ required: true, message: '请输入密码' }] }
			        ]"
                     type="password"
                     placeholder="请输入密码"
                     autocomplete="off">
              <a-icon slot="prefix"
                      type="lock"
                      style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <!--验证码-->
          <a-form-item style="margin-bottom: 0;">
            <img :src="getcode"
                 @click="getcodes" />
          </a-form-item>
          <a-form-item class="afromitem">
            <a-input class="ainputsssssssssss"
                     v-decorator="[
				          'code',
				          { rules: [{ required: true, message: '请输入验证码' }] }
				        ]"
                     type="text"
                     placeholder="请输入验证码"
                     autocomplete="off">
              <a-icon slot="prefix"
                      type="plus-square"
                      style="color: rgba(0,0,0,.25)" />

            </a-input>

          </a-form-item>

          <a-form-item>

            <a-button type="primary"
                      html-type="submit"
                      class="login-form-button loginbtn">
              登录
            </a-button>

          </a-form-item>
        </a-form>
      </div>

    </div>

    <vue-particles
	    class='vue_particles'
	    color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="star"
      :particleSize="3"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="false"
      :lineOpacity="0.4"
      :linesDistance="180"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="bubble"
      :clickEffect="true"
      clickMode="repulse"
	  >
		</vue-particles> 
  </div>
</template>

<script>	
import Url from '../../common/urlapi.js';

export default {
  name: 'login',
  data () {
    return {
      getcode: '',//验证码
      deviceId: '',

    }
  },
  created () {
    this.getcodes();//进入登录先刷新验证码
    //		alert(Url.httpHost);
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    getcodes () {
      var num = Math.floor(Math.random() * (1 - 999) + 999);//随机数

      this.getcode = Url.httpHost + "/ylncadmin/code/image?deviceId=" + num;
      //			alert( this.getcode );
      this.deviceId = num;
      //			console.log(this.deviceId );		
    },
    handleSubmit (e) {
      let that = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
          	      	console.log(values);
          	      	console.log(err)	      	
        if (!err) {
          that.$http({
            method: 'POST',
            url: Url.httpHost + '/ylncadmin/authentication/form?username=' + values.userName + '&password=' + values.password + '&imageCode=' + values.code + '&deviceId=' + that.deviceId,
            headers: {
              "Authorization": "Basic dWRiOnVkYg==",
              "Content-Type": "application/x-www-form-urlencoded"
            },

          })
            .then((res) => {
                			        	console.log(res);
              if (res.status == 200) {
                //			        		console.log('登录成功');
                that.$message.success('登录成功');
                sessionStorage.setItem('access_token', res.data.data.access_token);//把token存在session
                sessionStorage.setItem('refresh_token', res.data.data.refresh_token);//把token存在session		        		

                that.$router.push({
                  path: 'index/maps'
                })
              }
            })
            .catch((error) => {
              that.getcodes();//刷新验证码
              console.log(error);
              console.log( error.response );
              that.$message.error(error.response.data.message);
            })
        }
        else {
          that.getcodes();//刷新验证码
          that.$message.error(err.code.errors[0].message);
        }
      });
    },
  }
}	
</script>

<style >
/*背景*/
.vue_particles {
  /*color: #006EAB;*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000c17;
  opacity: 0.9;
  /*background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563878784685&di=e166b051da572e8c5364b669cdd48f2f&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7129f20ad04be544be0f4fe3bb3566ec2720f46225a4b-gGqO27_fw658');*/
  /*background-size:100% 100% ;*/
}

#loginbox {
  width: 50vw;
  height: 65vh;
  min-width: 400px;
  min-height: 350px;
  background: #cccccc;
  opacity: 0.8;
  border-radius: 10px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 99;
}
/*标题*/
.p_title {
  margin-bottom: 0;
  font-size: 24px;
  text-align: center;
  line-height: 70px;
  letter-spacing: 6px;
}
/*logo*/
#loginlogo {
  width: 36px;
  height: 28px;
}
.ant-form-item-control-wrapper {
  width: 100%;
}
/*用户名,密码*/
.ant-form-item-control {
  display: inline-block;
  width: 90%;
  margin-left: 5%;
}
/*登录页  输入框和按钮*/
.ant-form-item-children {
  display: block;
}
/*登录按钮*/
.loginbtn {
  width: 100%;
}
</style>