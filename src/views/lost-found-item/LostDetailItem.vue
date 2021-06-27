<template>
    <div id="detailitem">
        <van-nav-bar
            safe-area-inset-top
            title="详情"
            fixed
            placeholder
            @click-left="onClickLeft"
        >
            <template #left>
                <van-icon name="arrow-left" class="icon-size" />
                <span class="icon-size">返回</span>
            </template>
        </van-nav-bar>
        <lost-item
            v-if="Object.keys(list).length != 0"
            :lostFounditem="list"
        ></lost-item>
        <!-- 评论 -->
    </div>
</template>

<script>
import { NavBar, Icon } from "vant";
import LostItem from "components/content/lostFound/LostItem";

import { timeCycle } from "common/utils";

export default {
    name: "LostDetailItem",
    components: {
        LostItem,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
    },
    data() {
        return {
            list: {},
        };
    },
    created() {
        console.log(this.$route.query.id);
        console.log(this.$route.query.isShowItem);
        this.onLoad();
        this.$root.Bus.$on("getcommentNew", (value) => {
            // this.onLoad();
            console.log("id=" + value);
            this.onLoad(value);
        });
    },
    mounted() {
        console.log(this.list);
    },
    methods: {
        // NavBarbufen
        onClickLeft() {
            this.$router.go(-1);
        },

        async onLoad(a = this.$route.query.id) {
            // 发送网络请求
            let that = this;
            let lostfound1 = "/lostFound/" + a;
            console.log(that.list);
            await this.$axios
                .get(lostfound1)
                .then(function (response) {
                    console.log(response.data);
                    that.list = response.data;
                    that.list.createTime = timeCycle(that.list.createTime);
                    console.log(that.list);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped>
#detailitem {
    width: 100vw;
    height: 100vh;
    padding: 20px;
}
.van-nav-bar--fixed {
    background-color: #3d2626 !important;
}
.icon-size {
    font-size: 18px;
    color: #00ac2c;
}
</style>