<template>
    <div id="lost-found">
        <div ref="element">
            <van-sticky>
                <h2 class="lost-title van-hairline--bottom">启事</h2>
                <!-- 导航栏 -->
                <van-search
                    v-model="value"
                    input-align="center"
                    shape="round"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @focus="getFocus"
                    @blur="lostFocus"
                    @input="contentChange"
                >
                    <template #left>
                        <div style="vertical-align: middle; color: #00ac2c">
                            <van-dropdown-menu
                                active-color="#00ac2c"
                                z-index="9999"
                            >
                                <van-dropdown-item
                                    v-model="value1"
                                    :options="option1"
                                    @change="onSelect"
                                />
                            </van-dropdown-menu>
                        </div>
                    </template>
                    <template #action>
                        <div @click="onSearch">搜索</div>
                    </template>
                </van-search>
            </van-sticky>
        </div>
        <!-- <van-sticky offset-top="37px">
      <van-search
          v-model="value"
          show-action
          action-text="搜索"
          input-align="center"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onSearch"
          >
          <template #left>
              <div style="vertical-align: middle; color: #00ac2c">
                  <van-dropdown-menu active-color="#00ac2c"  z-index=9999>
                    <van-dropdown-item v-model="value1" :options="option1" @change="onSelect"/>
                  </van-dropdown-menu>
              </div>
          </template>
      </van-search>
    </van-sticky> -->
        <!-- 轮播图 -->
        <swipe class="w" :images="image" v-show="isShowSwipe" />
        <!-- tab选项卡部分 -->
        <tabmenu class="w"></tabmenu>
        <div style="height: 45px"></div>
    </div>
</template>

<script>
import { Sticky, Search, Divider, DropdownMenu, DropdownItem } from "vant";

import Swipe from "components/common/swipe/Swipe";

import Tabmenu from "./childComps/Tabmenu";

import bgImage2 from "assets/img/lostfound/002.jpg";
import bgImage3 from "assets/img/lostfound/003.jpg";
import bgImage4 from "assets/img/lostfound/004.jpg";
import bgImage5 from "assets/img/lostfound/005.jpg";
import bgImage6 from "assets/img/lostfound/006.jpg";

export default {
    name: "LostFound",
    data() {
        return {
            value: "",
            value1: "0",
            option1: [
                { text: "寻找失主", value: "0" },
                { text: "寻找物品", value: "1" },
            ],
            image: [bgImage2, bgImage3, bgImage4, bgImage5, bgImage6],
            tabmenuHeight: 0,
            isShowSwipe: true,
        };
    },
    components: {
        Swipe,
        Tabmenu,
        [Sticky.name]: Sticky,
        [Search.name]: Search,
        [Divider.name]: Divider,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
    },
    mounted() {
        this.tabmenuHeight = this.$refs.element.offsetHeight;
        console.log(this.tabmenuHeight);
        this.$root.Bus.$emit("gettabmenuHeight", this.tabmenuHeight);
    },
    methods: {
        onSearch(val) {
            console.log("点击了搜索");
            console.log(val);
            console.log(this.value);
            // this.$toast({
            //     message: this.value,
            //     position: "center",
            // });
            this.getlist(this.value);
        },
        getFocus() {
            console.log("00");
            this.isShowSwipe = false;
        },
        lostFocus() {
            console.log(this.value);
            if (this.value == "") {
                this.isShowSwipe = true;
            }
        },
        contentChange(val) {
            console.log(val);
            if (val == "") {
                console.log("搜索内容为空");
                this.isShowSwipe = true;
            } else {
                console.log(val);
                this.getlist(val);
            }
        },
        getlist(x) {
            this.$root.Bus.$emit("getDataByKeyword", x);
        },
        onSelect(value) {
            console.log(value);
            this.$root.Bus.$emit("getDataByClassify", value);
        },
    },
};
</script>

<style scoped>
#lost-found {
    width: 100%;
    background-color: #f7f8fa;
}
.w {
    padding: 0 20px;
}
li {
    width: 100%;
}
.lost-title {
    font-size: 23px;
    color: black;
    padding: 0 0 7px 0;
    text-align: center;
    background-color: #f7f8fa;
}
</style>

