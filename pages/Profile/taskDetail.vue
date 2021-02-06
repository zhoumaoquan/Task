<template>
	<view class="container">
		<!-- 审核中 -->
		<view class="app-head" v-if="detail && detail.state == 1">
			<view class="app-head-title">
				<text class="title">{{detail.name}}</text>
				<view class="task-tag color-5" v-if="detail.state == 1">审核中</view>
			</view>
			<view class="app-head-cont">
				<text class="vip">VIP:￥{{detail.vip_moeny}}</text>
				<text class="not">普通:￥{{detail.moeny}}</text>
			</view>
			<view class="app-head-foot">
				截止日期：{{detail.end_time}}
			</view>
		</view>
		
		<!-- 未通过 -->
		<block  v-if="detail && detail.state == 3">
			<view class="app-head">
				<view class="app-head-title">
					<text class="title">{{detail.name}}</text>
					<view class="task-tag color-5">未通过</view>
				</view>
				<view class="app-head-cont">
					<text class="vip">VIP:￥{{detail.vip_moeny}}</text>
					<text class="not">普通:￥{{detail.moeny}}</text>
				</view>
				<view class="app-head-foot">
					截止日期：{{detail.end_time}}
				</view>
				
				<view class="app-head-btn defalut-btn" @click="editTask(detail.task_id)">去修改</view>
			</view>
			<view class="app-context">
				<view class="app-title">
					<view class="Title-line"></view>
					<view class="Title-text">未通过原因:</view>
				</view>
				<view class="app-context-text">
					<text>{{detail.why}}</text>
				</view>
			</view>
		</block>
		
		<!-- 通过未付款 -->
		<view class="app-head" v-if="detail && detail.state == 2">
			<view class="app-head-title">
				<text class="title">{{detail.name}}</text>
				<view class="task-tag color-5">通过未付款</view>
			</view>
			<view class="app-head-cont">
				<text class="vip">VIP:￥{{detail.vip_moeny}}</text>
				<text class="not">普通:￥{{detail.moeny}}</text>
			</view>
			<view class="app-head-foot">
				截止日期：{{detail.end_time}}
			</view>
			
			<view class="app-head-btn defalut-btn" @click="pay(detail.task_id)">去付款</view>
		</view>
		
		<!-- 已上架 -->
		<view class="app-task" v-if="detail && (detail.state == 4 || detail.state == 5)">
			<view class="app-task-head">
				<view class="task-title">
					<view class="task-title-l">
						<text class="title">{{detail.name}}</text>
						<text class="price">￥{{detail.moeny}}</text>
						<view class="task-tag color-1" v-if="detail.state == 4">已上架</view>
						<view class="task-tag color-6" v-if="detail.state == 5">已结束</view>
					</view>
					<text class="task-text">{{detail.end_time}}到期</text>
				</view>
				<view class="task-progress">
					<u-line-progress active-color="#FA771E" inactive-color="#FFFFFF" :show-percent="false" height="14" :percent="ratio"></u-line-progress>
				</view>
				<view class="task-foot">
					<view class="task-foot-num">
						<text class="active">{{detail.member_task}}</text>
						<text>人已赚到赏金 </text>
					</view>
					<view class="task-foot-num">
						<text>剩余</text>
						<text class="active">{{detail.shen_count}}</text>
						<text>份</text>
					</view>
				</view>
			</view>
			
			<view class="app-nav">
				<view class="app-nav-item" v-for="(nav, index) in title" :class="{ active: index === current }" @click="changeNav(index, nav.id)" :key='index'>{{nav.title}}</view>
			</view>
			
			<view class="app-box">
				
				<block v-if="taskItem.length > 0">
					<view class="app-box-item" v-for="(item, index) in taskItem" :key="item.id" @click="jumpDetail(item.id)">
						<view class="app-box-head">
							<view class="app-box-head-l">
								<image :src="item.avatar"></image>
								<text class="name">{{item.nickname}}</text>
							</view>
							<view class="app-box-head-r">
								<view v-if="item.state == 1" class="task-tag color-4">未提交</view>
								
								<view v-if="item.state == 2" class="task-tag color-6">未审核</view>
								
								<view v-if="item.state == 3" class="task-tag color-5">未通过</view>
								
								<view v-if="item.state == 4" class="task-tag color-3">已完成</view>
							</view>
						</view>
						<view class="app-box-foot">
							<text>{{item.ymd}}</text>
							<text class="active">{{item.his}}</text>
						</view>
					</view>
					
					<u-loadmore v-if="taskItem.length > 3" :status="status" margin-top="50" color="#333" margin-bottom="30" :load-text="loadText" />
				</block>
				<block v-else>
					<z-empty text="暂无该分类任务~"></z-empty>
				</block>
			</view>
			
		</view>
		
		<view class="app-skeleton" v-show="isSkeleton"></view>
	</view>
