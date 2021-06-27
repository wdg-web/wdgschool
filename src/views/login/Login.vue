<template>
  <div class="login" :style="{backgroundImage: `url(${bgImage})`}">
    <div class="login-son">
      <van-form @submit="onSubmit">
        <div class="loginDiv">
          <h3 class="register-title">登录</h3>
          <van-field
            autofocus
            label-align=center
            v-model="username"
            name="name"
            label="用户名:"
            placeholder="请输入用户名"
          />
          <van-field
          class="password"
            v-model="password"
            label-align=center
            type="password"
            name="password"
            label="密码:"
            placeholder="请输入密码"
          ></van-field>
          <!-- :rules="[{ required: isShowError, message: '请输入密码' }]"  v-on:click="btnLeft"-->
        </div>
         <div class="btn">
            <span class="btn-left" v-on:click="btnLeft">
              <span :class="{touchColor1:whether1}" @touchstart="touchstart" @touchend="touchend">新用户注册</span>
            </span>
            <span @click="btnRight" class="btn-right">
              <span :class="{touchColor2:whether2}" @mouseenter="touchstart()" @mouseleave="touchend()">我只想做个过客</span>
            </span>
          </div>
        <div style="margin: 0px 10px" class="login-bottom">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    
  </div>
</template>

<script>
import { Button, Form, Field } from 'vant';

import bgImage from '../../assets/img/login.jpg';

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      message: '',
      bgImage: bgImage,
      isShowError: true,
      whether1: false,
      whether2: false,
      pattern: /\d{6}/,
    }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  methods: {
    btnLeft() {
      console.log('点击了用户注册');
      this.$router.push('/register')
    },
    touchstart(){
     this.whether = true;
    },
    touchend(){
      this.whether = false;
    },
    btnRight() {
      console.log('我只想当个过客');
      localStorage.removeItem('authorization');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      this.$router.push('/lostFound')
    },
    onSubmit(values) {
      console.log('submit', values);
      let that = this;
      console.log('点击了登录');
      this.$axios.post('/login', {
        'name': that.username,
        'password': that.password
      })
      .then(function (res) {
        console.log(res);
        // console.log(res.data.isLogin);
        if (res.data.isLogin == false) {
          console.log(res.data.massage);
          that.massage = res.data.massage;
          that.$toast({
            message: that.massage,
            position: 'top',
          })
        } else {
          let authorization = res.data.token;
          let userId = res.data.id;
          let userName = res.data.name;
          console.log(res.data.token);
          localStorage.setItem('userId',userId);
          localStorage.setItem('userName',userName);
          localStorage.setItem('authorization',authorization);
          that.$router.push('/lostFound')
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
  .login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    /* height: calc(100vh - 44px - 49px); */
    background-size: 100vw 100vh; 
    background-repeat: no-repeat;
    z-index: 29;
    /* background-color: #63c9bb; */
    /* background-image:'url(' + require('') + ')';
    background-size:cover */
  }
  .register-title {
    padding: 10px;
    width: 100%;
    font-size: 20px;
    text-align: center;
    background-color: #fff;
  }
  .loginDiv {
    border-radius: 15px;
    overflow: hidden;
  }
  .password {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    overflow: hidden;
  }
  .login-son {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 70%;
    height: 32%;
    transform: translate(-50%, -50%);
    /* background-color: #fff; */
  }
  .btn {
    display: flex;
    width: 100%;
    height: 20%;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #fff;
    border-radius: 15px;
    overflow: hidden;
  }
  .touchColor1 {
    color: red !important;
  }
  .touchColor2 {
    color: red !important;
  }
  .btn-left {
    /* float: left; */
    flex: 1;
    font-size: 14px;
  }
  .btn-right {
    /* float: right; */
    flex: 1;
    text-align: right;
    font-size: 14px;
  }
 /* span:hover {
    color: red;
    background-color: #fff;
  } */
  .login-son .van-button--info {
    background-color: #3f9f00
  }
</style>
