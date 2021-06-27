<template>
    <div id="goods">
        <ul class="goods-ul">
            <!-- <li @click="goGoodsItem('000')">
                <div class="goods-div">
                    <figure>
                        <img :src="image[2]" alt="">
                        <figcaption class="figure-style van-multi-ellipsis--l2">Icon 组件默认引用有赞 CDN 提供的字体文件，并通过网络下载。如果需要在项目中使用本地字体文件，请引入下面的 CSS 文件，并在项目中配置 url-loader</figcaption>
                    </figure>
                    <p class="goods-p">
                        ￥<span>666</span>
                    </p>
                    <div class="good-user">
                        <img :src="image[2]" alt="玩家">&nbsp;王大锤
                    </div>
                </div>
            </li>
            <li @click="goGoodsItem('111')">
                <div class="goods-div">
                    <figure>
                        <img :src="image[4]" alt="">
                        <figcaption class="figure-style van-multi-ellipsis--l2">Icon 组件默认引用有赞 CDN 提供的字体文件，并通过网络下载。如果需要在项目中使用本地字体文件，请引入下面的 CSS 文件，并在项目中配置 url-loader</figcaption>
                    </figure>
                    <p class="goods-p">
                        ￥<span>666</span>
                    </p>
                    <div class="good-user">
                        <img :src="image[4]" alt="玩家">&nbsp;王大锤
                    </div>
                </div>
            </li>
            <li @click="goGoodsItem('222')">
                <div class="goods-div">
                    <figure>
                        <img :src="image[3]" alt="">
                        <figcaption class="figure-style van-multi-ellipsis--l2">Icon 组件默认引用有赞 CDN 提供的字体文件，并通过网络下载。如果需要在项目中使用本地字体文件，请引入下面的 CSS 文件，并在项目中配置 url-loader</figcaption>
                    </figure>
                    <p class="goods-p">
                        ￥<span>666</span>
                    </p>
                    <div class="good-user">
                        <img :src="image[3]" alt="玩家">&nbsp;王大锤
                    </div>
                </div>
            </li> -->

            <!-- 分割线 -->
            <li v-for="(item, index) in list" :key="index">
                <div class="goods-div" @click="goGoodsItem(item.id)">
                    <figure>
                        <img
                            v-if="item.images != null"
                            :src="item.images[0]"
                            alt=""
                        />
                        <figcaption class="figure-style van-multi-ellipsis--l2">
                            {{ item.description }}
                        </figcaption>
                    </figure>
                    <p class="goods-p">
                        ￥<span>{{ item.price }}</span>
                    </p>
                    <div class="good-user">
                        <img :src="item.user.avatarUrl" alt="玩家" />&nbsp;{{
                            item.user.name
                        }}
                        <!-- <img :src="image[3]" alt="玩家">&nbsp; -->
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import bgImage5 from "assets/img/secondhand/001.jpg";
import bgImage4 from "assets/img/secondhand/002.jpg";
import bgImage3 from "assets/img/secondhand/003.jpg";
import bgImage2 from "assets/img/secondhand/004.jpg";
import bgImage1 from "assets/img/secondhand/005.jpg";

export default {
    name: "Goods",
    props: {
        classify: {
            type: String,
            default() {
                return "";
            },
        },
    },
    data() {
        return {
            image: [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5],
            list: [],
            intoClassify: "",
        };
    },
    created() {
        // 发布二手交易成功之后触发
        this.$root.Bus.$on("getSecondHandSend", (value) => {
            this.getListBytime();
            console.log(value);
        });
        console.log(this.classify);
        if (this.classify == "最新发布" || this.classify == "全部商品") {
            this.getListBytime();
        } else {
            this.getListByClassify(this.classify);
        }
        // 选择类别时触发
        this.$root.Bus.$on("getItemListByClassify", (value) => {
            console.log(value);
            this.intoClassify = value;

            if (value == "全部商品") {
                this.getListBytime();
            } else {
                this.getListByClassify(value);
            }
        });
        // 选择排序时触发
        this.$root.Bus.$on("getItemListByOrder", (value) => {
            // this.getListByClassify(value);
            console.log(value);
            if (value == "最新发布" || value == "默认排序") {
                console.log("排序");
                this.getListBytime();
            }
        });

        // 搜索关键字
        this.$root.Bus.$on("getSecondHandByKeyword", (value) => {
            console.log(value);
            this.getSecondHandByKeyword(value);
        });
        // 搜索关键字为空
        this.$root.Bus.$on("keywordisEmpty", (value) => {
            console.log(value);
            console.log(value == "classify处搜索");
            console.log(this.intoClassify);
            if (value == "主页处搜索") {
                console.log("主页处搜索");
                this.getListBytime();
            }
            if (value == "classify处搜索" && this.intoClassify != "") {
                console.log("classify处搜索");
                console.log(this.intoClassify);
                if (this.intoClassify == "全部商品") {
                    this.getListBytime();
                    return;
                }
                this.getListByClassify(this.intoClassify);
            }
        });
        this.$root.Bus.$on("valueisEmpty", (value) => {
            this.list = [];
        });
    },
    methods: {
        getListBytime() {
            this.list = [];
            this.$axios
                .get("/secondhand/bytime")
                .then((res) => {
                    this.list = res.data;
                    console.log(this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getListByClassify(x) {
            this.list = [];
            this.$axios
                .get("/secondhand", {
                    params: {
                        classify: x,
                    },
                })
                .then((res) => {
                    this.list = res.data;
                    console.log(this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getSecondHandByKeyword(x) {
            this.list = [];
            this.$axios
                .get("/secondhand/search", {
                    params: {
                        keyword: x,
                    },
                })
                .then((res) => {
                    this.list = res.data;
                    console.log(this.list);
                    let m;
                    if (this.list.length == 0) {
                        m = true;
                    }
                    if (this.list.length > 0) {
                        m = false;
                    }

                    this.$root.Bus.$emit("isShowempty", m);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        goGoodsItem(x) {
            console.log(x);
            this.$router.push({ path: "/goodsitem", query: { goodId: x } });
        },
    },
};
</script>

<style scoped>
.goods-ul {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
}
.goods-ul li {
    width: 50%;
    /* height: 250px; */
    /* border-radius: 15px; */
    /* overflow: hidden; */
    margin-bottom: 14px;
}
.goods-ul li:nth-child(odd) {
    padding-right: 7px;
}
.goods-ul li:nth-child(even) {
    padding-left: 7px;
}
.goods-div {
    border-radius: 12px;
    background-color: white;
}
.goods-div figure img {
    width: 100%;
    height: 220px;
    border-radius: 12px;
}
.figure-style {
    font-size: 14px;
    font-weight: bold;
    padding-left: 8px;
}
.goods-p {
    padding: 10px 0 10px 8px;
    font-size: 10px;
    color: red;
}
.goods-p span {
    font-size: 18px;
    color: red;
}
.good-user {
    padding: 0 0 15px 8px;
}
.good-user img {
    width: 25px;
    height: 26px;
    vertical-align: middle;
    border-radius: 50%;
}
</style>