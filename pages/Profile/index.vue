<template>
	<view class="container">
		<view class="app-head">
			<image class="app-head-bg" src="@/static/image/bg1.png"></image>
			<!-- 未登录状态 -->
			<view class="app-head-box" v-if="Object.keys(userInfo).length === 0 && !isLogin">
				<view class="app-head-avatar" @click="isShow = true">
					<image src="@/static/icon/not-login.png"></image>
				</view>
				<view class="app-head-console" @click="isShow = true">
					<view class="app-head-title mg-b">
						<view class="app-head-name">
							<view class="name">未登陆</view>
						</view>
						<view class="app-head-icon">
							<!-- 设置 -->
							<view class="app-head-icon-item">
								<image src="@/static/icon/setup.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 登陆状态 -->
			<view class="app-head-box" v-if="Object.keys(userInfo).length > 0 && isLogin">
				<view class="app-head-avatar">
					<u-image border-radius="50%" :src="userInfo.avatar[0].abs_url" width="100%" height="100%"></u-image>
				</view>
				<view class="app-head-console">
					<view class="app-head-title">
						<view class="app-head-name">
							<view class="name">{{userInfo.nickname}}</view>
							<image v-if="userInfo.vip_status == 1" src="@/static/icon/VIP.png"></image>
						</view>
						<view class="app-head-icon">
							<!-- 扫描 -->
							<view v-if="userInfo.merchants_status == 1" class="app-head-icon-item" @click="scanCode">
								<image src="@/static/icon/scan.png"></image>
							</view>
							<!-- 二维码 -->
							<view v-if="userInfo.dai_status == 1" class="app-head-icon-item">
								<image src="@/static/icon/code.png"></image>
							</view>
							<!-- 设置 -->
							<view class="app-head-icon-item" @click="router('setUp/index', 1)">
								<image src="@/static/icon/setup.png"></image>
							</view>
						</view>
					</view>
					<view class="app-head-grade">
						<text v-if="userInfo.dai_status == 1">{{userInfo.dai_name}}</text>
					</view>
				</view>
			</view>
			<view class="app-head-vip" @click="router('member')" v-if="system">
				<text v-if="userInfo.vip_status == 1" class="number">{{userInfo.vip_time}}到期</text>
				<text v-else class="text">成为VIP会员</text>
			</view>
		</view>
		
		<view class="app-info">
			<view class="app-info-item" @click="router('smallChange/detailed')">
				<view class="app-info-item-number">
					<text>{{userInfo.balance || 0}}</text>
				</view>
				<view class="app-info-item-title">零钱</view>
			</view>
			<view class="app-info-item">
				<view class="app-info-item-number">
					<text>{{userInfo.integral || 0}}</text>
				</view>
				<view class="app-info-item-title">积分</view>
			</view>
			<view class="app-info-item" @click="router('coupon')">
				<view class="app-info-item-number">
					<text>{{userInfo.card_count || 0}}</text>
				</view>
				<view class="app-info-item-title">红包/卡券</view>
			</view>
		</view>
		
		<view class="app-title">
			<view class="Title-line"></view>
			<view class="Title-text">功能</view>
		</view>
		<view class="app-box">
			<view class="app-box-item" @click="router('postTask')">
				<image src="@/static/icon/icon-1.png"></image>
				<view class="app-box-item-text">发布任务</view>
			</view>
			<view class="app-box-item" @click="router('myTask')">
				<image src="@/static/icon/icon-2.png"></image>
				<view class="app-box-item-text">发布的悬赏</view>
			</view>
			<view class="app-box-item" @click="router('accept', 1)">
				<image src="@/static/icon/icon-3.png"></image>
				<view class="app-box-item-text">接受的悬赏</view>
			</view>
			<view class="app-box-item" v-if="userInfo && userInfo.dai_status == 0" @click="router('proxy')">
				<image src="@/static/icon/icon-4.png"></image>
				<view class="app-box-item-text">成为代理</view>
			</view>
			<view class="app-box-item" v-if="userInfo && userInfo.dai_status == 1" @click="router('myTeam')">
				<image src="@/static/icon/icon-4.png"></image>
				<view class="app-box-item-text">代理中心</view>
			</view>
			<view class="app-box-item" @click="myTeam">
				<image src="@/static/icon/icon-5.png"></image>
				<view class="app-box-item-text">我的团队</view>
			</view>
			<view class="app-box-item" @click="launchEvent">
				<image src="@/static/icon/icon-6.png"></image>
				<view class="app-box-item-text">发红包/券</view>
			</view>
			<view class="app-box-item" @click="router('eventManage')">
				<image src="@/static/icon/icon-7.png"></image>
				<view class="app-box-item-text">活动管理</view>
			</view>
			<view class="app-box-item" v-if="userInfo && userInfo.merchants_status == 0" @click="router('merchant')">
				<image src="@/static/icon/icon-8.png"></image>
				<view class="app-box-item-text">成为商户</view>
			</view>
			<view class="app-box-item" v-if="userInfo && userInfo.merchants_status == 1">
				<image src="@/static/icon/icon-8.png"></image>
				<view class="app-box-item-text">商户</view>
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
					<view class="btn-item defalut-btn" @click="jumpLogin">
						立即登录
					</view>
					<view class="btn-item btn-close" @click="isShow = false">
						取消
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { getUserInfo, useScan } from '@/network/profile-api'
	export default {
		data() {
			return {
				isShow: false,
				isLogin: false,
				m_id: '',
				userInfo: {},
				system: true
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...'
			})
			this.isSystem()
		},
		onShow() {
			this.m_id = uni.getStorageSync('m_id')
			if(this.m_id !== '') {
				this.getMemberInfo()
			}
			
			uni.$on('drop_out', () => {
				this.m_id = ''
				this.isLogin = false
				this.userInfo = {}
			})
			
			uni.hideLoading()
		},
		methods: {
			isSystem() {
				let that = this
				uni.getSystemInfo({
					success: function(res) {
						console.log(res) // 当前设备信息
						let type = res.system.substring(0, 7);
						type === 'Android' ? that.system = true : that.system = false
					}
				})
			},
			async getMemberInfo() {
				try{
					let res = await getUserInfo(this.m_id)
					
					this.userInfo = res
					this.isLogin = true
				}catch(e){
					
					uni.showToast({
						title: e,
						icon: 'none',
						success:() => {
							uni.removeStorageSync('m_id')
							this.userInfo = {}
						}
					})
				}
			},
			// 路由跳转
			router(url, type) {
				const m_id = uni.getStorageSync('m_id')
				
				if(m_id === '' || m_id === undefined) {
					return this.isShow = true
				}
				
				if(this.userInfo.duiyuan && this.userInfo.duiyuan == 1 && !type) {
					return uni.showToast({
						title: '队员无此权限',
						icon: 'none'
					})
				}
				
				let scale = this.userInfo.bili
				
				uni.navigateTo({
					url: `/pages/Profile/${url}?m_id=${m_id}&scale=${scale}`
				})
			},
			// 调起扫码
			scanCode() {
				let that = this
				uni.scanCode({
					success(res) {
						if(res.result === '') { return }
						useScan({
							id: res.result,
							m_id: that.m_id
						}).then(res => {
							uni.showLoading({
								title: '正在处理'
							})
							
							let timer = setTimeout(() => {
								uni.showToast({
									title: '核销成功',
									success() {
										clearTimeout(timer)
									}
								})
							}, 2000)

						}).catch(e => {
							console.log(e + '扫码报错')
							uni.showToast({
								title: e,
								icon: 'none'
							})
						})
					},
					fail(e) {
						uni.showToast({
							title: e,
							icon: 'none'
						})
					}
				})
			},
			// 跳转发布任务
			launchEvent() {
				const m_id = uni.getStorageSync('m_id')
				
				if(m_id === '' || m_id === undefined) {
					return this.isShow = true
				}
				if(this.userInfo.duiyuan && this.userInfo.duiyuan == 1) {
					return uni.showToast({
						title: '队员无此权限',
						icon: 'none'
					})
				}
				
				if(this.userInfo.merchants_status && this.userInfo.merchants_status == 0) {
					return uni.showModal({
						title: '提示',
						content: '只有商户才能发红包/劵',
						confirmText: '去申请',
						success(res) {
							if(res.confirm) {
								uni.navigateTo({
									url: '/pages/Profile/merchant?m_id=' + m_id
								})
							}
						}
					})
				}
				uni.navigateTo({
					url: '/pages/Profile/launch-event?m_id=' + m_id
				})
			},
			// 跳转登陆页面
			jumpLogin() {
				uni.navigateTo({
					url: '/pages/Profile/login',
					success:()=> {
						this.isShow = false
					}
				})
			},
			myTeam() {
				const m_id = uni.getStorageSync('m_id')
				
				if(m_id === '' || m_id === undefined) {
					return this.isShow = true
				}
				
				if(this.userInfo.duiyuan && this.userInfo.duiyuan == 1) {
					return uni.showToast({
						title: '抱歉,队员无此权限',
						icon: 'none'
					})
				}
				
				if(this.userInfo.dai_status && this.userInfo.dai_status == 0) {
					return uni.showModal({
						title: '提示',
						content: '您还不是代理,暂不能进入我的团队',
						confirmText: '去申请',
						success(res) {
							if(res.confirm) {
								uni.navigateTo({
									url: '/pages/Profile/proxy?m_id=' + m_id
								})
							}
						}
					})
				}
				
				uni.navigateTo({
					url: '/pages/Profile/agency/agencyTeam?m_id=' + m_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.app-head {
		width: 100%;
		height: 272rpx;
		position: relative;
		&-bg {
			width: 100%;
			height: 100%;
		}
		&-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 192rpx;
			@include box(40rpx 30rpx 30rpx 30rpx);
			@include flex-al();
			z-index: 9;
		}
		.app-head-avatar {
			width: 112rpx;
			height: 112rpx;
			margin-right: 19rpx;
			border-radius: 50%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.app-head-console {
			flex: 1;
			width: 100%;
			.app-head-title {
				width: 100%;
				@include flex-al-ju(space-btween);
				
			}
			.mg-b {
				margin-bottom: 35rpx;
			}
			.app-head-grade {
				height: 35rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				margin-top: 10rpx;
			}
			.app-head-name {
				@include flex-al();
				flex: 1;
				.name {
					font-size: 44rpx;
					color: #FFFFFF;
					font-weight: 500;
				}
				image {
					width: 36rpx;
					height: 36rpx;
					margin-left: 15rpx;
				}
			}
			.app-head-icon {
				@include flex-al-ju(flex-end);
				&-item {
					width: 40rpx;
					height: 40rpx;
					margin-left: 29rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				
			}
		}
		&-vip {
			position: absolute;
			right: 0;
			top: 120rpx;
			width: 191rpx;
			height: 50rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx 0 0 25rpx;
			opacity: 0.8;
			@include flex-al();
			z-index: 99;
			color: #F65034;
			.text {
				font-size: 24rpx;
				margin-left: 20rpx;
			}
			.number {
				font-size: 22rpx;
				margin-left: 10rpx;
			}
		}
	}
	.app-info {
		width: 690rpx;
		height: 180rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 1px 48rpx 3rpx rgba(208, 208, 208, 0.21);
		margin: 0 auto;
		margin-top: -60rpx;
		position: relative;
		z-index: 11;
		@include flex-al();
		&-item {
			flex: 1;
			@include flex-center();
			flex-direction: column;
			&-number {
				font-family: DIN Cond;
				color: #F75432;
				font-size: 60rpx;
			}
			&-title {
				font-size: 24rpx;
				color: #333333;
				font-weight: 400;
				margin-top: 10rpx;
			}
		}
	}
	.app-title {
		margin-top: 40rpx;
		height: 80rpx;
		@include flex-al();
		@include box(0 30rpx);
	}
	.app-box {
		width: 100%;
		@include box(30rpx);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
		&-item {
			@include flex-al();
			flex-direction: column;
			width: 140rpx;
			flex-shrink: 0;
			margin-bottom: 50rpx;
			image {
				width: 60rpx;
				height: 60rpx;
			}
			&-text {
				font-size: 24rpx;
				color: #333333;
				margin-top: 10rpx;
			}
		}
	}
</style>
