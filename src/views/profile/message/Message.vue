<template>
    <div id="message">
        <goback :title="title" />
        <van-tabs @click="onClick" color="#00ac2c" sticky offset-top="50.7812">
            <van-tab>
                <template #title>
                    未接单&nbsp;
                    <span class="Icon">
                        <van-icon
                            v-if="messageCount > 0"
                            class="IconStyle"
                            :badge="messageCount"
                            size="28"
                        />
                    </span>
                    &nbsp;&nbsp;
                </template>
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
            <van-tab title="已接单">
                <ul>
                    <li
                        v-for="(item, index) in list1"
                        :key="index"
                        class="bottom"
                    >
                        <list-item :item="item" />
                    </li>
                </ul>
            </van-tab>
            <van-tab title="已完成订单">
                <ul>
                    <li
                        v-for="(item, index) in list2"
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

import { Tab, Tabs, Icon } from "vant";

export default {
    name: "Message",
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Icon.name]: Icon,
        Goback,
        ListItem,
    },
    data() {
        return {
            title: "个人消息",
            isTrue: 0,
            messageCount: 0,
            list: [],
            list1: [],
            list2: [],
        };
    },
    created() {
        let ishandle = "ishandle";
        this.getOrderListByFinish(ishandle, 0);
        // 接单触发
        this.$root.Bus.$on("OrderReceive", (value) => {
            console.log(value);
            this.getOrderListByFinish(ishandle, 0);
        });
    },
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
                    this.list = [];
                    this.list1 = [];
                    this.list2 = [];
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
                        if (this.isTrue == 0) {
                            this.list.push(data);
                        }
                        if (this.isTrue == 1 && item.isfinish == 0) {
                            this.list1.push(data);
                        }
                        if (this.isTrue == 2) {
                            this.list2.push(data);
                        }
                    });
                    if (this.isTrue == 0) {
                        this.messageCount = this.list.length;
                    }
                    console.log(this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onClick(name, title) {
            console.log(title);
            if (title == undefined) {
                this.isTrue = 0;
                let ishandle = "ishandle";
                this.getOrderListByFinish(ishandle, 0);
            }
            if (title == "已接单") {
                this.isTrue = 1;
                let ishandle = "ishandle";
                this.getOrderListByFinish(ishandle, 1);
            }
            if (title == "已完成订单") {
                this.isTrue = 2;
                let isfinish = "isfinish";
                this.getOrderListByFinish(isfinish, 1);
            }
        },
    },
};
</script>

<style scoped>
/* #order-list {
    padding: 0 20px;
} */
.Icon {
    height: 100%;
    position: relative;
}
.IconStyle {
    position: absolute;
    top: 6px;
    left: 0;
}
</style>