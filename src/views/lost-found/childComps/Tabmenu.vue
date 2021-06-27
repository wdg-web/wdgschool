<template>
    <div id="tabmenu">
        <van-tabs
            v-model="active"
            sticky
            :offset-top="tabOffsetTop"
            animated
            swipeable
            color="#00ac2c"
            title-active-color="#00ac2c"
        >
            <van-tab
                v-for="(item, index) in tabsItems"
                :title="item"
                :key="index"
            >
                <van-pull-refresh
                    v-model="refreshing"
                    @refresh="onRefresh"
                    success-text="刷新成功"
                >
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        loading-text="正在加载中"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <lost-detail
                            v-if="Object.keys(list).length != 0"
                            :lostFounds="list[index]"
                        ></lost-detail>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Sticky, Cell, CellGroup, Tabs, Tab, List, PullRefresh } from "vant";

import { timeCycle } from "../../../common/utils";

import LostDetail from "./LostDetail";

export default {
    name: "Tabmenu",
    components: {
        LostDetail,
        [Sticky.name]: Sticky,
        [Tabs.name]: Tabs,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Tab.name]: Tab,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
    },
    data() {
        return {
            active: 0,
            isActive: true,
            tabsItems: [
                "日常用品",
                "学习用品",
                "体育用品",
                "电子产品",
                "箱包",
                "其他",
            ],
            list: [[], [], [], [], [], []],
            list1: [],
            arr: [],
            offset: 0,
            loading: false,
            finished: false,
            refreshing: false,
            tabOffsetTop: 0,
            type: "0",
            typevalue: "寻找失主",
        };
    },
    created() {
        this.onLoad("3");
        this.$root.Bus.$on("getItemList", (value) => {
            this.onLoad(666);
            console.log("id=" + value);
        });
        // 上传启事触发
        this.$root.Bus.$on("getItemListSend", (value) => {
            this.onLoad("666");
            console.log(value);
        });
        // 选择类别
        this.$root.Bus.$on("getDataByClassify", (value) => {
            console.log(value);
            this.type = value;
            if (value == "0") {
                this.typevalue = "寻找失主";
            }
            if (value == "1") {
                this.typevalue = "寻找物品";
            }
            this.onLoad(value);
        });
        // 搜索关键字
        this.$root.Bus.$on("getDataByKeyword", (value) => {
            console.log(value);
            this.getDataByKeyword(value);
        });
        // 监听搜索框的高度，使之停靠对齐
        this.$root.Bus.$on("gettabmenuHeight", (value) => {
            console.log(value);
            this.tabOffsetTop = value;
            console.log(this.tabOffsetTop);
        });
    },
    mounted() {
        console.log();
        // this.list1 = this.list;
        this.$forceUpdate();
    },
    methods: {
        getDataByKeyword(value) {
            console.log(value);
            let that = this;
            this.list = [[], [], [], [], [], []];
            this.isActive = true;
            // let typeValue;
            // if (this.type == "0") {
            //     typeValue = "寻找失主";
            // }
            // if (this.type == "1") {
            //     typeValue = "寻找失主";
            // }
            console.log(this.typevalue);

            this.$axios
                .get("/lostFound/search", {
                    params: {
                        keyword: value,
                        type: this.typevalue,
                    },
                })
                .then((response) => {
                    that.arr = response.data;
                    console.log(that.arr);
                    console.log(that.arr.length == 0);

                    that.arr.forEach((item, index) => {
                        console.log(item.createTime);
                        item.createTime = timeCycle(item.createTime);
                        console.log(item.createTime);

                        let classify = item.classify;
                        console.log(item.classify);

                        switch (classify) {
                            case "日常用品":
                                if (this.isActive) {
                                    this.active = 0;
                                    this.isActive = false;
                                }
                                if (!that.list[0].includes(item)) {
                                    that.list[0].unshift(item);
                                    that.list[0] = this.unique(that.list[0]);
                                }
                                break;
                            case "学习用品":
                                if (this.isActive) {
                                    this.active = 1;
                                    this.isActive = false;
                                }
                                if (!that.list[1].includes(item)) {
                                    that.list[1].unshift(item);
                                    that.list[1] = this.unique(that.list[1]);
                                }
                                break;
                            case "体育用品":
                                if (this.isActive) {
                                    this.active = 2;
                                    this.isActive = false;
                                }
                                if (!that.list[2].includes(item)) {
                                    that.list[2].unshift(item);
                                    that.list[2] = this.unique(that.list[2]);
                                }
                                break;
                            case "电子产品":
                                if (this.isActive) {
                                    this.active = 3;
                                    this.isActive = false;
                                }
                                // if (!that.list[3].includes(item)) {
                                //     that.list[3].unshift(item);
                                // }
                                if (
                                    JSON.stringify(that.list[3]).indexOf(
                                        JSON.stringify(item)
                                    ) == -1
                                ) {
                                    that.list[3].unshift(item);
                                    that.list[3] = this.unique(that.list[3]);
                                }
                                break;
                            case "箱包":
                                if (this.isActive) {
                                    this.active = 4;
                                    this.isActive = false;
                                }
                                if (!that.list[4].includes(item)) {
                                    that.list[4].unshift(item);
                                    that.list[4] = this.unique(that.list[4]);
                                }
                                break;
                            case "其他":
                                if (this.isActive) {
                                    this.active = 5;
                                    this.isActive = false;
                                }
                                if (!that.list[5].includes(item)) {
                                    that.list[5].unshift(item);
                                    that.list[5] = this.unique(that.list[5]);
                                }
                                break;
                            default:
                                console.log(无此分类);
                        }
                    });
                    console.log(that.list);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        unique(arr) {
            const res = new Map();
            return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
        },
        async onLoad(x = "3") {
            setTimeout(async () => {
                if (this.refreshing) {
                    this.refreshing = false;
                }
                let size = 2;
                let type = "寻找失主";
                if (x == "0") {
                    this.list = [[], [], [], [], [], []];
                    this.offset = 0;
                    size = 9999;
                    type = "寻找失主";
                }
                if (x == "1") {
                    this.list = [[], [], [], [], [], []];
                    this.offset = 0;
                    size = 9999;
                    type = "寻找物品";
                }
                if (x == "666") {
                    this.list = [[], [], [], [], [], []];
                    this.offset = 0;
                    size = 9999;
                }
                // 发送网络请求
                let that = this;
                console.log(that.offset);
                console.log(that.list);
                await this.$axios
                    .get("/lostFound", {
                        params: {
                            offset: that.offset,
                            size: size,
                            type: type,
                        },
                    })
                    .then((response) => {
                        that.arr = response.data;
                        console.log(that.arr);
                        console.log(that.arr.length == 0);
                        that.loading = false;
                        // for(let i =0; i < that.arr.length; i++){
                        //   that.list.push(that.arr[i]);
                        //   console.log(that.list);
                        //   // that.list.unshift(arr[i]);
                        // 1};
                        that.arr.forEach((item, index) => {
                            console.log(item.createTime);
                            item.createTime = timeCycle(item.createTime);
                            console.log(item.createTime);

                            let classify = item.classify;
                            console.log(item.classify);
                            // tabsItems: ['日常用品', '学习用品', '体育用品', '电子产品', '箱包', '其他'],

                            switch (classify) {
                                case "日常用品":
                                    if (!that.list[0].includes(item)) {
                                        that.list[0].unshift(item);
                                    }
                                    break;
                                case "学习用品":
                                    if (!that.list[1].includes(item)) {
                                        that.list[1].unshift(item);
                                    }
                                    break;
                                case "体育用品":
                                    if (!that.list[2].includes(item)) {
                                        that.list[2].unshift(item);
                                    }
                                    break;
                                case "电子产品":
                                    if (!that.list[3].includes(item)) {
                                        that.list[3].unshift(item);
                                    }
                                    break;
                                case "箱包":
                                    if (!that.list[4].includes(item)) {
                                        that.list[4].unshift(item);
                                    }
                                    break;
                                case "其他":
                                    if (!that.list[5].includes(item)) {
                                        that.list[5].unshift(item);
                                    }
                                    break;

                                default:
                                    console.log(无此分类);
                            }
                        });
                        console.log(that.list);
                        that.offset = that.offset + 2;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                // that.loading = false;
                console.log(that.arr);
                if (that.arr.length == 0) {
                    that.finished = true;
                }
            }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
    },
    beforeDestroy() {
        this.$root.Bus.$off("getItemList");
    },
};
</script>

<style scoped>
#tabmenu {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
}
.nav li {
    list-style: none;
    display: inline-block;
    border: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    width: 120px;
    text-align: center;
}
</style>