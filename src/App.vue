<template>
    <div id="app">
        <keep-alive
            exclude="Detail,Login,LostDetailItem,Register,GoodsItem,GoodsClassify,Profile,Cart,AddressEdit,Order,OrderList,Message"
        >
            <router-view />
        </keep-alive>
        <div v-if="this.$route.meta.showTab">
            <van-tabbar
                route
                active-color="#00ac2c"
                inactive-color="#000"
                class="app-tabbar shadow"
                safe-area-inset-bottom
            >
                <van-tabbar-item replace to="/lostFound" icon="search"
                    >寻物</van-tabbar-item
                >
                <van-tabbar-item replace to="/secondhand" icon="shop-collect"
                    >二手购</van-tabbar-item
                >
                <van-tabbar-item replace to="/send" icon="add"
                    >发表</van-tabbar-item
                >
                <van-tabbar-item replace to="/cart" icon="shopping-cart"
                    >购物车</van-tabbar-item
                >
                <van-tabbar-item
                    replace
                    to="/profile"
                    icon="manager"
                    class="icon-father"
                >
                    我的
                    <van-icon
                        v-if="messageCount != 0"
                        class="icon"
                        :badge="messageCount"
                    />
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from "vant";

export default {
    name: "app",
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Icon.name]: Icon,
    },
    data() {
        return {
            messageCount: 0,
            show: this.$route.meta.showTab,
        };
    },
    created() {
        let ishandle = "ishandle";
        console.log(this.$route.meta);
        console.log(this.show);
        this.getOrderListByFinish(ishandle, 0);
        // if (this.show) {
        //     this.getOrderListByFinish(ishandle, 0);
        // }
        this.$root.Bus.$on("profile", (value) => {
            console.log(value);
            let ishandle = "ishandle";
            this.getOrderListByFinish(ishandle, 0);
            // if (this.show) {
            //     this.getOrderListByFinish(ishandle, 0);
            // }
        });
    },
    // mounted() {
    //     let ishandle = "ishandle";
    //     console.log(this.show);
    //     if (this.show) {
    //         this.getOrderListByFinish(ishandle, 0);
    //     }
    // },
    methods: {
        getOrderListByFinish(x, y) {
            console.log(x);
            let url = "order/message";
            let data = {
                type: x,
                typeValue: y,
            };
            this.$axios
                .get(url, {
                    params: data,
                })
                .then((res) => {
                    console.log(res);
                    let arr = res.data;
                    this.messageCount = arr.length;
                    console.log(this.messageCount);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style>
@import "assets/css/base.css";
#app {
    width: 100vw;
    height: 100vh;
}
.shadow {
    -moz-box-shadow: 1.5px 1.5px 6.6px #1b1b1b;
    -webkit-box-shadow: 1.5px 1.5px 6.6px #1b1b1b;
    box-shadow: 1.5px 1.5px 6.6px #1b1b1b;
}
/* .app-tabbar {
    padding-bottom: 10px
    } */
.icon-father {
    position: relative;
}
.icon {
    position: relative;
    top: -45px;
    right: 1px;
}
</style>
