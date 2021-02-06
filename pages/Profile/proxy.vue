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
		<block v-if="step === 1">
			<view class="app-box">
				<view class="app-box-item">
					<image class="icon" src="@/static/icon/name.png"></image>
					<text class="title">真实姓名</text>
					<view class="app-box-cont">
						<input v-model="params.name" maxlength="20" placeholder-class="placeholder" type="text" placeholder="请输入" />
					</view>
				</view>
				<view class="app-box-item">
					<image class="icon" src="@/static/icon/dui.png"></image>
					<text class="title">身份证号</text>
					<view class="app-box-cont">
						<input v-model="params.numbers_id" maxlength="18" placeholder-class="placeholder" type="idcard" placeholder="请输入" />
					</view>
				</view>
				<view class="app-box-item">
					<image class="icon" src="@/static/icon/phone.png"></image>
					<text class="title">手机号码</text>
					<view class="app-box-cont">
						<input v-model="params.phone" maxlength="11" placeholder-class="placeholder" type="number" placeholder="请输入" />
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
					<view class="Title-text">自我介绍</view>
				</view>
				<view class="app-context-input">
					<textarea v-model="params.content" maxlength="120" placeholder-class="placeholder" placeholder="让我们多了解你一些"></textarea>
				</view>
			</view>
		</block>
		<block v-if="step === 2">
			<view class="goback" @click="step = 1">
				<u-icon name="arrow-leftward" color="#fff" size="30"></u-icon>
			</view>
			<view class="app-box mg-top">
				<view class="app-title">
					<view class="Title-line"></view>
					<view class="Title-text">上传材料：</view>
				</view>
				<view class="app-image">
					<view class="app-image-item" @click="uploadImage(0)">
						<image v-if="params.zheng_photo === ''" class="icon" src="@/static/image/shenfen-z.png"></image>
						<u-image v-else :src="positiveImg" mode="aspectFit" width="336rpx" height="200rpx"></u-image>
						<text class="text">身份证正面</text>
					</view>
					<view class="app-image-item" @click="uploadImage(1)">
						<image v-if="params.fan_photo === ''" class="icon" src="@/static/image/shenfen-f.png"></image>
						<u-image v-else :src="obverseImg" mode="aspectFit" width="336rpx" height="200rpx"></u-image>
						<text class="text">身份证反面</text>
					</view>
					<view class="app-image-item" @click="uploadImage(2)">
						<image v-if="params.photo === ''" class="icon" src="@/static/image/qita.png"></image>
						<u-image v-else :src="otherImg" mode="aspectFit" width="336rpx" height="200rpx"></u-image>
						<text class="text">其他资质证书</text>
					</view>
				</view>
			</view>

		</block>
		
		<label class="protocol" v-if="step === 2" @click="flag = !flag">
			<checkbox :checked="flag" :disabled="params.state != 0"></checkbox>
			<text>我已阅读并同意</text>
			<text class="active" @click="routerText(2)">《代理协议》</text>
		</label>
		<view v-if="step === 1" class="defalut-btn" @click="step = 2">下一步</view>
		<view v-if="step === 2 && params.state == 0" class="defalut-btn" @click="taskParams">提交</view>
		<view v-if="step === 2 && params.state == 1" class="defalut-btn">正在审核,请耐心等待...</view>
		<view v-if="step === 2 && params.state == 3" class="defalut-btn" @click="againSubmit">重新提交</view>
	</view>
</template>

