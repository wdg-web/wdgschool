<template>
  <div id="classify">
      <van-grid  :column-num="3"  :gutter="10">
        <van-grid-item :icon="bgImage3" text="学习资料" @click="onSelect(1)"/>
        <van-grid-item :icon="bgImage2" text="体育用品" @click="onSelect(3)"/>
        <van-grid-item :icon="bgImage4" text="数码相机" @click="onSelect(2)"/>
        <van-grid-item :icon="bgImage5" text="生活用品" @click="onSelect(4)"/>
        <van-grid-item :icon="bgImage6" text="0元福利" @click="onSelect(5)"/>
        <van-grid-item :icon="bgImage1" text="全部" @click="onSelect(0)"/>
      </van-grid>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant';

import bgImage0 from 'assets/img/secondhand/classify/全部商品.png';
import bgImage1 from 'assets/img/secondhand/classify/全部商品1.png';
import bgImage2 from 'assets/img/secondhand/classify/体育.png';
import bgImage3 from 'assets/img/secondhand/classify/学习资料.png';
import bgImage4 from 'assets/img/secondhand/classify/数码相机.png';
import bgImage5 from 'assets/img/secondhand/classify/生活用品.png';
import bgImage6 from 'assets/img/secondhand/classify/0元送.png';

export default {
    name: 'Classify',
    data() {
        return {
            value: '',
          
            bgImage0,
            bgImage1,
            bgImage2,
            bgImage3,
            bgImage4,
            bgImage5,
            bgImage6,
        }
    },
    components: {
        [Grid .name]: Grid,
        [GridItem .name]: GridItem,
    },
    methods: {
        onSelect(x) { 
            console.log(x);
            // let classify;
            // switch (x) {
            //     case 0:
            //         classify = "全部商品";
            //         break;
            //     case 1:
            //         classify = "学习资料";
            //         break;
            //     case 2:
            //         classify = "数码相机";
            //         break;
            //     case 3:
            //         classify = "体育用品";
            //         break;
            //     case 4:
            //         classify = "生活用品";
            //         break;
            //     case 5:
            //         classify = "0元福利";
            //         break;
            //     default:
            //         console.log('错误');
            // }

            this.$router.push({path:'/goodsclassify', query: { optionVal: x }} )
        }
    }
}
</script>

<style>
    #classify {
        margin-top: 10px;
    }
    .van-icon__image {
    width: 1.6em !important;
    height: 1.7em !important;
    object-fit: cover !important;
}
</style>