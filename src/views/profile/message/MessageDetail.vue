<template>
    <div id="order">
        <!-- 标题和导航 -->
        <van-nav-bar
            safe-area-inset-top
            title="订单详情"
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
        <div style="margin-top: 20px; background-color: #fff">
            <van-steps
                :active="active"
                active-color="#00ac2c"
                direction="vertical"
            >
                <van-step>
                    <h4>买家下单</h4>
                    <p>{{ allInfo.createAt }}</p>
                </van-step>
                <van-step>
                    <h4>商家接单</h4>
                    <p v-if="allInfo.ishandle == 1">{{ allInfo.updateAt }}</p>
                </van-step>
                <van-step>
                    <h4>交易完成</h4>
                    <p v-if="allInfo.isfinish == 1">{{ allInfo.updateAt }}</p>
                </van-step>
            </van-steps>
            <div v-show="isShow" style="margin: 20px 0">
                <van-button
                    color="#1da93b"
                    plain
                    @click="OrderReceive"
                    style="display: block; margin: 0 auto; margin-top: -10px"
                    >接单</van-button
                >
            </div>
        </div>
        <div class="order-div">
            <p style="color: #323233">
                {{ list.username }}&nbsp;&nbsp;{{ list.tel }}
            </p>
            <p>{{ list.user_address }}</p>
        </div>
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
import OrderItem from "../../secondhand/order/childComps/OrderItem.vue";
import { timeCycle } from "common/utils";
import { NavBar, Icon, Button, Step, Steps } from "vant";

export default {
    name: "MessageDetail",
    components: {
        OrderItem,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Button.name]: Button,
        [Step.name]: Step,
        [Steps.name]: Steps,
    },
    data() {
        return {
            // 物流状态
            active: 0,

            allInfo: {},
            list: {},
            itemGoods: {},
            orderFrom: false,
            // 选择地址的id
            chosenAddressId: "28",
            isSelectAddress: true,
            // 从购物车至订单页
            toOrderUrl: "",
            isShow: true,
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

        this.FromAddress();

        let orderId = this.$route.query.orderId;

        this.getOrderById(orderId);

        // 解除缓存
        localStorage.removeItem("fromOrder");
    },
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
        onClickLeft() {
            if (this.toOrderUrl == "/order") {
                this.$router.push("/secondhand");
            } else {
                this.$router.go(-1);
            }
        },
        getOrderById(Id) {
            console.log(Id);
            let url = "order/single/" + Id;
            this.$axios
                .get(url)
                .then((res) => {
                    console.log(res);
                    res.data[0].createAt = timeCycle(res.data[0].createAt);
                    res.data[0].updateAt = timeCycle(res.data[0].updateAt);
                    this.allInfo = res.data[0];
                    if (this.allInfo.isfinish == 0) {
                        this.active = this.allInfo.ishandle;
                    }
                    if (this.allInfo.isfinish == 1) {
                        this.active = 2;
                    }
                    if (this.active > 0) {
                        this.isShow = false;
                    }
                    this.list = res.data[0].buyerInfo;
                    console.log(this.allInfo);
                    console.log(this.list);
                    let data = {
                        pictrue_url: res.data[0].images[0],
                        title: res.data[0].secondhand.keyword,
                        description: res.data[0].secondhand.description,
                        price: res.data[0].secondhand.price,
                    };
                    this.itemGoods = data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        OrderReceive() {
            // 买家（商家）修改状态
            console.log(this.allInfo.id);
            let url = "/order/" + this.allInfo.id;
            this.$axios
                .patch(url, {
                    type: "ishandle",
                    typeValue: 1,
                })
                .then((res) => {
                    console.log(res.data);
                    this.$toast({
                        message: res.data.message,
                        position: "center",
                    });
                    this.getOrderById(this.allInfo.id);
                    // this.active = 1;
                    // this.isShow = false;
                    this.$root.Bus.$emit("OrderReceive", "接单");
                })
                .catch((error) => {
                    console.log(error);
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
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #fff;
}
.order-div p {
    font-size: 16px;
    padding: 10px;
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