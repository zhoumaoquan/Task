<template>
	<view class="task-activity" @click="jumpDetails(detail.id)">
		<view class="task-head">
			<view class="task-head-l">
				<image :src="detail.logo[0].abs_url" class="head-avatar"></image>
				<text class="task-name">{{detail.name}}</text>
				<view class="task-tag task-tag-1" v-if="detail.type == 1">红包</view>
				<view class="task-tag task-tag-2" v-if="detail.type == 2">随机红包</view>
				<view class="task-tag task-tag-3" v-if="detail.type == 3">优惠劵</view>
			</view>
			<view class="task-head-r">
				<text class="task-price" v-if="detail.type == 1">￥{{detail.moeny}}</text>
				<text class="task-price" v-if="detail.type == 2">余:{{detail.moeny}}</text>
				<text class="task-price" v-if="detail.type == 3">{{detail.moeny}}</text>
			</view>
		</view>
		<view class="task-content">
			<view class="task-text">
				<text>{{detail.desc}}</text>
			</view>
			<view class="task-image">
				<image class="task-image-item" v-for="(item, index) in detail.image" :key="item.id" :src="item.abs_url"></image>
			</view>
		</view>
		<view class="task-footer" v-if="type == 1">
			<view class="task-footer-text">
				<text space="emsp">截止时间：{{detail.end_time}}  余：</text>
				<text class="active">{{detail.count}} </text>
				<text>个</text>
			</view>
			<view class="task-footer-btn defalut-btn" v-if="detail.members_status == 0" @click.stop="receive(detail.id, detail.type)">
				<text>领取</text>
			</view>
			<view class="task-footer-btn stop-btn" v-else>
				<text>领取</text>
			</view>
		</view>
		<view class="task-footer" v-if="type == 2">
			<view class="task-footer-text">
				<text space="emsp">截止时间：{{detail.end_time}}</text>
			</view>
			<view class="task-footer-btn defalut-btn" v-if="detail.state == 1" @click.stop="employ(detail.hong_id)">
				<text>去使用</text>
			</view>
			<view class="task-footer-btn stop-btn" v-if="detail.state == 2">
				<text>已过期</text>
			</view>
			<view class="task-footer-btn stop-btn" v-if="detail.state == 3">
				<text>已使用</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				type: Object,
				default() {
					return {}
				}
			},
			type: {
				type: [String, Number],
				default: 1
			}
		},
		methods: {
			jumpDetails(id) {
				const m_id = uni.getStorageSync('m_id')
				
				if(m_id === '' || m_id === undefined) {
					return this.$emit('login')
				}
				
				uni.navigateTo({
					url: '/pages/Home/redEnvelope?m_id=' + m_id + '&id=' + id
				})
			},
			employ(id) {
				this.$emit('apply', id)
			},
			receive(id, type) {
				this.$emit('receive', { id, type })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-activity {
		width: 100%;
		background-color: #FFFFFF;
		@include box(0 30rpx);
		margin-bottom: 20rpx;
	}
	.task-head {
		width: 100%;
		height: 114rpx;
		@include flex-al-ju(space-between);
		border-bottom: 3rpx solid #E4E4E4;
		&-l {
			@include flex-al();
		}
		.head-avatar {
			width: 66rpx;
			height: 66rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.task-name {
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
			margin-right: 16rpx;
		}
		.task-tag {
			padding: 3rpx 9rpx 3rpx 9rpx;
			border-radius: 5rpx;
			font-size: 20rpx;
			font-weight: 400;
		}
		.task-price {
			font-size: 36rpx;
			color: #ED4015;
			font-weight: 600;
			color: #ED4015;
		}
	}
	.task-content {
		margin-top: 20rpx;
		.task-text {
			font-size: 24rpx;
			line-height: 48rpx;
			font-weight: 400;
			color: #999999;
		}
		.task-image {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;
		}
		.task-image-item {
			width: 162rpx;
			height: 162rpx;
			border-radius: 5rpx;
			margin-right: 14rpx;
			margin-bottom: 20rpx;
		}
	}
	.task-image-item:nth-of-type(4n+4) {
		margin-right: 0;
	}
	.task-footer {
		height: 100rpx;
		@include flex-al-ju(space-between);
		&-text {
			font-size: 24rpx;
			color: #999999;
			font-weight: 400;
			.active {
				color: #1A73E8;
			}
		}
		&-btn {
			width: 160rpx;
			height: 60rpx;
		}
		.stop-btn {
			border-radius: 30rpx;
			background: linear-gradient(90deg, #999999, #C4C4C6);
			font-size: 24rpx;
			color: #fff;
			@include flex-center();
		}
	}
</style>
