<template>
	<view class="container">
		<block v-if="list.length > 0">
			<task-activity @apply="getCode" type="2" v-for="(item, index) in list" :key="item.hong_id" :detail="item"></task-activity>
			<u-loadmore v-if="list.length > 2" :status="status" margin-top="50" color="#333" margin-bottom="30" :load-text="loadText" />
		</block>
		<block v-else>
			<z-empty></z-empty>
		</block>
		
		<u-popup v-model="isShow" :closeable="true" mode="center" border-radius="20">
			<view class="popup-box">
				<view class="popup-box-head">
					<image class="popup-box-head-icon" :src="popupData.logo[0].abs_url"></image>
					<text>{{popupData.name}}</text>
				</view>
				<view class="popup-box-code">
					<u-image :src="popupData.image" width="100%" height="100%"></u-image>
				</view>
				<view class="popup-box-text">请让“商家扫描”即可使用</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import TaskActivity from '@/component/TaskActivity.vue'
	import ZEmpty from '@/component/Z-empty.vue'
	import { myCoupon, ercode, useDiscount } from '@/network/profile-api'
	export default {
		components: {
			TaskActivity,
			ZEmpty
		},
		data() {
			return {
				isShow: false,
				params: {
					m_id: '',
					p: 1
				},
				list: [],
				flag: true,
				status: 'loadmore',
				loadText: {
					loadmore: '用力往上拉',
					loading: '正在加载,休息一下吧',
					nomore: '我也是有底线的~'
				},
				popupData: {},
				timer: null
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.params.m_id = option.m_id
			
			this.getMyCoupon()
		},
		onUnload() {
			if(this.timer) { clearInterval(this.timer) }
		},
		onReachBottom() {
			if(this.flag) {
				this.params.p += 1
				this.status = 'loading'
				this.moreEventCoupon()
			}
		},
		methods: {
			getMyCoupon() {
				myCoupon(this.params).then(res => {
					
					this.list = res
					uni.hideLoading()
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			moreEventCoupon() {
				myCoupon(this.params).then(res => {
					
					if(res.length === 0) {
						this.flag = false
						this.status = 'nomore'
						this.params.p -= 1
					} else {
						this.status = 'loadmore'
						this.list = [...this.list, ...res]
					}
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			getCode(id) {
				this.popupData = {}
				
				uni.showLoading({
					title: '正在加载...',
					mask: true
				})
				ercode(id).then(res => {
					
					this.popupData = res
					uni.hideLoading()
					this.isShow = true
					
					
					this.timer = setInterval(() => {
						
						this.isUserUse(id)
						
					},1500)
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
				
			},
			// 轮询开始
			isUserUse(id) {
				useDiscount(id).then(res => {
					
					if(res == 1) {
						clearInterval(this.timer)
						this.getMyCoupon()
						this.isShow = false
						uni.showToast({
							title: '使用成功',
							mask: true,
						})
						
						return
					} 
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
		background-color: #F5F5F5;
	}
	.popup-box {
		width: 490rpx;
		height: 623rpx;
		@include box(30rpx 40rpx);
		&-head {
			@include flex-al();
			&-icon {
				width: 66rpx;
				height: 66rpx;
				margin-right: 20rpx;
			}
			font-size: 32rpx;
			color: #333333;
		}
		&-code {
			width: 400rpx;
			height: 400rpx;
			margin-top: 30rpx;
		}
		&-text {
			@include flex-ju();
			font-size: 24rpx;
			color: #666666;
			margin-top: 30rpx;
		}
	}
</style>
