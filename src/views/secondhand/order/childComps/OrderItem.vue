<template>
    <div id="order-item">
        <ul class="order-item-ul" v-show="Object.keys(itemGoods).length != 0">
            <li>
                <img :src="itemGoods.pictrue_url" alt="" srcset="" />
            </li>
            <li>
                <h4 class="order-title" style="margin-top: 5px">
                    {{ itemGoods.title }}
                </h4>
                <p class="van-multi-ellipsis--l2">
                    描述：&nbsp;{{ itemGoods.description }}
                </p>
                <ul class="price-ul">
                    <li class="order-price0">
                        <span>￥</span>{{ itemGoods.price }}
                    </li>
                    <li class="order-price">X 1</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "OrderItem",
    props: {
        itemGoods: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            itemGoods0: {},
        };
    },
    created() {
        console.log(this.itemGoods0);
        // 点击删除之后触发
        this.$root.Bus.$on("clickBuy", (res) => {
            console.log(res);
        });
    },
};
</script>

<style scoped>
#order-item {
    padding: 10px;
    background-color: #fff;
}
.order-item-ul,
.price-ul {
    display: flex;
}
.order-item-ul li:first-child {
    flex: 2;
}
.order-item-ul li:last-child {
    flex: 5;
    padding-left: 10px;
}
.price-ul li {
    flex: 1;
}
.order-item-ul li:first-child img {
    width: 90px;
    height: 110px;
}
.order-item-ul li p {
    color: #333;
    padding-top: 10px;
    font-size: 16px;
    margin-bottom: 22px;
}
.order-price0 {
    font-size: 16px;
    color: orangered;
}
.order-price0 span {
    font-size: 12px;
}
.order-price {
    font-size: 16px;
}
.order-title {
    font-size: 16px;
}
</style>