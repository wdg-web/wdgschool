<template>
    <div id="user-info">
        <a href="#" class="clear-fix">
            <div class="imgspan">
                <van-image
                    round
                    width="100"
                    height="100"
                    :src="avatarUrl"
                    @click="userHandle"
                    v-if="showAvatar"
                />
                <p class="imgspan" v-if="isShow">{{ username }}</p>
                <p class="login-status" v-else @click="goLogin">
                    <span>登录 / 注册</span>
                </p>
            </div>
        </a>
        <van-action-sheet
            v-model="show"
            cancel-text="取消"
            close-on-click-action
            safe-area-inset-bottom
        >
            <ul class="content">
                <li class="van-hairline--bottom" v-if="!isShowDateAvatar">
                    <p>
                        <van-uploader :after-read="afterRead">
                            上传头像
                        </van-uploader>
                    </p>
                </li>
                <li class="van-hairline--bottom" v-else>
                    <p>
                        <van-uploader :after-read="updateAvatar">
                            更新头像
                        </van-uploader>
                    </p>
                </li>
                <li class="van-hairline--bottom" @click="exitLogin">
                    <p>退出登录</p>
                </li>
            </ul>
        </van-action-sheet>
    </div>
</template>

<script>
import { Image as VanImage, Uploader, ActionSheet, Button } from "vant";
import defaultAvatar from "assets/img/profile/默认头像.jpg";
// import orderIcon from "assets/img/profile/订单.png";
// import addIcon from "assets/img/profile/发布.png";
// import adressIcon from "assets/img/profile/地址.png";

export default {
    name: "UserInfo",
    components: {
        [VanImage.name]: VanImage,
        [Uploader.name]: Uploader,
        [ActionSheet.name]: ActionSheet,
        [Button.name]: Button,
    },
    data() {
        return {
            username: "",
            isShow: false,
            show: false,
            avatarUrl: defaultAvatar,
            // avatarUrl:
            //     "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffb9431a4c99691e54952d85ed034faf9a6b7e4f22d45-xy5FHF_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622087314&t=c0da97934a6700483bf9df0e026e455c",
            showAvatar: true,
            isShowDateAvatar: false,
        };
    },
    created() {
        let userId = localStorage.getItem("userId");
        let userName = localStorage.getItem("userName");
        console.log(userId);
        console.log(userName);
        if (userId) {
            this.getUserAvatar(userId);
            // let url = 'http://localhost:8888/users/' + userId + '/avatar';
            // this.avatarUrl = url;
        }
        if (userName) {
            this.username = userName;
            this.isShow = true;
        }
    },
    methods: {
        goLogin() {
            this.$router.push("/login");
        },
        getUserAvatar(userId) {
            let url = "/users/" + userId + "/userinfo";
            this.$axios
                .get(url)
                .then((res) => {
                    console.log(res.data[0]);
                    console.log(res.data[0].avatar_url != null);
                    this.showAvatar = false;
                    setTimeout(() => {
                        this.showAvatar = true;
                        if (res.data[0].avatar_url != null) {
                            this.isShowDateAvatar = true;
                            console.log(res.data[0].avatar_url);
                            let url = res.data[0].avatar_url;
                            if (url) {
                                this.avatarUrl = url;
                            }
                        } else {
                            this.isShowDateAvatar = false;
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        uploadAvatar() {
            console.log("222");
        },
        userHandle() {
            let userId = localStorage.getItem("userId");
            if (userId) {
                this.show = true;
            }
        },
        afterRead(file) {
            // 上传头像
            console.log(file);
            let formData = new FormData();

            formData.append("avatar", file.file);
            console.log(formData);
            let url = "/upload/avatar";
            let headers = {
                "Content-Type": "multipart/form-data",
            };
            this.$axios
                .post(url, formData, { headers: headers })
                .then((res) => {
                    console.log(res);
                    let userId = localStorage.getItem("userId");
                    this.getUserAvatar(userId);
                    this.show = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        updateAvatar(file) {
            this.afterRead(file);
        },
        exitLogin() {
            localStorage.removeItem("authorization");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            this.$router.push("/login");
        },
    },
};
</script>

<style scoped>
#user-info {
    background-color: #00ac2c;
    padding: 15px;
    margin-top: -5px;
}
.figure img {
    width: 35px;
    height: 40px;
}
.imgspan {
    color: #fff;
    padding-top: 10px;
    font-size: 15px;
    text-align: center;
}
.login-status {
    text-align: center;
    font-size: 15px;
}
.login-status span {
    display: inline-block;
    padding: 5px 10px;
    border: 1.5px solid white;
    border-radius: 10px;
    border-color: #fff;
}

.content li p {
    width: 30%;
    margin: 0 auto;
    padding: 20px;
    font-size: 16px;
    text-align: center;
}
</style>
