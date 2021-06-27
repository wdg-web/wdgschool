<template>
    <div id="second-goods">
        
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
        <van-cell-group>
            <van-field v-model="keyword" label="关键字" placeholder="请输入关键字" input-align="center" />
        </van-cell-group>
        <!-- 价格选择 -->
        <div class="fengouxian">
            <van-field
                readonly
                clickable
                input-align="center"
                label="二手价"
                placeholder="请输入出售价格"
                :value="price"
                safe-area-inset-bottom
                @touchstart.native.stop="secondHandJia"
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
                @touchstart.native.stop="telphoneShow = true; priceShow = false"
            />
        </div>
        <!-- 位置选择 -->
        <div class="fengouxian" style="border-top: 1px solid #e6e6e6;">
            <van-field
                readonly
                clickable
                input-align="center"
                name="area"
                :value="valueSite"
                label="发布位置"
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
            <p style="padding: 5px 0 5px 20px; font-size: 15px; color: silver">最多可上传20张</p>
            <van-uploader v-model="fileList" multiple :after-read="onRead" class="bianju"/>   
        </div>
        <!-- 物品分类选择视图 -->
         <van-popup v-model="showPicker" position="bottom" safe-area-inset-bottom>
            <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm1"
                @cancel="showPicker = false"
            />
        </van-popup>·
        <!-- 位置选择视图 -->
        <van-popup v-model="showArea" position="bottom" safe-area-inset-bottom>
            <van-area
                :area-list="areaList"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                @confirm="onConfirm2"
                @cancel="showArea = false"
            />
        </van-popup>

        <!-- 联系电话选择视图 -->
        <van-number-keyboard
            v-model="telphone"
            :show="telphoneShow"
            :maxlength="20"
            @blur="telphoneShow = false"
            safe-area-inset-bottom
        />
        <!-- 价格选择视图 v-model="price" -->
        <van-number-keyboard
            :show="priceShow"
            :extra-key="['00', '.']"
            theme="custom"
            close-button-text="完成"
            @blur="priceShow = false"
            @input="onInput"
            @delete="onDelete"
            safe-area-inset-bottom
        />
       <div  class="SendBtn">
            <van-button color="#00ac2c" block @click="sendLostFound" class="btn">发布</van-button>
       </div>
    </div>
</template>

<script>
import { Field, Uploader, RadioGroup, Radio, Picker, Popup, Area, DatetimePicker, NumberKeyboard, Button, CellGroup } from 'vant';

import { areaList } from '@vant/area-data';

export default {
    name: 'SecondGoods',
    components: {
        [Field .name]: Field,
        [CellGroup .name]: CellGroup,
        [Uploader .name]: Uploader,
        [RadioGroup .name]: RadioGroup,
        [Radio .name]: Radio,
        [Picker .name]: Picker,
        [Popup .name]: Popup,
        [Area .name]: Area,
        [DatetimePicker .name]: DatetimePicker,
        [NumberKeyboard .name]: NumberKeyboard,
        [Button.name]: Button,
    },
    data() {
        return{
            message: '',
            fileList: [],
            files: [],
            radio: '1',
            type: '',
            //  物品类型
            goodsType: '',
            columns: ['学习资料', '体育用品', '数码相机', '生活用品', '0元福利'],
            showPicker: false,
            //关键字
            keyword: '',
            // 位置选择
            valueSite: '',
            showArea: false,
            areaList: areaList, // 数据格式见 Area 组件文档
            // 时间选择
            // valueTime: '',
            // showPickerTime: false,
            // minDate: new Date(2021, 0, 1),
            // maxDate: new Date(2030, 12, 1),
            // currentDate: new Date(),
            // 联系电话
            telphoneShow: false,
            telphone: '',
            //二手价
            price: '',
            priceFree: true,
            priceShow: false
        }
    },
    
    methods: {
        // 价格部分
        onInput(key) {
            console.log(key);
            console.log(this.price);
            if(this.price == '0.00' ) { 
                this.$toast({
                    message: '请输入正确的价格',
                    position: 'top',
                })
                return
            }; 
            if(key === '00' && this.price == '' ) {
                console.log('111');
                this.price == '';
                this.$toast({
                    message: '请输入正确的价格',
                    position: 'top',
                })
                return
            }; 
            if(key == '.' && this.price == '' ) {
                this.price == '';
                this.$toast({
                    message: '请输入正确的价格',
                    position: 'top',
                })
                return
            }; 
            if(key != '.' && this.price === '0' ) {
                this.price == '';
                this.$toast({
                    message: '请输入正确的价格',
                    position: 'top',
                })
                return
            }; 
            this.price = this.price + key;
            
            console.log(this.price);          
        },
        onDelete() {
            console.log('111');
            // this.price = this.price.substring(0, basic.length - 1)
            if(this.price.length != 0) {
                this.price = this.price.slice(0,this.price.length-1);
                console.log(this.price);
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
            if(this.goodsType == '0元福利') {
                this.priceFree = false;
                this.price = '0'
            } else {
                this.priceFree = true;
                this.price = ''
            }
            console.log(this.radio);
        },
        secondHandJia() {
            if(this.priceFree) {
                this.priceShow = true; 
                this.telphoneShow = false
            }           
        },
        // 位置选择
        onConfirm2(values) {
            this.valueSite = values
                .filter((item) => !!item)
                .map((item) => item.name)
                .join('/');
            this.showArea = false;
            console.log(this.valueSite);
        },
        sendLostFound1() {
            let files = this.fileList;
            let formData = new FormData();
            // formData重复的往一个值添加数据并不会被覆盖掉，可以全部接收到，可以通过formData.getAll('files')来查看所有插入的数据
            for (let i = 0;i < files.length;i++) {
                formData.append('files', files[i].file)
            }
            console.log(files);
            console.log(formData.getAll('files'));
            console.log(formData);
            let url = '/upload/picture';
            let headers = {
                'Content-Type': 'multipart/form-data'
            }
            this.$axios.post(url, formData, {headers: headers})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        // 发送网络请求
        sendLostFound() {
            this.valueSite = this.valueSite.replace(/(\/)/g, "-");
            console.log(this.message); 
            console.log(this.price);              
            console.log(this.goodsType);
            console.log(this.valueSite);
            console.log(this.telphone);
            console.log(this.keyword);

            console.log(this.fileList);

            this.$axios.post('/secondhand', {
                "description": this.message,
                "price": this.price,
                "classify": this.goodsType,
                "site": this.valueSite,
                "telphone": this.telphone,
                'keyword': this.keyword
            })
            .then( async (res) => {
                console.log(res);
                 
                let files = this.fileList;
                let formData = new FormData();
                // formData重复的往一个值添加数据并不会被覆盖掉，可以全部接收到，可以通过formData.getAll('files')来查看所有插入的数据
                for (let i = 0;i < files.length;i++) {
                    formData.append('files', files[i].file)
                }
                console.log(files);
                console.log(formData);
                let url = '/upload/sesondHandImage';
                let headers = {
                    'Content-Type': 'multipart/form-data'
                }
                await this.$axios.post(url, formData, {headers: headers})
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
                const toast = this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '更新数据中 3 秒',
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

                this.$root.Bus.$emit('getSecondHandSend', '发表成功');

                this.$router.push('/secondhand')
              
            })
            .catch((error) => {
                console.log(error);
            });

        },

        onRead(file) {
            let content = file.file;
            console.log(content);
        }

    },
    // mounted() {
    //     this.timeFormat(new Date());
    // },

}
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
        padding: 10px 20px 0;
    }
    .SendBtn .btn {
        border-radius: 8px;
    }
</style>