<template>
	<view class="container">
		<view class="app-head">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">任务名称：</view>
			</view>
			<input type="text" v-model="params.name" placeholder="请输入" placeholder-class="placeholder" />
		</view>
		<view class="app-box">
			<view class="app-box-item">
				<text class="app-box-title">悬赏单价</text>

				<view class="app-box-input">
					<input placeholder="请输入" v-model="params.moeny" placeholder-class="placeholder" type="number" value="" />
					<text class="param">元/人</text>
				</view>
			</view>
			<view class="app-box-item">
				<text class="app-box-title">总名额</text>

				<view class="app-box-input">
					<input placeholder="请输入" v-model="params.count" placeholder-class="placeholder" type="number" value="" />
					<text class="param">份</text>
				</view>
			</view>
			<view class="app-box-item">
				<text class="app-box-title">截止日期</text>

				<picker mode="date" class="app-box-input" @change="dataChange">
					<text v-if="params.end_time === ''" class="picker">请选择截止日期</text>
					<text v-else class="param">{{params.end_time}}</text>
				</picker>
			</view>
		</view>
		<view class="app-fee">
			<view class="app-fee-title">
				<text class="title">手续费</text>
				<text class="text">{{scale}}</text>
			</view>
			<view class="app-fee-ul">
				<view class="app-fee-li"></view>
				<text class="text">悬赏结束后将退还还未发布的奖金</text>
			</view>
		</view>

		<view class="app-desc">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">领取说明：</view>
			</view>
			<view class="app-desc-cont">
				<view class="app-desc-line"></view>
				<view class="app-desc-input">
					<textarea v-model="params.desc" placeholder-class="placeholder" placeholder="请输入100字以内" maxlength="100"></textarea>
				</view>
			</view>
		</view>
		<view class="app-context">
			<view class="app-context-title">
				<text class="title">添加步骤</text>
				<view class="app-context-btn" @click="addTaskPopup">点击添加</view>
			</view>
		</view>
		<view class="app-context" v-if="params.arr.length > 0">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">步骤</view>
			</view>
			<view class="example-box">
				<view class="example-item" v-for="(item, index) in params.arr" :key="index">
					<view class="example-item-head">
						<view class="example-item-head-l">
							<view class="example-item-li"></view>
							<view class="example-item-title">{{index + 1}}.{{item.name}}</view>
						</view>
						<view class="example-item-head-r" @click="editTaksItem(index)">
							<text>编辑</text>
						</view>
					</view>
					<view class="example-item-cont">
						<view class="example-item-img" v-if="item.type_one == 1">
							<u-image borderRadius="5" :src="item.type_one_image_url" width="100%" height="100%"><u-loading slot="loading"></u-loading></u-image>
						</view>
						<view class="example-item-img" v-if="item.type_two == 1">
							<u-image borderRadius="5" src="@/static/image/unload.png" :fade="false" width="100%" height="100%"><u-loading slot="loading"></u-loading></u-image>
						</view>
					</view>
					<view class="example-item-url" v-if="item.url_type == 1">
						<text>{{item.url}}</text>
						<view class="example-item-copy">复制链接</view>
					</view>
					<view class="example-item-input" v-if="item.type_two == 2">
						<view class="example-item-line"></view>
						<input placeholder="请输入内容" :disabled="true" placeholder-class="placeholder" type="text" />
					</view>
				</view>
			</view>
		</view>

		<view v-if="type === 1" class="defalut-btn" @click="paramRemind">提交</view>
		<view v-if="type === 2" class="defalut-btn" @click="paramRemind">修改</view>

		<u-popup borderRadius="20" mode="bottom" v-model="isShow">
			<view class="popup-task">
				<view class="popup-task-title">添加步骤</view>
				<view class="app-desc">
					<view class="app-title">
						<view class="Title-line"></view>
						<view class="Title-text">步骤描述：</view>
					</view>
					<view class="app-desc-cont">
						<view class="app-desc-line"></view>
						<view class="app-desc-input">
							<textarea v-model="taskItem.name" placeholder-class="placeholder" placeholder="多行输入" maxlength="100"></textarea>
						</view>
					</view>
				</view>
				<view class="popup-instance">
					<view class="instance-head">
						<view class="instance-item instance-one" @click="taskItem.type_one == 1 ? taskItem.type_one = 0 : taskItem.type_one = 1">
							<image src="@/static/icon/block.png" v-if="taskItem.type_one == 0"></image>
							<image src="@/static/icon/block-action.png" v-else></image>
							<text>是否添加示例图</text>
						</view>
						<view class="instance-btn" v-if="taskItem.type_one != 0" @click="upload">点击上传</view>
					</view>
					<view class="instance-item">
						<image src="@/static/icon/block.png" v-if="taskItem.url_type == 0 && taskItem.url === ''"></image>
						<image src="@/static/icon/block-action.png" v-else></image>
						<input type="text" placeholder-class="placeholder" placeholder="输入链接" v-model="taskItem.url" />
					</view>
				</view>
				<view class="app-desc">
					<view class="app-title">
						<view class="Title-line"></view>
						<view class="Title-text">用户操作：</view>
					</view>
					<view class="instance-item instance-two" @click="taskItem.type_two == 2 ? taskItem.type_two = 0 : taskItem.type_two = 2">
						<image src="@/static/icon/round-action.png" v-if="taskItem.type_two == 2"></image>
						<image src="@/static/icon/round.png" v-else></image>
						<text>输入框，用户可以输入内容</text>
					</view>
					<view class="instance-item instance-two" @click="taskItem.type_two == 1 ? taskItem.type_two = 0 :  taskItem.type_two = 1">
						<image src="@/static/icon/round-action.png" v-if="taskItem.type_two == 1"></image>
						<image src="@/static/icon/round.png" v-else></image>
						
						<text>图片上传，用户可以上传图片</text>
					</view>
				</view>

				<view class="popup-task-btn">
					<view class="task-btn-active" @click="addTaskItem">确定</view>
					<view class="task-btn" @click="deleteTaskItem">删除步骤</view>
				</view>
			</view>
		</u-popup>
		<u-modal border-radius="20" width="500" @confirm="comeBack" confirm-color="#333333" :show-title="false" v-model="isModalO" content="发布任务成功，待平台审核..." :content-style="{ color: '#FA771E', fontSize: '30rpx' }"></u-modal>
		<u-modal border-radius="20" width="500" @confirm="comeBack" confirm-color="#333333" :show-title="false" v-model="isModalT" content="修改提交成功，待平台审核..." :content-style="{ color: '#FA771E', fontSize: '30rpx' }"></u-modal>
	</view>
