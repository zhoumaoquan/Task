(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Profile/taskDetail"],{"144f":function(t,e,n){"use strict";n.r(e);var a=n("1b22"),o=n("9a10");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("aab8");var r,c=n("f0c5"),s=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=s.exports},"1b22":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uLineProgress:function(){return n.e("uview-ui/components/u-line-progress/u-line-progress").then(n.bind(null,"ed00"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"23cf"))}},o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"9a10":function(t,e,n){"use strict";n.r(e);var a=n("a40a"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},a40a:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("a34a")),o=n("e462");function i(t){return t&&t.__esModule?t:{default:t}}function r(t){return l(t)||u(t)||s(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}function u(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return f(t)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function m(t,e,n,a,o,i,r){try{var c=t[i](r),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(a,o)}function d(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var i=t.apply(e,n);function r(t){m(i,a,o,r,c,"next",t)}function c(t){m(i,a,o,r,c,"throw",t)}r(void 0)}))}}var p=function(){Promise.all([n.e("common/vendor"),n.e("component/Z-empty")]).then(function(){return resolve(n("0bd9"))}.bind(null,n)).catch(n.oe)},h={components:{ZEmpty:p},data:function(){return{title:[{title:"全部",id:0},{title:"未审核",id:2},{title:"通过",id:4},{title:"未通过",id:3}],current:0,params:{id:"",p:1,state:0},detail:null,isSkeleton:!0,taskItem:[],ratio:0,flag:!0,status:"loadmore",loadText:{loadmore:"用力往上拉",loading:"正在加载,休息一下吧",nomore:"我也是有底线的~"},timer:null}},onLoad:function(e){t.showLoading({title:"加载中..."}),this.params.id=e.id},onShow:function(){this.getTaskDetail()},onReachBottom:function(){this.flag&&(this.params.p+=1,this.taskLoadMore())},methods:{changeNav:function(t,e){var n=this;this.current!==t&&(this.current=t,this.params.state=e,this.timer&&clearTimeout(this.timer),this.flag=!0,this.params.p=1,this.timer=setTimeout((function(){n.changeTask()}),300))},getTaskDetail:function(){var e=this;return d(a.default.mark((function n(){var i;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,o.taskDetail)(e.params);case 3:i=n.sent,e.detail=i,4!=i.state&&5!=i.state||(e.ratio=Math.round(i.member_task/i.count*100),e.taskItem=i.member_accept_task),e.isSkeleton=!1,t.hideLoading(),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](0),t.showToast({title:n.t0,icon:"none"});case 13:case"end":return n.stop()}}),n,null,[[0,10]])})))()},changeTask:function(){var e=this;(0,o.taskDetail)(this.params).then((function(t){e.taskItem=t.member_accept_task})).catch((function(e){t.showToast({title:e,icon:"none"})}))},taskLoadMore:function(){var e=this;(0,o.taskDetail)(this.params).then((function(t){0===t.member_accept_task.length?(e.params.p-=1,e.flag=!1,e.status="nomore"):e.taskItem=[].concat(r(e.taskItem),r(t.member_accept_task))})).catch((function(e){t.showToast({title:e,icon:"none"})}))},jumpDetail:function(e){t.navigateTo({url:"/pages/Home/receive?type=3&id="+e})},editTask:function(e){var n=t.getStorageSync("m_id");t.navigateTo({url:"/pages/Profile/postTask?m_id="+n+"&id="+e})},pay:function(e){var n=this;t.showLoading({title:"正在支付...",mask:!0});var a=t.getStorageSync("m_id");(0,o.payTask)({m_id:a,id:e}).then((function(e){var a=n;wx.requestPayment({timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType,success:function(e){t.showToast({title:"支付成功",mask:!0,success:function(){setTimeout((function(){a.getTaskDetail()}),1e3)}})},fail:function(e){console.log(e),t.showToast({title:"支付失败",icon:"none"})}})})).catch((function(e){t.showToast({title:e,icon:"none"})}))}}};e.default=h}).call(this,n("543d")["default"])},aab8:function(t,e,n){"use strict";var a=n("b7c9"),o=n.n(a);o.a},b7c9:function(t,e,n){},d2e0:function(t,e,n){"use strict";(function(t){n("fcfa");a(n("66fd"));var e=a(n("144f"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["d2e0","common/runtime","common/vendor"]]]);