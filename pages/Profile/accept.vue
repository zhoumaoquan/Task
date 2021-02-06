<template>
	<view class="container">
		<view class="app-nav">
			<view class="app-nav-item" v-for="(nav, index) in title" :class="{ active: index === params.state }" @click="changeNav(index)" :key='index'>{{nav}}</view>
		</view>
		<view class="app-box">
			<block v-if="taskList.length > 0">
				<task-accept v-for="(item, index) in taskList" :key="item.task_id" :detail="item"></task-accept>
				<u-loadmore v-if="taskList.length > 3" :status="status" margin-top="50" color="#333" margin-bottom="30" :load-text="loadText" />
			</block>
			<block v-else>
				<z-empty text="暂无该状态任务~"></z-empty>
			</block>
			
			<view class="app-loading" v-show="isLoading">
				<u-loading mode="circle" size="80" color="#FA771E"></u-loading>
			</view>
		</view>
	</view>
</template>

<script>
	import TaskAccept from '@/component/TaskAccept.vue'
	import ZEmpty from '@/component/Z-empty.vue'
	
	import { acceptTask } from '@/network/profile-api'
	export default {
		data() {
			return {
				title: ['全部', '待提交', '待审核', '未通过', '已通过', '已结束'],
				params: {
					p: 1,
					m_id: '',
					state: 0
				},
				taskList: [],
				isLoading: true,
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
		components: {
			TaskAccept,
			ZEmpty
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			
			this.params.m_id = option.m_id
			
		},
		onShow() {
			this.getMyTask()
		},
		onReachBottom() {
			if (this.flag) {
				this.params.p += 1
		
				this.taskLoadMore()
			}
		},
		methods: {
			changeNav(index) {
				if (this.params.state === index) {
					return
				}
				
				this.params.state = index
				
				if (this.timer) {
					clearTimeout(this.timer)
				}
				
				this.flag = true
				this.params.p = 1
				
				this.isLoading = true
				
				this.timer = setTimeout(() => {
					this.getMyTask()
				}, 300)
			},
			async getMyTask() {
				try {
					let res = await acceptTask(this.params)
			
					this.taskList = res
			
					uni.hideLoading()
					this.isLoading = false
			
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			taskLoadMore() {
				acceptTask(this.params).then(res => {
			
					if (res.length === 0) {
						this.params.p -= 1
						this.status = 'nomore'
						this.flag = false
					} else {
						this.taskList = [...this.taskList, ...res]
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
		background-color: #F9F9FA;
		padding-bottom: 100rpx;
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
			font-weight: 600;
			transition: font 0.3s;
		}
		.app-nav-item.active {
			font-size: 36rpx;
			font-weight: 600;
			color: #FA771E;
		}
	}
	
	.app-loading {
		width: 100%;
		height: calc(100vh - 108rpx);
	
		background-color: #F9F9FA;
		display: flex;
		justify-content: center;
	
		@include box(300rpx 0 0 0);
	
		position: fixed;
		top: 108rpx;
		left: 0;
		right: 0;
	
		z-index: 999;
	}
</style>
