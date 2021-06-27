<template>
  <div id="swiper">
    <van-swipe :autoplay="3000" v-if="images">
      <van-swipe-item class="swiwe-item" v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
export default {
  name: "Swipe",
  props: {
    images: {
      type: Array,
    }
  },
  data() {
    return {
        // images: [
        //   'https://img01.yzcdn.cn/vant/apple-1.jpg',
        //   'https://img01.yzcdn.cn/vant/apple-2.jpg',
        // ],
      };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
}
</script>

<style scoped>
  .swiwe-item {
    width: 391px;
    height: 210px;
  }
  .swiwe-item img {
    width: 100%;
    height: 100%;
  }
</style>