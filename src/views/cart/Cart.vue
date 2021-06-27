<template>
    <div id="cart">
        <van-sticky>
            <h3 class="title">购物车({{ AddCartCount }})</h3>
        </van-sticky>
        <!-- <div v-if="cartLength > 0"> -->
        <div v-if="isShow">
            <!-- 商品列表 -->
            <cart-list class="cart-list"></cart-list>
            <!-- 底部汇总 -->
            <!-- <bottom-bar/> -->
        </div>
        <div v-else>
            <van-empty
                class="custom-image"
                :image="cartisEmpty"
                description="空空如也"
            >
                <van-button
                    round
                    color="#00ac2c"
                    class="bottom-button"
                    @click="goshop"
                    >去逛逛</van-button
                >
            </van-empty>
        </div>
    </div>
</template>

<script>
import CartList from "./childComps/CartList.vue";
import BottomBar from "./childComps/BottomBar";

import cartisEmpty from "assets/img/cart/空空如也.jpg";

import { mapGetters } from "vuex";

import { Empty, Button, Sticky } from "vant";

export default {
    name: "Cart",
    components: {
        CartList,
        BottomBar,
        [Empty.name]: Empty,
        [Button.name]: Button,
        [Sticky.name]: Sticky,
    },
    data() {
        return {
            isShow: true,
            cartLength: "1",
            userId: "",
            AddCartCount: "",
            cartisEmpty: cartisEmpty,
        };
    },
    computed: {
        cartLength1() {
            return this.$store.state.cartList.length;
        },
        ...mapGetters(["cartCount"]),
    },
    created() {
        // 获取用户加入购物车数量
        this.userId = localStorage.getItem("userId");
        this.getAddCartCountById(this.userId);

        // 购物车删除物品item后触发
        this.$root.Bus.$on("deleteCartItem", (value) => {
            console.log(value);
            this.getAddCartCountById(this.userId);
        });
    },
    methods: {
        getAddCartCountById(userId) {
            console.log(userId);
            let url = "/addcart/" + userId;
            this.$axios
                .get(url)
                .then((res) => {
                    console.log(res);
                    this.AddCartCount = res.data.length;
                    if (this.AddCartCount == 0) {
                        this.isShow = false;
                    }
                    console.log(this.AddCartCount);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        goshop() {
            this.$router.push("/secondhand");
        },
    },
};
</script>

<style scoped>
.bottom-button {
    width: 160px;
    height: 40px;
}
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}

#cart {
    /*position: relative;*/
    height: 100vh;
}

.title {
    padding: 10px;
    font-size: 17px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    background-color: #00ac2c;
    z-index: 99999;
}

.cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
}
</style>
