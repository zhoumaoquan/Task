<template>
	<view class="container">
		<view class="app-head">
			<image class="app-head-bg" src="@/static/image/bg-3.png"></image>
			<view class="app-head-box">
				<view class="app-head-item">
					<text class="title">余额</text>
					<text class="number">{{detail.balance || 0}}</text>
				</view>
				<view class="app-head-item" v-if="detail && detail.dai_status == 1">
					<text class="title">代理进账</text>
					<text class="number">{{detail.dai_moeny}}</text>
				</view>
			</view>
		</view>
		<view class="app-title">
			<view class="Title-line"></view>
			<view class="Title-text">最近记录</view>
		</view>
		<view class="app-box">
			<block v-if="list.length > 0">
				<view class="app-box-item" v-for="(item, index) in list" :key="item.id">
					<image class="app-box-item-icon" src="@/static/icon/money.png"></image>
					<view class="app-box-item-r">
						<view class="app-box-item-title">
							<text>{{item.task_name}}</text>
							<text v-if="item.moeny_type == 1">￥{{item.moeny}}</text>
							<text class="active" v-if="item.moeny_type == 2">-￥{{item.moeny}}</text>
						</view>
						<view class="app-box-item-text">
							<text v-if="item.type == 1">提现</text>
							<text v-if="item.type == 2">任务</text>
							<text>{{item.add_time}}</text>
						</view>
					</view>
				</view>
				
				<u-loadmore v-if="list.length > 3" :status="status" margin-top="30" color="#999" margin-bottom="30" :load-text="loadText" />
			</block>
			<block v-else>
				<z-empty text="暂无零钱明细~"></z-empty>
			</block>
		</view>
		
		<view class="defalut-btn" @click="jumpDetail">提现</view>
	</view>
</template>

<script>
	import ZEmpty from '@/component/Z-empty.vue'
	import { dibDetail } from '@/network/profile-api'
	export default {
		components: {
			ZEmpty
		},
		data() {
			return {
				params: {
					m_id: '',
					p: 1
				},
				detail: null,
				list: [],
				status: 'loadmore',
				loadText: {
					loadmore: '往上拉加载更多',
					loading: '休息一下,正在加载...',
					nomore: '我也是有底线的~'
				},
				flag: true
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.params.m_id = option.m_id
			
			
		},
		onShow() {
			this.getDibDetail()
		},
		onReachBottom() {
			if(this.flag) {
				this.params += 1
				this.status = 'loading'
				this.moreMoneyList()
			}
		},
		methods: {
			async getDibDetail() {
				try{
					let res = await dibDetail(this.params) 
					this.detail = res
					this.list = res.list
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			moreMoneyList() {
				dibDetail(this.params).then(res => {
					
					if(res.list.length === 0) {
						this.flag = false
						this.params.p -= 1
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
						
						this.list = [...this.list, ...res.list]
					}
					
				}).catch(e => {
					this.status = 'nomore'
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			jumpDetail() {
				uni.navigateTo({
					url: '/pages/Profile/smallChange/withdraw?m_id=' + this.params.m_id + '&moeny=' + this.detail.balance
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 100rpx;
	}
	.container {
		@include box(40rpx 30rpx 0 30rpx);
	}
	.app-head {
		width: 690rpx;
		height: 204rpx;
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
			@include flex-al-ju(space-between);
		}
		&-item {
			width: 40%;
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
	.app-title {
		width: 100%;
		height: 100rpx;
		margin-top: 20rpx;
		@include flex-al();
		.Title-text {
			margin-left: 10rpx;
			font-size: 32rpx;
		}
	}
	.app-box {
		margin-top: 20rpx;
		&-item {
			background-color: #FFFFFF;
			width: 690rpx;
			height: 168rpx;
			@include flex-al();
			
			&-icon {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}
			&-r {
				flex: 1;
				height: 100%;
				@include flex-ju(space-evenly);
				flex-direction: column;
				@include box(20rpx 0);
				margin-left: 30rpx;
				border-bottom: 1px solid #E2E2E5;
			}
			&-title {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
				@include flex-ju(space-between);
				.active {
					color: #ED4015;
				}
			}
			&-text {
				@include flex-al();
				font-size: 24rpx;
				color: #999999;
				text {
					margin-right: 20rpx;
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
	}
</style>
