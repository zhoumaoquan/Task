<template>
	<view class="container">
		<view class="app-box">
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/name.png"></image>
				<text class="title">真实姓名</text>
			</view>
			<view class="app-box-input">
				<input v-model="params.name" placeholder-class="placeholder" placeholder="请输入真实姓名" type="text" />
			</view>
		</view>
		<view class="app-box">
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/hao.png"></image>
				<text class="title">身份证号</text>
			</view>
			<view class="app-box-input">
				<input v-model="params.numbers_id" placeholder-class="placeholder" maxlength="18" placeholder="请输入身份证号" type="idcard" />
			</view>
		</view>
		<view class="app-context">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">其他资料</view>
			</view>
			<view class="app-image">
				<view class="app-image-item" @click="uploadImage(1)">
					<image v-if="params.zheng_photo === ''" class="icon" src="@/static/image/shenfen-z.png"></image>
					<u-image v-else :src="positive" width="336rpx" height="200rpx"></u-image>
					<text class="text">身份证正面</text>
				</view>
				<view class="app-image-item" @click="uploadImage(2)">
					<image v-if="params.fan_photo === ''" class="icon" src="@/static/image/shenfen-f.png"></image>
					<u-image v-else :src="obverse" width="336rpx" height="200rpx"></u-image>
					<text class="text">身份证反面</text>
				</view>
			</view>
		</view>
		<view class="defalut-btn" @click="submit">提交</view>
	</view>
</template>

<script>
	import { realName } from '@/network/profile-api'
	import Upload from '@/utils/upload'
	export default {
		data() {
			return {
				params: {
					m_id: '',
					name: '',
					numbers_id: '',
					zheng_photo: '',
					fan_photo: ''
				},
				positive: '',
				obverse: ''
			};
		},
		onLoad(option) {
			this.params.m_id = option.m_id
		},
		methods: {
			uploadImage(index) {
				new Upload({
					url: 'Personal/upload',
					count: 1
				}).uploadPic().then(res => {
					let img = res[0].data.list[0]
					if(index == 1) {
						this.params.zheng_photo = img.id
						this.positive = img.abs_url
					} else {
						this.params.fan_photo = img.id
						this.obverse = img.abs_url
					}
				}).catch(e => {
					uni.showToast({
						title: '上传图片失败',
						icon: 'none'
					})
				})
			},
			submit() {
				if(this.params.name === '') {
					return uni.showToast({
						title: '请输入您的姓名',
						icon: 'none'
					})
				}
				if(this.params.numbers_id === '') {
					return uni.showToast({
						title: '请输入您的身份证号码',
						icon: 'none'
					})
				}
				if(this.params.zheng_photo === '') {
					return uni.showToast({
						title: '请上传身份证正面照',
						icon: 'none'
					})
				}
				if(this.params.fan_photo === '') {
					return uni.showToast({
						title: '请上传身份证反面照',
						icon: 'none'
					})
				}
				
				uni.showLoading({
					title: '正在提交...',
					mask: true
				})
				
				realName(this.params).then(res => {
					
					uni.showToast({
						title: '认证成功',
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
			height: 90rpx;

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

	.app-title {
		height: 107rpx;
		@include flex-al();
		@include box(0 30rpx);

		.Title-text {
			font-size: 32rpx;
			margin-left: 10rpx;
		}
	}

	.app-context {
		@include box(20rpx 0);
	}

	.app-image {
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		@include box(0 30rpx);

		&-item {
			width: 336rpx;
			margin-right: 18rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon {
				width: 336rpx;
				height: 200rpx;
			}

			.text {
				font-size: 28rpx;
				color: #999999;
				font-weight: 300;
				margin-top: 20rpx;
			}
		}
	}

	.app-image-item:nth-of-type(2n+2) {
		margin-right: 0;
	}
	
	.defalut-btn {
		width: 690rpx;
		height: 88rpx;
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;
		border-radius: 45rpx;
		z-index: 999;
	}
	
	
</style>
