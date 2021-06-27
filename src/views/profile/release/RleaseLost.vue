<template>
    <div id="message">
        <goback :title="title" />
        <van-tabs @click="onClick" color="#00ac2c" sticky offset-top="50.7812">
            <van-tab title="寻找失主">
                <ul>
                    <li
                        v-for="(item, index) in list"
                        :key="index"
                        class="bottom"
                    >
                        <lost-item :item="item" />
                    </li>
                </ul>
            </van-tab>
            <van-tab title="寻找物品">
                <ul>
                    <li
                        v-for="(item, index) in list1"
                        :key="index"
                        class="bottom"
                    >
                        <lost-item :item="item" />
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import LostItem from "./childComps/LostItem";
import Goback from "components/common/search/Goback";
import { timeCycle } from "common/utils";

import { Tab, Tabs, Icon } from "vant";

export default {
    name: "RleaseLost",
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Icon.name]: Icon,
        Goback,
        LostItem,
    },
    data() {
        return {
            title: "启事发布记录",
            isTrue: 0,
            messageCount: 0,
            list: [],
            list1: [],
        };
    },
    created() {
        this.getList();
        // 接单触发
        this.$root.Bus.$on("deleteLostItem", (value) => {
            console.log(value);
            this.getList();
        });
    },
    methods: {
        getList() {
            this.$axios
                .get("/lostFound/getlist/userid")
                .then((res) => {
                    console.log(res);
                    let arr = res.data;
                    this.list = [];
                    if (arr.length == 0) return;
                    arr.forEach((item, index) => {
                        console.log(item, index);
                        item.createTime = timeCycle(item.createTime);
                        item.updateTime = timeCycle(item.updateTime);
                        let data = {
                            id: item.id,
                            pictrue_url: item.images[0],
                            title: item.classify,
                            description: item.content,
                            price: item.createTime,
                        };
                        if (item.type == "寻找失主") {
                            this.list.push(data);
                        }
                        if (item.type == "寻找物品") {
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
            console.log(title);
            // if (title == "寻找物品") {
            //     this.isTrue = 0;
            //     let ishandle = "ishandle";
            //     this.getOrderListByFinish(ishandle, 0);
            // }
            // if (title == "寻找物品") {
            //     this.isTrue = 1;
            //     let ishandle = "ishandle";
            //     this.getOrderListByFinish(ishandle, 1);
            // }
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