<template>
	<view class="container">
		<view class="app-logo">
			<u-image width="160" height="160" src="@/static/image/logo.png" mode="aspectFit"></u-image>
			<view class="app-logo-text">
				<text>任务小程序</text>
			</view>
		</view>

		<button open-type="getUserInfo" @getuserinfo="userLogin" class="defalut-btn">
			<u-icon name="weixin-fill" size="46" top="0" color="#fff"></u-icon>
			<text>微信用户快捷登录</text>
		</button>
	</view>
</template>

<script>
	import {
		getCode,
		saveUserInfo
	} from '@/network/login-api'
	import {
		uploadImage,
		downloadFile
	} from '@/utils/loadimg'
	export default {
		data() {
			return {
				params: {
					openid: '',
					nickname: '',
					avatar: '',
					sex: '',
					t_mid: ''
				}
			};
		},
		onLoad(option) {
			const code = uni.getStorageSync('code')
			if(code && code !== '') {
				this.params.t_mid = code
			}
		},
		methods: {
			userLogin(e) {
				let _this = this
				uni.showLoading({
					title: '授权登陆中...',
					mask: true
				})

				uni.login({
					provider: 'weixin',
					timeout: 6000,
					success: async function(loginRes) {
						try {
							var {
								openid,
								is_ro,
								m_id
							} = await getCode(loginRes.code)

							// 如果已注册，则直接返回
							if (is_ro == 1 && m_id !== '') {

								uni.setStorageSync('m_id', m_id)

								return uni.showToast({
									title: '登陆成功',
									mask: true,
									success() {
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											})
										}, 1500)
									}
								})
							}

							// 注册 1.上传用户微信头像
							try {
								let Path = await downloadFile(e.detail.userInfo.avatarUrl)

								let imginfo = await uploadImage({
									url: 'Personal/upload',
									imgUrl: Path.tempFilePath
								})

								_this.params.avatar = imginfo.data.list[0].id
							} catch (e) {
								return uni.showToast({
									title: e,
									icon: 'none'
								})
							}

							// 2. 保存信息

							_this.params.openid = openid
							_this.params.gender = e.detail.userInfo.gender
							_this.params.nickname = e.detail.userInfo.nickName
							_this.params.sex = e.detail.userInfo.sex
							
							// 3. 换取m_id
							_this.exchangeMid()


						} catch (e) {
							return uni.showToast({
								title: e,
								icon: 'none'
							})
						}
					}
				})
			},
			exchangeMid() {
				saveUserInfo(this.params).then(res => {
					uni.setStorageSync('m_id', res.m_id)

					uni.showToast({
						title: '登陆成功',
						mask: true,
						success() {
							setTimeout(() => {
								return uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(err => {
					return uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
		},
	}
</script>

<style lang="scss">
	.app-logo {
		width: 100%;
		height: 500rpx;
		@include flex-center();
		flex-direction: column;

		&-text {
			font-size: 34rpx;
			font-weight: bold;
			color: #333333;
			margin-top: 18rpx;
		}
	}

	.defalut-btn {
		margin-top: 100rpx;
		width: 690rpx;
		height: 88rpx;
		border-radius: 44rpx;

		text {
			margin-left: 14rpx;
		}
	}
</style>
