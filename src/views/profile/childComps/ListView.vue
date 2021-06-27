<template>
    <div id="list">
        <van-cell value="被下单消息" is-link @click="goMessage">
            <template #title>
                <van-icon
                    v-if="messageCount > 0"
                    name="bell"
                    color="#1989fa"
                    :badge="messageCount"
                    class="list-icon"
                />
                <van-icon
                    v-else
                    name="bell"
                    color="#1989fa"
                    class="list-icon"
                />
                <span class="custom-title">消息</span>
            </template>
        </van-cell>
        <van-cell
            title="我的订单"
            :icon="orderIcon"
            id="icon-size"
            @click="goOrderDetail"
        />
        <!-- 发布 -->
        <van-collapse v-model="activeNames" accordion border>
            <van-collapse-item name="1">
                <template #title>
                    <div>
                        <van-icon :name="addIcon" class="list-icon" />我的发布
                    </div>
                </template>
                <ul class="add-ul">
                    <li @click="goLostFound">
                        <van-icon :name="lostIcon" class="list-icon" />启事动态
                    </li>
                    <li @click="goSecondhand" class="van-hairline--top">
                        <van-icon
                            :name="secondHandIcon"
                            class="list-icon"
                        />二手物品交易
                    </li>
                </ul>
            </van-collapse-item>
        </van-collapse>
        <!-- 我的地址 -->
        <p style="height: 10px; background-color: #f2f2f2"></p>
        <van-cell
            title="我的地址"
            :icon="adressIcon"
            id="icon-size"
            @click="goAddress"
        />
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
import { Collapse, CollapseItem, Icon, Cell, CellGroup } from "vant";

// import orderIcon from "assets/img/profile/订单.png";
// import addIcon from "assets/img/profile/发布.png";
// import adressIcon from "assets/img/profile/地址.png";
import orderIcon from "../../../assets/img/profile/001.png";
import addIcon from "../../../assets/img/profile/发布.png";
import adressIcon from "../../../assets/img/profile/地址.png";
import lostIcon from "../../../assets/img/profile/寻物启事.png";
import secondHandIcon from "../../../assets/img/profile/二手交易.png";
export default {
    name: "ListView",
    components: {
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
    },
    props: {
        listData: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            activeNames: ["1"],
            orderIcon: orderIcon,
            addIcon: addIcon,
            adressIcon: adressIcon,
            lostIcon: lostIcon,
            secondHandIcon: secondHandIcon,
            messageCount: 0,
        };
    },
    created() {
        let ishandle = "ishandle";
        this.getOrderListByFinish(ishandle, 0);
    },
    methods: {
        goAddress() {
            console.log("00112233");
            localStorage.setItem("showbtn", false);
            localStorage.setItem("fromOrder", "NofromOrder");
            this.$router.push({
                path: "/address",
            });
        },
        goOrderDetail() {
            console.log("点击了我的订单");
            this.$router.push({
                path: "/orderList",
            });
        },
        goMessage() {
            console.log("点击了我的消息");
            this.$router.push({
                path: "/message",
            });
        },
        goLostFound() {
            console.log("点击了启事动态");
            this.$router.push({
                path: "/rleaseLost",
            });
        },
        goSecondhand() {
            console.log("点击了二手物品交易");
            this.$router.push({
                path: "/rleaseSecond",
            });
        },
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

                    this.$root.Bus.$emit("profile", this.messageCount);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
#list {
    background-color: #fff;
    font-size: 16px;
    color: #333;
}
#icon-size .van-cell /deep/ .van-icon__image {
    margin-right: 8px;
    width: 22px;
    height: 22px;
    font-size: 23px;
    /* -o-object-fit: cover !important; */
    object-fit: cover !important;
}
#icon-size /deep/ .van-cell__left-icon {
    margin-right: 10px;
}
#icon-size /deep/ .van-cell__left-icon .van-icon__image {
    font-size: 23px;
}
/* ::v-deep #icon-size > .van-cell > .van-icon > .van-icon__image {
    margin-right: 8px;
    width: 22px;
    height: 22px;
    font-size: 23px;
}
::v-deep #icon-size .van-cell__left-icon {
    margin-right: 10px;
}
::v-deep #icon-size .van-cell__left-icon .van-icon__image {
    font-size: 23px;
} */
.list-icon {
    vertical-align: middle;
    margin-right: 10px;
    font-size: 23px;
}
.add-ul {
    font-size: 15px;
}
.add-ul > li {
    padding-left: 20px;
}
.add-ul li:first-child {
    margin-bottom: 5px;
}
.add-ul li:last-child {
    margin-top: 6px;
}
</style>
<style>
/* #icon-size > .van-cell > .van-icon > .van-icon__image {
    margin-right: 8px;
    width: 22px;
    height: 22px;
    font-size: 23px;
}
#icon-size .van-cell__left-icon {
    margin-right: 10px;
}
#icon-size .van-cell__left-icon .van-icon__image {
    font-size: 23px;
} */
</style>
