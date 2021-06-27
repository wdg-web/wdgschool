<template>
    <div id="goods-tab">
        <van-tabs
            v-model="active"
            sticky
            swipeable
            animated
            :offset-top="searchHeight"
            color="#00ac2c"
            title-active-color="#00ac2c"
        >
            <van-tab>
                <template #title>
                    <van-icon
                        class="IconStyle"
                        name="new-arrival-o"
                        size="28"
                    />&nbsp;{{ newSend }}
                </template>
                <goods :classify="newSend" />
            </van-tab>
            <van-tab>
                <template #title>
                    <van-icon class="IconStyle" name="hot-o" size="27" />&nbsp;
                    {{ freeGoodsValue }}
                </template>
                <goods :classify="freeGoods" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, Icon } from "vant";

import Goods from "./Goods";

export default {
    name: "GoodsTab",
    props: {
        searchHeight: {
            type: Number,
            default() {
                return 0;
            },
        },
    },
    data() {
        return {
            active: 2,
            newSend: "最新发布",
            freeGoodsValue: "0元抢购",
            freeGoods: "0元福利",
        };
    },
    components: {
        Goods,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Icon.name]: Icon,
    },
};
</script>

<style>
#goods-tab {
    margin-top: 12px;
    padding-bottom: 55.2px;
}
.IconStyle {
    vertical-align: middle;
}
</style>