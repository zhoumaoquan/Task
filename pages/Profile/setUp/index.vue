<template>
	<view class="container">
		<view class="app-box">
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/phone.png"></image>
				<text class="title">绑定手机号</text>
				<view class="app-box-cont" @click="bindPhone">
					<text class="placeholder" v-if="isBindPhone === ''">去绑定</text>
					<text class="placeholder" v-else>{{isBindPhone|mobile}}</text>
					<u-icon name="arrow-right" size="28" color="#333"></u-icon>
				</view>
			</view>
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/dui.png"></image>
				<text class="title">实名认证</text>
				<view class="app-box-cont" @click="bindReal">
					<text class="placeholder" v-if="isReal">已认证</text>
					<text class="placeholder" v-else>去认证</text>
					<u-icon name="arrow-right" size="28" color="#333"></u-icon>
				</view>
			</view>
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/name.png"></image>
				<text class="title">角色切换</text>
				<view class="app-box-cont" @click="exchange">
					<u-icon name="arrow-right" size="28" color="#333"></u-icon>
				</view>
			</view>
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/name.png"></image>
				<text class="title">退出登录</text>
				<view class="app-box-cont" @click="dropOut">
					<u-icon name="arrow-right" size="28" color="#333"></u-icon>
				</view>
			</view>
		</view>

		<u-popup mode="center" v-model="isShow" :mask-close-able="false" border-radius="20">
			<view class="popup-model">
				<view class="popup-model-title">
					<text>角色切换</text>
				</view>
				<view class="popup-model-box">
					<view class="popup-model-input">
						<view class="popup-model-line"></view>
						<input v-model="username" placeholder-class="placeholder" type="text" placeholder="输入登录账号" />
					</view>
					<view class="popup-model-input">
						<view class="popup-model-line"></view>
						<input v-model="password" placeholder-class="placeholder" type="text" password placeholder="输入登录密码" />
					</view>
				</view>
				<view class="popup-model-btn">
					<view class="popup-btn active" @click="changeUser">确认切换</view>
					<view class="popup-btn" @click="isShow = false">取消</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getUserInfo,
		switchUser
	} from '@/network/profile-api'
	export default {
		data() {
			return {
				isShow: false,
				m_id: '',
				isReal: false,
				isBindPhone: '',
				username: '',
				password: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.m_id = option.m_id
		},
		onShow() {
			this.userInfo(this.m_id)
		},
		filters: {
			mobile(value) {
				let start = value.slice(0, 3)
				let end = value.slice(-4)
				return `${start}****${end}`
			}
		},
		methods: {
			userInfo(id) {
				getUserInfo(id).then(res => {
					this.isReal = res.real_status == 1
					this.isBindPhone = res.account
					
					uni.hideLoading()
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			bindPhone() {
				if (this.isBindPhone != '') {
					return
				}
				uni.navigateTo({
					url: '/pages/Profile/setUp/bindPhone?m_id=' + this.m_id
				})
			},
			bindReal() {
				if (this.isReal) {
					return
				}
				uni.navigateTo({
					url: '/pages/Profile/setUp/verified?m_id=' + this.m_id
				})
			},
			exchange() {
				this.username = ''
				this.password = ''

				this.isShow = true
			},
			dropOut() {
				uni.showModal({
					title: '提示',
					content: '您确定需要退出该账户吗?',
					success(res) {
						if (res.confirm) {
							uni.removeStorageSync('m_id')
							uni.showToast({
								title: '退出登录成功',
								mask: true,
								success() {
									uni.$emit('drop_out')
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 1500)
								}
							})
						}
					}
				})
			},
			changeUser() {
				if (this.username.trim().length === 0) {
					return uni.showToast({
						title: '请输入登陆账号',
						icon: 'none'
					})
				}
				if (this.password.trim().length === 0) {
					return uni.showToast({
						title: '请输入登陆密码',
						icon: 'none'
					})
				}

				switchUser({
					m_id: this.m_id,
					username: this.username,
					password: this.password
				}).then(res => {

					this.m_id = res

					uni.setStorageSync('m_id', res)
					this.isShow = false

					uni.showToast({
						title: '切换账号成功',
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
		width: 100%;
		@include box(0 30rpx);

		&-item {
			width: 100%;
			@include flex-al();
			height: 140rpx;
			border-bottom: 1rpx solid #E2E2E5;

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

			.app-box-cont {
				flex: 1;
				text-align: right;

				.placeholder {
					font-size: 28rpx;
					color: #999999;
					font-weight: 500;
					margin-right: 10rpx;
				}
			}
		}
	}

	.popup-model {
		width: 500rpx;
		height: 465rpx;
		@include box(0 40rpx);
		@include flex-ju(space-between);
		flex-direction: column;

		&-title {
			height: 100rpx;
			@include flex-center();
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}

		&-box {
			margin-top: 20rpx;

			input {
				flex: 1;
				font-size: 24rpx;
				color: #333333;
			}

		}

		.placeholder {
			font-size: 24rpx;
			color: #999999;
		}

		.popup-model-input {
			width: 400rpx;
			height: 80rpx;
			border: 1px solid #FA771E;
			border-radius: 10rpx;
			background-color: #FAFAFA;
			@include flex-al();
			margin-bottom: 36rpx;
		}

		.popup-model-line {
			width: 2px;
			height: 30rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			background-color: #1A73E8;
			border-radius: 1px;
		}

		&-btn {
			@include flex-al-ju(space-between);
			height: 120rpx;

			.popup-btn {
				width: 200rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background: #E5E5E5;
				@include flex-center();
				font-size: 24rpx;
				color: #333333;
			}

			.popup-btn.active {
				background: linear-gradient(90deg, #F64D36 0%, #FFAE00 100%);
				color: #FFFFFF;
			}
		}
	}
</style>
