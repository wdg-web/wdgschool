(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b02134be"],{"17ed":function(t,e,n){},"38d5":function(t,e,n){"use strict";n("68ef")},4424:function(t,e,n){t.exports=n.p+"img/login.782568a6.jpg"},"772a":function(t,e,n){"use strict";var a=n("d282"),o=n("db85"),s=Object(a["a"])("form"),i=s[0],r=s[1];e["a"]=i({props:{colon:Boolean,disabled:Boolean,readonly:Boolean,labelWidth:[Number,String],labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,errorMessageAlign:String,submitOnEnter:{type:Boolean,default:!0},validateTrigger:{type:String,default:"onBlur"},showError:{type:Boolean,default:!0},showErrorMessage:{type:Boolean,default:!0}},provide:function(){return{vanForm:this}},data:function(){return{fields:[]}},methods:{getFieldsByNames:function(t){return t?this.fields.filter((function(e){return-1!==t.indexOf(e.name)})):this.fields},validateSeq:function(t){var e=this;return new Promise((function(n,a){var o=[],s=e.getFieldsByNames(t);s.reduce((function(t,e){return t.then((function(){if(!o.length)return e.validate().then((function(t){t&&o.push(t)}))}))}),Promise.resolve()).then((function(){o.length?a(o):n()}))}))},validateFields:function(t){var e=this;return new Promise((function(n,a){var o=e.getFieldsByNames(t);Promise.all(o.map((function(t){return t.validate()}))).then((function(t){t=t.filter((function(t){return t})),t.length?a(t):n()}))}))},validate:function(t){return t&&!Array.isArray(t)?this.validateField(t):this.validateFirst?this.validateSeq(t):this.validateFields(t)},validateField:function(t){var e=this.fields.filter((function(e){return e.name===t}));return e.length?new Promise((function(t,n){e[0].validate().then((function(e){e?n(e):t()}))})):Promise.reject()},resetValidation:function(t){t&&!Array.isArray(t)&&(t=[t]);var e=this.getFieldsByNames(t);e.forEach((function(t){t.resetValidation()}))},scrollToField:function(t,e){this.fields.some((function(n){return n.name===t&&(n.$el.scrollIntoView(e),!0)}))},addField:function(t){this.fields.push(t),Object(o["a"])(this.fields,this)},removeField:function(t){this.fields=this.fields.filter((function(e){return e!==t}))},getValues:function(){return this.fields.reduce((function(t,e){return t[e.name]=e.formValue,t}),{})},onSubmit:function(t){t.preventDefault(),this.submit()},submit:function(){var t=this,e=this.getValues();this.validate().then((function(){t.$emit("submit",e)})).catch((function(n){t.$emit("failed",{values:e,errors:n}),t.scrollToError&&t.scrollToField(n[0].name)}))}},render:function(){var t=arguments[0];return t("form",{class:r(),on:{submit:this.onSubmit}},[this.slots()])}})},cf53:function(t,e,n){"use strict";n("17ed")},ede4:function(t,e,n){"use strict";n.r(e);var a,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login",style:{backgroundImage:"url("+t.bgImage+")"}},[n("div",{staticClass:"login-son"},[n("van-form",{on:{submit:t.onSubmit}},[n("div",{staticClass:"loginDiv"},[n("h3",{staticClass:"register-title"},[t._v("登录")]),n("van-field",{attrs:{autofocus:"","label-align":"center",name:"name",label:"用户名:",placeholder:"请输入用户名"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),n("van-field",{staticClass:"password",attrs:{"label-align":"center",type:"password",name:"password",label:"密码:",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("div",{staticClass:"btn"},[n("span",{staticClass:"btn-left",on:{click:t.btnLeft}},[n("span",{class:{touchColor1:t.whether1},on:{touchstart:t.touchstart,touchend:t.touchend}},[t._v("新用户注册")])]),n("span",{staticClass:"btn-right",on:{click:t.btnRight}},[n("span",{class:{touchColor2:t.whether2},on:{mouseenter:function(e){return t.touchstart()},mouseleave:function(e){return t.touchend()}}},[t._v("我只想做个过客")])])]),n("div",{staticClass:"login-bottom",staticStyle:{margin:"0px 10px"}},[n("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[t._v("登录")])],1)])],1)])},s=[],i=n("ade3"),r=(n("66b9"),n("b650")),l=(n("be7f"),n("565f")),u=(n("7f7f"),n("38d5"),n("772a")),c=n("4424"),d=n.n(c),f={name:"Login",data:function(){return{username:"",password:"",message:"",bgImage:d.a,isShowError:!0,whether1:!1,whether2:!1,pattern:/\d{6}/}},components:(a={},Object(i["a"])(a,u["a"].name,u["a"]),Object(i["a"])(a,l["a"].name,l["a"]),Object(i["a"])(a,r["a"].name,r["a"]),a),methods:{btnLeft:function(){console.log("点击了用户注册"),this.$router.push("/register")},touchstart:function(){this.whether=!0},touchend:function(){this.whether=!1},btnRight:function(){console.log("我只想当个过客"),localStorage.removeItem("authorization"),localStorage.removeItem("userId"),localStorage.removeItem("userName"),this.$router.push("/lostFound")},onSubmit:function(t){console.log("submit",t);var e=this;console.log("点击了登录"),this.$axios.post("/login",{name:e.username,password:e.password}).then((function(t){if(console.log(t),0==t.data.isLogin)console.log(t.data.massage),e.massage=t.data.massage,e.$toast({message:e.massage,position:"top"});else{var n=t.data.token,a=t.data.id,o=t.data.name;console.log(t.data.token),localStorage.setItem("userId",a),localStorage.setItem("userName",o),localStorage.setItem("authorization",n),e.$router.push("/lostFound")}})).catch((function(t){console.log(t)}))}}},h=f,m=(n("cf53"),n("2877")),g=Object(m["a"])(h,o,s,!1,null,"6da58506",null);e["default"]=g.exports}}]);
//# sourceMappingURL=chunk-b02134be.62a87e7e.js.map