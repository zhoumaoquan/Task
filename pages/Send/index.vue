<template>
	<view class="container">
		<view class="app-box">
			<image class="app-box-bg" src="http://rwfb-api.uuudoo.com/Uploads/News/2021-01-15/6000ffe518dd2.png"></image>
			<view class="app-context">
				<view class="app-tab">
					<view class="app-tab-item" v-for="(item, index) in ['活动说明', '我的好友']" @click="tabChange(index)" :class="{ active: index === curretTab }" :key="index">{{item}}</view>
				</view>

				<scroll-view scroll-y class="app-value" v-show="curretTab === 0">
					<view class="app-value-item" v-for="(item, index) in attention" :key="item.id">
						<view class="app-value-title">
							<text>{{item.name}}</text>
							<view class="round" v-for="i in index + 1" :key="i"></view>
						</view>
						<view class="app-value-text">
							<text>{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
				<view class="app-value" v-show="curretTab === 1">
					<view class="app-value-box">
						<view class="app-value-lable">
							<text v-for="(item, index) in ['一级好友', '二级好友']" :key="index" :class="{ active: levelTab === index + 1 }" @click="levelChange(index)">{{item}}</text>
							
						
						</view>
						<view class="app-value-cont">
							<view class="app-value-cont-li">
								<text class="number">{{count && count.today_count}}</text>
								<text class="text">今日好友人数/人</text>
							</view>
							<view class="app-value-cont-li">
								<text class="number">{{count && count.zong_count}}</text>
								<text>累计好友人数/人</text>
							</view>
							<view class="app-value-cont-li">
								<text class="number">{{count && count.today_money}}</text>
								<text>今日收益/元</text>
							</view>
							<view class="app-value-cont-li">
								<text class="number">{{count && count.zong_money}}</text>
								<text>累计收益/元</text>
							</view>
						</view>
					</view>
				</view>

				<view class="app-note">
					<view class="app-note-line"></view>
					<view class="app-note-box">
						<view class="app-note-title">注意事项</view>
						<view class="app-note-text">
							{{needing && needing.name}}
						</view>
					</view>
				</view>
				<view class="app-note-context" v-if="needing">
					<view class="app-note-item" v-for="(item, index) in needing.content" :key="index">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		
		<button open-type="share" class="app-btn-boder" v-if="m_id !== ''">
			<view class="app-btn"></view>
			<view class="app-btn-text">立即邀请</view>
		</button>
		<view class="app-btn-boder" v-else @click="isShow = true">
			<view class="app-btn"></view>
			<view class="app-btn-text">立即邀请</view>
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
	</view>
</template>

<script>
	import { invite, eventRule } from '@/network/home-api'
	export default {
		data() {
			return {
				curretTab: 0,
				attention: [],
				needing: null,
				levelTab: 1,
				m_id: uni.getStorageSync('m_id'),
				count: null,
				isShow: false
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.getEventRule()
			
			uni.hideShareMenu()
		},
		onShow() {
			this.m_id = uni.getStorageSync('m_id')
			this.getinvite()
			
		},
		onShareAppMessage() {
			return {
				title: '邀请好友',
				path: '/pages/Home/index?parent_code=' + this.m_id
			}
		},
		methods: {
			tabChange(index) {
				this.curretTab = index
			},
			async getEventRule() {
				try{
					let res = await eventRule()
					
					this.attention = res.attention
					this.needing = res.needing
					
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			getinvite() {
				invite({
					m_id: this.m_id,
					level: this.levelTab
				}).then(res => {
					this.count = res
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			levelChange(index) {
				this.levelTab = index + 1
				
				this.getinvite()
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
		}
	}
</script>

<style lang="scss">
	.app-box {
		width: 100%;
		height: 2180rpx;
		position: relative;

		&-bg {
			width: 100%;
			height: 100%;
			vertical-align: middle;
		}
	}

	.app-context {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		left: 0;
		right: 0;
		top: 370rpx;
	}

	.app-tab {
		width: 690rpx;
		height: 88rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		overflow: hidden;
		@include flex-al();
		margin-bottom: 39rpx;

		&-item {
			flex: 1;
			height: 100%;
			@include flex-center();
			font-size: 34rpx;
			color: #FA781E;
			font-weight: bold;
		}

		&-item.active {
			background-color: #FEA705;
			color: #FFFFFF;
		}
	}

	.app-value {
		width: 690rpx;
		height: 560rpx;
		border-radius: 10rpx;
		box-shadow: 0px 1px 48rpx 3rpx rgba(208, 208, 208, 0.21);
		background-color: rgba($color: #ffffff, $alpha: .6);
		@include box(20rpx 0);

		&-item {
			width: 640rpx;
			@include box(20rpx 20rpx 30rpx 20rpx);
			margin: 0 auto;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			box-shadow: 0px 1px 48rpx 3rpx rgba(208, 208, 208, 0.21);
		}

		// :first-of-type {
		// 	margin-top: 20rpx;
		// }
		&-title {
			color: #FA771E;
			font-size: 32rpx;
			@include flex-al();
			font-weight: 800;
			margin-bottom: 20rpx;

			text {
				margin-right: 20rpx;
			}

			.round {
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				margin-right: 10rpx;
				background-color: #FA771E;
			}
		}

		&-text {
			font-size: 28rpx;
			color: #333333;
			font-weight: 500;
		}
	}

	.app-note {
		display: flex;
		@include box(0 30rpx);
		margin-top: 80rpx;

		&-line {
			width: 8rpx;
			height: 138rpx;
			background-color: #FFFFFF;
			border-radius: 4rpx;
			margin-right: 20rpx;
		}

		&-title {
			font-size: 32rpx;
			color: #FFFFFF;
			font-weight: bold;

			margin-bottom: 30rpx;
		}

		&-text {
			font-size: 24rpx;
			color: #FFFFFF;
			font-weight: 500;
		}
	}
	.app-note-context {
		margin-top: 40rpx;
		
	}
	.app-note-item {
		width: 690rpx;
		@include box(30rpx);
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		font-size: 24rpx;
		color: #333333;
		font-weight: 500;
		line-height: 38rpx;
	}
	.app-btn-boder {
		width: 690rpx;
		height: 88rpx;
		
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;
		border-radius: 44rpx;
		background: linear-gradient(0deg, #F64D36 0%, #FA7B1C 100%);
		@include flex-center();
		.app-btn {
			width: 675rpx;
			height: 74rpx;
			border-radius: 44rpx;
			background-color: #FFFFFF;
			opacity: 0.1;
		}
		.app-btn-text {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: 400;
		}
	}
	.app-value-box {
		@include box(0 30rpx);
		width: 640rpx;
		height: 519rpx;
		background-color: #FFFFFF;
		margin: auto;
		border-radius: 10rpx;
	}
	.app-value-lable {
		@include flex-al-ju(space-around);
		height: 100rpx;
		font-size: 35rpx;
		color: #333;
		font-weight: 800;
		.active {
			display: inline-block;
			padding: 3rpx 10rpx;
			border-radius: 6rpx;
			border: 2rpx solid #F8B3A1;
			background: #FFF6F3;
			font-size: 24rpx;
			color: #FD6969;
			font-weight: bold;
		}
	}
	.app-value-cont {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;
		&-li {
			height: 180rpx;
			width: 50%;
			@include flex-center();
			flex-direction: column;
			.number {
				font-size: 80rpx;
				color: #FA771E;
				font-family: PingFang SC;
				font-weight: 800;
			}
			.text {
				font-size: 24rpx;
				color: #333333;
				font-weight: 500;
			}
		}
	}
</style>
