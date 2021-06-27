<template>
   <div id="comment">
        <div class="commentcount">
            <div class="precomment"></div>
            <div>
                <span  v-if="CommentsLength != 0">全部留言&nbsp;({{CommentsLength}})</span>
                <!-- <span  v-if="Comments != 0">全部评论&nbsp;({{CommentsLength}})</span> -->
                <span v-else>全部留言&nbsp;(0)</span>
            </div>
            <ul v-if="Comments.length != 0">
                <li v-if="mainArr.length != 0" v-for="(i, index0) of mainArr" :key="index0" class="border-comments van-hairline--top">
                    <ul class="lost-item-comments">
                        <li class="li-one">
                            <img class="user-avatar" :src="i.user.avatarUrl"
                        />
                        </li>
                        <li>
                            <p class="user-name" style="font-size: 16px">{{i.user.name}} </p>
                            <p style="font-size: 14px" @click="reply0(index0)">{{i.content}}</p>
                            <p class="user-time"><span style="color: silver">{{i.updateTime}}</span></p>
                            <div style="font-size: 14px" class="comment-item">
                            
                                <p v-for="(itemm,indexx) of commentArr[index0]" @click="reply(index0, indexx)" v-if="commentArr[index0].length > 0" :key="indexx">
                                
                                    {{commentArr[index0][indexx][0].user.name}}
                                <span style="color: #00ac2c">回复</span>
                                {{commentArr[index0][indexx][1].user.name}}:&nbsp;{{commentArr[index0][indexx][0].content}}

                                <br/><a class="user-time"><span style="color: silver">{{commentArr[index0][indexx][0].updateTime}}</span></a>
                                </p> 
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <van-overlay :show="show" @click="show = false" class="father-wrapper">
        <div class="wrapper" @click.stop>
            <div class="block">
                <p>用户操作</p>
                <p @click="itemReply">{{revert}}
                    <span style="color: #00ac2c">&nbsp;{{replymen}}</span>
                </p>
                <p @click="itemDelete">删除</p>
                <p @click="itemNew">{{changed}}</p>
            </div>
        </div>
    </van-overlay>
    <van-action-sheet v-model="isshowreply" :title="theTitle"  get-container="body">
      <div class="content">
        <van-field
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          :placeholder="placeholder"
        />
        <van-button type="primary" block color="#00ac2c" class="btn" @click="commentAxios(indexComment)">发送</van-button>
      </div>
    </van-action-sheet>
    <!-- 评论动态 -->
    <!-- <van-search left-icon="" v-model="DongtaiContent" placeholder="请输入您的评论" @click="commentDongtai"/> -->
  </div>
   </div>
</template>

<script>
import {
    Popover,
    Icon,
    Image as VanImage,
    Overlay,
    ActionSheet,
    Field,
    Button,
    Search,
    ImagePreview,
} from "vant";

import { timeCycle } from "common/utils";

import closeIcon from "assets/img/close.png";

