<template>
    <div id="send-found">
        <!-- 其他信息 -->
        <div class="fengouxian">
            <ul class="bianju send-ul">
                <li>类型</li>
                <li>
                    <van-radio-group
                        v-model="radio"
                        direction="horizontal"
                        @change="radioChange"
                    >
                        <van-radio name="1" checked-color="#00ac2c"
                            >寻找物品</van-radio
                        >
                        <van-radio name="2" checked-color="#00ac2c"
                            >寻找失主</van-radio
                        >
                    </van-radio-group>
                </li>
            </ul>
        </div>
        <!-- 物品分类选择 -->
        <div class="fengouxian">
            <van-field
                readonly
                clickable
                input-align="center"
                name="picker"
                :value="goodsType"
                label="物品类型"
                placeholder="点击选择物品类型"
                @click="showPicker = true"
                safe-area-inset-bottom
            />
        </div>
        <!-- 联系电话选择 -->
        <div class="fengouxian">
            <van-field
                readonly
                clickable
                input-align="center"
                label="联系方式"
                placeholder="请输入联系方式"
                :value="telphone"
                safe-area-inset-bottom
                @touchstart.native.stop="telphoneShow = true"
            />
        </div>
        <!-- 时间选择 -->
        <div class="fengouxian">
            <van-field
                readonly
                clickable
                input-align="center"
                name="datetimePicker"
                :value="valueTime"
                :label="labelTimes"
                placeholder="点击选择时间"
                @click="showPickerTime = true"
                safe-area-inset-bottom
            />
        </div>
        <!-- 位置选择 -->
        <div class="fengouxian" style="border-top: 1px solid #e6e6e6">
            <van-field
                readonly
                clickable
                input-align="center"
                name="area"
                :value="valueSite"
                :label="labelSite"
                placeholder="点击选择省市区"
                @click="showArea = true"
                safe-area-inset-bottom
            />
        </div>
        <!-- 描述 -->
        <van-field
            v-model="message"
            rows="5"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请输入物品描述"
            show-word-limit
            class="xiangqing van-hairline--top"
        />
        <!-- 上传图片 -->
        <div class="fengouxian picture" @click="sendPicture">
            <p style="padding: 5px 0 5px 20px; font-size: 15px; color: silver">
                最多可上传9张
            </p>
            <van-uploader
                v-model="fileList"
                multiple
                :after-read="onRead"
                class="bianju"
            />
        </div>
        <!-- 物品分类选择视图 -->
        <van-popup
            v-model="showPicker"
            position="bottom"
            safe-area-inset-bottom
        >
            <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm1"
                @cancel="showPicker = false"
            />
        </van-popup>
        <!-- 位置选择视图 -->
        <van-popup v-model="showArea" position="bottom" safe-area-inset-bottom>
            <van-area
                :area-list="areaList"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                @confirm="onConfirm2"
                @cancel="showArea = false"
            />
        </van-popup>
        <!-- 时间选择视图 -->
        <van-popup
            v-model="showPickerTime"
            position="bottom"
            safe-area-inset-bottom
        >
            <van-datetime-picker
                type="datetime"
                title="请选择时间"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirm3"
                @cancel="showPickerTime = false"
            />
        </van-popup>
        <!-- 联系电话选择视图 -->
        <van-number-keyboard
            v-model="telphone"
            :show="telphoneShow"
            :maxlength="11"
            @blur="telphoneShow = false"
            safe-area-inset-bottom
        />
        <div class="SendBtn">
            <van-button color="#00ac2c" block @click="sendLostFound" class="btn"
                >发布</van-button
            >
        </div>
    </div>
</template>

<script>
import {
    Field,
    Uploader,
    RadioGroup,
    Radio,
    Picker,
    Popup,
    Area,
    DatetimePicker,
    NumberKeyboard,
    Button,
} from "vant";

import { areaList } from "@vant/area-data";

