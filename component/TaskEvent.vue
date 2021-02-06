<template>
	<view class="task-activity">
		<view class="task-head">
			<view class="task-head-l">
				<text class="task-name">{{detail.name}}</text>
				<view class="task-tag task-tag-1" v-if="detail.type == 1">红包</view>
				<view class="task-tag task-tag-2" v-if="detail.type == 2">随机红包</view>
				<view class="task-tag task-tag-3" v-if="detail.type == 3">优惠劵</view>
			</view>
			<view class="task-head-r">
				<view class="task-tag color-3" v-if="detail.state == 1">进行中</view>
				<view class="task-tag color-5" v-if="detail.state == 2">已停止</view>
				<view class="task-tag color-4" v-if="detail.state == 3">已结束</view>
			</view>
		</view>
		<view class="task-price-box">
			<text class="task-price">{{ detail.type != 3 ? '￥' + detail.moeny : detail.moeny}}</text>
			
			<view class="task-remain" v-if="detail.type == 2">
				<text>余：</text>
				<text class="active">{{detail.shen_moeny}}</text>
				<text>元</text>
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
		<view class="task-footer">
			<view class="task-footer-text">
				<text space="emsp">截止时间：{{detail.end_time}}  余：</text>
				<text class="active">{{detail.count}} </text>
				<text>个</text>
			</view>
			<view class="task-footer-btn stop-btn" v-if="detail.state == 1" @click="operate(1)">
				<text>停止</text>
			</view>
			<view class="task-footer-btn defalut-btn" v-if="detail.state == 2" @click="operate(2)">
				<text>恢复</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				type: Object,
				defalut() {
					return {}
				}
			}
		},
		methods: {
			operate(type) {
				uni.showModal({
					title: '提示',
					content: '你确定要' + (type == 1 ? '停止' : '恢复') + '该活动吗?',
					success:(res) => {
						if(res.confirm) {
							this.$emit('changeEvent', { type, id: this.detail.id })
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-activity {
		width: 100%;
		background-color: #FFFFFF;
		@include box(30rpx 30rpx 0 30rpx);
		margin-bottom: 20rpx;
	}
	.task-head {
		width: 100%;
		height: 60rpx;
		@include flex-al-ju(space-between);
		
		&-l {
			@include flex-al();
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
		
	}
	.task-price-box {
		width: 100%;
		height: 80rpx;
		@include flex-al-ju(space-between);
		border-bottom: 3rpx solid #E4E4E4;
	}
	.task-remain {
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
		.active {
			color: #1A73E8;
		}
	}
	.task-price {
		font-size: 36rpx;
		color: #ED4015;
		font-weight: 600;
		color: #ED4015;
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
