<template>
	<view class="container">
		<view class="app-head">
			<image class="app-head-bg" src="@/static/image/bg-2.png"></image>
			<view class="app-head-info">
				<u-image :src="info.avatar" width="88rpx" height="88rpx" borderRadius="50%"></u-image>
				<view class="app-head-r">
					<text class="title">{{info.nickname}} 的团队</text>
					<text class="text">{{info.dai}}</text>
				</view>
			</view>
		</view>
		<view class="app-title">
			<view class="Title-line"></view>
			<view class="Title-text">最近2个月</view>
		</view>
		<view class="app-box">
			<block v-if="list.length > 0">
				<view class="app-box-item" v-for="(item,index) in list" :key="item.id">
					<image class="app-box-item-icon" :src="item.avatar"></image>
					<view class="app-box-item-r">
						<view class="app-box-item-title">{{item.nickname}}</view>
						<view class="app-box-item-text">
							<text>{{item.name}}</text>
							<text>{{item.ymd}}加入</text>
						</view>
					</view>
				</view>
				
				<u-loadmore v-if="list.length > 3" :status="status" margin-top="30" color="#999" margin-bottom="30" :load-text="loadText" />
			</block>
			<block v-else>
				<z-empty text="暂无团队信息~"></z-empty>
			</block>
		</view>
	</view>
</template>

<script>
	import ZEmpty from '@/component/Z-empty.vue'
	import { myTaskOne } from '@/network/profile-api'
	export default {
		components: {
			ZEmpty
		},
		data() {
			return {
				params: {
					p: 1,
					m_id: ''
				}, 
				list: [],
				info: {},
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				flag: true
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.params.m_id = option.m_id
			
			this.getMyTaskOne();
		},
		onReachBottom() {
			if(this.flag) {
				this.taskReach()
			}
		},
		methods: {
			async getMyTaskOne() {
				try{
					let res = await myTaskOne(this.params)
					
					this.info = res
					this.list = res.list
					
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			taskReach() {
				this.params.p += 1
				this.status = 'loading';
				
				myTaskOne(this.params).then(res => {
					if(res.list.length === 0) {
						this.params.p -= 1
						this.status = 'nomore'
						this.flag = false
					}else {
						this.list = [...this.list, ...res.list]
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F9F9FA;
		padding-bottom: 100rpx;
	}
	.container {
		@include box(0 30rpx);
	}
	.app-head {
		width: 690rpx;
		height: 180rpx;
		margin-top: 38rpx;
		position: relative;
		&-bg {
			width: 100%;
			height: 100%;
		}
		&-info {
			width: 100%;
			height: 90rpx;
			@include box(0 20rpx);
			@include position-al();
			left: 0;
			@include flex-al();
		}
		.app-head-r {
			height: 100%;
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #FFFFFF;
			}
			.text {
				font-size: 24rpx;
				color: #FFFFFF;
				font-weight: 500;
			}
		}
		
	}
	.app-title {
		@include flex-al();
		height: 100rpx;
		margin-top: 30rpx;
		.Title-text {
			font-size: 32rpx;
			margin-left: 10rpx;
		}
	}
	.app-box {
		margin-top: 20rpx;
		&-item {
			background-color: #FFFFFF;
			width: 690rpx;
			height: 180rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			@include box(42rpx 20rpx);
			@include flex-al();
			box-shadow: 0px 8rpx 21rpx 3rpx rgba(228, 223, 223, 0.28);
			&-icon {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}
			&-r {
				flex: 1;
				height: 100%;
				@include flex-ju(space-between);
				flex-direction: column;
				margin-left: 30rpx;
			}
			&-title {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
			}
			&-text {
				@include flex-al-ju(space-between);
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
</style>