export default {
    name: "SendFound",
    components: {
        [Field.name]: Field,
        [Uploader.name]: Uploader,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Area.name]: Area,
        [DatetimePicker.name]: DatetimePicker,
        [NumberKeyboard.name]: NumberKeyboard,
        [Button.name]: Button,
    },
    data() {
        return {
            message: "",
            fileList: [],
            files: [],
            radio: "1",
            type: "",
            //  物品类型
            goodsType: "",
            columns: [
                "日常用品",
                "学习用品",
                "体育用品",
                "电子产品",
                "箱包",
                "其他",
            ],
            showPicker: false,
            // 位置选择
            valueSite: "",
            showArea: false,
            areaList: areaList, // 数据格式见 Area 组件文档
            labelSite: "丢失的位置",
            // 时间选择
            labelTimes: "丢失的时间",
            valueTime: "",
            showPickerTime: false,
            minDate: new Date(2021, 0, 1),
            maxDate: new Date(2030, 12, 1),
            currentDate: new Date(),
            // 联系电话
            telphoneShow: false,
            telphone: "",
        };
    },
    methods: {
        radioChange(name) {
            console.log(name);
            if (name == 1) {
                this.labelSite = "丢失的位置";
                this.labelTimes = "丢失的时间";
            }
            if (name == 2) {
                this.labelSite = "拾到的位置";
                this.labelTimes = "拾到的时间";
            }
        },
        sendPicture() {
            console.log(this.fileList);
        },
        pictureInfo() {
            console.log(this.fileList);
            let tol = this.fileList;
            for (let i = 0; i < tol.length; i++) {
                // this.append('files', files[i])
                console.log(tol[i].file);
            }
        },
        // 物品类型
        onConfirm1(value) {
            this.goodsType = value;
            this.showPicker = false;
            console.log(this.goodsType);
            console.log(this.radio);
        },
        // 位置选择
        onConfirm2(values) {
            this.valueSite = values
                .filter((item) => !!item)
                .map((item) => item.name)
                .join("/");
            this.showArea = false;
            console.log(this.valueSite);
        },
        // 时间选择
        onConfirm3(time) {
            // this.valueTime = time;
            console.log(time);
            this.valueTime = this.timeFormat(time);
            console.log(this.valueTime);
            this.showPickerTime = false;
        },
        timeFormat(time) {
            // 时间格式化 2019-09-08
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            let hours = time.getHours();
            let minutes = time.getMinutes();
            return (
                year +
                "年" +
                month +
                "月" +
                day +
                "日" +
                " " +
                hours +
                "点" +
                minutes +
                "分"
            );
        },
        sendLostFound1() {
            let files = this.fileList;
            let formData = new FormData();
            // formData重复的往一个值添加数据并不会被覆盖掉，可以全部接收到，可以通过formData.getAll('files')来查看所有插入的数据
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i].file);
            }
            console.log(files);
            console.log(formData.getAll("files"));
            console.log(formData);
            let url = "/upload/picture";
            let headers = {
                "Content-Type": "multipart/form-data",
            };
            this.$axios
                .post(url, formData, { headers: headers })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // 发送网络请求
        sendLostFound() {
            if (this.radio == 1) {
                this.type = "寻找物品";
            } else if (this.radio == 2) {
                this.type = "寻找失主";
            }

            this.valueSite = this.valueSite.replace(/(\/)/g, "-");
            console.log(this.message);
            console.log(this.fileList);
            console.log(this.type);
            console.log(this.goodsType);
            console.log(this.telphone);
            console.log(this.valueTime);
            console.log(this.valueSite);

            this.$axios
                .post("/lostFound", {
                    content: this.message,
                    type: this.type,
                    classify: this.goodsType,
                    telphone: this.telphone,
                    place: this.valueSite,
                    findtime: this.valueTime,
                })
                .then(async (res) => {
                    console.log(res);
                    let files = this.fileList;
                    let formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        formData.append("files", files[i].file);
                    }
                    console.log(files);
                    console.log(formData);
                    let url = "/upload/picture";
                    let headers = {
                        "Content-Type": "multipart/form-data",
                    };
                    await this.$axios
                        .post(url, formData, { headers: headers })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    const toast = this.$toast.loading({
                        duration: 0, // 持续展示 toast
                        forbidClick: true,
                        message: "更新数据中 3 秒",
                    });

                    let second = 3;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                            toast.message = `更新数据中 ${second} 秒`;
                        } else {
                            clearInterval(timer);
                            // 手动清除 Toast
                            this.$toast.clear();
                        }
                    }, 1000);

                    this.$root.Bus.$emit("getItemListSend", "发表成功");

                    this.$router.push("/lostFound");
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        onRead(file) {
            let content = file.file;
            console.log(content);
        },
    },
    mounted() {
        this.timeFormat(new Date());
    },
};
</script>

<style scoped>
.xiangqing {
    padding: 10px 20px 0;
    border-top: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    /* background-color: #e2e2e2; */
}
.bianju {
    padding: 10px 20px;
}
.fengouxian {
    border-top: 1px solid #e6e6e6;
}
.send-ul {
    display: flex;
}
.send-ul li:first-child {
    flex: 40%;
    font-size: 14px;
    line-height: 100%;
}
.send-ul li:last-child {
    flex: 60%;
    font-size: 14px;
    text-align: right;
}
.SendBtn {
    padding: 20px 20px 0;
}
.SendBtn .btn {
    border-radius: 8px;
}
</style>