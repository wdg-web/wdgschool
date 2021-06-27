<template>
    <div class="cart-list">
        <ul>
            <li
                class="cart-item-li"
                v-for="(item, index) in addCartList"
                :key="index"
            >
                <cart-list-item :item="item"></cart-list-item>
            </li>
        </ul>
        <!-- <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item> -->
    </div>
</template>

<script>
import CartListItem from "./CartListItem";

import bgImage1 from "assets/img/secondhand/shuji.jpeg";

export default {
    name: "CartList",
    components: {
        CartListItem,
    },
    data() {
        return {
            itemInfo: {
                image: bgImage1,
                title: "电脑知识书本",
                desc:
                    "我现有—本电脑知识讲义，想低价售出，有意者可拍，或者联系我",
                price: "8",
                count: "1",
            },
            userId: "",
            addCartList: "",
        };
    },
    created() {
        // 获取用户加入购物车数量
        this.userId = localStorage.getItem("userId");
        this.getAddCartCountById(this.userId);

        // 点击删除之后触发
        this.$root.Bus.$on("deleteCartItem", (res) => {
            this.getAddCartCountById(this.userId);
            console.log(res);
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
                    this.addCartList = res.data;
                    console.log(this.addCartList);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script> 

<style scoped>
.cart-list {
    height: calc(100% - 44px - 49px);
}
.content {
    height: 100%;
    overflow: hidden;
}
.cart-list ul {
    width: 100%;
}
.cart-item-li {
    border-bottom: 1px solid #ccc;
}
</style>