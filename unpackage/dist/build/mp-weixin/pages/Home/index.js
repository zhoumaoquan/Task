(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Home/index"],{"3b1b":function(t,e,n){},"4a97":function(t,e,n){"use strict";n.r(e);var o=n("570b"),a=n("4f9a");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("caf6");var s,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=u.exports},"4f9a":function(t,e,n){"use strict";n.r(e);var o=n("6215"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},"570b":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uSticky:function(){return n.e("uview-ui/components/u-sticky/u-sticky").then(n.bind(null,"db76"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"23cf"))},uLoading:function(){return n.e("uview-ui/components/u-loading/u-loading").then(n.bind(null,"a7b0"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"7b61"))},uTopTips:function(){return n.e("uview-ui/components/u-top-tips/u-top-tips").then(n.bind(null,"ad0a"))}},a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.isShow=!0},t.e1=function(e){t.isShow=!0},t.e2=function(e){t.isShow=!1},t.e3=function(e){t.isAddress=!1},t.e4=function(e){t.isOpen=!1})},i=[]},6215:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("a34a")),a=n("5259");function i(t){return t&&t.__esModule?t:{default:t}}function s(t){return f(t)||c(t)||u(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,e){if(t){if("string"===typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function f(t){if(Array.isArray(t))return l(t)}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function d(t,e,n,o,a,i,s){try{var r=t[i](s),u=r.value}catch(c){return void n(c)}r.done?e(u):Promise.resolve(u).then(o,a)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function s(t){d(i,o,a,s,r,"next",t)}function r(t){d(i,o,a,s,r,"throw",t)}s(void 0)}))}}var m=function(){n.e("component/TaskItem").then(function(){return resolve(n("325e"))}.bind(null,n)).catch(n.oe)},v=function(){n.e("component/TaskActivity").then(function(){return resolve(n("4223"))}.bind(null,n)).catch(n.oe)},p=function(){Promise.all([n.e("common/vendor"),n.e("component/Z-empty")]).then(function(){return resolve(n("0bd9"))}.bind(null,n)).catch(n.oe)},g={components:{TaskItem:m,TaskActivity:v,ZEmpty:p},data:function(){return{current:0,longitude:"",latitude:"",isShow:!1,isAddress:!1,isOpen:!1,isLoading:!0,flag:!0,banners:[],timer:null,taskParams:{p:1,sorts:1,m_id:""},eventParams:{p:1,m_id:""},tasksList:[],eventList:[],tasksStatus:"loadmore",eventStatus:"loadmore",loadText:{loadmore:"轻轻上拉加载更多",loading:"努力加载中",nomore:"实在没有了"},markers:[],reward:{members_moeny:"",moeny:""}}},onLoad:function(e){var n=this;t.showLoading({title:"加载中..."}),e.parent_code&&t.setStorageSync("code",e.parent_code),this.getBannerList(),t.authorize({scope:"scope.userLocation",success:function(){n.getAddress()}})},onShow:function(){var e=t.getStorageSync("m_id");this.taskParams.m_id=e,this.eventParams.m_id=e,this.refresh()},onPullDownRefresh:function(){this.refresh(),t.stopPullDownRefresh(),this.$refs.uTips.show({title:"刷新成功",type:"success",duration:"1500"})},onReachBottom:function(){2!=this.current&&this.flag&&(0==this.current?this.onReachTask():this.onReachEvent())},methods:{getAddress:function(e){var n=this;t.getLocation({type:"gcj02",success:function(t){n.longitude=t.longitude,n.latitude=t.latitude,e&&(n.current=2)}})},navigation:function(e,n){switch(Number(e)){case 1:break;case 2:t.navigateTo({url:"/pages/Home/webview?url="+encodeURIComponent(JSON.stringify(n))});break;case 3:t.navigateTo({url:"/pages/Home/receive?id="+n+"&type=1"});break;case 4:t.navigateTo({url:"/pages/Home/redEnvelope?id="+n+"&m_id="+this.eventParams.m_id});break;default:break}},currentChnage:function(t){if(this.current!==t)switch(this.current=t,this.flag=!0,t){case 0:this.getTaskList();break;case 1:this.getHomeEvent();break;default:}},currentMap:function(t){this.current!==t&&(this.authorization(),this.getEventMap())},refresh:function(){this.flag=!0,this.eventParams.p=1,this.taskParams.p=1,this.tasksStatus="loadmore",this.eventStatus="loadmore",this.getTaskList(),this.getHomeEvent()},authorization:function(){var e=this;t.getSetting({success:function(t){var n=t.authSetting["scope.userLocation"];n?e.current=2:e.isAddress=!0}})},goAddress:function(){this.isAddress=!1;var e=this;t.openSetting({success:function(t){var n=t.authSetting["scope.userLocation"];n&&e.getAddress(!0)},fail:function(t){console.log(t)}})},getBannerList:function(){var e=this;return h(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,a.getBanner)();case 3:i=n.sent,e.banners=i,t.hideLoading(),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),t.showToast({title:n.t0,icon:"none"});case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()},getTaskList:function(){var e=this;return h(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,a.taskList)(e.taskParams);case 3:i=n.sent,e.tasksList=i,e.isLoading=!1,n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),t.showToast({title:n.t0,icon:"none"});case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()},getHomeEvent:function(){var e=this;(0,a.homeEvent)(this.eventParams).then((function(t){e.eventList=t})).catch((function(e){t.showToast({title:e,icon:"none"})}))},getEventMap:function(){var e=this;(0,a.eventMap)().then((function(t){e.markers=t})).catch((function(e){t.showToast({title:e,icon:"none"})}))},goLogin:function(){var e=this;t.navigateTo({url:"/pages/Profile/login",success:function(){e.isShow=!1}})},taskSortChange:function(t){var e=this,n=this.taskParams.sorts;n!==t&&(this.timer&&clearTimeout(this.timer),this.isLoading=!0,this.taskParams.sorts=t,this.timer=setTimeout((function(){e.getTaskList()}),500))},calloutChange:function(e){var n=e.detail.markerId,o=t.getStorageSync("m_id");if(""===o||void 0===o)return this.isShow=!0;t.navigateTo({url:"/pages/Home/redEnvelope?id="+n+"&m_id="+o})},onReachTask:function(){var e=this;return h(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,e.taskStatus="loading",e.taskParams.p+=1,n.next=5,(0,a.taskList)(e.taskParams);case 5:i=n.sent,0===i.length?(e.taskParams.p-=1,e.flag=!1,e.taskStatus="nomore",t.showToast({title:"没有更多数据了",icon:"none"})):(e.taskStatus="loadmore",e.taskList=[].concat(s(e.taskList),s(i))),n.next=13;break;case 9:n.prev=9,n.t0=n["catch"](0),e.taskStatus="nomore",t.showToast({title:n.t0,icon:"none"});case 13:case"end":return n.stop()}}),n,null,[[0,9]])})))()},onReachEvent:function(){var e=this;return h(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,e.eventStatus="loading",e.eventParams.p+=1,n.next=5,(0,a.homeEvent)(e.eventParams);case 5:i=n.sent,0===i.length?(e.eventParams.p-=1,e.flag=!1,e.eventStatus="nomore",t.showToast({title:"没有更多数据了",icon:"none"})):(e.eventStatus="loadmore",e.eventList=[].concat(s(e.eventList),s(i))),n.next=13;break;case 9:n.prev=9,n.t0=n["catch"](0),e.eventStatus="nomore",t.showToast({title:n.t0,icon:"none"});case 13:case"end":return n.stop()}}),n,null,[[0,9]])})))()},eventReceive:function(e){var n=this,o=t.getStorageSync("m_id");if(""===o||void 0===o)return this.isShow=!0;(0,a.receive)({m_id:this.eventParams.m_id,type:e.type,id:e.id}).then((function(o){if(n.eventParams.p=1,n.getHomeEvent(),3!=e.type){var a=n;n.reward.moeny=o.moeny,n.reward.members_moeny=o.members_moeny,t.showToast({title:"领取成功",mask:!0,success:function(){setTimeout((function(){a.isOpen=!0}),1e3)}})}else t.showToast({title:"领取成功"})})).catch((function(e){t.showToast({title:e,icon:"none"})}))}}};e.default=g}).call(this,n("543d")["default"])},"6c5f":function(t,e,n){"use strict";(function(t){n("fcfa");o(n("66fd"));var e=o(n("4a97"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},caf6:function(t,e,n){"use strict";var o=n("3b1b"),a=n.n(o);a.a}},[["6c5f","common/runtime","common/vendor"]]]);