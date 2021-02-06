<template>
	<view class="container">
		<view class="top-tips" v-if="params.state == 3 && isFail">
			<view class="top-tips-text">
				<view class="top-tips-line">{{params.desc}}</view>
			</view>
			<view class="top-tips-close" @click="isFail = false">
				<u-icon name="close" size="40" color="#ED4015"></u-icon>
			</view>
		</view>
		<view class="app-box">
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/dian.png"></image>
				<text class="title">真实店名</text>
				<view class="app-box-cont">
					<input v-model="params.name" placeholder-class="placeholder" type="text" placeholder="请输入" />
				</view>
			</view>
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/dui.png"></image>
				<text class="title">身份证号</text>
				<view class="app-box-cont">
					<input maxlength="18" v-model="params.numbers_id" placeholder-class="placeholder" type="idcard" placeholder="请输入" />
				</view>
			</view>
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/phone.png"></image>
				<text class="title">手机号码</text>
				<view class="app-box-cont">
					<input maxlength="11"  v-model="params.phone" placeholder-class="placeholder" type="number" placeholder="请输入" />
				</view>
			</view>
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/dianhua.png"></image>
				<text class="title">店铺电话</text>
				<view class="app-box-cont">
					<input maxlength="12" v-model="params.dian_phone" placeholder-class="placeholder" type="number" placeholder="请输入" />
				</view>
			</view>
			<view class="app-box-item">
				<image class="icon" src="@/static/icon/didian.png"></image>
				<text class="title">所在区域</text>
				<view @click="areaChange" class="app-box-cont">
					<text v-if="params.address === ''" class="placeholder">请选择</text>
					<text v-else class="active">{{params.address}}</text>
					<u-icon name="arrow-right" size="28" color="#333"></u-icon>
				</view>
			</view>
		</view>

		<view class="app-context">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">门店LOGO</view>
			</view>
			<view class="app-context-box">
				<view class="app-context-add" @click="uploadLogo">
					<image v-if="params.logo === ''" src="@/static/image/add.png"></image>
					<u-image v-else width="100%" height="100%" :src="logoImg"></u-image>
				</view>
			</view>
		</view>
		<view class="app-context">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">其他资料</view>
			</view>
			<view class="app-image">
				<view class="app-image-item" v-for="(item, index) in photoImg" :key="item.id">
					<u-image :src="item.abs_url" width="336rpx" height="200rpx"></u-image>
				</view>
				<view class="app-image-item" @click="uploadImage">
					<image class="icon" src="@/static/image/qita.png"></image>
				</view>
			</view>
		</view>

		<view v-if="params.state == 0" class="defalut-btn" @click="taskParams">提交</view>
		<view v-if="params.state == 1" class="defalut-btn" >正在审核,请耐心等待...</view>
		<view v-if="params.state == 3" class="defalut-btn" @click="taskParams">重新提交</view>
	</view>
</template>

