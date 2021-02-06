<template>
	<view class="container">
		<view class="app-head">
			<view class="app-head-item" v-for="(item, index) in members_card" @click="cuttent = index" :key="item.id">
				<view class="app-head-cont" :class="{ active: cuttent === index }">
					<view class="app-head-month">{{item.name}}</view>
					<view class="app-head-price">
						<text class="param">￥</text>
						<text class="price">{{item.moeny}}</text>
					</view>
				</view>
				<image v-if="cuttent === index" class="app-head-bg" src="@/static/image/bg2.png"></image>
			</view>
		</view>

		<view class="app-title">
			<view class="Title-line"></view>
			<view class="Title-text">会员好处</view>
		</view>
		<view class="app-box">
			<view class="app-box-item" v-for="(item, index) in rule_text" :key="index">{{item}}</view>
		</view>
		
		<view class="defalut-btn" @click="Pay">支付</view>
	</view>
</template>

<script>
	import {
		membersInfo,
		memberPay
	} from '@/network/profile-api'
	export default {
		data() {
			return {
				members_card: [],
				rule_text: [],
				cuttent: 0
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.m_id = option.m_id

			this.getMembersInfo()
		},
		methods: {
			async getMembersInfo() {
				try {
					let res = await membersInfo(this.m_id)
					
					this.members_card = res.members_card
					this.rule_text = res.rule_text
					uni.hideLoading()
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			Pay() {
				uni.showLoading({
					title: '正在支付...',
					mask: true
				})
				
				let id = this.members_card[this.cuttent].id
				
				memberPay({
					id,
					m_id: this.m_id
				}).then(res => {
					wx.requestPayment({
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.package,
						paySign: res.paySign,
						signType: res.signType,
						success(res) {
							return uni.showToast({
								title: '开通会员成功',
								mask: true,
								success() {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 1500)
								}
							})
						},
						fail(e) {
							console.log(e)
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							})
						}
					})
					
					
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
	.app-title {
		margin-top: 20rpx;
		height: 100rpx;
		@include flex-al();
	}

	.app-head {
		margin-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
		@include box(0 30rpx);
		&-item {
			width: 157rpx;
			height: 204rpx;
			border-radius: 20rpx;
			background-color: #F9F9FA;
			border: 1px solid #FA771E;
			margin-bottom: 20rpx;
			margin-right: 20rpx;
			position: relative;
			
			.app-head-cont {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 2;
				color: #FA771E;
			}

			.app-head-month {
				font-size: 26rpx;
				
				font-weight: 500;
			}
			.param {
				font-size: 30rpx;
				margin-right: 5rpx;
			}
			.price {
				font-size: 60rpx;
				font-weight: DINCond-Medium;
			}
			.app-head-bg {
				width: 100%;
				height: 100%;

			}
		}

	}
	.app-head-item:nth-of-type(4n+4) {
		margin-right: 0;
	}
	.app-head-cont.active {
		color: #fff;
	}
	.app-title {
		@include flex-al();
		@include box(0 30rpx);
		margin-top: 30rpx;
	}
	.app-box {
		margin-top: 30rpx;
		@include box(0 30rpx);
		display: flex;
		flex-wrap: wrap;
		&-item {
			width: 218rpx;
			height: 50rpx;
			border-radius: 10rpx;
			background-color: #F9F9FA;
			font-size: 28rpx;
			color: #333333;
			font-weight: 500;
			@include flex-center();
			margin-right: 16rpx;
			margin-bottom: 20rpx;
		}
	}
	.app-box-item:nth-of-type(3n+3) {
		margin-right: 0;
	}
	
	.defalut-btn {
		width: 690rpx;
		height: 88rpx;
		border-radius: 45rpx;
		
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;
		
		z-index: 99;
	}
</style>