</template>

<script>
	import Upload from '@/utils/upload'
	import { taskDesc, editTask } from '@/network/home-api'
	import { addTask } from '@/network/profile-api'
	export default {
		data() {
			return {
				scale: '',
				isShow: false, // 控制表单开启
				isModalO: false, // 发布成功 提醒框
				isModalT: false, // 修改成功 提醒框
				type: 1, // 当前状态 1: 发布 2: 编辑
				params: {
					name: '',
					moeny: '',
					desc: '',
					m_id: '',
					end_time: '',
					count: '',
					type: 2,
					arr: [],
					task_id: '' // 任务ID 编辑状态下有值
				},
				taskItem: {
					name: '',
					type_one: 0, // 是否有实例图
					type_one_image: '', // 实例图的id
					type_one_image_url: '', // 实例图的url
					type_two: 0, // 类型: 1 上传, 2 输入框
					url_type: 0, // 有无链接
					url: '' // 链接
				},
				currentItem: -1 // 当前子步骤索引
			};
		},
		onLoad(option) {
			this.scale = option.scale
			this.params.m_id = option.m_id
			
			if(option.id) {
				uni.showLoading({
					title: '加载中...'
				})
				this.type = 2
				this.params.task_id = option.id
				
				this.getTaskDesc(option.id, option.m_id)
			}
		},
		methods: {
			dataChange(e) {
				this.params.end_time = e.detail.value
			},
			// 获取任务详情数据
			getTaskDesc(id, m_id) {
				taskDesc({
					id,
					m_id
				}).then(res => {
					this.params.name = res.name
					this.params.moeny = res.moeny
					this.params.desc = res.desc
					this.params.end_time = res.end_time
					this.params.count = res.count
					this.params.arr = res.task_steps
					uni.hideLoading()
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 打开添加步骤表单
			addTaskPopup() {
				this.formatItem();
				
				this.isShow = true
			},
			// 格式化 Item数据结构
			formatItem() {
				let params = {
					name: '',
					type_one: 0,
					type_one_image: '',
					type_one_image_url: '',
					type_two: 0,
					url_type: 0,
					url: ''
				}
				this.currentItem = -1
				this.taskItem = params
			},
			// 上传实例图
			upload() {
				new Upload({
					url: 'Personal/upload',
					count: 1
				}).uploadPic().then(res => {
					let img = res[0].data.list[0]
					this.taskItem.type_one_image = img.id
					this.taskItem.type_one_image_url = img.abs_url
				}).catch(e => {
					uni.showToast({
						title: '上传图片失败',
						icon: 'none'
					})
				})
				
			},
			// 添加 子步骤
			addTaskItem() {
				if(this.taskItem.name.trim().length === 0) {
					return uni.showToast({
						title: '请填写步骤描述',
						icon: 'none'
					})
				}
				if(this.taskItem.type_one == 1 && this.taskItem.type_one_image === '') {
					return uni.showToast({
						title: '请添加示例图',
						icon: 'none'
					})
				}
				this.taskItem.url !== '' ? this.taskItem.url_type = 1 : this.taskItem.url_type = 0
				
				
				if(this.currentItem >= 0) {
					
					// 修改操作
					this.params.arr[this.currentItem] = this.taskItem
					this.isShow = false
					this.formatItem();
					
				} else {
					// 添加操作
					this.params.arr.push(this.taskItem)
					this.isShow = false
					this.formatItem();
				}
				
				
			},
			// 修改 子步骤
			editTaksItem(index) {
				this.currentItem = index
				
				this.taskItem = this.params.arr[index]
				
				this.isShow = true
			},
			// 删除 子步骤
			deleteTaskItem() {
				
				if(this.currentItem == -1) {
					return this.isShow = false
				}
				
				uni.showModal({
					title: '提示',
					content: '您确定要删除该步骤吗？',
					success: (res) => {
						if(res.confirm) {
							this.params.arr.splice(this.currentItem, 1)
							
							this.isShow = false
							this.formatItem();
						}
					}
				})
			},
			paramRemind() {
				if(this.params.name.trim().length === 0) {
					return uni.showToast({
						title: '请设置任务名称~',
						icon: 'none'
					})
				}
				if(this.params.moeny.trim().length === 0) {
					return uni.showToast({
						title: '请设置悬赏单价~',
						icon: 'none'
					})
				} 
				if(this.params.count === '' || this.params.count === 0) {
					return uni.showToast({
						title: '请设置总名额~',
						icon: 'none'
					})
				}
				if(this.params.end_time === '') {
					return uni.showToast({
						title: '请设置截止日期~',
						icon: 'none'
					})
				}
				if(this.params.desc.trim().length === 0) {
					return uni.showToast({
						title: '请编写领取说明~',
						icon: 'none'
					})
				}
				if(this.params.arr.length === 0) {
					return uni.showToast({
						title: '请添加任务步骤~',
						icon: 'none'
					})
				}
				
				if(this.type == 1) {
					this.addTaskUpload();
				} else {
					this.editTaskUpload()
				}
			},
			// 提交保存 任务
			addTaskUpload() {
				
				uni.showLoading({
					title: '正在上传...',
					mask: true
				})
				
				let params = JSON.parse(JSON.stringify(this.params)) 
				
				params.arr = JSON.stringify(params.arr)
				
				addTask(params).then(res => {
					
					uni.hideLoading()
					
					this.isModalO = true;
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 修改 任务
			editTaskUpload() {
				
				uni.showLoading({
					title: '正在上传...',
					mask: true
				})
				
				let params = JSON.parse(JSON.stringify(this.params)) 
				
				params.arr = JSON.stringify(params.arr)
				
				editTask(params).then(res => {
					
					uni.hideLoading()
					
					this.isModalT = true;
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			comeBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 200rpx;
	}
	.app-head {
		width: 100%;
		height: 128rpx;
		@include box(20rpx 30rpx 0 30rpx);
		border-bottom: 20rpx solid #F9F9FA;
		@include flex-al();

		.app-title {
			@include flex-al();
		}

		input {
			flex: 1;
			font-size: 30rpx;
			color: #333333;
		}

		.placeholder {
			font-size: 30rpx;
			color: #606266;
		}
	}

	.Title-text {
		font-size: 32rpx;
		margin-left: 10rpx;
	}

	.app-box {
		width: 690rpx;
		margin: 0 auto;
		@include box(20rpx 0);
		border-bottom: 1px solid #E2E2E5;

		&-item {
			@include flex-al-ju(space-between);
			height: 80rpx;

			.app-box-title {
				font-size: 30rpx;
				color: #333333;
			}

			.placeholder {
				color: #999999;
				font-size: 24rpx;
			}

			.app-box-input {
				flex: 1;
				@include flex-al-ju(flex-end);

				input {
					flex: 1;
					text-align: right;
					font-size: 26rpx;
					color: #333333;
				}

				.picker {
					color: #666666;
					font-size: 26rpx;
				}

				.param {
					color: #333333;
					font-size: 26rpx;
					margin-left: 10rpx;
				}
			}
		}
	}

	.app-fee {
		@include box(30rpx 30rpx 20rpx 30rpx);
		height: 164rpx;
		border-bottom: 20rpx solid #F9F9FA;

		&-title {
			@include flex-al-ju(space-between);

			.title {
				color: #1A73E8;
				font-size: 30rpx;
				font-weight: 400;
			}

			.text {
				color: #1A73E8;
				font-size: 26rpx;
				font-weight: 400;
			}
		}

		.app-fee-ul {
			@include flex-al();
			margin-top: 20rpx;

			.app-fee-li {
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background-color: #1A73E8;
			}

			.text {
				font-size: 24rpx;
				color: #1A73E8;
				margin-left: 10rpx;
			}
		}
	}

	.app-desc {
		@include box(20rpx 30rpx);

		.app-title {
			height: 70rpx;
			@include flex-al();
		}

		.app-desc-cont {
			height: 190rpx;
			@include box(20rpx 10rpx);
			border-bottom: 1px solid #E2E2E5;
			display: flex;

			.app-desc-line {
				width: 2px;
				height: 36rpx;
				background-color: #1A73E8;
				border-radius: 1px;
				margin-right: 10rpx;
			}

			.app-desc-input {
				flex: 1;

				textarea {
					width: 100%;
					height: 100%;
					font-size: 26rpx;
					color: #333333;
					font-weight: 400;
					line-height: 36rpx;
				}

				.placeholder {
					font-size: 28rpx;
					color: #666;

				}
			}
		}
	}

	.app-context {
		@include box(20rpx 30rpx);

		&-title {
			@include flex-al-ju(space-between);
			height: 60rpx;

			.title {
				font-size: 30rpx;
				color: #333333;
			}

			.app-context-btn {
				width: 200rpx;
				height: 50rpx;
				border-radius: 25rpx;
				border: 1px solid #1A73E8;
				@include flex-center();
				font-size: 24rpx;
				color: #1A73E8;
			}
		}
	}

	.defalut-btn {
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;

		z-index: 99;

		width: 690rpx;
		height: 88rpx;
		border-radius: 45rpx;
	}

	.popup-task {
		width: 100%;
		height: 937rpx;
		position: relative;

		&-title {
			text-align: center;
			font-size: 32rpx;
			color: #333333;
			font-weight: 500;
			margin-top: 20rpx;
		}
	}

	.popup-instance {
		@include box(30rpx 30rpx 0 30rpx);
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.instance-head {
			@include flex-al();
		}

		.instance-one {
			width: 300rpx;
		}

		.instance-btn {
			width: 200rpx;
			height: 60rpx;
			border-radius: 30rpx;
			border: 1px solid #1A73E8;
			@include flex-center();
			color: #1A73E8;
			font-size: 24rpx;
			margin-left: 20rpx;
		}
	}

	.instance-item {
		border-radius: 10rpx;
		background-color: #F5F5F5;
		@include flex-al();
		
		height: 60rpx;
		

		image {
			width: 25rpx;
			height: 25rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
		}
		input {
			flex: 1;
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
		}
		.placeholder {
			font-size: 26rpx;
			color: #999999;
			font-weight: 500;
		}
	}

	.instance-two {
		width: 500rpx;
		margin-top: 20rpx;
	}

	.popup-task-btn {
		position: absolute;
		left: 30rpx;
		bottom: 34rpx;
		@include flex-al();

		.task-btn-active {
			width: 200rpx;
			height: 60rpx;
			font-size: 24rpx;
			border-radius: 30rpx;
			@include flex-center();
			color: #FFFFFF;
			background: linear-gradient(90deg, #F64D36 0%, #FFAE00 100%);
		}

		.task-btn {
			width: 200rpx;
			height: 60rpx;
			font-size: 24rpx;
			background: #E5E5E5;
			border-radius: 30rpx;
			@include flex-center();
			color: #333333;
			margin-left: 20rpx;
		}
	}
	.app-context {
		background-color: #FFFFFF;
		@include box(30rpx);
		.app-title {
			@include flex-al();
		}
	}
	.example-box {
		margin-top: 20rpx;
	}
	.example-item {
		width: 100%;
		margin-bottom: 30rpx;
		&-head {
			@include flex-al();
			&-l {
				flex: 1;
				@include flex-al();
			}
			&-r {
				flex-shrink: 0;
				font-size: 26rpx;
				color: #1A73E8;
				margin-left: 20rpx;
				font-family: PingFang SC;
			}
			.example-item-li {
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background-color: #FF4A32;
				margin-right: 10rpx;
			}
			.example-item-title {
				font-size: 26rpx;
				color: #666666;
				font-weight: 400;
			}
		}
		&-cont {
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			.example-item-img {
				width: 329rpx;
				height: 584rpx;
				margin-right: 32rpx;
				border-radius: 5rpx;
			}
		}
		
		&-url {
			width: 100%;
			height: 80rpx;
			margin-top: 35rpx;
			@include flex-al-ju(space-between);
			border-bottom: 1px solid #E2E2E5;
			padding-bottom: 30rpx;
			.example-item-copy {
				font-size: 26rpx;
				color: #1A73E8;
				margin-left: 20rpx;
			}
		}
	}
	.example-item-img:nth-of-type(2n+2) {
		margin-right: 0;
	}
	.example-item-input {
		margin-top: 35rpx;
		border-bottom: 1px solid #E2E2E5;
		padding-bottom: 30rpx;
		@include flex-al();
		input {
			padding-left: 10rpx;
			font-size: 30rpx;
			color: #333333;
		}
		text {
			margin-left: 10rpx;
		}
	}
	.placeholder {
		color: #999999;
		font-size: 30rpx;
		font-weight: 300;
	}
	.example-item-line {
		width: 2px;
		height: 36rpx;
		background-color: #1A73E8;
		border-radius: 1px;
	}
</style>
