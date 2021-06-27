<template>
    <div class="shop-item">
        <ul @click="startOrder">
            <li>
                <van-swipe-cell :before-close="beforeClose">
                    <div class="shop-item">
                        <div class="item-img">
                            <img :src="item.pictrue_url" alt="商品图片" />
                        </div>
                        <div class="item-info">
                            <div class="item-title">{{ item.title }}</div>
                            <div class="desc van-multi-ellipsis--l2">
                                {{ item.description }}
                            </div>
                            <div class="info-bottom">
                                <div class="item-price left">
                                    ¥{{ item.price }}
                                </div>
                                <div class="item-count right">x 1</div>
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <van-button
                            square
                            text="删除"
                            type="danger"
                            class="delete-button"
                        />
                    </template>
                </van-swipe-cell>
            </li>
        </ul>
    </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { SwipeCell, Button, Dialog } from "vant";

import bgImage1 from "assets/img/secondhand/shuji.jpeg";

export default {
    name: "CartListItem",
    props: {
        item: Object,
    },
    data() {
        return {
            itemInfo: {
                image: bgImage1,
                title: "电脑知识书本",
                desc:
                    "我现有—本电脑知识讲义，想低价售出，有意者可拍，或者联系我",
                price: "8",
                count: "1",
            },
        };
    },
    components: {
        CheckButton,
        [SwipeCell.name]: SwipeCell,
        [Button.name]: Button,
        [Dialog.Component.name]: Dialog.Component,
    },
    created() {
        // 点击加入购物车之后触发
        this.$root.Bus.$on("addToCart", (res) => {
            // this.getListBytime();
            console.log("0000");
            console.log(res);
        });
        console.log(this.item);
    },
    methods: {
        checkedChange() {
            this.itemInfo.checked = !this.itemInfo.checked;
        },
        beforeClose({ position, instance }) {
            switch (position) {
                case "left":
                    instance.close();
                    break;
                case "cell":
                    instance.close();
                    break;
                case "outside":
                    instance.close();
                    break;
                case "right":
                    console.log(Dialog.confirm());
                    Dialog.confirm({
                        message: "确定删除吗？",
                    })
                        .then(() => {
                            console.log(this.item);
                            let url = "/addcart/" + this.item.id;
                            this.$axios
                                .delete(url)
                                .then((res) => {
                                    console.log(res);
                                    this.$root.Bus.$emit(
                                        "deleteCartItem",
                                        "已成功从购物车移除"
                                    );
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            instance.close();
                        })
                        .catch(() => {
                            console.log("点击了取消");
                        });
                    break;
            }
        },
        startOrder() {
            console.log("点击了购买，发起订单");
            let itemGoods = {
                pictrue_url: this.item.pictrue_url,
                title: this.item.title,
                description: this.item.description,
                price: this.item.price,
                seller_id: this.item.seller_id,
                secondhand_id: this.item.secondhand_id,
            };
            console.log(itemGoods);
            this.$router.push({
                path: "/order",
                query: { itemGoods: itemGoods },
            });

            // localStorage.setItem("itemGoods", itemGoods);
            // localStorage.setItem("pictrue_url", this.goodsItem.images[0]);
            // localStorage.setItem("title", this.goodsItem.title);
            // localStorage.setItem("description", this.item.description);
            // localStorage.setItem("price", this.goodsItem.price);
            // localStorage.setItem("telphone", this.goodsItem.telphone);
            // localStorage.setItem("secondhand_id", this.goodsItem.id);
            // localStorage.setItem("orderFrom", false);

            // this.$router.push({
            //     path: "/order",
            // });
            // this.$axios.post('/secondhand/startOrder', {
            //     "pictrue_url": this.goodsItem.images[0],
            //     "title": this.goodsItem.keyword,
            //     "description": this.goodsItem.description,
            //     "price": this.goodsItem.price,
            //     "telphone": this.goodsItem.telphone,
            //     'secondhand_id': this.goodsItem.id,
            // })
            // .then( async (res) => {
            //     console.log(res);
            //     this.$root.Bus.$emit('addToCart', '加入成功');
            //     console.log('123456');
            // }).catch((err) => {
            //     console.log(err);
            // })
        },
    },
};
</script>

<style scoped>
.shop-item {
    width: 100vw;
    display: flex;
    font-size: 0;
    padding: 5px;
}
.desc {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
}
.delete-button {
    height: 100%;
}

.item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-title,
.item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
}

.item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}

.item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
}

.item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}

.info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
}

.info-bottom .item-price {
    color: orangered;
}
</style>
