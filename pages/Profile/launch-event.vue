<template>
	<view class="container">
		<view class="app-title">
			<view class="Title-line"></view>
			<view class="Title-text">基础信息</view>
		</view>
		<view class="app-options">
			<view class="app-options-item">
				<view class="app-options-title">类型</view>
				<view class="app-options-r" @click="isShow = true">
					<text v-if="params.type == 1" class="value">普通红包</text>
					<text v-if="params.type == 2" class="value">随机红包</text>
					<text v-if="params.type == 3" class="value">优惠劵</text>
					<u-icon name="arrow-right" size="26" color="#333"></u-icon>
				</view>
			</view>
			<!-- 普通红包 -->
			<block v-if="params.type == 1">
				<view class="app-options-item">
					<view class="app-options-title">金额</view>
					<view class="app-options-r">
						<input type="number" v-model="params.moeny" placeholder="请输入" placeholder-class="placeholder" />
						<text class="param">元</text>
					</view>
				</view>
			</block>
			<!-- 随机红包 -->
			<block v-if="params.type == 2">
				<view class="app-options-item">
					<view class="app-options-title">总额</view>
					<view class="app-options-r">
						<input type="number" v-model="params.moeny" placeholder="请输入" placeholder-class="placeholder" />
						<text class="param">元</text>
					</view>
				</view>
				<view class="app-options-item">
					<view class="app-options-title">最大金额</view>
					<view class="app-options-r">
						<input type="number" v-model="params.max_moeny" placeholder="请输入" placeholder-class="placeholder" />
						<text class="param">元</text>
					</view>
				</view>
			</block>
			<!-- 优惠卷 -->
			<block v-if="params.type == 3">
				<view class="app-options-item">
					<view class="app-options-title">满额</view>
					<view class="app-options-r">
						<input type="number" v-model="params.moeny" placeholder="请输入" placeholder-class="placeholder" />
						<text class="param">元</text>
					</view>
				</view>
				<view class="app-options-item">
					<view class="app-options-title">减额</view>
					<view class="app-options-r">
						<input type="number" v-model="params.max_moeny" placeholder="请输入" placeholder-class="placeholder" />
						<text class="param">元</text>
					</view>
				</view>
			</block>
			<view class="app-options-item">
				<view class="app-options-title">数量</view>
				<view class="app-options-r">
					<input type="number" v-model="params.count" placeholder="请输入" placeholder-class="placeholder" />
					<text class="param">份</text>
				</view>
			</view>
			<view class="app-options-item">
				<view class="app-options-title">截止日期</view>
				<picker mode="date" @change="dateChange" class="app-options-r">
					<text v-if="params.end_time === ''" class="context">请选择</text>
					<text v-else class="value">{{params.end_time}}</text>
					<u-icon name="arrow-right" size="26" color="#333"></u-icon>
				</picker>
			</view>
		</view>
		<view class="app-context">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">详细描述</view>
			</view>
			<view class="app-input">
				<textarea v-model="params.desc" placeholder-class="placeholder" placeholder="让我们多了解一些"></textarea>
			</view>
		</view>
		<view class="app-context">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">图片</view>
			</view>
			<view class="app-context-box">
				<view class="app-context-img" v-for="(item, index) in imgList" :key="item.id">
					<u-image width="100%" height="100%" :src="item.abs_url"></u-image>
					<u-icon class="app-context-close" @click="closeImg(index)" name="close-circle-fill" size="32" color="#333"></u-icon>
				</view>
				<view class="app-context-add" @click="uploadImg">
					<image src="@/static/image/add.png"></image>
				</view>
			</view>
		</view>
		
		<view class="defalut-btn" @click="release">确认发布</view>
		
		<u-popup mode="bottom" border-radius="20" v-model="isShow">
			<view class="popup-box">
				<view class="app-title">
					<view class="Title-line"></view>
					<view class="Title-text">活动类型</view>
				</view>
				<picker-view class="popup-context" @change="typeChange" indicator-class="picker-item-active">
					<picker-view-column>
						<view class="picker-item" v-for="(item ,index) in pickerList" :key="index">
							{{item}}
						</view>
					</picker-view-column>
				</picker-view>
				<view class="popup-btn">
					<view class="btn-item active" @click="pickerDefine">确定</view>
					<view class="btn-item" @click="isShow = false">取消</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { activity } from '@/network/profile-api'
	
	import Upload from '@/utils/upload'
	export default {
		data() {
			return {
				isShow: false,
				pickerList: ['普通红包', '随机红包', '优惠券'],
				params: {
					type: 1,
					moeny: '',
					max_moeny: '',
					count: '',
					desc: '',
					image: '',
					end_time: '',
					m_id: ''
				},
				picker: 0,
				imgList: []
			};
		},
		onLoad(option) {
			this.params.m_id = option.m_id
		},
		methods: {
			dateChange(e) {
				this.params.end_time = e.detail.value
			},
			typeChange(e) {
				
				this.picker = e.detail.value[0]
			},
			pickerDefine() {
				this.params.type = this.picker + 1
				this.isShow = false
			},
			async uploadImg() {
				try{
					let res = await new Upload({
						count: 3, 
						url: 'Personal/upload'
					}).uploadPic()
					
					this.imgList =  res.map((item, index) => {
						return {
							id: item.data.list[0].id,
							abs_url: item.data.list[0].abs_url
						}
					})
					
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			closeImg(index) {
				this.imgList.splice(index, 1)
			},
			reActivity() {
				uni.showLoading({
					title: '正在提交...',
					mask: true
				})
				let photo = this.imgList.map((item, index) => {
					return item.id
				})
				this.params.image = photo.join(',')
				
				activity(this.params).then(res => {
					
					uni.showToast({
						title: '发布成功',
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
			release() {
				const params = this.params
				if(params.type == 1 && params.moeny == '') {
					return uni.showToast({
						title: '请输入红包金额',
						icon: 'none'
					})
				}
				
				if(params.type == 2 && params.moeny == '') {
					return uni.showToast({
						title: '请输入红包总额',
						icon: 'none'
					})
				}
				
				if(params.type == 2 && params.max_moeny == '') {
					return uni.showToast({
						title: '请输入红包最大金额',
						icon: 'none'
					})
				}
				
				if(params.type == 3 && params.moeny == '') {
					return uni.showToast({
						title: '请输入优惠劵满额',
						icon: 'none'
					})
				}
				
				if(params.type == 3 && params.max_moeny == '') {
					return uni.showToast({
						title: '请输入优惠劵减额',
						icon: 'none'
					})
				}
				
				if(params.count === '') {
					return uni.showToast({
						title: '请输入活动数量',
						icon: 'none'
					})
				}
				
				if(params.end_time === '') {
					return uni.showToast({
						title: '请选择活动截止日期',
						icon: 'none'
					})
				}
				
				if(params.desc === '') {
					return uni.showToast({
						title: '请输入活动描述',
						icon: 'none'
					})
				}
				
				if(this.imgList.length === 0) {
					return uni.showToast({
						title: '请上传活动图片',
						icon: 'none'
					})
				}
				
				this.reActivity()
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 200rpx;
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
	.app-options {
		@include box(0 30rpx);
		
		border-bottom: 20rpx solid #F9F9FA;
		&-item {
			height: 88rpx;
			width: 100%;
			@include flex-al-ju(space-between);
			border-bottom: 1px solid #f5f5f5;
		}
		&-title {
			font-size: 30rpx;
			color: #333333;
			font-weight: 600;
			margin-right: 20rpx;
		}
		&-r {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			text-align: right;
			.context {
				flex: 1;
				margin-right: 20rpx;
				font-size: 28rpx;
				color: #999999;
			}
			input {
				flex: 1;
				margin-right: 20rpx;
				font-size: 28rpx;
				color: #333333;
				text-align: right;
			}
			.placeholder {
				margin-right: 20rpx;
				font-size: 28rpx;
				color: #999999;
			}
			.param {
				font-size: 28rpx;
				color: #333333;
			}
			.value {
				font-size: 28rpx;
				color: #333333;
				margin-right: 10rpx;
			}
		}
	}
	.app-context {
		@include box(20rpx 0);
		border-bottom: 20rpx solid #F9F9FA;
		.app-input {
			height: 150rpx;
			@include box(0 60rpx);
			textarea {
				width: 100%;
				height: 100%;
				line-height: 42rpx;
				color: #333333;
				font-size: 28rpx;
			}
		}
		&-box {
			width: 100%;
			@include box(0 30rpx);
			display: flex;
			flex-wrap: wrap;
			.app-context-img {
				width: 162rpx;
				height: 162rpx;
				margin-right: 14rpx;
				margin-bottom: 20rpx;
				position: relative;
				.app-context-close {
					position: absolute;
					top: -15rpx;
					right: -15rpx;
					z-index: 9;
				}
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
	.popup-box {
		width: 100%;
		height: 688rpx;
		background-color: #fff;
		@include box(40rpx 0 0 0);
		.popup-context {
			width: 100%;
			height: 420rpx;
			@include box(20rpx 30rpx);
		}
		.picker-item {
			width: 100%;
			height: 146rpx;
			@include flex-center();
			font-size: 36rpx;
			color: #333;
			font-weight: bold;
			
		}
		.picker-item-active {
			width: 100%;
			height: 146rpx;
			@include flex-center();
			font-size: 36rpx;
			color: #333;
			font-weight: bold;
		}
	}
	.popup-btn {
		height: 120rpx;
		@include box(0 30rpx);
		@include flex-al();
		.btn-item {
			width: 200rpx;
			height: 60rpx;
			background-color: #E5E5E5;
			border-radius: 30rpx;
			@include flex-center();
			font-size: 24rpx;
			color: #333333;
			margin-right: 20rpx;
		}
		.active {
		
			background: linear-gradient(90deg, #F64D36 0%, #FFAE00 100%);
			color: #FFFFFF;
		}
	}
</style>
