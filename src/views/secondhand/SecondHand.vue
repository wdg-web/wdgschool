<template>
    <div id="second-hand">
        <van-sticky>
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                shape="round"
                input-align="center"
                @search="onSearch"
                @focus="getFocus"
                @blur="lostFocus"
                @input="contentChange"
                ref="element"
            />
            <template #left>
                <div @click="onSearch">搜索</div>
            </template>
        </van-sticky>
        <div v-show="isShowBysearch">
            <!-- 轮播图 -->
            <swipe :images="image" />
            <!-- 二手物品分类 -->
            <classify />
            <!-- tab标签栏 -->
            <goods-tab v-if="searchHeight != ''" :searchHeight="searchHeight" />
        </div>
        <div v-show="!isShowBysearch">
            <van-empty
                v-if="isShowEmpty"
                class="custom-image"
                :image="emptyImg"
                description="sorry，没有找到你搜索的内容！"
            />
            <goods v-else />
        </div>
    </div>
</template>

<script>
import { Sticky, Search, Empty } from "vant";

import Swipe from "components/common/swipe/Swipe";

import Classify from "./childComps/Classify";
import GoodsTab from "./childComps/GoodsTab";
import Goods from "./childComps/Goods";

import bgImage5 from "assets/img/secondhand/001.jpg";
import bgImage4 from "assets/img/secondhand/002.jpg";
import bgImage3 from "assets/img/secondhand/003.jpg";
import bgImage2 from "assets/img/secondhand/004.jpg";
import bgImage1 from "assets/img/secondhand/005.jpg";

import emptyImg from "assets/img/secondhand/空空如也1.jpg";

export default {
    name: "SecondHand",
    data() {
        return {
            value: "",
            image: [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5],
            searchHeight: "",
            isShowBysearch: true,
            emptyImg: emptyImg,
            isShowEmpty: false,
        };
    },
    components: {
        Swipe,
        Classify,
        GoodsTab,
        Goods,
        [Sticky.name]: Sticky,
        [Search.name]: Search,
        [Empty.name]: Empty,
    },
    created() {
        // 搜索反馈
        this.$root.Bus.$on("isShowempty", (value) => {
            console.log(value);
            this.isShowEmpty = value;
            this.isShowBysearch = false;
        });
    },
    mounted() {
        this.searchHeight = this.$refs.element.offsetHeight;
        console.log(this.searchHeight);
    },
    methods: {
        getFocus() {
            console.log("点击了搜索");
            this.isShowBysearch = false;
            if (this.value == "") {
                this.$root.Bus.$emit("valueisEmpty", "");
            }
        },
        lostFocus() {
            console.log(this.value);
            if (this.value == "") {
                this.isShowBysearch = true;
                this.$root.Bus.$emit("keywordisEmpty", "主页处搜索");
            } else {
                this.getlist(this.value);
            }
        },
        contentChange(val) {
            console.log(val);
            if (val == "") {
                console.log("搜索内容为空");
                this.isShowBysearch = true;
                this.$root.Bus.$emit("keywordisEmpty", "主页处搜索");
            } else {
                console.log(val);
                this.isShowBysearch = false;
                this.getlist(val);
            }
        },
        getlist(x) {
            this.$root.Bus.$emit("getSecondHandByKeyword", x);
        },
        onSearch(val) {
            console.log(val);
            if (this.value == "") return;
            this.getlist(this.value);
            console.log("0000");
        },
    },
};
</script>

<style scoped>
#second-hand {
    /* height: 100vh; */
    padding: 0 15px;
    width: 100%;
    background-color: #f7f7f7;
}
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}
</style>
