<template>
	<view class="container">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	import { protocol } from '@/network/profile-api'
	export default {
		data() {
			return {
				content: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			
			this.getProtocol(option.type)
		},
		methods: {
			async getProtocol(type) {
				try{
					let res = await protocol(type)
					
					uni.setNavigationBarTitle({
						title: res.title
					})
					
					this.content = res.content
					
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						iocn: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		@include box(30rpx);
	}
</style>
