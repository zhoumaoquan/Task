<template>
	<view class="container">
		<view class="app-head">
			<view class="app-head-top">
				<view class="app-box-item">
					<image class="app-box-item-icon" :src="detail.avatar"></image>
					<view class="app-box-item-r">
						<view class="app-box-item-title">
							<text>{{detail.nickname}}</text>
						</view>
						<view class="app-box-item-text">
							<text>{{detail.name}}</text>
							<text>{{detail.ymd}}加入</text>
						</view>
					</view>
				</view>
			</view>
			<view class="app-head-bottom">
				<image class="app-head-bg" src="@/static/image/bg-3.png"></image>
				<view class="app-head-info">
					<view class="info-item">
						<text class="text">本月完成/个</text>
						<text class="cont">{{detail.two_count}}</text>
					</view>
					<view class="info-item">
						<text class="text">上月赚得/元</text>
						<text class="cont">{{detail.one_moeny}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="app-title">
			<view class="Title-line"></view>
			<view class="Title-text">最近2个月</view>
		</view>
		
		<view class="app-context">
			<block v-if="list.length > 0">
				<view class="app-context-item" v-for="(item, index) in list" :key="item.id">
					<image class="app-context-item-icon" :src="item.avatar"></image>
					<view class="app-context-item-r">
						<view class="app-context-item-title">
							<text>{{item.nickname}}</text>
							<text>￥{{item.moeny}}</text>
						</view>
						<view class="app-context-item-text">
							<text>{{item.name}}</text>
							<text>{{item.complete_time}}</text>
						</view>
					</view>
				</view>
				
				<u-loadmore v-if="list.length > 3" :status="status" margin-top="30" color="#999" margin-bottom="30" :load-text="loadText" />
			</block>
			<block v-else>
				<z-empty text="暂无最近2月任务数据~"></z-empty>
			</block>
		</view>
	</view>
</template>

<script>
	import { teamCount } from '@/network/profile-api'
	import ZEmpty from '@/component/Z-empty.vue'
	export default {
		components: {
			ZEmpty
		},
		data() {
			return {
				params: {
					m_id: '', // 队员m_id ID
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
				title: '加载中...'
			})
			this.params.m_id = option.id
			
			this.getTeamDetail()
		},
		onReachBottom() {
			if(this.flag) {
				this.params += 1
				this.status = 'loading'
				this.moreTeamList()
			}
		},
		methods: {
			async getTeamDetail() {
				try{
					let res = await teamCount(this.params)
					
					uni.setNavigationBarTitle({
						title: res.nickname + '队员统计'
					})
					
					this.detail = res
					this.list = res.there_list
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			moreTeamList() {
				teamCount(this.params).then(res => {
					
					if(res.there_list.length === 0) {
						this.flag = false
						this.params.p -= 1
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
						
						this.list = [...this.list, ...res.there_list]
					}
					
				}).catch(e => {
					this.status = 'nomore'
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
		background-color: #F9F9FA;
		padding-bottom: 100rpx;
	}
	.container {
		@include box(40rpx 30rpx 0 30rpx);
	}
	.app-head {
		width: 690rpx;
		height: 354rpx;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0px 8rpx 21rpx 3rpx rgba(228, 223, 223, 0.28);
	}
	.app-head-top {
		height: 50%;
		width: 100%;
		position: relative;
		z-index: 2;
	}
	.app-box-item {
		background-color: #FFFFFF;
		width: 690rpx;
		height: 180rpx;
		
		@include box(42rpx 20rpx);
		@include flex-al();
		
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
			@include flex-al-ju(space-between);
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			.active {
				font-size: 26rpx;
				color: #1A73E8;
			}
		}
		&-text {
			@include flex-al-ju(space-between);
			font-size: 24rpx;
			color: #999999;
		}
	}
	.app-head-bottom {
		position: relative;
		height: 60%;
		margin-top: -5%;
		.app-head-bg {
			width: 100%;
			height: 100%;
		}
	}
	.app-head-info {
		width: 100%;
		height: 174rpx;
		position: absolute;
		left: 0;
		top: 45rpx;
		@include flex-al();
		.info-item {
			flex: 1;
			@include flex-center();
			flex-direction: column;
			.text {
				font-size: 24rpx;
				color: #FFFFFF;
				font-weight: 500;
				margin-bottom: 20rpx;
			}
			.cont {
				font-size: 40rpx;
				color: #FFFFFF;
				font-family: DINCond-Medium;
				font-weight: 500;
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
	.app-context {
		margin-top: 20rpx;
		&-item {
			background-color: #FFFFFF;
			width: 690rpx;
			height: 180rpx;
			box-shadow: 0px 8rpx 21rpx 3rpx rgba(228, 223, 223, 0.28);
			@include box(42rpx 20rpx);
			@include flex-al();
			border-radius: 10rpx;
			margin-bottom: 20rpx;
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
				@include flex-al-ju(space-between);
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
				.active {
					font-size: 26rpx;
					color: #1A73E8;
				}
			}
			&-text {
				@include flex-al-ju(space-between);
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
</style>
