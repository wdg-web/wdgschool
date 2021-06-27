<template>
    <div id="goods-classify">
        <van-sticky>
            <van-search
                v-model="value"
                input-align="center"
                shape="round"
                placeholder="请输入搜索关键词"
                @focus="getFocus"
                @blur="lostFocus"
                @input="contentChange"
            >
                <template #left>
                    <div
                        @click="onSearch"
                        style="vertical-align: middle; color: #00ac2c"
                    >
                        <van-icon
                            name="revoke"
                            size="24"
                            style="vertical-align: middle"
                            color="#00ac2c"
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </template>
            </van-search>
            <van-dropdown-menu v-show="isShowBysearch">
                <van-dropdown-item
                    v-model="value1"
                    :options="option1"
                    @change="Onchange1"
                />
                <van-dropdown-item
                    v-model="value2"
                    :options="option2"
                    @change="Onchange2"
                />
            </van-dropdown-menu>
        </van-sticky>
        <div class="classify" v-show="isShowBysearch">
            <goods v-if="classify != ''" :classify="classify" />
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
import { Search, DropdownMenu, DropdownItem, Sticky, Icon, Empty } from "vant";

import Goods from "../childComps/Goods";

import bgImage0 from "assets/img/secondhand/classify/全部商品.png";
import bgImage1 from "assets/img/secondhand/classify/全部商品1.png";
import bgImage2 from "assets/img/secondhand/classify/体育.png";
import bgImage3 from "assets/img/secondhand/classify/学习资料.png";
import bgImage4 from "assets/img/secondhand/classify/数码相机.png";
import bgImage5 from "assets/img/secondhand/classify/生活用品.png";
import bgImage6 from "assets/img/secondhand/classify/0元送.png";

import emptyImg from "assets/img/secondhand/空空如也1.jpg";

export default {
    name: "GoodsClassify",
    data() {
        return {
            value: "",
            isShowBysearch: true,
            emptyImg: emptyImg,
            isShowEmpty: false,

            bgImage0,
            bgImage1,
            bgImage2,
            bgImage3,
            bgImage4,
            bgImage5,
            bgImage6,

            value1: "0",
            value2: "a",
            option1: [
                { text: "全部商品", value: "0" },
                { text: "学习资料", value: "1" },
                { text: "数码相机", value: "2" },
                { text: "体育用品", value: "3" },
                { text: "生活用品", value: "4" },
                { text: "0元福利", value: "5" },
            ],
            option2: [
                { text: "默认排序", value: "a" },
                { text: "最新发布", value: "b" },
                { text: "价格从高到低", value: "c" },
                { text: "价格从低到高", value: "d" },
            ],
            classify: "",
            order: "",
        };
    },
    components: {
        Goods,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [Sticky.name]: Sticky,
        [Search.name]: Search,
        [Icon.name]: Icon,
        [Empty.name]: Empty,
    },
    created() {
        console.log(this.$route.query.optionVal);
        console.log(this.value1);
        this.value1 = this.$route.query.optionVal + "";
        console.log(this.value1);

        // 搜索反馈
        this.$root.Bus.$on("isShowempty", (value) => {
            console.log(value);
            this.isShowEmpty = value;
            this.isShowBysearch = false;
        });
    },
    mounted() {
        console.log(this.value1);
        switch (this.value1) {
            case "0":
                this.classify = "全部商品";
                break;
            case "1":
                this.classify = "学习资料";
                break;
            case "2":
                this.classify = "数码相机";
                break;
            case "3":
                this.classify = "体育用品";
                break;
            case "4":
                this.classify = "生活用品";
                break;
            case "5":
                this.classify = "0元福利";
                break;
            default:
                console.log("错误");
        }
        console.log(this.classify);
    },
    methods: {
        onSearch() {
            console.log("点击了返回");
            this.$router.go(-1);
        },
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
                this.$root.Bus.$emit("keywordisEmpty", "classify处搜索");
            } else {
                this.getlist(this.value);
            }
        },
        contentChange(val) {
            console.log(val);
            if (val == "") {
                console.log("搜索内容为空");
                this.isShowBysearch = true;
                this.$root.Bus.$emit("keywordisEmpty", "classify处搜索");
            } else {
                console.log(val);
                this.isShowBysearch = false;
                this.getlist(val);
            }
        },
        // 搜索获取数据
        getlist(x) {
            console.log("222");
            this.$root.Bus.$emit("getSecondHandByKeyword", x);
        },
        Onchange1(val) {
            console.log(val);
            switch (val) {
                case "0":
                    this.classify = "全部商品";
                    break;
                case "1":
                    this.classify = "学习资料";
                    break;
                case "2":
                    this.classify = "数码相机";
                    break;
                case "3":
                    this.classify = "体育用品";
                    break;
                case "4":
                    this.classify = "生活用品";
                    break;
                case "5":
                    this.classify = "0元福利";
                    break;
                default:
                    console.log("错误");
            }
            console.log(this.classify);
            this.$root.Bus.$emit("getItemListByClassify", this.classify);
        },
        Onchange2(val) {
            switch (val) {
                case "a":
                    this.order = "默认排序";
                    break;
                case "b":
                    this.order = "最新发布";
                    break;
                case "c":
                    this.order = "价格从高到低";
                    break;
                case "d":
                    this.order = "价格从低到高";
                    break;
                default:
                    console.log("错误");
            }
            console.log(this.order);
            this.$root.Bus.$emit("getItemListByOrder", this.order);
        },
    },
};
</script>

<style scoped>
.classify {
    padding: 0 15px;
}
</style>