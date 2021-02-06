<template>
	<view class="container">
		<view class="app-box" v-if="setUp == 1">
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/phone.png"></image>
				<text class="title">绑定手机号</text>
			</view>
			<view class="app-box-input">
				<input v-model="phone" maxlength="11" placeholder-class="placeholder" placeholder="请输入手机号" type="number" />
			</view>
		</view>

		<block v-if="setUp == 2">
			<view class="app-input">
				<view class="app-input-head">
					<text class="title">验证码已发送到{{phone|mobile}}</text>
					<text class="active" @click="getCode">{{tips}}</text>
				</view>
			</view>
			<u-message-input @finish="verify = $event" width="100" :focus="false" bold :maxlength="6" font-size="40"></u-message-input>
		</block>

		<u-toast ref="uToast"></u-toast>
		<u-verification-code end-text="重新获取验证码" ref="uCode" @change="codeChange"></u-verification-code>
		<view class="defalut-btn" v-if="setUp == 1" @click="setUpPhone">下一步</view>
		<view class="defalut-btn" v-if="setUp == 2" @click="bindPhone">绑定</view>
	</view>
</template>

<script>
	import {
		getVerify,
		taskVerify
	} from '@/network/profile-api'
	export default {
		data() {
			return {
				setUp: 1,
				phone: '',
				tips: '',
				verify: '',
				m_id: ''
			};
		},
		filters: {
			mobile(value) {
				let start = value.slice(0, 3)
				let end = value.slice(-4)
				return `${start}****${end}`
			}
		},
		onLoad(option) {
			this.m_id = option.m_id
		},
		methods: {
			setUpPhone() {
				const testPhone = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
				if (!testPhone.test(this.phone)) {
					return uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				}

				this.setUp = 2
				this.getCode()
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})

					getVerify(this.phone).then(res => {
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();

					}).catch(e => {
						this.$u.toast('验证码获取失败');
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			bindPhone() {
				if(this.verify.trim().length < 6) {
					return uni.showToast({
						title: '请输入正确的验证码',
						icon: 'none'
					})
				}
				
				uni.showLoading({
					title: '正在校验...',
					mask: true
				})
				
				taskVerify({
					m_id: this.m_id,
					phone: this.phone,
					verify: this.verify
				}).then(res => {
					
					uni.showToast({
						title: '绑定手机号成功',
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
	.app-box {
		width: 690rpx;
		margin: 0 auto;
		height: 198rpx;
		border-bottom: 1rpx solid #E2E2E5;
		display: flex;
		flex-direction: column;
		justify-content: center;

		&-item {
			width: 100%;
			@include flex-al();
			height: 80rpx;

			.icon {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
			}

			.title {
				font-size: 30rpx;
				color: #333333;
				font-weight: bold;
				margin-right: 20rpx;
			}
		}

		&-input {
			padding-left: 100rpx;
			width: 100%;
			height: 80rpx;

			input {
				width: 100%;
				height: 100%;
				font-size: 28rpx;
				color: #333333;
			}

			.placeholder {
				font-size: 28rpx;
				color: #999999;
			}
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

	.app-input {
		width: 100%;
		@include box(30rpx 30rpx 0 30rpx);

		&-head {
			@include flex-al-ju(space-between);
			height: 80rpx;

			.title {
				font-size: 26rpx;
				color: #999999;
				font-weight: 500;
			}

			.active {
				color: #1A73E8;
				font-size: 24rpx;
				font-weight: 400;
			}
		}
	}
</style>
