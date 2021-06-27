<template>
  <div class="register" :style="{backgroundImage: `url(${bgImage})`}">
    <div class="register-son">
      <van-form @submit="onSubmit">
        <div class="registerDiv">
          <h3 class="register-title">注册</h3>
          <!-- 通过 pattern 进行正则校验 -->
          <van-field
            :autofocus="true"
            border
            label-align=left
            v-model="value1"
            name="name"
            label="用户名:"
            :clearable="true"
            placeholder="请输入用户名"
            :rules="[{ pattern, message: '用户名长度必须2-12位' }]"
          />
        <!-- 通过 validator 进行函数校验 -->
          <van-field
            label-align=left
            name="password"
            label="密码:"
            type="password"
            v-model="value2"
            :clearable="true"
            placeholder="请再次输入密码"
            :rules="[{ validator, message: '密码必须由6-12位数字、英文字母或者下划线组成' }]"
          />
        <!-- 通过 validator 进行函数校验 -->
          <van-field
            label-align=left
            name="password"
            label="确认密码:"
            type="password"
            v-model="value3"
            :clearable="true"
            placeholder="请输入密码"
            :rules="[{ validator, message: '密码必须由6-12位数字、英文字母或者下划线组成' }]"
          />
          <div class="auto-code">
            <div class="auto-left">
              <van-field
                v-model="value4"
                name="autoCode"
                :clearable="true"
                :left-icon="ErrorIcon"
                @input="autoInput"
                input-align="center" 
                placeholder="请输入右侧验证码"
              />
            </div>
            <div class="auto-right" @click="refreshCode"
            >
              <span :style="{display: display[0], color: color[0], transform: transform[0]}">
                {{value5[0]}}
              </span>
              <span :style="{display: display[1], color: color[1], transform: transform[1]}">
                {{value5[1]}}
              </span>
              <span :style="{display: display[2], color: color[2], transform: transform[2]}">
                {{value5[2]}}
              </span>
              <span :style="{display: display[3], color: color[3], transform: transform[3]}">
                {{value5[3]}}
              </span>
            </div>
          </div>
          <div class="btn">
            <span class="btn-left" v-on:click="btnLeft">
              <span :class="{touchColor:whether}" @touchstart="touchstart" @touchend="touchend">已有账号？去登录</span>
            </span>
          </div>
        </div>
        <div style="margin: 0px 10px" class="login-bottom">
          <van-button round block type="info" native-type="submit">注册账号</van-button>
        </div>
      </van-form>
    </div>
    
  </div>
</template>

<script>
import { Button, Form, Field, Icon } from 'vant';

import bgImage from '../../assets/img/login.jpg';
import AutoCode from './childComps/AutoCode.vue';

export default {
  name: "Register",
  components: {
    AutoCode
  },
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: [],
      bgImage: bgImage,
      isShowError: true,
      whether: false,
      ErrorIcon: "",
      str: '',
      display: [], 
      color: [], 
      transform: [],
      pattern: /^.{2,12}$/,
    }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  created() {
    this.run()
  },
  methods: {
    validator(val) {
      if(val == '') return true;
      return /^\w{6,12}$/.test(val);
    },
    btnLeft() {
      console.log('点击了用户注册');
      this.$router.push('/login')
    },
    touchstart(){
     this.whether = true;
    },
    touchend(){
      this.whether = false;
    },
    autoInput() {
      // 过滤输入的数字
      console.log('监听了输入框变化');
      // value.replace(/\d/g, '');
      this.ErrorIcon = "";
    },
    // 验证码部分
    getRandom(l, r) {
            return parseInt(l + Math.random() * (r - l + 1));
        },

    // 设置文本不可选中
    refreshCode(e) {
        e.preventDefault();
        this.run()
    },
    // 生成验证码的函数
    run() {
      // 先重置str
      this.value5 = [];
      this.str = "";
      // 搞一个字符库
      let characters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";

      // 生成由四个字符组成的验证码
      for (let i = 0; i < 4; i++) {

          // 设置文本（从字库中随机抽取一个字符）
          this.value5[i] = characters[this.getRandom(0, characters.length - 1)];
// :style="{display: display, fontSize: fontSize + 'px', color: color, transform: transform}"
          // 设置一些随机的样式
          this.display[i] = 'inline-block';
          this.color[i] = 'rgb(' + this.getRandom(0, 254) + ',' + this.getRandom(0, 254) + ',' + this.getRandom(0, 254) + ')';
          this.transform[i] = 'translate(' + this.getRandom(-5, 5) + 'px, ' + this.getRandom(-5, 5) + 'px) rotate(' + this.getRandom(-20, 20) + 'deg)';
          this.str += this.value5[i]; 
      }
  },

    onSubmit(values) {
      console.log('submit', values);
      let that = this;
      // 验证码核对;
      console.log(this.value4);
      console.log(this.str);
      if(this.value2 != this.value3) {
        that.$toast({
                  message: '两次密码不一致，请重新输入',
                  position: 'top',
                });
        return
      }
      if (this.value4.toLowerCase() == this.str.toLowerCase()) {
                console.log('验证码通过');
            } else {
                that.$toast({
                  message: '验证码错误',
                  position: 'top',
                })
                this.ErrorIcon = "clear";
                this.run();
                // this.value4 = '';
                return
            }
      console.log('点击了注册账号');
      this.$axios.post('/users', values)
      .then(function (res) {
        console.log(res);
        console.log(res.data.isLogin);
        if (res.data.isLogin === false) {
          console.log(res.data.massage);
          that.massage = res.data.massage;
          that.$toast({
            message: that.massage,
            position: 'top',
          })
          // that.$toast('提示文案');
        } else {
          console.log(res.data.massage);
          that.$router.push('/home')
        }
        // this.$router.push('/detail/' + this.goodsItem.iid) 
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  }
}
</script>

<style scoped>
  .register {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: 100vw 100vh; 
    background-repeat: no-repeat;
    z-index: 29;
  }
  .registerDiv {
    border-radius: 15px;
    overflow: hidden;
  }
  .register-title {
    padding: 10px;
    width: 100%;
    font-size: 20px;
    text-align: center;
    background-color: #fff;
  }

  .register-son {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 70%;
    height: 32%;
    transform: translate(-50%, -50%);
    /* background-color: #fff; */
  }

  /* 验证码 */
  .auto-code {
    display: flex;
    width: 100%;
    height: initial;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    overflow: hidden;
  }
  .auto-left {
    flex: 2;
  }
  .auto-right {
    flex: 1;
    display: flex;
    /* height: 100%; */
    /* line-height: 100%; */
    text-align: center;
    background-color: #ddd;
    cursor: pointer;
  }
  .auto-right span {
    flex: 1;
    height: 100%;
    line-height: inherit;
    font-size: 29px;
  }

  .touchColor {
    color: red !important;
  }
  .btn {
    width: 100%;
    height: 20%;
    margin: 10px 0;
    /* background-color: purple; */
    color: rgb(0, 0, 0);
    font: inherit;
  }
  .btn-left {
    font-size: 14px;
  }
  .register-son .van-button--info {
    background-color: #3f9f00
  }
</style>
