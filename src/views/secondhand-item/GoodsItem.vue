<template>
    <div id="goods-item">
        <!-- 标题和导航 -->
        <van-nav-bar
            safe-area-inset-top
            title="详情"
            fixed
            placeholder
            @click-left="onClickLeft"
            class="titles"
        >
            <template #left>
                <van-icon name="arrow-left" size="18" color="#00ac2c" />
                <span style="font-size: 18px; color: #00ac2c">返回</span>
            </template>
        </van-nav-bar>
        <!-- 商品信息 -->
        <van-tabs
            v-model="active"
            scrollspy
            sticky
            color="#00ac2c"
            title-active-color="#00ac2c"
            offset-top="50.18"
            class="van-hairline--top"
            v-if="Object.keys(goodsItem).length != 0"
        >
            <van-tab title="描述" class="goods-tab bgc">
                <ul class="goods-item-ul">
                    <li>
                        <img
                            v-if="goodsItem.user.avatarUrl != null"
                            :src="goodsItem.user.avatarUrl"
                            alt=""
                        />
                        <img v-else :src="image[0]" alt="" />
                    </li>
                    <li>
                        <p
                            style="
                                font-size: 16px;
                                font-weight: bold;
                                padding-bottom: 5px;
                            "
                        >
                            {{ goodsItem.user.name }}
                        </p>
                        <p style="font-size: 10px; color: #a8a8a8">
                            发布于{{ goodsItem.site }}
                        </p>
                    </li>
                </ul>
                <p class="goods-p">
                    ￥<span>{{ goodsItem.price }}</span>
                </p>
                <div class="goodsitem-info">
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                            goodsItem.description
                        }}
                    </p>
                </div>
            </van-tab>
            <van-tab title="实物展示" class="goods-tab bgc">
                <p class="item-p">商品详情</p>
                <ul class="itemImg">
                    <li
                        v-for="(item, index) in goodsItem.images"
                        :key="index"
                        @click="itemImg(index)"
                    >
                        <img :src="item" alt="" />
                    </li>
                </ul>
                <p class="good-item-time">发布于{{ goodsItem.updateTime }}</p>
            </van-tab>
            <van-tab title="评论" class="goods-tab bgc">
                <comment></comment>
            </van-tab>
            <div style="height: 50px"></div>
        </van-tabs>
        <!-- 商品导航  -->
        <van-goods-action>
            <van-goods-action-icon
                icon="comment"
                text="留言"
                @click="leaveWord"
            />
            <van-goods-action-icon
                icon="cart"
                text="购物车"
                :badge="AddCartCount"
                to="/cart"
            />
            <!-- <van-goods-action-icon icon="star" text="已收藏" color="#00ac2c" /> -->
            <van-goods-action-button
                color="linear-gradient(45deg,#bfe6ba,#00ac2c)"
                type="warning"
                text="加入购物车"
                @click="addCart"
            />
            <!-- #bfe6ba -->
            <!-- color="linear-gradient(45deg,#d3959b,#00ac2c) -->
            <van-goods-action-button
                color="linear-gradient(45deg,#d3959b,#00ac2c)"
                type="danger"
                text="立即购买"
                @click="startOrder"
            />
        </van-goods-action>
    </div>
</template>

<script>
import {
    ImagePreview,
    NavBar,
    Icon,
    Tab,
    Tabs,
    Sticky,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
} from "vant";

import closeIcon from "assets/img/close.png";

import Comment from "./childComps/Comment";
import { timeCycle } from "common/utils";