</template>

<script>
	import ZEmpty from '@/component/Z-empty.vue'
	import { taskDetail, payTask } from '@/network/profile-api'
	export default {
		components: {
			ZEmpty
		},
		data() {
			return {
				title: [{
					title: '全部',
					id: 0
				}, {
					title: '未审核',
					id: 2
				}, {
					title: '通过',
					id: 4
				}, {
					title: '未通过',
					id: 3
				}],
				current: 0,
				params: {
					id: '',
					p: 1,
					state: 0
				},
				detail: null,
				isSkeleton: true,
				taskItem: [],
				ratio: 0,
				flag: true,
				status: 'loadmore',
				loadText: {
					loadmore: '用力往上拉',
					loading: '正在加载,休息一下吧',
					nomore: '我也是有底线的~'
				},
				timer: null
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			
			this.params.id = option.id 
		},
		onShow() {
			this.getTaskDetail()
		},
		onReachBottom() {
			if (this.flag) {
				this.params.p += 1
			
				this.taskLoadMore()
			}
		},
		methods: {
			changeNav(index, id) {
				if(this.current === index) { return }
				this.current = index
				
				this.params.state = id
				
				if (this.timer) {
					clearTimeout(this.timer)
				}
				
				this.flag = true
				this.params.p = 1
				
				this.timer = setTimeout(() => {
					this.changeTask()
				}, 300)
			},
			async getTaskDetail() {
				try{
					let res = await taskDetail(this.params)
					
					this.detail = res
					if(res.state == 4 || res.state == 5) {
						this.ratio = Math.round((res.member_task / res.count) * 100);
						this.taskItem = res.member_accept_task
					}
					
					this.isSkeleton = false
					uni.hideLoading()
					
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			changeTask() {
				taskDetail(this.params).then(res => {
					this.taskItem = res.member_accept_task
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			taskLoadMore() {
				taskDetail(this.params).then(res => {
					if(res.member_accept_task.length === 0) {
						this.params.p -= 1
						this.flag = false
						this.status = 'nomore'
					} else {
						this.taskItem = [...this.taskItem, ...res.member_accept_task]
					}
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 跳转详情
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/Home/receive?type=3&id=' + id
				})
			},
			// 跳转发布页面 修改任务
			editTask(id) {
				const m_id = uni.getStorageSync('m_id')
				uni.navigateTo({
					url: '/pages/Profile/postTask?m_id=' + m_id + '&id=' + id
				})
			},
			// 支付任务
			pay(id) {
				uni.showLoading({
					title: '正在支付...',
					mask: true
				})
				
				const m_id = uni.getStorageSync('m_id')
				
				payTask({
					m_id,
					id,
				}).then(res => {
					let that = this
					wx.requestPayment({
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.package,
						paySign: res.paySign,
						signType: res.signType,
						success(res) {
							uni.showToast({
								title: '支付成功',
								mask: true,
								success: () => {
									setTimeout(() => {
										that.getTaskDetail()
									}, 1000)
								}
							})
						},
						fail(e) {
							console.log(e)
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							})
						}
					})
					
					
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
	.app-head {
		background-color: #F9F9FA;
		@include box(30rpx 30rpx 20rpx 30rpx);
		position: relative;
		&-title {
			@include flex-al();
			.title {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
			}
		}
		
		&-cont {
			padding: 20rpx 0;
			.vip {
				font-size: 36rpx;
				color: #ED4015;
				font-weight: bold;
			}
			.not {
				font-size: 26rpx;
				color: #999999;
				font-weight: 500;
				margin-left: 30rpx;
			}
		}
		&-foot {
			height: 60rpx;
			@include flex-al();
			font-size: 22rpx;
			color: #999999;
			font-weight: 400;
			border-top: 1px solid #E2E2E5;
		}
		&-btn {
			width: 160rpx;
			height: 60rpx;
			border-radius: 30rpx;
			position: absolute;
			right: 30rpx;
			bottom: 50rpx;
			z-index: 2;
		}
	}
	.task-tag {
		padding: 0rpx 9rpx 0rpx 9rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 20rpx;
	}
	.app-context {
		width: 690rpx;
		background-color: #FFFFFF;
		@include box(30rpx 0);
		margin: 0 auto;
		border-bottom: 1px solid #E2E2E5;
		.app-title {
			height: 80rpx;
			@include flex-al();
			.Title-text {
				font-size: 32rpx;
			}
		}
		&-text {
			margin-top: 10rpx;
			margin-left: 20rpx;
			font-size: 26rpx;
			color: #333333;
			line-height: 42rpx;
			font-weight: 400;
		}
	}
	.app-task {
		background-color: #F9F9FA;
		padding-bottom: 100rpx;
		&-head {
			width: 100%;
			
			@include box(30rpx);
			.task-title {
				@include flex-al-ju(space-between);
				height: 80rpx;
				margin-bottom: 20rpx;
				&-l {
					@include flex-al();
				}
				.title {
					font-size: 32rpx;
					color: #333333;
					font-weight: bold;
					
				}
				.price {
					font-size: 36rpx;
					color: #ED4015;
					font-weight: bold;
					margin-left: 10rpx;
				}
				.task-text {
					font-size: 22rpx;
					color: #999999;
					font-weight: 400;
				}
			}
		}
	}
	.task-foot {
		height: 60rpx;
		@include flex-al-ju(space-between);
		&-num {
			color: #999999;
			font-size: 24rpx;
			.active {
				color: #1A73E8;
				margin-right: 10rpx;
			}
		}
	}
	.app-nav {
		width: 100%;
		height: 108rpx;
		@include flex-al();
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		&-item {
			flex: 1;
			@include flex-center();
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
			transition: font 0.3s;
		}
		.app-nav-item.active {
			font-size: 36rpx;
			font-weight: 600;
			color: #FA771E;
		}
	}
	.app-box {
		margin-top: 20rpx;
		position: relative;
		&-item {
			width: 100%;
			height: 221rpx;
			@include box(0 30rpx);
			background-color: #FFFFFF;
		}
		&-head {
			height: 159rpx;
			@include flex-al-ju(space-between);
			&-l,
			&-r {
				@include flex-al();
			}
			&-l {
				image {
					width: 111rpx;
					height: 110rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
			}
		}
		
		&-foot {
			@include flex-al-ju(space-between);
			height: 61rpx;
			font-size: 24rpx;
			color: #999999;
			font-weight: 400;
			border-top: 1px solid #E2E2E5;
			.active {
				color: #1A73E8;
			}
		}
		
		.app-loading {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			
			z-index: 99;
			
			height: 800rpx;
			
			display: flex;
			justify-content: center;
			@include box(300rpx 0 0 0);
			
			background-color: #F9F9FA;
		}
	}
</style>
