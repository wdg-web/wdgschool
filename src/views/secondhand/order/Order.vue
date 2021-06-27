<template>
    <div id="order">
        <!-- 标题和导航 -->
        <van-nav-bar
            safe-area-inset-top
            title="详情信息"
            fixed
            placeholder
            @click-left="onClickLeft"
            class="titles"
        >
            <template #left>
                <van-icon name="arrow-left" size="18" color="#00ac2c" />
                <span style="font-size: 18px; color: #00ac2c">返回</span>
            </template>
        </van-nav-bar>
        <div class="order-div">
            <van-address-list
                v-model="chosenAddressId"
                add-button-text="发起订单"
                :list="list"
                default-tag-text="默认"
                @add="startOrder"
                @edit="onEdit"
                id="van-address"
            />
            <!-- 当地址为空时 -->
            <van-button
                color="#1da93b"
                plain
                v-show="showbtn"
                @click="goSelectAddress"
                style="display: block; margin: 0 auto; margin-top: -10px"
                >点击添加地址</van-button
            >
        </div>
        <!-- 物品信息 -->
        <!-- <cart-list-item :item="itemInfo" class="order-div van-hairline--top" /> -->
        <order-item
            :itemGoods="itemGoods"
            v-if="Object.keys(itemGoods).length != 0"
        />

        <ul class="order-ul">
            <li>商品价格</li>
            <li>
                ￥<span>{{ itemGoods.price }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import CartListItem from "../../cart/childComps/CartListItem";
import OrderItem from "./childComps/OrderItem";
import { AddressList, NavBar, Icon, Button } from "vant";

import bgImage1 from "../../../assets/img/secondhand/shuji.jpeg";

export default {
    name: "Order",
    components: {
        CartListItem,
        OrderItem,
        [AddressList.name]: AddressList,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Button.name]: Button,
    },
    data() {
        return {
            // choseId: "1",
            list: [],
            itemInfo: {
                image: bgImage1,
                title: "电脑知识书本",
                desc:
                    "我现有—本电脑知识讲义，想低价售出，有意者可拍，或者联系我",
                price: "8",
                count: "1",
                id: "1",
            },
            itemGoods: {},
            showbtn: false,
            orderFrom: false,
            // 选择地址的id
            chosenAddressId: "28",
            isSelectAddress: true,
            // 从购物车至订单页
            toOrderUrl: "",
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log(from.path);
            vm.toOrderUrl = from.path;
            if (vm.toOrderUrl == "/cart") {
                vm.itemGoods = vm.$route.query.itemGoods;
            }
        });
    },
    created() {
        console.log(this.toOrderUrl);
        if (this.toOrderUrl != "/cart") {
            // this.itemGoods = localStorage.getItem("itemGoods");
            let pictrue_url = localStorage.getItem("pictrue_url");
            let title = localStorage.getItem("title");
            let description = localStorage.getItem("description");
            let price = localStorage.getItem("price");
            let telphone = localStorage.getItem("telphone");
            let secondhand_id = localStorage.getItem("secondhand_id");
            let seller_id = localStorage.getItem("seller_id");
            this.orderFrom = localStorage.getItem("orderFrom");
            let itemGoods = {
                pictrue_url: pictrue_url,
                title: title,
                description: description,
                price: price,
                telphone: telphone,
                secondhand_id: secondhand_id,
                seller_id: seller_id,
            };
            this.itemGoods = itemGoods;
            console.log(this.itemGoods);
        }

        this.FromAddress();
        this.getAddressList();

        // 解除缓存
        localStorage.removeItem("fromOrder");
    },
    // mounted() {
    //     console.log("mounted");
    // },
    methods: {
        FromAddress() {
            console.log("点击了立即购买");

            this.chosenAddressId = this.$route.query.chosenAddressId;
            this.isSelectAddress = this.$route.query.isSelectAddress;

            if (this.$route.query.isSelectAddress) {
                this.chosenAddressId = this.$route.query.chosenAddressId + "";
                this.isSelectAddress = this.$route.query.isSelectAddress;
                console.log(this.chosenAddressId);
                console.log(this.isSelectAddress);
                if (this.isSelectAddress) {
                    this.getAddressList();
                }
            }
        },
        getAddressList() {
            this.$axios
                .get("/users/getAddress")
                .then((res) => {
                    console.log(res.data);
                    let arr = res.data;
                    if (arr.length == 0) {
                        this.showbtn = true;
                    }
                    console.log(this.isSelectAddress);
                    if (this.isSelectAddress) {
                        this.list = [];
                        arr.forEach((item) => {
                            console.log(item.id);
                            console.log(this.chosenAddressId);
                            console.log(item.id == this.chosenAddressId);
                            if (item.id == this.chosenAddressId) {
                                this.chosenAddressId = item.id + "";
                                item.id = item.id + "";
                                console.log(item);
                                console.log(this.list);
                                console.log("来到了核对地址id");
                                if (item.isDefault == 1) {
                                    item.isDefault = true;
                                }
                                this.list.push(item);
                            }
                        });
                        console.log(this.list);
                        return;
                    }

                    arr.forEach((item) => {
                        console.log(item);
                        if (item.isDefault == 1) {
                            item.isDefault = true;
                            this.chosenAddressId = item.id + "";
                            item.id = item.id + "";
                            this.list.push(item);
                        }
                    });
                    if (this.list.length == 0) {
                        this.chosenAddressId = arr[0].id + "";
                        arr[0].id = arr[0].id + "";
                        this.list.push(arr[0]);
                    }
                    console.log(this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onClickLeft() {
            this.$router.go(-1);
            // if (this.orderFrom) {
            //     this.$router.push("/goodsitem");
            // } else {
            //     this.$router.push("/cart");
            // }
        },
        startOrder() {
            console.log("点击了提交订单");
            console.log(this.itemGoods);
            this.list[0].id = parseInt(this.list[0].id);
            console.log(this.list);
            console.log(this.list[0].id);
            let orderData = {
                address_id: this.list[0].id,
                seller_id: this.itemGoods.seller_id,
                secondhand_id: this.itemGoods.secondhand_id,
            };
            console.log(orderData);
            this.$axios
                .post("/order", orderData)
                .then(async (res) => {
                    console.log(res);
                    if (res.data.length) {
                        let orderId = res.data[0].id;
                        this.$router.push({
                            path: "/orderDetail",
                            query: {
                                orderId: orderId,
                            },
                        });
                    } else {
                        this.$toast({
                            message: res.data.message,
                            position: "top",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onEdit(item, index) {
            console.log("前往选择地址" + index);
            this.$router.push({
                path: "/address",
                query: {
                    showbtn: true,
                },
            });
        },
        goSelectAddress() {
            localStorage.setItem("showbtn", true);
            localStorage.setItem("fromOrder", "fromOrder");
            this.$router.push({
                path: "/address",
                // query: {
                //     showbtn: true,
                //     type: "fromOrder",
                // },
            });
        },
    },
};
</script>

<style scoped>
#order {
    padding: 0 15px;
    height: 100vh;
    background-color: #f1f2f5;
}
.titles {
    height: 50px;
}
.h3 {
    padding: 10px 0;
    font-size: 16px;
    text-align: center;
}
.order-div {
    background-color: #fff;
}
.van-address-list__bottom .van-button--danger {
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
#van-address.van-radio__icon--checked .van-icon {
    background-color: #1da93b;
    border-color: #1da93b;
}
.order-ul {
    display: flex;
    font-size: 16px;
    background-color: #fff;
}
.order-ul li {
    padding: 50px 10px 10px;
}
.order-ul li:first-child {
    flex: 5;
}
.order-ul li:last-child {
    flex: 1;
    font-size: 12px;
    color: red;
}
.order-ul li:last-child span {
    font-size: 18px;
    color: red;
}
</style>