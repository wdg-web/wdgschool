<template>
    <div id="address">
        <goback :title="title" />
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            :add-button-text="addBtnText"
            @add="onAdd"
            @edit="onEdit"
            id="van-address"
        />
        <van-button
            color="#1da93b"
            plain
            v-show="showbtn"
            @click="selectAddress"
            style="display: block; margin: 0 auto; margin-top: -10px"
            >{{ addressType }}</van-button
        >
    </div>
</template>

<script>
import { AddressList, Button } from "vant";

import Goback from "components/common/search/Goback";
export default {
    name: "Address",
    components: {
        [AddressList.name]: AddressList,
        [Button.name]: Button,
        Goback,
    },
    data() {
        return {
            title: "用户地址",
            chosenAddressId: "1",
            list: [
                {
                    id: "1",
                    name: "张三",
                    tel: "13000000000",
                    address:
                        "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
                    isDefault: true,
                },
                {
                    id: "8",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
            ],
            addBtnText: "添加地址",
            addressType: "选择地址",
            showbtn: false,
            fromType: "",
            toAddressUrl: "",
        };
    },
    beforeRouteEnter(to, from, next) {
        // ...
        next((vm) => {
            console.log(from.path);
            vm.toAddressUrl = from.path;
            if (vm.toAddressUrl == "/order") {
                vm.showbtn = true;
            }
            if (vm.toAddressUrl == "/profile") {
                vm.showbtn = false;
            }
        });
    },
    created() {
        // 从订单处跳转的
        // this.showbtn = localStorage.getItem("showbtn");
        // console.log(this.showbtn);
        this.getAddressList();

        this.$root.Bus.$on("saveAddress", (value) => {
            console.log(value);
            this.getAddressList();
        });
    },
    methods: {
        getAddressList() {
            this.$axios
                .get("/users/getAddress")
                .then((res) => {
                    console.log(res.data);
                    let arr = res.data;
                    // this.fromType = localStorage.getItem("fromOrder");
                    console.log(this.fromType);
                    console.log(this.showbtn);
                    // if (this.fromType == "fromOrder") {
                    //     if (arr.length == 0) {
                    //         console.log("隐藏选择地址按钮");
                    //         this.showbtn = false;
                    //     }
                    //     console.log(arr.length != 0);
                    //     if (arr.length != 0) {
                    //         console.log("显示选择地址按钮");
                    //         this.showbtn = true;
                    //     }
                    // } else {
                    //     this.showbtn = false;
                    // }
                    console.log(this.toAddressUrl);
                    if (this.toAddressUrl == "/order") {
                        if (arr.length == 0) {
                            console.log("隐藏选择地址按钮");
                            this.showbtn = false;
                        }
                        console.log(arr.length != 0);
                        if (arr.length != 0) {
                            console.log("显示选择地址按钮");
                            this.showbtn = true;
                        }
                    } else {
                        console.log("从" + this.toAddressUrl + "进入");
                        this.showbtn = false;
                    }
                    arr.forEach((item) => {
                        console.log(item);
                        item.id = item.id + "";
                        if (item.isDefault == 1) {
                            this.chosenAddressId = item.id + "";
                            item.isDefault = true;
                        } else {
                            item.isDefault = false;
                        }
                    });
                    this.list = arr;
                    console.log(this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        selectAddress() {
            console.log(this.chosenAddressId);
            this.$router.push({
                path: "/order",
                query: {
                    chosenAddressId: this.chosenAddressId,
                    isSelectAddress: true,
                },
            });
        },
        onAdd() {
            this.$router.push("/addressEdit");
        },
        onEdit(item, index) {
            console.log(this.chosenAddressId);
            console.log(item);

            this.$router.push({
                path: "/addressEdit",
                query: {
                    item: item,
                },
            });
        },
    },
};
</script>

<style scoped>
#address {
    padding: 0 15px 55.2px;
    background-color: #f1f2f5;
}
::v-deep .van-address-list__bottom .van-button--danger {
    color: #fff;
    background-color: #1da93b;
    border: 1px solid #1da93b;
}
#van-address {
    padding: 10px 10px 35px;
    margin: 15px 0;
}

::v-deep #van-address .van-radio__icon--checked .van-icon-success {
    background-color: #1da93b !important;
    border-color: #1da93b !important;
}
</style>