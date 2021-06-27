<template>
  <div id="lost-item">
    <div v-if="Object.keys(lostFounditem).length != 0">
       <!-- v-if="Object.keys(lostFounditem).length != 0" -->
      <ul class="lost-item-ul">
        <li class="li-one">
          <img class="user-avatar"
            :src="lostFounditem.author.avatarUrl"
          />
        </li>
        <li>
          <p class="user-name">{{lostFounditem.author.name}} </p>
          <p class="user-time"><span>{{lostFounditem.createTime}}</span></p>
        </li>
        <li></li>
        <li>
          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <van-icon name="ellipsis" size="30"/>
            </template>
          </van-popover>
        </li>
      </ul>
      <!-- 联系电话 -->
      <p class="phone" v-show="lostFounditem.telphone != null">
        <span>
          <van-icon name="phone-circle-o" color="#00ac2c" />
        </span>
          <span>
            &nbsp;{{lostFounditem.telphone}}
          </span>
      </p>
      <!-- 时间 -->
      <p class="phone" v-show="lostFounditem.findTime != null">
        <span>
          <van-icon name="underway-o" color="#00ac2c" />
        </span>
          <span>
            &nbsp;{{lostFounditem.findTime}}
          </span>
      </p>
      <!-- 位置 -->
      <p class="phone"  v-show="lostFounditem.place != null">
        <span>
          <van-icon name="location-o" color="#00ac2c" />
        </span>
          <span>
            &nbsp;{{lostFounditem.place}}
          </span>
      </p>
      <!-- 内容 -->
      <p class="descript">
        {{lostFounditem.content}}
      </p>
      <!-- 配图 -->
      <ul class="lost-imaes" v-show="lostFounditem.images != null" @click="getComment">
        <li v-for="(image, index) in lostFounditem.images" :key="index">
          <img v-lazy="image" />
        </li>
      </ul>
      <div>
        <!-- 配图下面的评论数以及跳转详情 -->
        <ul class="comment" v-if="!isShowItem">
          <li></li>
          <li>
            <p class="phone">
              <span><van-icon name="comment-o" size="25px" @click="getComment"/></span>&nbsp;
              <span>{{CommentsLength}}</span>
            </p>
          </li>
          <li></li>
          <li class="phone-detail" @click="getComment"><span>点击查看详情>>></span></li>
        </ul>
        <!-- 评论部分开始 -->
        <div v-else class="commentcount">
          <div class="precomment"></div>
          <div>
            <span  v-if="lostFoundItemComments != 0">全部评论&nbsp;({{CommentsLength}})</span>
            <span v-else>全部评论&nbsp;(0)</span>
          </div>
          <ul v-show="CommentsLength != 0">
            <li v-if="mainArr.length != 0" v-for="(i, index0) of mainArr" :key="index0" class="border-comments van-hairline--top">
              <ul class="lost-item-comments">
                <li class="li-one">
                  <img class="user-avatar"
                    :src="i.user.avatarUrl"
                  />
                </li>
                <li>
                  <p class="user-name" style="font-size: 16px">{{i.user.name}} </p>
                  <p style="font-size: 14px" @click="reply0(index0)">{{i.content}}</p>
                  <p class="user-time"><span style="color: silver">{{i.createTime}}</span></p>
                  <div style="font-size: 14px" class="comment-item">
                    <p @click="reply(index0, 0)" v-if="commentArr[index0].length > 0">
                      {{commentArr[index0][0].user.name}}
                      <span style="color: #00ac2c">回复</span>
                      {{i.user.name}}:&nbsp;{{commentArr[index0][0].content}}

                      <br/><a class="user-time"><span style="color: silver">{{commentArr[index0][0].createTime}}</span></a>
                    </p>
                   
                    <p v-for="num in 100" @click="reply(index0, num )" v-if="commentArr[index0].length > num" :key="num">
                      
                        {{commentArr[index0][(num)].user.name}}
                      <span style="color: #00ac2c">回复</span>
                       {{commentArr[index0][(num - 1) ].user.name}}:&nbsp;{{commentArr[index0][num].content}}

                      <br/><a class="user-time"><span style="color: silver">{{commentArr[index0][num].createTime}}</span></a>
                    </p> 

                    <!-- 备份部分开始 -->

                    <!-- <p v-for="num of 100" @click="reply(index0, (num + 1))" v-if="commentArr[index0].length > (num + 1)" :key="num">
                      
                        {{commentArr[index0][(num + 1)].user.name}}
                      <span style="color: #00ac2c">回复</span>
                       {{commentArr[index0][num].user.name}}:&nbsp;{{commentArr[index0][(num + 1)].content}}

                      <br/><a class="user-time"><span style="color: silver">{{commentArr[index0][(num + 1)].createTime}}</span></a>
                    </p>   -->

                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false" class="father-wrapper">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p>用户操作</p>
          <p @click="itemReply">{{revert}}
            <span style="color: #00ac2c">&nbsp;{{replymen}}</span>
            <!-- <span style="dis">
              <input type="text" style="width: 100%;background-color: #e8e8ee; border">
            </span> -->
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
    <van-search left-icon="" v-model="DongtaiContent" placeholder="请输入您的评论" @click="commentDongtai"/>
  </div>
