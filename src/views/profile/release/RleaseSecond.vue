<template>
    <div id="message">
        <goback :title="title" />
        <ul>
            <li v-for="(item, index) in list" :key="index" class="bottom">
                <second-item :item="item" />
            </li>
        </ul>
    </div>
</template>

<script>
import SecondItem from "./childComps/SecondItem";
import Goback from "components/common/search/Goback";

export default {
    name: "RleaseSecond",
    components: {
        Goback,
        SecondItem,
    },
    data() {
        return {
            title: "二手发布记录",
            list: [],
        };
    },
    created() {
        this.getList();
        // 点击删除之后触发
        this.$root.Bus.$on("deleteSecondItem", (res) => {
            this.getList();
            console.log(res);
        });
    },
    methods: {
        getList() {
            // let url = "/secondhand/getlist";

            this.$axios
                .get("/secondhand/getlist/byid")
                .then((res) => {
                    console.log(res);
                    let arr = res.data;
                    this.list = [];
                    if (arr.length == 0) return;
                    arr.forEach((item, index) => {
                        console.log(item, index);
                        let data = {
                            id: item.id,
                            pictrue_url: item.images[0],
                            title: item.keyword,
                            description: item.description,
                            price: item.price,
                        };
                        this.list.push(data);
                    });
                    console.log(this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
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