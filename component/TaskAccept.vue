<template>
	<view class="task" @click="jumpDetail(detail.id)">
		<view class="task-head">
			<view class="task-head-title">{{detail.name}}</view>
			<view class="task-tag" v-if="detail.state != 1">
				<view class="task-tag-item" v-if="detail.type == 1">平台</view>
				<view class="task-tag-item color-3" v-if="detail.state == 2">待审核</view>
				<view class="task-tag-item color-5" v-if="detail.state == 3">未通过</view>
				<view class="task-tag-item color-2" v-if="detail.state == 4">已通过</view>
				<view class="task-tag-item color-4" v-if="detail.state == 5">已结束</view>
			</view>
			<view class="task-title-time" v-else>
				<text>{{detail.text_time}}</text>
			</view>
		</view>
		<view class="task-price">
			<view class="task-price-l">
				<view class="price">￥{{detail.moeny}}</view>
				<view class="vip-price">VIP:￥{{detail.vip_moeny}}</view>
			</view>
			<view class="task-price-r" v-if="detail.state == 1">
				<text>余：</text>
				<text class="active">{{detail.shen_count}}</text>
				<text>个</text>
			</view>
		</view>
		<view class="task-author">
			<view class="task-btn defalut-btn" v-if="detail.state == 1">去完成</view>
			<view class="task-btn defalut-btn" v-if="detail.state == 3">查看原因</view>
			<view class="task-author-info" v-if="detail.type != 1">
				<image class="task-author-img" :src="detail.avatar"></image>
				<text class="task-author-name">发布者: {{detail.nickname}}</text>
			</view>
		</view>
		<view class="task-footer">
			<view class="task-footer-num">
				<text>领取时间：{{detail.add_time}}</text>
			</view>
			<view class="task-footer-timer">
				<text>截止时间：{{detail.end_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'task-accept',
		props: {
			detail: {
				type: Object,
				default() { return {} }
			}
		},
		methods: {
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/Home/receive?type=2&id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task {
		width: 100%;
		background-color: #FFFFFF;
		@include box(10rpx 30rpx);
		margin-bottom: 20rpx;
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
				}
			}
			.task-title-time {
				font-size: 24rpx;
				color: #1A73E8;
				font-weight: 400;
			}
		}
		.task-price {
			height: 90rpx;
			@include flex-al-ju(space-between);
			&-l {
				@include flex-al();
			}
			&-r {
				color: #999999;
				font-size: 24rpx;
				.active {
					color: #1A73E8;
					margin-right: 10rpx;
				}
			}
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
		}
		.task-author {
			width: 100%;
			@include flex-al-ju(space-between);
		}
		.task-btn {
			
			width: 160rpx;
			height: 60rpx;
			font-size: 24rpx;
			margin: 20rpx 0;
			margin-right: 30rpx;
			
			flex-shrink: 0;
		}
		.task-author-info {
			@include flex-al();
			.task-author-img {
				width: 60rpx;
				height: 60rpx;
				
				border-radius: 50%;
				margin: 20rpx 0;
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
