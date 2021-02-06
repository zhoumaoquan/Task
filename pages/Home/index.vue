<template>
	<view class="container">
		<swiper class="swiper-box" indicator-active-color="#ffffff" :indicator-dots="true" :autoplay="true">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<image class="swiper-image" @click="navigation(item.banner_rule, item.banner_parame)" :src="item.banner_image_img" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<u-sticky>
			<view class="app-options">
				<view class="app-options-item" :class="{ active: current === 0 }" @click="currentChnage(0)">
					<text>悬赏任务</text>
				</view>
				<view class="app-options-item" :class="{ active: current === 1 }" @click="currentChnage(1)">
					<text>附近活动</text>
				</view>
				<view class="app-options-item" :class="{ active: current === 2 }" @click="currentMap(2)">
					<text>活动地图</text>
				</view>
			</view>
		</u-sticky>
		<view class="app-box">
			<!-- 悬赏任务 -->
			<view class="app-box-task" v-show="current === 0">
				<view class="task-options">
					<view class="task-options-item" :class="{ active: taskParams.sorts === 1 }" @click="taskSortChange(1)">
						<text>最新悬赏</text>
					</view>
					<view class="task-options-item" :class="{ active: taskParams.sorts === 2 }" @click="taskSortChange(2)">
						<text>高价悬赏</text>
					</view>
					<view class="task-options-item" :class="{ active: taskParams.sorts === 3 }" @click="taskSortChange(3)">
						<text>低价悬赏</text>
					</view>
				</view>
				<view class="task-box">
					<block v-if="tasksList.length > 0">
						<task-item v-for="(item, index) in tasksList" :key="item.task_id" @onLogin="isShow = true" :context="item"></task-item>

						<u-loadmore v-if="taskList.length > 3" :status="tasksStatus" margin-top="30" color="#999" margin-bottom="30"
						 :load-text="loadText" />
					</block>
					<block v-else>
						<z-empty text="暂无悬赏任务~"></z-empty>
					</block>
				</view>
			</view>
			<!-- 附近活动 -->
			<view class="app-box-activity" v-show="current === 1">
				<block v-if="eventList.length > 0">
					<task-activity @receive="eventReceive" type="1" v-for="(item, index) in eventList" @login="isShow = true" :key="item.id" :detail="item"></task-activity>

					<u-loadmore v-if="eventList.length > 2" :status="eventStatus" margin-top="30" color="#999" margin-bottom="30"
					 :load-text="loadText" />
				</block>
				<block v-else>
					<z-empty text="附近暂没有活动~"></z-empty>
				</block>

			</view>
			<!-- 活动地图 -->
			<view class="app-box-map" v-if="current === 2">
				<map class="map" scale="19" :enable-building="false" @callouttap="calloutChange" :enable-zoom="true" show-location :longitude="longitude"
				 :latitude="latitude" :markers="markers">
					<cover-view slot="callout">
						<cover-view class="map-markers" :class="{ 'bg-1': item.type == 1, 'bg-2': item.type == 2, 'bg-3': item.type == 3 }" :marker-id="item.id" v-for="(item, index) in markers" :key="item.id">
							<cover-image class="map-markers-img" :src="item.info.info_image[0].abs_url"></cover-image>
							<cover-view class="map-markers-box">
								<cover-view class="map-markers-title">{{item.info.info_name}}</cover-view>
								<cover-view v-if="item.type == 1" class="map-markers-text">红包金额：￥{{item.info.info_moeny}}</cover-view>
								<cover-view v-if="item.type == 2" class="map-markers-text">红包金额：￥{{item.info.info_moeny}}</cover-view>
								<cover-view v-if="item.type == 3" class="map-markers-text">{{item.info.info_moeny}}</cover-view>
							</cover-view>
							<cover-image class="map-markers-icon" src="@/static/icon/arr-right.png"></cover-image>
						</cover-view>
					</cover-view>
				</map>
			</view>

			<view class="app-loading" v-show="isLoading">
				<u-loading size="60" mode="circle" color="#FA7F1A"></u-loading>
			</view>
		</view>

		<u-popup v-model="isShow" mode="center" border-radius="20">
			<view class="popup-model">
				<view class="popup-model-title">
					<text>提示</text>
				</view>
				<view class="popup-model-context">
					您还未登录，请登录后操作
				</view>
				<view class="popup-model-btn">
					<view class="btn-item defalut-btn" @click="goLogin">
						立即登录
					</view>
					<view class="btn-item btn-close" @click="isShow = false">
						取消
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup v-model="isAddress" mode="center" border-radius="20">
			<view class="popup-model">
				<view class="popup-model-title">
					<text>提示</text>
				</view>
				<view class="popup-model-context">
					您还未授权地理信息位置,请授权
				</view>
				<view class="popup-model-btn">
					<view class="btn-item defalut-btn" @click="goAddress">
						去授权
					</view>
					<view class="btn-item btn-close" @click="isAddress = false">
						取消
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup v-model="isOpen" mode="center" :mask-close-able="false" border-radius="20">
			<view class="popup-model">
				<view class="popup-model-title">
					<text>恭喜获得</text>
				</view>
				<view class="popup-model-context">
					<view class="popup-model-price">
						<text class="price">{{reward.members_moeny}}</text>
						<text class="params">元</text>
					</view>
					<view class="popup-model-text" v-if="reward.moeny">
						推荐人获得 ￥{{reward.moeny}}
					</view>
				</view>
				<view class="defalut-btn popup-model-define" @click="isOpen = false">知道了</view>
			</view>
		</u-popup>
		
		<u-top-tips ref="uTips" />
	</view>
