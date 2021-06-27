<template>
    <div id="lostDetail">
        <van-skeleton title avatar :row="3" :loading="loading">
            <ul class="bgc">
                <li
                    class="van-hairline--bottom"
                    v-for="(user, i) in lostFounds"
                    :key="i"
                >
                    <!-- v-if="Object.keys(user).length != 0" -->
                    <lost-item :lostFounditem="user"></lost-item>
                </li>
            </ul>
        </van-skeleton>
    </div>
</template>

<script>
import { Skeleton } from "vant";
import LostItem from "components/content/lostFound/LostItem";

export default {
    name: "LostDetail",
    components: {
        LostItem,
        [Skeleton.name]: Skeleton,
    },
    props: {
        lostFounds: {
            type: Array,
        },
    },
    data() {
        return {
            loading: true,
        };
    },
    mounted() {
        this.loading = false;
        console.log(this.lostFounds);
    },
    methods: {
        fatherMethod() {
            console.log("父");
            // this.$emit('onLoad');
            this.$parent.onLoad();
        },
    },
};
</script>

<style scoped>
.lostDetail {
    width: 100%;
}
.bgc li {
    margin-top: 20px;
    border-radius: 16px;
    overflow: hidden;
    background-color: #fff;
}
.bgc li:first-child {
    margin-top: 0px;
    border-radius: 0px 0px 16px 16px;
    border-top: 1px solid #e6e6e6;
    background-color: #fff;
}
</style>