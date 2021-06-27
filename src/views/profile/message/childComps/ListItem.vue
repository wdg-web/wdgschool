<template>
    <div class="shop-item">
        <ul>
            <li @click="goOrderDetail" class="item-li">
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
import { SwipeCell, Button, Dialog } from "vant";

import bgImage1 from "assets/img/secondhand/shuji.jpeg";

export default {
    name: "ListItem",
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
        [SwipeCell.name]: SwipeCell,
        [Button.name]: Button,
        [Dialog.Component.name]: Dialog.Component,
    },
    created() {
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
        goOrderDetail() {
            console.log(this.item.id);
            let orderId = this.item.id;
            this.$router.push({
                path: "/messageDetail",
                query: {
                    orderId: orderId,
                },
            });
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
.item-li {
    border-bottom: 1px dashed #d6d6d6;
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
