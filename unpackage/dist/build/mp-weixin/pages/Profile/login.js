(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Profile/login"],{5604:function(e,n,t){"use strict";t.r(n);var a=t("d719"),r=t.n(a);for(var u in a)"default"!==u&&function(e){t.d(n,e,(function(){return a[e]}))}(u);n["default"]=r.a},5995:function(e,n,t){},"5ef8":function(e,n,t){"use strict";var a=t("5995"),r=t.n(a);r.a},"8fdc":function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return a}));var a={uImage:function(){return t.e("uview-ui/components/u-image/u-image").then(t.bind(null,"fe06"))},uIcon:function(){return t.e("uview-ui/components/u-icon/u-icon").then(t.bind(null,"7518"))}},r=function(){var e=this,n=e.$createElement;e._self._c},u=[]},"928b":function(e,n,t){"use strict";t.r(n);var a=t("8fdc"),r=t("5604");for(var u in r)"default"!==u&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t("5ef8");var i,o=t("f0c5"),c=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=c.exports},cc37:function(e,n,t){"use strict";(function(e){t("fcfa");a(t("66fd"));var n=a(t("928b"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},d719:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(t("a34a")),r=t("7740"),u=t("a7d9");function i(e){return e&&e.__esModule?e:{default:e}}function o(e,n,t,a,r,u,i){try{var o=e[u](i),c=o.value}catch(s){return void t(s)}o.done?n(c):Promise.resolve(c).then(a,r)}function c(e){return function(){var n=this,t=arguments;return new Promise((function(a,r){var u=e.apply(n,t);function i(e){o(u,a,r,i,c,"next",e)}function c(e){o(u,a,r,i,c,"throw",e)}i(void 0)}))}}var s={data:function(){return{params:{openid:"",nickname:"",avatar:"",sex:"",t_mid:""}}},onLoad:function(n){var t=e.getStorageSync("code");t&&""!==t&&(this.params.t_mid=t)},methods:{userLogin:function(n){var t=this;e.showLoading({title:"授权登陆中...",mask:!0}),e.login({provider:"weixin",timeout:6e3,success:function(){var i=c(a.default.mark((function i(o){var c,s,f,d,l,m;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,(0,r.getCode)(o.code);case 3:if(c=a.sent,s=c.openid,f=c.is_ro,d=c.m_id,1!=f||""===d){a.next=10;break}return e.setStorageSync("m_id",d),a.abrupt("return",e.showToast({title:"登陆成功",mask:!0,success:function(){setTimeout((function(){e.navigateBack({delta:1})}),1500)}}));case 10:return a.prev=10,a.next=13,(0,u.downloadFile)(n.detail.userInfo.avatarUrl);case 13:return l=a.sent,a.next=16,(0,u.uploadImage)({url:"Personal/upload",imgUrl:l.tempFilePath});case 16:m=a.sent,t.params.avatar=m.data.list[0].id,a.next=23;break;case 20:return a.prev=20,a.t0=a["catch"](10),a.abrupt("return",e.showToast({title:a.t0,icon:"none"}));case 23:t.params.openid=s,t.params.gender=n.detail.userInfo.gender,t.params.nickname=n.detail.userInfo.nickName,t.params.sex=n.detail.userInfo.sex,t.exchangeMid(),a.next=33;break;case 30:return a.prev=30,a.t1=a["catch"](0),a.abrupt("return",e.showToast({title:a.t1,icon:"none"}));case 33:case"end":return a.stop()}}),i,null,[[0,30],[10,20]])})));function o(e){return i.apply(this,arguments)}return o}()})},exchangeMid:function(){(0,r.saveUserInfo)(this.params).then((function(n){e.setStorageSync("m_id",n.m_id),e.showToast({title:"登陆成功",mask:!0,success:function(){setTimeout((function(){return e.navigateBack({delta:1})}),1500)}})})).catch((function(n){return e.showToast({title:n,icon:"none"})}))}}};n.default=s}).call(this,t("543d")["default"])}},[["cc37","common/runtime","common/vendor"]]]);