export default {
    name: "GoodsItem",
    components: {
        Comment,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionIcon.name]: GoodsActionIcon,
        [GoodsActionButton.name]: GoodsActionButton,
        [Sticky.name]: Sticky,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [ImagePreview.Component.name]: ImagePreview.Component,
    },
    data() {
        return {
            active: "",
            closeIcon: closeIcon,
            goodId: "",
            goodsItem: {},
            isAddCart: false,
            AddCartCount: "",
            userId: "",
        };
    },
    created() {
        console.log(this.$route.query.goodId);
        this.goodId = this.$route.query.goodId;
        // 获取单条二手交易信息
        this.getListById(this.goodId);
        // 获取用户加入购物车数量
        this.userId = localStorage.getItem("userId");
        this.getAddCartCountById(this.userId);
    },
    methods: {
        // 获取单条数据
        getListById(x) {
            let url = "/secondhand/" + x;
            this.$axios
                .get(url)
                .then((res) => {
                    res.data.updateTime = timeCycle(res.data.updateTime);
                    res.data.createTime = timeCycle(res.data.createTime);
                    this.goodsItem = res.data;
                    console.log(this.goodsItem);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAddCartCountById(userId) {
            console.log(userId);
            let url = "/addcart/" + userId;
            this.$axios
                .get(url)
                .then((res) => {
                    console.log(res);
                    if (res.data.length == 0) {
                        this.AddCartCount = "";
                        return;
                    }
                    this.AddCartCount = res.data.length;
                    console.log(this.AddCartCount);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        itemImg(x) {
            ImagePreview({
                images: this.goodsItem.images,
                startPosition: x,
                showIndicators: true,
                closeable: true,
                closeIcon: this.closeIcon,
            });
        },
        leaveWord() {
            console.log("点击了留言");
            this.$root.Bus.$emit("clickLeaveWord", "点击了留言");
        },
        addCart() {
            console.log("点击了加入购物车");
            if (this.isAddCart) {
                this.$toast({
                    message: "您已加入购物车，请勿重复加入！",
                    position: "center",
                });
                return;
            }
            console.log(this.goodsItem);
            this.$axios
                .post("/addcart", {
                    pictrue_url: this.goodsItem.images[0],
                    title: this.goodsItem.keyword,
                    description: this.goodsItem.description,
                    price: this.goodsItem.price,
                    secondhand_id: this.goodsItem.id,
                    seller_id: this.goodsItem.userId,
                })
                .then(async (res) => {
                    console.log(res);
                    this.$root.Bus.$emit("addToCart", "加入成功");
                    console.log("123456");
                    this.$toast({
                        message: res.data.message,
                        position: "center",
                    });
                    this.getAddCartCountById(this.userId);
                    this.isAddCart = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        startOrder() {
            console.log("点击了购买，发起订单");
            let itemGoods = {
                pictrue_url: this.goodsItem.images[0],
                title: this.goodsItem.keyword,
                description: this.goodsItem.description,
                price: this.goodsItem.price,
                telphone: this.goodsItem.telphone,
                secondhand_id: this.goodsItem.id,
                seller_id: this.goodsItem.userId,
            };
            console.log(itemGoods);

            // this.$root.Bus.$emit("clickBuy", itemGoods);
            // localStorage.removeItem("itemGoods");
            localStorage.setItem("itemGoods", itemGoods);
            localStorage.setItem("pictrue_url", this.goodsItem.images[0]);
            localStorage.setItem("title", this.goodsItem.keyword);
            localStorage.setItem("description", this.goodsItem.description);
            localStorage.setItem("price", this.goodsItem.price);
            localStorage.setItem("telphone", this.goodsItem.telphone);
            localStorage.setItem("secondhand_id", this.goodsItem.id);
            localStorage.setItem("seller_id", this.goodsItem.userId);
            localStorage.setItem("orderFrom", true);

            this.$router.push({
                path: "/order",
                query: { itemGoods: itemGoods },
            });
            // this.$axios.post('/secondhand/startOrder', {
            //     "pictrue_url": this.goodsItem.images[0],
            //     "title": this.goodsItem.keyword,
            //     "description": this.goodsItem.description,
            //     "price": this.goodsItem.price,
            //     "telphone": this.goodsItem.telphone,
            //     'secondhand_id': this.goodsItem.id,
            // })
            // .then( async (res) => {
            //     console.log(res);
            //     this.$root.Bus.$emit('addToCart', '加入成功');
            //     console.log('123456');
            // }).catch((err) => {
            //     console.log(err);
            // })
        },
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>

<style scoped>
#goods-item {
    padding: 10px 18px 0;
    background-color: #f7f7f7;
}
.titles {
    height: 50px;
    /* border-bottom: 1px solid #e2e2e2; */
}
.goods-item-ul {
    display: flex;
    padding-top: 10px;
}
.goods-item-ul li:first-child {
    flex: 10%;
}
.goods-item-ul li:last-child {
    flex: 90%;
    padding-left: 8px;
}
.goods-item-ul li img {
    width: 35px;
    height: 35px;
}
/* 价格 */
.goods-p {
    padding: 10px 0;
    font-size: 10px;
    color: red;
}
.goods-p span {
    font-size: 18px;
    color: red;
}
.goods-tab {
    background-color: #fff;
}
.goodsitem-info p {
    font-size: 14px;
}
.item-p {
    margin-top: 15px;
    padding: 20px 0 20px 2px;
    font-size: 16px;
    font-weight: bold;
    border-top: 10px solid #efefef;
}
.itemImg li {
    width: 100%;
    height: auto;
    margin-bottom: 12px;
    border-radius: 8px;
}
.itemImg li img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}
.good-item-time {
    padding: 10px;
    text-align: right;
    font-size: 13px;
    color: silver;
}
</style>