export default {
    name: "Comment",
    components: {
        [Popover.name]: Popover,
        [Icon.name]: Icon,
        [VanImage.name]: VanImage,
        [Overlay.name]: Overlay,
        [ActionSheet.name]: ActionSheet,
        [Field.name]: Field,
        [Button.name]: Button,
        [Search.name]: Search,
        [ImagePreview.Component.name]: ImagePreview.Component,
    },
    data() {
        return {
            DongtaiContent: "",

            // 图片预览关闭图标
            closeIcon: closeIcon,
            isShowItem: true,
            showPopover: false,

            mainArr: [],
            commentArr: [],
            index: 0,
            changed: "修改",
            revert: "回复",
            theTitle: "标题",
            show: false,
            isshowreply: false,
            replymen: "",
            leaveWordsId: "",
            placeholder: "请输入内容",
            message: "",
            indexComment: "3",
            items: {},
            forArr: {},

            // 二次修改获取评论数据
            goodId: "",
            CommentsLength: "0",
            Comments: [],
        };
    },
    created() {
        this.isShowItem = this.$route.query.isShowItem;
        console.log("created处");
        // 二次修改获取评论数据
        if (this.$route.query.goodId) {
            console.log(this.$route.query.goodId);
            this.goodId = this.$route.query.goodId;
            this.getCommentsById(this.goodId);
            // this.getCommentsById(this.goodId)
        }
        // 点击留言之后触发
        this.$root.Bus.$on("clickLeaveWord", (value) => {
            this.commentDongtai();
            console.log(value);
        });
    },
    methods: {
        // 二次修改评论获取数据的方式
        getCommentsById(x) {
            console.log(x);
            let Url = "/leaveWords?secondHandId=" + x;
            this.$axios
                .get(Url)
                .then((res) => {
                    console.log("来到了二次修改评论获取数据的方式");
                    console.log(res.data);
                    console.log(res.data.length);
                    // this.CommentsLength = res.data.length;
                    this.Comments = res.data;
                    // 时间转换
                    this.Comments.forEach((item) => {
                        item.updateTime = timeCycle(item.updateTime);
                    });
                    this.commentGOhome1();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        commentGOhome1() {
            console.log("正在更新数据中");
            console.log(this.Comments);
            this.mainArr = [];
            this.commentArr = [];
            if (
                this.Comments.length == 0 ||
                this.Comments == null ||
                this.Comments == undefined
            )
                return;
            let arr = this.Comments.filter((item, index) => {
                console.log(item.leaveWordsId);
                return item.leaveWordsId == null;
            });
            this.mainArr = arr;
            console.log(this.mainArr);
            this.CommentsLength = this.mainArr.length;

            // 实现评论
            let testarr = this.Comments;
            let that = this;

            // 19号遍历mainArr（新任务）
            this.mainArr.forEach((item, index) => {
                let m;
                m = item.id;
                console.log(item);
                console.log(that.commentArr.length, that.mainArr.length);
                if (that.commentArr.length <= that.mainArr.length) {
                    let rra = [];
                    that.commentArr.push(rra);
                } else {
                    return;
                }
                let ArrayGo = [];
                arrayAll(item);
                function arrayAll(m) {
                    if (testarr.length == 0) return;
                    testarr.forEach((i, ind) => {
                        if (i.leaveWordsId == m.id) {
                            console.log(i);
                            let Arr = [];

                            Arr.push(i);
                            Arr.push(m);
                            console.log(Arr);
                            that.commentArr[index].push(Arr);
                            ArrayGo.push(i);
                            that.CommentsLength = that.CommentsLength + 1;
                        }
                    });
                }

                // 新增开始
                let arrcomments = this.Comments.filter((item) => {
                    return item.leaveWordsId != null;
                });

                // 用来存储每一层评论的数组
                let arrOne1 = [];
                // let arrOne = that.commentArr[index];
                let arrOne = ArrayGo;
                addOne(arrOne);
                function addOne(x) {
                    if (x.length == 0) return;

                    arrOne1 = [];
                    x.forEach((item) => {
                        arrcomments.forEach((i) => {
                            if (i.leaveWordsId == item.id) {
                                console.log(i);
                                arrOne1.push(i);

                                let Arr = [];

                                Arr.push(i);
                                Arr.push(item);
                                that.commentArr[index].push(Arr);
                                that.CommentsLength = that.CommentsLength + 1;

                                // if(!that.commentArr[index].includes(i)) {
                                //   Arr.push(i);
                                //   Arr.push(item);
                                //   that.commentArr[index].push(i);
                                //   that.CommentsLength = that.CommentsLength + 1;
                                // }
                            }
                        });
                    });
                    addOne(arrOne1);
                }
            });
            console.log(this.CommentsLength);
            console.log(this.commentArr);
        },
        // 操作二手留言
        onSelect(action) {
            switch (action.text) {
                case this.actions[0].text:
                    console.log(this.goodId);
                    let deleteUrl = "/lostFound/" + this.goodId;
                    this.$axios
                        .delete(deleteUrl)
                        .then((res) => {
                            console.log(res);
                            console.log(res.data.message);
                            let massage0 = res.data.message;
                            this.$toast({
                                message: massage0,
                                position: "top",
                            });
                            if (res.data.status == 200) {
                                this.$root.Bus.$emit(
                                    "getItemList",
                                    this.goodId
                                );
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    break;
                case this.actions[1].text:
                    this.$toast(this.actions[1].text);
                    break;
                default:
                    this.$toast(action.text);
            }
        },
        reply(x, y) {
            this.show = true;
            console.log(this.commentArr[x][y][0].id);
            this.leaveWordsId = this.commentArr[x][y][0].id;
            this.replymen = this.commentArr[x][y][0].user.name;
            console.log(this.replymen);
        },
        reply0(x) {
            this.show = true;
            console.log(this.mainArr[x].id);
            this.leaveWordsId = this.mainArr[x].id;
            this.replymen = this.mainArr[x].user.name;
            console.log(this.mainArr[x].user.name);
        },
        itemReply() {
            console.log("2222");
            this.show = false;
            this.theTitle = this.revert;
            this.placeholder = "回复" + this.replymen + ":";
            this.indexComment = "1";
            this.isshowreply = true;
        },
        itemDelete() {
            console.log("333");
            console.log(this.leaveWordsId);
            this.show = false;

            // 网络请求删除评论
            let that = this;
            let commenturl = "/leaveWords/" + that.leaveWordsId;
            this.$axios
                .delete(commenturl)
                .then((res) => {
                    console.log(res.data);
                    that.$toast({
                        message: res.data.message,
                        position: "center",
                    });
                    // this.$root.Bus.$emit('getcommentNew', that.goodId);
                    console.log(this.goodId);
                    this.getCommentsById(this.goodId);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        itemNew() {
            console.log("444");
            this.show = false;
            this.theTitle = this.changed;
            this.placeholder = "请输入修改的内容";
            this.indexComment = "2";
            this.isshowreply = true;
        },
        commentAxios(m) {
            if (m == 1) {
                console.log("1" + m);

                //  网络请求回复评论
                let that = this;
                let commenturl = "/leaveWords/" + that.leaveWordsId + "/reply";
                // console.log(that.list);
                this.$axios
                    .post(commenturl, {
                        secondHandId: that.goodId,
                        content: that.message,
                    })
                    .then((res) => {
                        console.log(res.data);
                        that.$toast({
                            message: res.data.message,
                            position: "center",
                        });
                        ``;
                        console.log(this.goodId);
                        this.getCommentsById(this.goodId);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (m == 2) {
                // 修改评论
                console.log("2" + m);
                console.log(this.leaveWordsId);
                let commenturl2 = "/leaveWords/" + this.leaveWordsId;
                this.$axios
                    .patch(commenturl2, {
                        content: this.message,
                    })
                    .then((res) => {
                        console.log(res.data);
                        this.$toast({
                            message: res.data.message,
                            position: "center",
                        });
                        console.log(this.goodId);
                        this.getCommentsById(this.goodId);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                console.log(m);
                //  首次发布评论启事动态
                this.$axios
                    .post("/leaveWords", {
                        secondHandId: this.goodId,
                        content: this.message,
                    })
                    .then((res) => {
                        console.log(res.data);
                        this.$toast({
                            message: res.data.message,
                            position: "center",
                        });
                        console.log(this.goodId);
                        this.getCommentsById(this.goodId);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            this.isshowreply = false;
        },
        commentDongtai() {
            this.theTitle = "评论";
            this.placeholder = "请输入您的评论";
            this.indexComment = "3";
            this.isshowreply = true;
        },
    },
};
</script>

<style scoped>
#lost-item {
    padding-top: 8px;
}
.lost-item-ul {
    display: flex;
}
.lost-item-ul li:nth-child(1),
.lost-item-ul li:nth-child(4) {
    flex: 1;
}
.lost-item-ul li:nth-child(2),
.lost-item-ul li:nth-child(3) {
    flex: 3;
}
.li-one {
    text-align: center;
}
.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.user-name {
    font-size: 16px;
    padding-left: 3px;
    margin-bottom: 10px;
}
.user-time span {
    padding-left: 3px;
    font-size: 10px;
}
.descript {
    margin: 10px 6px 15px 4px;
    font-size: 15px;
}

.phone {
    margin: 8px 0;
    font-size: 14px;
}
.phone span:last-child {
    vertical-align: 3px;
}
.phone span {
    text-align: center;
}
.lost-imaes {
    display: flex;
    flex-wrap: wrap;
    padding-top: 5px;
    margin-bottom: 20px;
}
.lost-imaes li {
    width: 50%;
    height: auto;
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
}
.lost-imaes li img {
    width: 100%;
    height: auto;
}

.comment {
    display: flex;
}
.comment li:nth-child(1),
.comment li:nth-child(2) {
    flex: 1;
}
.comment li:nth-child(4) {
    flex: 2;
}
.comment li:nth-child(3) {
    flex: 3;
}

.phone-detail {
    display: table-cell;
    vertical-align: middle;
    margin: 8px 0;
}
.phone-detail span {
    font-size: 10px;
    vertical-align: middle;
}

.precomment {
    position: relative;
    left: -20px;
    width: 100vw;
    height: 3vw;
    background-color: #f7f8fa;
}
.commentcount div {
    margin: 10px 0;
    font-size: 16px;
}
.border-comments {
    padding: 8px 0 12px 0;
}
.lost-item-comments {
    display: flex;
}
.lost-item-comments li:first-child {
    flex: 1;
}
.lost-item-comments li:last-child {
    flex: 9;
    padding-left: 8px;
    /* overflow-wrap:break-word; */
}
.lost-item-comments li:last-child p {
    word-wrap: break-word;
    word-break: normal;
}

.comment-item p {
    padding: 10px 0;
    border-top: 1px solid #e8e8ee;
}
/* 遮罩层 */
.father-wrapper {
    height: 100vh;
    width: 100vw;
    z-index: 999;
}
.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 240px;
    height: 240px;
    transform: translate(-50%, -50%);
}

.block {
    display: flex;
    flex-wrap: wrap;
    width: 240px;
    height: 240px;
    padding: 0 20px;
    background-color: #fff;
}
.block p {
    flex: 100%;
    font-weight: 500;
    font-size: 16px;
    /* height: 65px;
        line-height: 65px; */
    padding-top: 20px;
}
.block p:nth-child(1) {
    font-weight: 700;
    font-size: 18px;
    text-align: center;
}
.block p:nth-child(1),
.block p:nth-child(2),
.block p:nth-child(3) {
    border-bottom: 1px solid #e8e8ee;
}
/* 回复模块样式 */
.content {
    position: relative;
    padding: 16px 16px 160px;
}
.content .btn {
    position: absolute;
    left: 0;
    bottom: 20px;
    right: 0;
}
</style>