</template>

<script>
	import TaskItem from '@/component/TaskItem.vue';
	import TaskActivity from '@/component/TaskActivity.vue'
	import ZEmpty from '@/component/Z-empty.vue'

	import {
		getBanner,
		taskList,
		homeEvent,
		eventMap,
		receive
	} from '@/network/home-api'
	export default {
		components: {
			TaskItem,
			TaskActivity,
			ZEmpty
		},
		data() {
			return {
				current: 0,
				longitude: '',
				latitude: '',
				isShow: false,
				isAddress: false,
				isOpen: false,
				isLoading: true, // 开启加载
				flag: true,
				banners: [],
				timer: null,
				taskParams: {
					p: 1,
					sorts: 1,
					m_id: ''
				},
				eventParams: {
					p: 1,
					m_id: ''
				},
				tasksList: [],
				eventList: [],
				tasksStatus: 'loadmore',
				eventStatus: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				markers: [],
				reward: {
					members_moeny: '',
					moeny: ''
				}
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			
			if(option.parent_code) {
				uni.setStorageSync('code', option.parent_code)
			}
			
			this.getBannerList();
			uni.authorize({
				scope: 'scope.userLocation',
				success: () => {
					this.getAddress()
				}
			})
		},
		onShow() {
			const m_id = uni.getStorageSync('m_id')
			this.taskParams.m_id = m_id
			this.eventParams.m_id = m_id
		
			this.refresh()
		},
		onPullDownRefresh() {
			
			this.refresh()

			uni.stopPullDownRefresh()
			this.$refs.uTips.show({
				title: '刷新成功',
				type: 'success',
				duration: '1500'
			})
		},
		onReachBottom() {
			if (this.current == 2) {
				return
			}
			if (this.flag) {
				if (this.current == 0) {
					this.onReachTask()
				} else {
					this.onReachEvent()
				}
			}
		},
		methods: {
			// 获取地理位置
			getAddress(map) {
				let that = this
				uni.getLocation({
					type: 'gcj02',
					success(res) {
						that.longitude = res.longitude
						that.latitude = res.latitude
						
						if(map) {
							that.current = 2
						}
					}
				})
			},
			// 跳转规则
			navigation(id, param) {
				switch (Number(id)) {
					case 1:
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/Home/webview?url=' + encodeURIComponent(JSON.stringify(param))
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/Home/receive?id=' + param + '&type=1'
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/Home/redEnvelope?id=' + param + '&m_id=' + this.eventParams.m_id
						})
						break;
					default:
						break;
				}
			},
			currentChnage(index) {
				if (this.current === index) {
					return
				}
				
				this.current = index
				this.flag = true

				switch (index) {
					case 0:
						this.getTaskList()
						break;
					case 1:
						this.getHomeEvent()
						break;
					default: 
				}
			},
			currentMap(index) {
				if (this.current === index) {
					return
				}
				this.authorization();
				this.getEventMap()
			},
			refresh() {
				this.flag = true
				this.eventParams.p = 1
				this.taskParams.p = 1
				this.tasksStatus = 'loadmore'
				this.eventStatus = 'loadmore'
				
				
				this.getTaskList()
				this.getHomeEvent()
			},
			// 判断授权
			authorization() {
				let that = this
				uni.getSetting({
					success(res) {
						let userLocation = res.authSetting['scope.userLocation']
						if(!userLocation) {
							that.isAddress = true
						} else {
							that.current = 2
						}
					}
				})
			},
			goAddress() {
				this.isAddress = false
				let that = this
				uni.openSetting({
					success(res) {
						let userLocation = res.authSetting['scope.userLocation']
						
						if(userLocation) {
							that.getAddress(true)
						}
					},
					fail(e) {
						console.log(e)
					}
				})
			},
			// 获取banner
			async getBannerList() {
				try {
					let res = await getBanner()
					this.banners = res
					uni.hideLoading()
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 获取任务列表
			async getTaskList() {
				try {
					let res = await taskList(this.taskParams)

					this.tasksList = res

					this.isLoading = false
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 获取活动数据
			getHomeEvent() {
				homeEvent(this.eventParams).then(res => {

					this.eventList = res

				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 活动地图数据
			getEventMap() {
				eventMap().then(res => {
					this.markers = res
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 跳转登陆
			goLogin() {
				uni.navigateTo({
					url: '/pages/Profile/login',
					success: () => {
						this.isShow = false
					}
				})
			},
			// 任务排序切换
			taskSortChange(index) {
				const {
					sorts
				} = this.taskParams
				if (sorts === index) {
					return;
				}
				if (this.timer) {
					clearTimeout(this.timer)
				}

				this.isLoading = true
				this.taskParams.sorts = index

				this.timer = setTimeout(() => {
					this.getTaskList()
				}, 500)
			},
			calloutChange(e) {
				let id = e.detail.markerId
				let m_id = uni.getStorageSync('m_id')
				if(m_id === '' || m_id === undefined) {
					return this.isShow = true
				}
				
				uni.navigateTo({
					url: '/pages/Home/redEnvelope?id=' + id + '&m_id=' + m_id
				})
			},
			// 任务列表上拉加载
			async onReachTask() {
				try {
					this.taskStatus = 'loading'
					this.taskParams.p += 1

					let res = await taskList(this.taskParams)

					if (res.length === 0) {
						this.taskParams.p -= 1
						this.flag = false
						this.taskStatus = 'nomore'
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none'
						})
					} else {
						this.taskStatus = 'loadmore'
						this.taskList = [...this.taskList, ...res]
					}

				} catch (e) {
					this.taskStatus = 'nomore'
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			async onReachEvent() {
				try {
					this.eventStatus = 'loading'
					this.eventParams.p += 1

					let res = await homeEvent(this.eventParams)

					if (res.length === 0) {
						this.eventParams.p -= 1
						this.flag = false
						this.eventStatus = 'nomore'
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none'
						})
					} else {
						this.eventStatus = 'loadmore'
						this.eventList = [...this.eventList, ...res]
					}

				} catch (e) {
					this.eventStatus = 'nomore'
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 活动领取
			eventReceive(param) {
				let m_id = uni.getStorageSync('m_id')
				if(m_id === '' || m_id === undefined) {
					return this.isShow = true
				}
				
				receive({
					m_id: this.eventParams.m_id,
					type: param.type,
					id: param.id
				}).then(res => {
					this.eventParams.p = 1
					this.getHomeEvent()
					
					if(param.type != 3) {
						let that = this
						this.reward.moeny = res.moeny
						this.reward.members_moeny = res.members_moeny
						
						uni.showToast({
							title: '领取成功',
							mask: true,
							success() {
								setTimeout(() => {
									that.isOpen = true
								},1000)
							}
						})
					} else {
						uni.showToast({
							title: '领取成功',
						})
					}
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.swiper-box {
		margin: 0 auto;
		margin-top: 30rpx;
		width: 690rpx;
		height: 360rpx;
		border-radius: 5rpx;
	}

	.swiper-image {
		width: 100%;
		height: 100%;
	}

	.app-options {
		width: 100%;
		height: 96rpx;
		border-bottom: 1px solid #F9F9FA;
		@include flex-al();
		background-color: #FFFFFF;

		&-item {
			flex: 1;
			height: 100%;
			@include flex-center();
			font-size: 30rpx;
			color: #999999;
			font-weight: 400;
		}
	}

	.app-options-item.active {
		color: #ED4015;
		font-weight: 600;
		position: relative;
	}

	.app-options-item.active::after {
		content: " ";
		@include position-ju();
		bottom: 2rpx;
		width: 64rpx;
		height: 8rpx;
		border-radius: 4rpx;
		background: linear-gradient(90deg, #F64D36, #FFAE00);
	}

	.app-box {
		position: relative;
	}

	.app-loading {
		width: 100%;
		height: calc(100vh - 100rpx);
		display: flex;
		justify-content: center;
		@include box(200rpx 0 0 0);
		background-color: #FFFFFF;
		position: absolute;
		z-index: 999;
		left: 0;
		top: 0;

	}

	.app-box-task {
		@include box(0 30rpx);

		.task-options {
			width: 100%;
			height: 108rpx;
			@include box(0 15rpx);
			@include flex-al-ju(space-between);
			background-color: #FFFFFF;

			&-item {
				width: 160rpx;
				height: 60rpx;
				border-radius: 30rpx;
				@include flex-center();
				background-color: #F7F5F6;
				font-size: 24rpx;
				color: #999999;
			}
		}

		.task-options-item.active {
			background-color: #FFF9B1;
			color: #FFAE00;
		}
	}

	.map {
		width: 100%;
		height: 620rpx;
	}

	.map-markers {
		width: 300rpx;
		height: 90rpx;
		border-radius: 43rpx;
		@include flex-al();
		@include box(10rpx);

		&-img {
			width: 76rpx;
			height: 76rpx;
			border-radius: 50%;
			margin-right: 10rpx;
			flex-shrink: 0;
		}

		&-box {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 100%;
			width: 210rpx;
		}

		&-title {
			font-size: 24rpx;
			color: #fff;
			font-weight: 400;
			@include ellipsis();
		}

		&-text {
			font-size: 20rpx;
			color: #fff;
			font-weight: 400;
			@include ellipsis();
		}

		&-icon {
			width: 10rpx;
			height: 18rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
		}
	}
	.map-markers.bg-1 {
		background-color: #FA771E;
	}
	.map-markers.bg-2 {
		background-color: #ED4015;
	}
	.map-markers.bg-3 {
		background-color: #2588E6;
	}
</style>
