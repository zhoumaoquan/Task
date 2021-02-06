<template>
	<view class="task-publish" @click="jumpDetail(detail.task_id)">
		<view class="task-head">
			<view class="task-head-title">{{detail.name}}</view>
			<view class="task-tag">
				<view v-if="detail.state == 1" class="task-tag-item color-3">审核中</view>
				<view v-if="detail.state == 2" class="task-tag-item color-2">已通过</view>
				<view v-if="detail.state == 3" class="task-tag-item color-5">未通过</view>
				<view v-if="detail.state == 4" class="task-tag-item color-1">已上架</view>
				<view v-if="detail.state == 5" class="task-tag-item color-4">已结束</view>
			</view>
		</view>
		<view class="task-price">
			<view class="price">￥{{detail.moeny}}</view>
			<view class="vip-price">VIP:￥{{detail.vip_moeny}}</view>
		</view>
		<view class="task-content">
			<text>{{detail.desc}}</text>
		</view>
		<view class="task-footer">
			<view class="task-footer-timer">
				<text>截止时间：{{detail.end_time}}</text>
			</view>
			<view class="task-footer-num" v-if="detail.state == 4 || detail.state == 5">
				<text class="active">{{detail.member_accept_task}}人参加</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TaskPublish',
		props: {
			detail: {
				type: Object,
				default() { return {} }
			}
		},
		methods: {
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/Profile/taskDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-publish {
		background-color: #FFFFFF;
		width: 100%;
		margin-bottom: 20rpx;
		@include box(0 30rpx);
	}
	.task-head {
		width: 100%;
		height: 70rpx;
		margin-top: 20rpx;
		@include flex-al-ju(space-between);
		&-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
			width: 65%;
			@include ellipsis();
		}
		.task-tag {
			@include flex-al-ju(flex-end);
			&-item {
				width: 90rpx;
				height: 36rpx;
				@include flex-center();
				font-size: #FEAC74;
				color: #FFFFFF;
				font-weight: 500;
				font-size: 20rpx;
				margin-left: 10rpx;
			}
			&-item.active {
				background-color: #FA771E;
			}
		}
	}
	.task-price {
		height: 90rpx;
		@include flex-al();
		.price {
			font-size: 36rpx;
			color: #ED4015;
			font-weight: 600;
			margin-right: 20rpx;
		}
		.vip-price {
			margin-top: 5rpx;
			padding: 2rpx 9rpx 2rpx 9rpx;
			border-radius: 5rpx;
			border: 2rpx solid #F8B7A6;
			background: #FEE8E2;
			font-size: 20rpx;
			color: #FD6969;
			font-weight: 600;
		}
	}
	.task-content {
		font-weight: 400;
		font-size: 24rpx;
		color: #999999;
		line-height: 48rpx;
		@include multiline();
		padding-bottom: 30rpx;
	}
	.task-footer {
		width: 100%;
		height: 61rpx;
		@include flex-al-ju(space-between);
		border-top: 1px solid #E2E2E5;
		
		&-num {
			color: #999999;
			font-size: 24rpx;
			.active {
				color: #1A73E8;
				margin-right: 10rpx;
			}
		}
		&-timer {
			color: #999999;
			font-size: 24rpx;
		}
	}
</style>