</template>

<script>
import { Popover, Icon, Image as VanImage, Overlay, ActionSheet, Field, Button, Search } from 'vant';
export default {
  name: 'LostItem',
  components: {
    [Popover.name]: Popover,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Overlay.name]: Overlay,
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [Button.name]: Button,
    [Search.name]: Search,
  },
  props:{
    lostFounditem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      DongtaiContent: '',
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
      isShowItem: true,
      showPopover: false,
      actions: [
        { text: '删除', icon: 'add-o' },
        { text: '修改', icon: 'music-o' },
        { text: '选项三', icon: 'more-o' },
      ],
      mainArr: [],
      commentArr: [],
      index: 0,
      changed: '修改',
      revert: '回复',
      theTitle: '标题',
      show: false,
      isshowreply: false,
      replymen: '',
      commentId: '',
      placeholder: '请输入内容',
      message: '',
      indexComment: '3',
      items: {},
      forArr: {},

      // 二次修改获取评论数据
      lostFoundItemId: '',
      CommentsLength: '0',
      lostFoundItemComments: []
    };
  },
  computed: {
    themainArr() {
      let total = this.lostFounditem.comments.filter((item,index) => {
        console.log(item + index);
        return item.commentId = null
      });
      return total
    }
  },
    watch: {
      lostFounditem: {
        immediate: true,    // 这句重要
        deep: true,
        handler (val) {
            this.items=val
            // this.commentGOhome()
        }
      }
    },
  created() {
    this.isShowItem = this.$route.query.isShowItem;
    console.log("created处");
    console.log(this.lostFounditem);
    console.log(this.lostFounditem.id);
    // 二次修改获取评论数据
    if(this.lostFounditem.id) {
      this.lostFoundItemId = this.lostFounditem.id;
      this.getCommentsById(this.lostFounditem.id)
    }
    console.log(Object.keys(this.lostFounditem).length != 0);
  },
  mounted() {
    console.log(this.lostFounditem);
    console.log(this.lostFounditem.comments);

  //  this.commentGOhome() 
  },
  methods: {
    // 二次修改评论获取数据的方式
    async getCommentsById(x) {
      console.log(x);
      let Url = '/comment?lostFoundId=' + x;
      await this.$axios.get(Url).then((res) => {
          console.log('来到了二次修改评论获取数据的方式');    
          console.log(res.data);    
          console.log(res.data.length);
          // this.CommentsLength = res.data.length;    
          this.lostFoundItemComments = res.data;
          this.commentGOhome1()         
        }).catch((error) => {
            console.log(error);
      });
    },
    commentGOhome1 () {

      console.log('正在更新数据中');
      console.log(this.lostFoundItemComments);
      this.mainArr = [];
      this.commentArr = [];
      if(this.lostFoundItemComments.length == 0 || this.lostFoundItemComments == null || this.lostFoundItemComments == undefined) return;
      let arr = this.lostFoundItemComments.filter((item,index) => {
          console.log(item.commentId);
          return item.commentId == null
        });
      this.mainArr = arr;
      console.log(this.mainArr);
      this.CommentsLength = this.mainArr.length;
    
      // 实现评论
      // let testarr = this.lostFoundItemComments.concat();
      let testarr = this.lostFoundItemComments;
      let that = this;

      // 19号遍历mainArr（新任务）
      this.mainArr.forEach((item,index) =>{
          let m;
          m = item.id;
          console.log(item);
          console.log(that.commentArr.length, that.mainArr.length); 
          if(that.commentArr.length <= that.mainArr.length)
          {  
            let rra = [];                 
            that.commentArr.push(rra);
          } else {
            return
          }
          // 新增开始
          // 第一部分
          testarr.forEach((i, ind) => {
              if(i.commentId == m) {
                console.log(i);
                if(!that.commentArr[index].includes(i)) {
                  that.commentArr[index].push(i);
                  that.CommentsLength = that.CommentsLength + 1;
                  testarr.splice(ind,1);
                }
                // that.commentArr[index].push(i); 
                arrayAll(m)
              }
            });
            // 第二部分
             testarr.forEach((i, ind) => {
                let mmm = i.id;
                // that.commentArr[index].push(i); 
                testarr.forEach((i, ind) => {
                if(i.commentId == mmm) {
                  console.log(i);
                  if(!that.commentArr[index].includes(i)) {
                    that.commentArr[index].push(i);
                    that.CommentsLength = that.CommentsLength + 1;
                    testarr.splice(ind,1);
                  }
                  // that.commentArr[index].push(i);
                    
                  // m = i.id;

                  // arrayAll(m)  
                }
              });
              
            });
          // 新增结束
          arrayAll(item.id);
          function arrayAll(m) {
            if(testarr.length == 0) return;
            testarr.forEach((i, ind) => {
              if(i.commentId == m) {
                console.log(i);
                if(!that.commentArr[index].includes(i)) {
                  that.commentArr[index].push(i);
                  that.CommentsLength = that.CommentsLength + 1;
                  // testarr.splice(ind,1);
                }
                // that.commentArr[index].push(i);
                  
                m = i.id;

                arrayAll(m)  
              }
            });
          };
      });
      console.log(this.commentArr);
    },
    // commentGOhome () {
    //   console.log('正在更新数据中');
    //   // this.mainArr = [];
    //   // this.commentArr = [[]];
    //   if(this.lostFounditem.comments == undefined || this.lostFounditem.comments == null) return;
    //   let arr = this.lostFounditem.comments.filter((item,index) => {
    //       console.log(item + index);
    //       return item.commentId == null
    //     });
    //   this.mainArr = arr;
    //   console.log(this.mainArr);
    
    //   // 实现评论
    //   let testarr = this.lostFounditem.comments.concat();
    //   let that = this;

    //   // 19号遍历mainArr（新任务）
    //   this.mainArr.forEach((item,index) =>{
    //       let m;
    //       m = item.id;
    //       console.log(item);
    //       console.log(that.commentArr.length, that.mainArr.length); 
    //       if(that.commentArr.length <= that.mainArr.length)
    //       {  
    //         let rra = [];
    //         that.commentArr.push(rra);
    //       } else {
    //         return
    //       }
    //       function arrayAll(m) {
    //         if(testarr.length == 0) return;
    //         testarr.forEach((i) => {
    //           if(i.commentId == m) {
    //             console.log(i);
    //             // if(!that.commentArr[that.index].includes(i)) {
    //             //   that.commentArr[that.index].push(i);
    //             // }
    //             that.commentArr[index].push(i);  
    //             m = i.id;
    //             testarr.splice(index,1);
    //             arrayAll(m)  
    //           }
    //         });
    //       };
    //       arrayAll(m);
    //       // that.index = that.index + 1;
    //       // if(that.commentArr.length < that.mainArr.length + 1)
    //       // {  
    //       //   let rra = [];
    //       //   that.commentArr.push(rra);
    //       // } else {
    //       //   return
    //       // }
    //   });
    //   console.log(this.commentArr);
    // },
    getComment() {
      this.$router.push({path:'/lostFoundItem', query: {id: this.lostFounditem.id, isShowItem: false}})
    },
    // 操作启事动态
    onSelect(action) {
      this.$toast(action.text);
      console.log();

      switch (action.text) {
          case this.actions[0].text:

              console.log(this.lostFounditem.id);
              let deleteUrl = '/lostFound/' + this.lostFounditem.id;
              this.$axios.delete(deleteUrl
              ).then(res => {
                  console.log(res);
                  this.$toast(this.actions[0].text);    
                  this.$root.Bus.$emit('getItemList', this.lostFounditem.id)             
              }).catch(error => {
                  console.log(error);
            });
              break;
          case this.actions[0].text:
              this.$toast(this.actions[1].text);
              break;
          default:
              this.$toast(action.text);
      };
    },
    reply(x,y) {
      this.show = true;
      console.log(this.lostFounditem.id); 
      console.log(this.commentArr[x][y].id); 
      this.commentId = this.commentArr[x][y].id;
      this.replymen = this.commentArr[x][y].user.name;
      console.log(this.commentArr[x][y].user.name);
    },
    reply0(x) {
      this.show = true;
      console.log(this.lostFounditem.id);
      console.log(this.mainArr[x].id);
      this.commentId = this.mainArr[x].id;
      this.replymen = this.mainArr[x].user.name;
      console.log(this.mainArr[x].user.name);
    },
    itemReply() {
      console.log('2222');
      this.show = false;
      this.theTitle = this.revert;
      this.placeholder = '回复' + this.replymen + ':';
      this.indexComment = '1';
      this.isshowreply = true; 
    },
    itemDelete() {
      console.log('333');
      console.log(this.commentId);
      this.show = false;

       // 网络请求删除评论
      let that = this;
      let commenturl = '/comment/' + that.commentId;
      this.$axios.delete(commenturl)
      .then((res) => {
        console.log(res.data);
        that.$toast({
          message: res.data.message,
          position: 'center',
        });
        this.$root.Bus.$emit('getcommentNew', that.lostFounditem.id);
        console.log(this.lostFounditem.id);
        this.getCommentsById(this.lostFounditem.id)
        // if(res.data.status == 200) {
        //   this.$router.go(0);
        // }
        // this.list.forEach((item, index, arr) => {
        //       if(item.id == value) {
        //           arr.splice(index, 1);
        //       }
        //   });

      })
      .catch((error) => {
        console.log(error);
      });
    },
    itemNew() {
      console.log('444');
      this.show = false;
      this.theTitle = this.changed;
      this.placeholder = '请输入修改的内容';
      this.indexComment = '2';
      this.isshowreply = true;
    },
    commentAxios(m) {
      if(m == 1) {
        console.log('1'+m);

        //  网络请求回复评论
        let that = this;
        let commenturl = '/comment/' + that.commentId + '/reply';
        // console.log(that.list); 
        this.$axios.post(commenturl, {
          'lostFoundId': that.lostFounditem.id,
          'content': that.message
        })
        .then((res) => {
          console.log(res.data);
          that.$toast({
            message: res.data.message,
            position: 'center',
          });``
          console.log(this.lostFounditem.id);
          this.getCommentsById(this.lostFounditem.id)
        })
        .catch((error) => {
          console.log(error);
        });
      } else if(m == 2) {
        // 修改评论
        console.log('2'+m);
        console.log(this.commentId);
        let commenturl2 = '/comment/' + this.commentId;
        this.$axios.patch(commenturl2, {
          'content': this.message
        })
        .then((res) => {
          console.log(res.data);
          this.$toast({
            message: res.data.message,
            position: 'center',
          });
          console.log(this.lostFounditem.id);
          this.getCommentsById(this.lostFounditem.id)
        
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        console.log(m);
        //  首次发布评论启事动态
        this.$axios.post('/comment', {
          'lostFoundId': this.lostFounditem.id,
          'content': this.message
        })
        .then((res) => {
          console.log(res.data);
          this.$toast({
            message: res.data.message,
            position: 'center',
          });
          console.log(this.lostFounditem.id);
          this.getCommentsById(this.lostFounditem.id)
        })
        .catch((error) => {
          console.log(error);
        });
      }
      this.isshowreply = false;
    },
    commentDongtai() {
      this.theTitle = "评论";
      this.placeholder = '请输入您的评论';
      this.indexComment = "3";
      this.isshowreply = true; 
    }
  }
}
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
    border-radius:50%
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
    flex: 10%;
  }
  .lost-item-comments li:last-child {
    flex: 90%;
    padding-left: 8px;
  }

  .comment-item p {
    padding: 10px 0; 
    border-top: 1px solid #e8e8ee

  }
  /* 遮罩层 */
  .father-wrapper {
    height: 100vh;
    width: 100vw;
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
    border-bottom: 1px solid #e8e8ee
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