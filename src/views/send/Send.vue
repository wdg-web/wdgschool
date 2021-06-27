<template>
  <div id="send">
    <h3 class="send-title">
      <van-sticky>
        <ul class="tab-tilte">
            <li @click="cur=0" :class="{active:cur==0}">校园寻物</li>
            <li @click="cur=1" :class="{active:cur==1}">二手交易</li>
        </ul>
      </van-sticky>
    </h3>
    <div class="tab-content">
        <div v-show="cur==0">
          <send-found></send-found>
        </div>
        <div v-show="cur==1">
          <second-goods></second-goods>
        </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Sticky } from 'vant';

import SendFound from './childComps/SendFound';
import SecondGoods from './childComps/SecondGoods';

export default {
  name: "Send",
  data() {
    return{
        cur: 0,
    }
  },
  components: {
    SendFound,
    SecondGoods,
    [Tab .name]: Tab,
    [Tabs .name]: Tabs,
    [Sticky .name]: Sticky,
  },
}
</script>

<style scoped>
  .send-title {
    font-size: 18px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    /* padding: 0 100px; */
  }
  .tab-tilte {
    display: flex;
  }
  .tab-tilte li {
    flex: 50%;
    text-align: center;
    background-color:#f4f4f4;
    cursor: pointer;
  }
  .tab-tilte .active{
    background-color: #00ac2c;
    color: #fff;
   }
  .tab-content {
    margin-top: 10px;
    padding-bottom: 50px;
      /* line-height: 100px;
      text-align: center; */
      /* padding: 10px 20px 0; */
  }
</style>