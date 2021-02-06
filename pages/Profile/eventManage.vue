<template>
	<view class="container">
		<u-sticky>
			<view class="app-nav">
				<view class="app-nav-item" v-for="(nav, index) in title" :class="{ active: index === params.state }" @click="changeNav(index)"
				 :key='index'>{{nav}}</view>
			</view>
		</u-sticky>
		<view class="app-box">
			<block v-if="list.length > 0">
				<task-event @changeEvent="changeEvent" v-for="(item, index) in list" :key="item.id" :detail="item"></task-event>
				
				<u-loadmore v-if="list.length > 2" :status="status" margin-top="50" color="#333" margin-bottom="30" :load-text="loadText" />
			</block>
			<block v-else>
				<z-empty></z-empty>
			</block>
			
			<view class="app-loading" v-show="isLoading">
				<u-loading mode="circle" size="80" color="#FA771E"></u-loading>
			</view>
		</view>
	</view>
</template>

<script>
	import { 
		eventManage, 
		eventOperate 
	} from '@/network/profile-api'
	import TaskEvent from '@/component/TaskEvent.vue'
	import ZEmpty from '@/component/Z-empty.vue'
	export default {
		data() {
			return {
				title: ['全部', '进行中', '已停止', '已结束'],
				params: {
					p: 1,
					m_id: '',
					state: 0
				},
				list: [],
				isLoading: true,
				timer: null,
				flag: true,
				status: 'loadmore',
				loadText: {
					loadmore: '用力往上拉',
					loading: '正在加载,休息一下吧',
					nomore: '我也是有底线的~'
				},
			};
		},
		components: {
			TaskEvent,
			ZEmpty
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.params.m_id = option.m_id
			
			this.getEventManage()
		},
		onReachBottom() {
			if(this.flag) {
				this.params.p += 1
				this.status = 'loading'
				this.moreEventManage()
			}
		},
		methods: {
			changeNav(index) {
				if (this.params.state === index) {
					return
				}
				this.flag = true
				this.isLoading = true
				this.params.state = index
				
				if(this.timer) { clearTimeout(this.timer) }
				
				this.timer = setTimeout(() => {
					this.getEventManage()
				}, 300)
				
			},
			async getEventManage() {
				try{
					let res = await eventManage(this.params)
					
					this.list = res
					
					this.isLoading = false
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			moreEventManage() {
				eventManage(this.params).then(res => {
					
					if(res.length === 0) {
						this.flag = false
						this.status = 'nomore'
						this.params.p -= 1
					} else {
						this.status = 'loadmore'
						this.list = [...this.list, ...res]
					}
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			changeEvent(e) {
				uni.showLoading({
					title: '正在操作...'
				})
				eventOperate({
					id: e.id,
					type: e.type
				}).then(res => {
					
					this.getEventManage()
					
					uni.showToast({
						title: '操作成功'
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
		position: relative;
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