<script>
	import {
		proxyApply,
		proxyDetail,
		proxyAgain
	} from '@/network/profile-api'
	
	import Upload from '@/utils/upload'
	
	export default {
		data() {
			return {
				params: {
					name: '',
					numbers_id: '',
					phone: '',
					content: '',
					address: '',
					latitude: '',
					longitude: '',
					zheng_photo: '',
					fan_photo: '',
					photo: '',
					m_id: '',
					state: 0
				},
				isFail: true,
				step: 1,
				positiveImg: '',
				obverseImg: '',
				otherImg: '',
				flag: false
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this.params.m_id = option.m_id
		
			
			this.getProxyDetail(option.m_id)
			
		},
		methods: {
			// 获取代理详情
			getProxyDetail(id) {
				proxyDetail(id).then(res => {
					if(res.length === 0 || res === '' || Object.keys(res).length === 0) {
						uni.hideLoading()
						return
					} else {
						this.positiveImg = res.zheng_photo[0].abs_url
						this.obverseImg = res.fan_photo[0].abs_url
						this.otherImg = res.photo[0].abs_url
						this.params = res
						this.params.zheng_photo = res.zheng_photo[0].id
						this.params.fan_photo = res.fan_photo[0].id
						this.params.photo = res.photo[0].id
						
						this.flag = true
						
						uni.hideLoading()
					}
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			areaChange(e) {
				let that = this
				uni.chooseLocation({
					success(res) {
						that.params.address = res.address
						that.params.latitude = res.latitude
						that.params.longitude = res.longitude
					}
				})
			},
			async uploadImage(index) {
				
				try{
					let res = await new Upload({ count: 1, url: 'Personal/upload' }).uploadPic()
					let img = res[0].data.list[0].abs_url
					let id =  res[0].data.list[0].id
					
					switch(index) {
						case 0:
							this.params.zheng_photo = id;
							this.positiveImg = img;
							break;
						case 1:
							this.params.fan_photo = id;
							this.obverseImg = img;
							break;
						case 2: 
							this.params.photo = id;
							this.otherImg = img
							break;
						default:
							
					}
					
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			taskParams() {
				if(!this.flag) {
					uni.showToast({
						title: '请勾选代理协议',
						icon: 'none'
					})
					return false;
				}
				
				if(this.params.name.trim().length === 0) {
					uni.showToast({
						title: '请输入真实姓名',
						icon: 'none'
					})
					return false;
				}
				if(this.params.numbers_id.trim().length === 0) {
					uni.showToast({
						title: '请输入身份证号码',
						icon: 'none'
					})
					return false;
				}
				if(this.params.phone.trim().length === 0) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
					return false;
				}
				if(this.params.address === '') {
					uni.showToast({
						title: '请选择所在区域',
						icon: 'none'
					})
					return false;
				}
				if(this.params.zheng_photo === '') {
					uni.showToast({
						title: '请上传身份证正面照',
						icon: 'none'
					})
					return false;
				}
				if(this.params.fan_photo === '') {
					uni.showToast({
						title: '请上传身份证反面照',
						icon: 'none'
					})
					return false;
				}
				if(this.params.photo === '') {
					uni.showToast({
						title: '请上传其他资质',
						icon: 'none'
					})
					return false;
				}
				
				if(this.params.state === 0) {
					this.proxySubmit();
				} else {
					this.againSubmit();
				}
			},
			// 申请代理
			proxySubmit() {

				uni.showLoading({
					title: '正在提交...',
					mask: true
				})
				
				proxyApply(this.params).then(res => {
					
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
			// 代理重新提交
			againSubmit() {
				
				uni.showLoading({
					title: '正在提交...',
					mask: true
				})
				
				proxyAgain(this.params).then(res => {
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
			routerText(type) {
				uni.navigateTo({
					url: '/pages/Home/textShow?type=' + type
				})
			}
		}
	}
</script>

<style lang="scss">
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
				width: 400rpx;
				text-align: right;
				@include ellipsis();
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
		width: 100%;
		margin-top: 30rpx;
		@include box(20rpx 30rpx);
	}

	.app-title {
		@include flex-al();
		height: 60rpx;

		.Title-text {
			margin-left: 10rpx;
			font-size: 32rpx;
		}
	}

	.app-context-input {
		@include box(10rpx 25rpx);
		margin-top: 20rpx;
		height: 300rpx;
		border-bottom: 1px solid #E2E2E5;

		textarea {
			width: 100%;
			height: 100%;
			font-size: 28rpx;
			color: #333333;
			font-weight: 500;
			line-height: 38rpx;
		}

		.placeholder {
			color: #999;
			font-size: 28rpx;
			line-height: 38rpx;
		}
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

	.mg-top {
		margin-top: 20rpx;
	}

	.app-image {
		width: 100%;
		margin-top: 30rpx;
		display: flex;
		flex-wrap: wrap;

		&-item {
			width: 336rpx;
			margin-right: 18rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20rpx;
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

	.protocol {
		width: 690rpx;
		height: 60rpx;
		@include flex-al();
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 130rpx;

		font-size: 24rpx;
		color: #333333;

		checkbox {
			transform: scale(.8);
		}

		.active {
			color: #1A73E8;
		}
	}
	.goback {
		width: 60rpx;
		height: 60rpx;
		
		border-radius: 50%;
		@include flex-center();
		font-size: 28rpx;
		color: #333333;
		background: linear-gradient(90deg, #F64D36 0%, #FFAE00 100%);
		margin-left: 30rpx;
		margin-top: 10rpx;
	}
</style>
