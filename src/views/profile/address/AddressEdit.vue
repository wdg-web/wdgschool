<template>
    <div id="address-edit">
        <goback :title="title" />
        <div class="edit-info">
            <van-field
                v-model="name"
                label="姓名"
                placeholder="收货人姓名"
                label-width="73"
            />
            <van-field
                readonly
                clickable
                label="电话"
                placeholder="收货人手机号"
                label-width="73"
                :value="telValue"
                @touchstart.native.stop="show = true"
            />
            <van-field
                readonly
                clickable
                is-link
                name="area"
                label-width="73"
                :value="valueSite"
                :label="labelSite"
                placeholder="点击选择省 / 市 / 区"
                @click="showArea = true"
                safe-area-inset-bottom
            />
            <van-field
                v-model="detail"
                label="详细地址"
                placeholder="学校名称、楼层房间号等信息"
                label-width="73"
            />
            <van-cell center title="设为默认收货地址">
                <template #right-icon>
                    <van-switch
                        v-model="checked"
                        size="28"
                        active-color="#1da93b"
                        inactive-color="#ffffff"
                    />
                </template>
            </van-cell>
            <!-- 按钮 -->
            <van-button class="btn" color="#1da93b" block round @click="onSave"
                >保存</van-button
            >
            <van-button
                v-show="isShowBtn1"
                class="btn1"
                color="#1da93b"
                block
                round
                plain
                hairline
                @click="onDelete"
                >删除</van-button
            >
        </div>
        <!-- 电话可视区域 -->
        <van-number-keyboard
            v-model="telValue"
            :show="show"
            :maxlength="11"
            @blur="show = false"
        />
        <!-- 位置选择视图 -->
        <van-popup v-model="showArea" position="bottom" safe-area-inset-bottom>
            <van-area
                :area-list="areaList"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                @confirm="onConfirm2"
                @cancel="showArea = false"
            />
        </van-popup>
    </div>
</template>

<script>
import {
    AddressEdit,
    Field,
    NumberKeyboard,
    Popup,
    Area,
    Form,
    Switch,
    Cell,
    Button,
} from "vant";
import { areaList } from "@vant/area-data";
import Goback from "components/common/search/Goback";
export default {
    name: "AddressEdit",
    components: {
        [AddressEdit.name]: AddressEdit,
        [Field.name]: Field,
        [Popup.name]: Popup,
        [Area.name]: Area,
        [NumberKeyboard.name]: NumberKeyboard,
        [Form.name]: Form,
        [Switch.name]: Switch,
        [Cell.name]: Cell,
        [Button.name]: Button,
        Goback,
    },
    data() {
        return {
            title: "新增地址",
            areaList,
            searchResult: [],
            name: "",
            show: false,
            telValue: "",
            // 位置选择
            valueSite: "",
            showArea: false,
            areaList: areaList, // 数据格式见 Area 组件文档
            labelSite: "地区",
            detail: "",
            checked: false,

            // 修改地址
            item: {},
            isShowBtn1: false,
            itemId: 999,
        };
    },
    created() {
        this.isShowbtn();
    },
    methods: {
        isShowbtn() {
            if (this.$route.query.item == undefined) {
                console.log("点击了新增");
                this.isShowBtn1 = false;
            } else {
                this.item = this.$route.query.item;
                console.log(this.item);
                let arr = this.item.address.split(" ");
                this.valueSite = arr[0];
                this.detail = arr[1];
                this.checked = this.item.isDefault;
                this.name = this.item.name;
                this.telValue = this.item.tel;
                this.itemId = this.item.id;
                console.log(arr);
                this.isShowBtn1 = true;
                this.title = "编辑地址";
            }
        },
        // 位置选择
        onConfirm2(values) {
            this.valueSite = values
                .filter((item) => !!item)
                .map((item) => item.name)
                .join("");
            this.showArea = false;
            console.log(this.valueSite);
        },
        onSave() {
            let user_address = this.valueSite + " " + this.detail;
            if (this.name == "" || this.telValue == "" || user_address == "") {
                this.$toast({
                    message: "请填写地址完整再继续",
                    position: "top",
                });
                return;
            }
            let isDefault;
            if (this.checked) {
                isDefault = 1;
            } else {
                isDefault = 0;
            }
            console.log(isDefault);
            if (this.isShowBtn1) {
                this.$axios
                    .patch("/users/updateAddress", {
                        id: this.itemId,
                        username: this.name,
                        tel: this.telValue,
                        user_address: user_address,
                        isdefault: isDefault,
                    })
                    .then((res) => {
                        console.log(res);
                        this.$toast({
                            message: "修改地址成功!",
                            position: "top",
                        });
                        this.$root.Bus.$emit("saveAddress", "更新地址成功");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.$axios
                    .post("/users/saveAddress", {
                        username: this.name,
                        tel: this.telValue,
                        user_address: user_address,
                        isdefault: isDefault,
                    })
                    .then((res) => {
                        console.log(res);
                        this.$toast({
                            message: "新增地址成功!",
                            position: "top",
                        });
                        this.$root.Bus.$emit("saveAddress", "新增地址成功");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        onDelete() {
            console.log("delete");
            let url = "/users/removeAddress/" + this.itemId;
            this.$axios
                .delete(url)
                .then((res) => {
                    console.log(res);
                    this.$toast({
                        message: "删除地址成功!",
                        position: "top",
                    });
                    this.$root.Bus.$emit("saveAddress", "新增删除成功");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
::v-deep #address-style .van-address-edit__buttons > .van-button--danger {
    color: #fff;
    background-color: #1da93b;
    border-color: #1da93b;
}
::v-deep #address-style .van-switch--on {
    background-color: #1da93b;
}
.edit-info {
    padding: 0 10px;
    margin-top: 10px;
}
.btn {
    margin-top: 35px;
}
.btn1 {
    margin-top: 12px;
}
</style>