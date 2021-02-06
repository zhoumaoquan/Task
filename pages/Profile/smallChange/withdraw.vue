<template>
	<view class="container">
		<view class="app-head">
			<image class="app-head-bg" src="@/static/image/bg-3.png"></image>
			<view class="app-head-box">
				<view class="app-head-item">
					<text class="title">余额</text>
					<text class="number">{{balance}}</text>
				</view>
				<view class="app-head-item">
				</view>
			</view>
		</view>
		<view class="app-box">
			<view class="app-box-title">提现金额</view>
			<view class="app-box-input">
				<text class="param">￥</text>
				<input type="digit" v-model="moeny" placeholder-class="placeholder" placeholder="请输入提现金额" />
			</view>
			<view class="app-box-tips">
				提现金额会进入微信账户
			</view>
		</view>
		
		<view class="defalut-btn" @click="submit">确定</view>
	</view>
</template>

<script>
	import { withdraw } from '@/network/profile-api'
	export default {
		data() {
			return {
				balance: '',
				m_id: '',
				moeny: ''
			};
		},
		onLoad(option) {
			this.m_id = option.m_id
			this.balance = option.moeny
		},
		methods: {
			submit() {
				if(this.moeny.trim().length === 0) {
					return uni.showToast({
						title: '请输入需提现金额',
						icon: 'none'
					})
				}
				
				if(this.moeny == 0) {
					return uni.showToast({
						title: '提现金额需大于0元',
						icon: 'none'
					})
				}
				
				uni.showLoading({
					title: '正在处理...',
					mask: true
				})
				
				withdraw({
					m_id: this.m_id,
					moeny: this.moeny
				}).then(res => {
					
					uni.showToast({
						title: '申请成功,请耐心等待...',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
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
	.app-head {
		width: 100%;
		@include box(40rpx 30rpx 30rpx 30rpx);
		height: 274rpx;
		border-radius: 20rpx;
		position: relative;

		&-bg {
			width: 100%;
			height: 100%;
		}

		.app-head-box {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			@include flex-al();
		}

		&-item {
			flex: 1;
			@include flex-center();
			flex-direction: column;

			.title {
				font-size: 26rpx;
				color: #FFFFFF;
				font-weight: 400;
				margin-bottom: 10rpx;
			}

			.number {
				font-size: 60rpx;
				color: #FFFFFF;
				font-family: PingFang SC;
			}
		}
	}
	.app-box {
		width: 100%;
		height: 266rpx;
		background-color: #F9F9FA;
		@include box(20rpx 30rpx 0 30rpx);
		&-title {
			height: 80rpx;
			@include flex-al();
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
		}
		&-input {
			@include flex-al();
			height: 110rpx;
			border-bottom: 1px solid #E2E2E5;
			.param {
				font-size: 50rpx;
				color: #333333;
				font-weight: 600;
				margin-right: 10rpx;
			}
			input {
				flex: 1;
				font-size: 42rpx;
				color: #333333;
			}
			.placeholder {
				font-size: 42rpx;
				color: #999999;
			}
		}
		&-tips {
			height: 50rpx;
			@include flex-al();
			font-size: 22rpx;
			color: #1A73E8;
		}
	}
	.defalut-btn {
		width: 690rpx;
		height: 88rpx;
		border-radius: 45rpx;
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;
	}
</style>