<script>
	import {
		merchant,
		merchantDesc,
		merchantAgain
	} from '@/network/profile-api'

	import Upload from '@/utils/upload'
	export default {
		data() {
			return {
				isFail: true,
				params: {
					m_id: '',
					name: '',
					numbers_id: '',
					dian_phone: '',
					phone: '',
					logo: '',
					address: '',
					latitude: '',
					longitude: '',
					photo: '',
					state: 0
				},
				logoImg: '',
				photoImg: [],
			};
		},
		onLoad(option) {

			uni.showLoading({
				title: '正在加载...'
			})

			this.params.m_id = option.m_id

			this.getMerchantDesc(option.m_id)

		},
		methods: {
			areaChange() {
				let that = this
				uni.chooseLocation({
					success(res) {
						that.params.address = res.address
						that.params.latitude = res.latitude
						that.params.longitude = res.longitude
					}
				})
			},
			// 获取商户详情
			getMerchantDesc(id) {
				merchantDesc(id).then(res => {

					if (res.length === 0 || res === '' || Object.keys(res).length === 0) {
						uni.hideLoading()
						return
					} else {
						this.logoImg = res.logo[0].abs_url
						this.photoImg = res.photo
						this.params = res

						uni.hideLoading()
					}
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			taskParams() {
				if (this.params.name === '') {
					return uni.showToast({
						title: '请输入店名~',
						icon: 'none'
					})
				}

				if (this.params.numbers_id === '') {
					return uni.showToast({
						title: '请输入身份证号码',
						icon: 'none'
					})
				}

				if (this.params.phone === '') {
					return uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
				}

				if (this.params.dian_phone === '') {
					return uni.showToast({
						title: '请输入店铺电话',
						icon: 'none'
					})
				}

				if (this.params.address === '') {
					return uni.showToast({
						title: '请选择所在区域',
						icon: 'none'
					})
				}

				if (this.params.logo === '') {
					return uni.showToast({
						title: '请上传商家LOGO',
						icon: 'none'
					})
				}
				
				let photo = this.photoImg.map((item, index) => {
					return item.id
				})
				this.params.photo = photo.join(',')
				

				if (this.params.photo === '') {
					return uni.showToast({
						title: '请上传其他资料',
						icon: 'none'
					})
				}
				
				if(this.params.state == 0) {
					this.submitApply()
				} else {
					this.setMerchantAgain()
				}
				
			},
			// 上传Logo
			async uploadLogo() {
				try {
					let res = await new Upload({
						count: 1,
						url: 'Personal/upload'
					}).uploadPic()
					let img = res[0].data.list[0].abs_url
					let id = res[0].data.list[0].id
					
					this.params.logo = id
					this.logoImg = img
					
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 上传图片
			async uploadImage() {
				try {
					let res = await new Upload({
						count: 3,
						url: 'Personal/upload'
					}).uploadPic()
					this.photoImg =  res.map((item, index) => {
						return {
							id: item.data.list[0].id,
							abs_url: item.data.list[0].abs_url
						}
					})

				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 提交申请
			submitApply() {
				uni.showLoading({
					title: '正在提交...',
					mask: true
				})
				
				merchant(this.params).then(res => {
					
					uni.showToast({
						title: '提交成功,请等待审核...',
						icon: 'success',
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
			},
			setMerchantAgain() {
				uni.showLoading({
					title: '正在提交...',
					mask: true
				})
				
				merchantAgain(this.params).then(res => {
					
					uni.showToast({
						title: '提交成功,请等待审核...',
						icon: 'success',
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
	page {
		padding-bottom: 200rpx;
	}

	.top-tips {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;

		background-color: #FEEBE6;
		@include box(30rpx);
		z-index: 999;
		display: flex;

		&-text {
			flex: 1;

			.top-tips-line {
				color: #ED4015;
				font-size: 26rpx;
				line-height: 42rpx;
				font-weight: 500;
			}
		}

		.top-tips-close {
			width: 40rpx;
			flex-shrink: 0;
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

	.app-box {
		width: 100%;
		@include box(0 30rpx);

		&-item {
			width: 100%;
			@include flex-al();
			height: 150rpx;
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

				input {
					width: 100%;
					height: 100%;
					text-align: left;
					font-size: 28rpx;
					color: #333;
					font-weight: 400;
				}

				.placeholder {
					font-size: 28rpx;
					color: #999999;
					font-weight: 500;
					margin-right: 10rpx;
				}

				.active {
					font-size: 28rpx;
					color: #333;
					font-weight: 400;
					margin-right: 10rpx;
				}
			}
		}
	}

	.app-context {
		@include box(20rpx 0);

		&-box {
			width: 690rpx;
			margin: 0 auto;

			@include box(20rpx 0);
			display: flex;
			flex-wrap: wrap;
			border-bottom: 1px solid #E2E2E5;

			.app-context-img {
				width: 162rpx;
				height: 162rpx;
				margin-right: 18rpx;
				margin-bottom: 20rpx;
			}

			.app-context-add {
				width: 162rpx;
				height: 162rpx;
				margin-bottom: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
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
