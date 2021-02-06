<template>
	<view class="task" @click="jumpDetail(context.task_id)">
		<view class="task-head">
			<view class="task-head-title">{{context.name}}</view>
			<view class="task-tag">
				<view class="task-tag-item" v-if="context.type == 1">平台</view>
				<view class="task-tag-item active" v-if="context.members_status == 1">已接单</view>
			</view>
		</view>
		<view class="task-price">
			<view class="price">￥{{context.moeny}}</view>
			<view class="vip-price">VIP:￥{{context.vip_moeny}}</view>
		</view>
		<view class="task-content">
			<text>{{context.desc}}</text>
		</view>
		<view class="task-author">
			<view class="task-btn defalut-btn" v-if="context.members_status == 0">我要接</view>
			<view class="task-author-info" v-if="context.type == 2">
				<image class="task-author-img" :src="context.avatar"></image>
				<text class="task-author-name">发布者: {{context.nickname}}</text>
			</view>
		</view>
		<view class="task-footer">
			<view class="task-footer-num">
				<text>余：</text>
				<text class="active">{{context.count}}</text>
				<text>个</text>
			</view>
			<view class="task-footer-timer">
				<text>截止时间：{{context.end_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'task-item',
		props: {
			context: {
				type: Object,
				default() { return {} }
			}
		},
		methods: {
			jumpDetail(id) {
				uni.navigateTo({
					url: `/pages/Home/receive?id=${id}&type=1`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task {
		width: 100%;
		background-color: #FFFFFF;
		&-head {
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
					width: 80rpx;
					height: 30rpx;
					@include flex-center();
					font-size: #FEAC74;
					color: #FFFFFF;
					font-weight: 400;
					font-size: 20rpx;
					margin-left: 10rpx;
					background-color: #FEAC74;
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
				padding: 5rpx 9rpx 5rpx 9rpx;
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
		}
		.task-author {
			width: 100%;
			// height: 100rpx;
			@include flex-al-ju(space-between);
			margin-top: 20rpx;
		}
		.task-btn {
			width: 160rpx;
			height: 60rpx;
			font-size: 24rpx;
			margin-right: 30rpx;
			flex-shrink: 0;
			margin-bottom: 20rpx;
		}
		.task-author-info {
			flex: 1;
			height: 100rpx;
			@include flex-al-ju(flex-end);
			.task-author-img {
				width: 60rpx;
				height: 60rpx;
				
				border-radius: 50%;
				margin-right: 15rpx;
			}
			.task-author-name {
				font-size: 24rpx;
				color: #999999;
				font-weight: 400;
			}
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
	}
</style>
