<template>
	<view class="container">
		<view class="app-banner">
			<u-image :src="detail.rule_image_there[0].abs_url" width="100%" height="100%">
				<u-loading slot="loading"></u-loading>
			</u-image>
		</view>
		<view class="app-box">
			<view class="app-box-l">
				<view class="app-box-title">
					<text>{{detail.name}}</text>
				</view>
				<view class="task-tag task-tag-1" v-if="detail.type == 1">
					<text>红包</text>
				</view>
				<view class="task-tag task-tag-2" v-if="detail.type == 2">
					<text>随机红包</text>
				</view>
				<view class="task-tag task-tag-3" v-if="detail.type == 3">
					<text>优惠劵</text>
				</view>
			</view>
			<view class="app-box-r">
				<view class="defalut-btn" @click="accept" v-if="detail.members_status == 0">领取</view>
				<view class="defalut-btn" v-if="detail.members_status == 1">已领取</view>
			</view>
		</view>
		<view class="app-line"></view>
		<view class="app-context">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">详情介绍</view>
			</view>
			<view class="app-text">
				<!-- 介绍 -->
				{{detail.desc}}
			</view>
			
			<view class="app-image">
				<view class="app-image-item">
					<u-image v-for="(item, index) in detail.image" :key="item.id" borderRadius="5" :src="item.abs_url" width="100%" height="100%"><u-loading slot="loading"></u-loading></u-image>
				</view>
				
			</view>
		</view>

		<u-popup v-model="isShow" mode="center" :mask-close-able="false" border-radius="20">
			<view class="popup-model">
				<view class="popup-model-title">
					<text>恭喜获得</text>
				</view>
				<view class="popup-model-context">
					<view class="popup-model-price">
						<text class="price">{{members_moeny}}</text>
						<text class="params">元</text>
					</view>
					<view class="popup-model-text" v-if="moeny">
						推荐人获得 ￥{{moeny}}
					</view>
				</view>
				<view class="defalut-btn popup-model-define" @click="backOff">知道了</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		eventDetails,
		receive
	} from '@/network/home-api'
	export default {
		data() {
			return {
				isShow: false,
				id: '',
				m_id: '',
				detail: {},
				moeny: '',
				members_moeny: ''
			};
		},
		onLoad(option) {
			this.m_id = option.m_id
			this.id = option.id
			
			this.getEventDetail();
		},
		methods: {
			getEventDetail() {
				eventDetails({
					id: this.id,
					m_id: this.m_id
				}).then(res => {
					this.detail = res
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			accept() {
				uni.showLoading({
					title: '正在领取...',
					mask: true
				})
				
				receive({
					m_id: this.m_id,
					type: this.detail.type,
					id: this.id
				}).then(res => {
					if(this.detail.type != 3) {
						let that = this
						this.moeny = res.moeny
						this.members_moeny = res.members_moeny
						
						uni.showToast({
							title: '领取成功',
							mask: true,
							success() {
								setTimeout(() => {
									that.isShow = true
								},1000)
							}
						})
					} else {
						uni.showToast({
							title: '领取成功',
							mask: true,
							success() {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								},1500)
							}
						})
					}
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			backOff() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.app-banner {
		width: 100%;
		height: 400rpx;
	}

	.app-box {
		width: 100%;
		height: 115rpx;
		@include box(0 30rpx 0 40rpx);
		@include flex-al-ju(space-between);

		&-l {
			@include flex-al();
		}

		&-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
			margin-right: 10rpx;
		}

		.defalut-btn {
			width: 160rpx;
			height: 60rpx;
		}
	}
	
	.task-tag {
		padding: 3rpx 9rpx 3rpx 9rpx;
		border-radius: 5rpx;
		font-size: 20rpx;
		font-weight: 400;
	}
	
	.app-line {
		width: 100%;
		height: 20rpx;
		background-color: #F9F9FA;
	}

	.app-context {
		@include box(0rpx 30rpx 30rpx 30rpx);

		.app-title {
			height: 110rpx;
			@include flex-al();
		}

		.Title-text {
			font-size: 32rpx;
			margin-left: 10rpx;
		}
	}
	
	.popup-model {
		width: 500rpx;
		height: 350rpx;
		@include box(30rpx);
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		&-title {
			width: 100%;
			font-size: 30rpx;
			color: #333333;
			text-align: center;
		}

		&-btn {
			width: 380rpx;
			height: 60rpx;
		}

		.price {
			font-size: 48rpx;
			color: #ED4015;
			font-weight: 600;
		}

		&-context {
			text-align: center;
		}

		.params {
			font-size: 22rpx;
			color: #ED4015;
			font-weight: 600;
			margin-left: 6rpx;
		}

		&-text {
			font-size: 22rpx;
			color: #999999;
			margin-top: 10rpx;
		}
	}
	.app-image {
		margin-top: 30rpx;
		display: flex;
		flex-wrap: wrap;
		&-item {
			width: 162rpx;
			height: 162rpx;
			margin-right: 14rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
