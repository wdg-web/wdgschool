<template>
    <div id="order-list">
        <goback :title="title" />
        <van-tabs @click="onClick" color="#00ac2c" sticky offset-top="50.7812">
            <van-tab title="未完成订单">
                <ul>
                    <li
                        v-for="(item, index) in list"
                        :key="index"
                        class="bottom"
                    >
                        <list-item :item="item" />
                    </li>
                </ul>
            </van-tab>
            <van-tab title="已完成订单"
                ><ul>
                    <li
                        v-for="(item, index) in list1"
                        :key="index"
                        class="bottom"
                    >
                        <list-item :item="item" />
                    </li></ul
            ></van-tab>
        </van-tabs>
    </div>
</template>

<script>
import ListItem from "./childComps/ListItem";
import Goback from "components/common/search/Goback";

import { Tab, Tabs } from "vant";

export default {
    name: "OrderList",
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        Goback,
        ListItem,
    },
    data() {
        return {
            title: "订单列表",
            isTrue: true,
            list: [],
            list1: [],
        };
    },
    created() {
        this.getOrderListByFinish(0);
    },
    methods: {
        getOrderListByFinish(x) {
            console.log(x);
            let url = "order/list/" + x;
            this.$axios
                .get(url)
                .then((res) => {
                    console.log(res);
                    let arr = res.data;
                    this.list = [];
                    this.list1 = [];
                    if (arr.length == 0) return;
                    arr.forEach((item, index) => {
                        console.log(item, index);
                        console.log(!this.isTrue);
                        let data = {
                            id: item.id,
                            pictrue_url: item.images[0],
                            title: item.secondhand.keyword,
                            description: item.secondhand.description,
                            price: item.secondhand.price,
                        };
                        if (this.isTrue) {
                            this.list.push(data);
                        } else {
                            this.list1.push(data);
                        }
                    });
                    console.log(this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onClick(name, title) {
            if (title == "未完成订单") {
                this.isTrue = true;
                this.getOrderListByFinish(0);
            }
            if (title == "已完成订单") {
                this.isTrue = false;
                this.getOrderListByFinish(1);
            }
        },
    },
};
</script>

<style scoped>
/* #order-list {
    padding: 0 20px;
} */
</style>