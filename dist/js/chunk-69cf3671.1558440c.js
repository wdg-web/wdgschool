(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69cf3671"],{"088c":function(t,e,i){},"1a04":function(t,e,i){},"1e49":function(t,e,i){"use strict";i("8237")},5246:function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("8a0b")},"66b9":function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("e3b3"),i("bc1b")},"67bb":function(t,e,i){"use strict";var n=i("2638"),a=i.n(n),s=i("d282"),o=i("ba31"),l=i("b650"),r=i("e27c"),c=i("c31d"),d=i("ad06"),u=Object(s["a"])("tag"),f=u[0],h=u[1];function b(t,e,i,n){var s,l=e.type,r=e.mark,c=e.plain,u=e.color,f=e.round,b=e.size,g=c?"color":"backgroundColor",p=(s={},s[g]=u,s);e.textColor&&(p.color=e.textColor);var v={mark:r,plain:c,round:f};b&&(v[b]=b);var m=e.closeable&&t(d["a"],{attrs:{name:"cross"},class:h("close"),on:{click:function(t){t.stopPropagation(),Object(o["a"])(n,"close")}}});return t("transition",{attrs:{name:e.closeable?"van-fade":null}},[t("span",a()([{key:"content",style:p,class:h([v,l])},Object(o["b"])(n,!0)]),[null==i.default?void 0:i.default(),m])])}b.props={size:String,mark:Boolean,color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean,type:{type:String,default:"default"}};var g=f(b),p=i("7744"),v=i("9f14"),m=Object(s["a"])("address-item"),x=m[0],k=m[1];function S(t,e,i,n){var s=e.disabled,l=e.switchable;function r(){l&&Object(o["a"])(n,"select"),Object(o["a"])(n,"click")}var u=function(){return t(d["a"],{attrs:{name:"edit"},class:k("edit"),on:{click:function(t){t.stopPropagation(),Object(o["a"])(n,"edit"),Object(o["a"])(n,"click")}}})};function f(){return i.tag?i.tag(Object(c["a"])({},e.data)):e.data.isDefault&&e.defaultTagText?t(g,{attrs:{type:"danger",round:!0},class:k("tag")},[e.defaultTagText]):void 0}function h(){var i=e.data,n=[t("div",{class:k("name")},[i.name+" "+i.tel,f()]),t("div",{class:k("address")},[i.address])];return l&&!s?t(v["a"],{attrs:{name:i.id,iconSize:18}},[n]):n}return t("div",{class:k({disabled:s}),on:{click:r}},[t(p["a"],a()([{attrs:{border:!1,valueClass:k("value")},scopedSlots:{default:h,"right-icon":u}},Object(o["b"])(n)])),null==i.bottom?void 0:i.bottom(Object(c["a"])({},e.data,{disabled:s}))])}S.props={data:Object,disabled:Boolean,switchable:Boolean,defaultTagText:String};var y=x(S),j=Object(s["a"])("address-list"),O=j[0],T=j[1],B=j[2];function w(t,e,i,n){function s(a,s){if(a)return a.map((function(a,l){return t(y,{attrs:{data:a,disabled:s,switchable:e.switchable,defaultTagText:e.defaultTagText},key:a.id,scopedSlots:{bottom:i["item-bottom"],tag:i.tag},on:{select:function(){Object(o["a"])(n,s?"select-disabled":"select",a,l),s||Object(o["a"])(n,"input",a.id)},edit:function(){Object(o["a"])(n,s?"edit-disabled":"edit",a,l)},click:function(){Object(o["a"])(n,"click-item",a,l)}}})}))}var c=s(e.list),d=s(e.disabledList,!0);return t("div",a()([{class:T()},Object(o["b"])(n)]),[null==i.top?void 0:i.top(),t(r["a"],{attrs:{value:e.value}},[c]),e.disabledText&&t("div",{class:T("disabled-text")},[e.disabledText]),d,null==i.default?void 0:i.default(),t("div",{class:T("bottom")},[t(l["a"],{attrs:{round:!0,block:!0,type:"danger",text:e.addButtonText||B("add")},class:T("add"),on:{click:function(){Object(o["a"])(n,"add")}}})])])}w.props={list:Array,value:[Number,String],disabledList:Array,disabledText:String,addButtonText:String,defaultTagText:String,switchable:{type:Boolean,default:!0}};e["a"]=O(w)},"6b41":function(t,e,i){"use strict";var n=i("d282"),a=i("b1d2"),s=i("ad06"),o=Object(n["a"])("nav-bar"),l=o[0],r=o[1];e["a"]=l({props:{title:String,fixed:Boolean,zIndex:[Number,String],leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,safeAreaInsetTop:Boolean,border:{type:Boolean,default:!0}},data:function(){return{height:null}},mounted:function(){this.placeholder&&this.fixed&&(this.height=this.$refs.navBar.getBoundingClientRect().height)},methods:{genLeft:function(){var t=this.$createElement,e=this.slots("left");return e||[this.leftArrow&&t(s["a"],{class:r("arrow"),attrs:{name:"arrow-left"}}),this.leftText&&t("span",{class:r("text")},[this.leftText])]},genRight:function(){var t=this.$createElement,e=this.slots("right");return e||(this.rightText?t("span",{class:r("text")},[this.rightText]):void 0)},genNavBar:function(){var t,e=this.$createElement;return e("div",{ref:"navBar",style:{zIndex:this.zIndex},class:[r({fixed:this.fixed,"safe-area-inset-top":this.safeAreaInsetTop}),(t={},t[a["b"]]=this.border,t)]},[e("div",{class:r("content")},[this.hasLeft()&&e("div",{class:r("left"),on:{click:this.onClickLeft}},[this.genLeft()]),e("div",{class:[r("title"),"van-ellipsis"]},[this.slots("title")||this.title]),this.hasRight()&&e("div",{class:r("right"),on:{click:this.onClickRight}},[this.genRight()])])])},hasLeft:function(){return this.leftArrow||this.leftText||this.slots("left")},hasRight:function(){return this.rightText||this.slots("right")},onClickLeft:function(t){this.$emit("click-left",t)},onClickRight:function(t){this.$emit("click-right",t)}},render:function(){var t=arguments[0];return this.placeholder&&this.fixed?t("div",{class:r("placeholder"),style:{height:this.height+"px"}},[this.genNavBar()]):this.genNavBar()}})},7061:function(t,e,i){"use strict";i.r(e);var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"address"}},[i("goback",{attrs:{title:t.title}}),i("van-address-list",{attrs:{list:t.list,"default-tag-text":"默认","add-button-text":t.addBtnText,id:"van-address"},on:{add:t.onAdd,edit:t.onEdit},model:{value:t.chosenAddressId,callback:function(e){t.chosenAddressId=e},expression:"chosenAddressId"}}),i("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showbtn,expression:"showbtn"}],staticStyle:{display:"block",margin:"0 auto","margin-top":"-10px"},attrs:{color:"#1da93b",plain:""},on:{click:t.selectAddress}},[t._v(t._s(t.addressType))])],1)},s=[],o=(i("ac6a"),i("ade3")),l=(i("66b9"),i("b650")),r=(i("7f7f"),i("acb7"),i("67bb")),c=i("bb9a"),d={name:"Address",components:(n={},Object(o["a"])(n,r["a"].name,r["a"]),Object(o["a"])(n,l["a"].name,l["a"]),Object(o["a"])(n,"Goback",c["a"]),n),data:function(){return{title:"用户地址",chosenAddressId:"1",list:[{id:"1",name:"张三",tel:"13000000000",address:"浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",isDefault:!0},{id:"8",name:"李四",tel:"1310000000",address:"浙江省杭州市拱墅区莫干山路 50 号"}],addBtnText:"添加地址",addressType:"选择地址",showbtn:!1,fromType:"",toAddressUrl:""}},beforeRouteEnter:function(t,e,i){i((function(t){console.log(e.path),t.toAddressUrl=e.path,"/order"==t.toAddressUrl&&(t.showbtn=!0),"/profile"==t.toAddressUrl&&(t.showbtn=!1)}))},created:function(){var t=this;this.getAddressList(),this.$root.Bus.$on("saveAddress",(function(e){console.log(e),t.getAddressList()}))},methods:{getAddressList:function(){var t=this;this.$axios.get("/users/getAddress").then((function(e){console.log(e.data);var i=e.data;console.log(t.fromType),console.log(t.showbtn),console.log(t.toAddressUrl),"/order"==t.toAddressUrl?(0==i.length&&(console.log("隐藏选择地址按钮"),t.showbtn=!1),console.log(0!=i.length),0!=i.length&&(console.log("显示选择地址按钮"),t.showbtn=!0)):(console.log("从"+t.toAddressUrl+"进入"),t.showbtn=!1),i.forEach((function(e){console.log(e),e.id=e.id+"",1==e.isDefault?(t.chosenAddressId=e.id+"",e.isDefault=!0):e.isDefault=!1})),t.list=i,console.log(t.list)})).catch((function(t){console.log(t)}))},selectAddress:function(){console.log(this.chosenAddressId),this.$router.push({path:"/order",query:{chosenAddressId:this.chosenAddressId,isSelectAddress:!0}})},onAdd:function(){this.$router.push("/addressEdit")},onEdit:function(t,e){console.log(this.chosenAddressId),console.log(t),this.$router.push({path:"/addressEdit",query:{item:t}})}}},u=d,f=(i("1e49"),i("2877")),h=Object(f["a"])(u,a,s,!1,null,"1be1cfd9",null);e["default"]=h.exports},7744:function(t,e,i){"use strict";var n=i("c31d"),a=i("2638"),s=i.n(a),o=i("d282"),l=i("a142"),r=i("ba31"),c=i("48f4"),d=i("dfaf"),u=i("ad06"),f=Object(o["a"])("cell"),h=f[0],b=f[1];function g(t,e,i,n){var a,o=e.icon,d=e.size,f=e.title,h=e.label,g=e.value,p=e.isLink,v=i.title||Object(l["c"])(f);function m(){var n=i.label||Object(l["c"])(h);if(n)return t("div",{class:[b("label"),e.labelClass]},[i.label?i.label():h])}function x(){if(v)return t("div",{class:[b("title"),e.titleClass],style:e.titleStyle},[i.title?i.title():t("span",[f]),m()])}function k(){var n=i.default||Object(l["c"])(g);if(n)return t("div",{class:[b("value",{alone:!v}),e.valueClass]},[i.default?i.default():t("span",[g])])}function S(){return i.icon?i.icon():o?t(u["a"],{class:b("left-icon"),attrs:{name:o,classPrefix:e.iconPrefix}}):void 0}function y(){var n=i["right-icon"];if(n)return n();if(p){var a=e.arrowDirection;return t(u["a"],{class:b("right-icon"),attrs:{name:a?"arrow-"+a:"arrow"}})}}function j(t){Object(r["a"])(n,"click",t),Object(c["a"])(n)}var O=null!=(a=e.clickable)?a:p,T={clickable:O,center:e.center,required:e.required,borderless:!e.border};return d&&(T[d]=d),t("div",s()([{class:b(T),attrs:{role:O?"button":null,tabindex:O?0:null},on:{click:j}},Object(r["b"])(n)]),[S(),x(),k(),y(),null==i.extra?void 0:i.extra()])}g.props=Object(n["a"])({},d["a"],c["c"]),e["a"]=h(g)},"78eb":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var n={inject:{vanField:{default:null}},watch:{value:function(){var t=this.vanField;t&&(t.resetValidation(),t.validateWithTrigger("onChange"))}},created:function(){var t=this.vanField;t&&!t.children&&(t.children=this)}}},8237:function(t,e,i){},"8a0b":function(t,e,i){},"9b7e":function(t,e,i){},"9f14":function(t,e,i){"use strict";var n=i("d282"),a=i("ad06"),s=i("78eb"),o=i("9884"),l=i("ea8e"),r=function(t){var e=t.parent,i=t.bem,n=t.role;return{mixins:[Object(o["a"])(e),s["a"]],props:{name:null,value:null,disabled:Boolean,iconSize:[Number,String],checkedColor:String,labelPosition:String,labelDisabled:Boolean,shape:{type:String,default:"round"},bindGroup:{type:Boolean,default:!0}},computed:{disableBindRelation:function(){return!this.bindGroup},isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled},direction:function(){return this.parent&&this.parent.direction||null},iconStyle:function(){var t=this.checkedColor||this.parent&&this.parent.checkedColor;if(t&&this.checked&&!this.isDisabled)return{borderColor:t,backgroundColor:t}},tabindex:function(){return this.isDisabled||"radio"===n&&!this.checked?-1:0}},methods:{onClick:function(t){var e=this,i=t.target,n=this.$refs.icon,a=n===i||n.contains(i);this.isDisabled||!a&&this.labelDisabled?this.$emit("click",t):(this.toggle(),setTimeout((function(){e.$emit("click",t)})))},genIcon:function(){var t=this.$createElement,e=this.checked,n=this.iconSize||this.parent&&this.parent.iconSize;return t("div",{ref:"icon",class:i("icon",[this.shape,{disabled:this.isDisabled,checked:e}]),style:{fontSize:Object(l["a"])(n)}},[this.slots("icon",{checked:e})||t(a["a"],{attrs:{name:"success"},style:this.iconStyle})])},genLabel:function(){var t=this.$createElement,e=this.slots();if(e)return t("span",{class:i("label",[this.labelPosition,{disabled:this.isDisabled}])},[e])}},render:function(){var t=arguments[0],e=[this.genIcon()];return"left"===this.labelPosition?e.unshift(this.genLabel()):e.push(this.genLabel()),t("div",{attrs:{role:n,tabindex:this.tabindex,"aria-checked":String(this.checked)},class:i([{disabled:this.isDisabled,"label-disabled":this.labelDisabled},this.direction]),on:{click:this.onClick}},[e])}}},c=Object(n["a"])("radio"),d=c[0],u=c[1];e["a"]=d({mixins:[r({bem:u,role:"radio",parent:"vanRadio"})],computed:{currentValue:{get:function(){return this.parent?this.parent.value:this.value},set:function(t){(this.parent||this).$emit("input",t)}},checked:function(){return this.currentValue===this.name}},methods:{toggle:function(){this.currentValue=this.name}}})},acb7:function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("dde9"),i("9b7e"),i("1a04"),i("e3b3"),i("bc1b"),i("dc1b"),i("e2c8")},b650:function(t,e,i){"use strict";var n=i("c31d"),a=i("2638"),s=i.n(a),o=i("d282"),l=i("ba31"),r=i("b1d2"),c=i("48f4"),d=i("ad06"),u=i("543e"),f=Object(o["a"])("button"),h=f[0],b=f[1];function g(t,e,i,n){var a,o=e.tag,f=e.icon,h=e.type,g=e.color,p=e.plain,v=e.disabled,m=e.loading,x=e.hairline,k=e.loadingText,S=e.iconPosition,y={};function j(t){m||v||(Object(l["a"])(n,"click",t),Object(c["a"])(n))}function O(t){Object(l["a"])(n,"touchstart",t)}g&&(y.color=p?g:"white",p||(y.background=g),-1!==g.indexOf("gradient")?y.border=0:y.borderColor=g);var T=[b([h,e.size,{plain:p,loading:m,disabled:v,hairline:x,block:e.block,round:e.round,square:e.square}]),(a={},a[r["d"]]=x,a)];function B(){return m?i.loading?i.loading():t(u["a"],{class:b("loading"),attrs:{size:e.loadingSize,type:e.loadingType,color:"currentColor"}}):f?t(d["a"],{attrs:{name:f,classPrefix:e.iconPrefix},class:b("icon")}):void 0}function w(){var n,a=[];return"left"===S&&a.push(B()),n=m?k:i.default?i.default():e.text,n&&a.push(t("span",{class:b("text")},[n])),"right"===S&&a.push(B()),a}return t(o,s()([{style:y,class:T,attrs:{type:e.nativeType,disabled:v},on:{click:j,touchstart:O}},Object(l["b"])(n)]),[t("div",{class:b("content")},[w()])])}g.props=Object(n["a"])({},c["c"],{text:String,icon:String,color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:String,loadingText:String,loadingType:String,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"},loadingSize:{type:String,default:"20px"},iconPosition:{type:String,default:"left"}}),e["a"]=h(g)},bb9a:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"go"}},[i("van-nav-bar",{attrs:{"safe-area-inset-top":"",title:t.title,fixed:"",placeholder:"",id:"the-icon"},on:{"click-left":t.onClickLeft},scopedSlots:t._u([{key:"left",fn:function(){return[i("van-icon",{staticClass:"icon-size",attrs:{name:"arrow-left"}}),i("span",{staticClass:"icon-size"},[t._v("返回")])]},proxy:!0}])})],1)},s=[],o=i("ade3"),l=(i("c3a6"),i("ad06")),r=(i("7f7f"),i("5246"),i("6b41")),c={name:"Goback",props:{title:{type:String,default:function(){return"详情"}}},components:(n={},Object(o["a"])(n,r["a"].name,r["a"]),Object(o["a"])(n,l["a"].name,l["a"]),n),data:function(){return{}},methods:{onClickLeft:function(){this.$router.go(-1)}}},d=c,u=(i("be99"),i("2877")),f=Object(u["a"])(d,a,s,!1,null,null,null);e["a"]=f.exports},bc1b:function(t,e,i){},be99:function(t,e,i){"use strict";i("088c")},dc1b:function(t,e,i){},dde9:function(t,e,i){},dfaf:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var n={icon:String,size:String,center:Boolean,isLink:Boolean,required:Boolean,iconPrefix:String,titleStyle:null,titleClass:null,valueClass:null,labelClass:null,title:[Number,String],value:[Number,String],label:[Number,String],arrowDirection:String,border:{type:Boolean,default:!0},clickable:{type:Boolean,default:null}}},e27c:function(t,e,i){"use strict";var n=i("d282"),a=i("78eb"),s=i("9884"),o=Object(n["a"])("radio-group"),l=o[0],r=o[1];e["a"]=l({mixins:[Object(s["b"])("vanRadio"),a["a"]],props:{value:null,disabled:Boolean,direction:String,checkedColor:String,iconSize:[Number,String]},watch:{value:function(t){this.$emit("change",t)}},render:function(){var t=arguments[0];return t("div",{class:r([this.direction]),attrs:{role:"radiogroup"}},[this.slots()])}})},e2c8:function(t,e,i){}}]);
//# sourceMappingURL=chunk-69cf3671.1558440c.js.map