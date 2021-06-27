<template>
    <div id="go">
        <van-nav-bar
            safe-area-inset-top
            :title="title"
            fixed
            placeholder
            @click-left="onClickLeft"
            id="the-icon"
        >
            <template #left>
                <van-icon name="arrow-left" class="icon-size" />
                <span class="icon-size">返回</span>
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
import { NavBar, Icon } from "vant";

export default {
    name: "Goback",
    props: {
        title: {
            type: String,
            default() {
                return "详情";
            },
        },
    },
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
    },
    data() {
        return {};
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
    },
};
</script>

<style scope>
#the-icon .icon-size {
    font-size: 18px;
    color: #00ac2c;
}
</style>