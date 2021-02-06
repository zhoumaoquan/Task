<template>
	<view class="container">
		<view class="top-tips" v-if="type == 2 && detail.state == 3 && isFail && detail.complaint == 0">
			<view class="top-tips-text">
				<view class="top-tips-line">审核未通过说明：{{detail.content}}</view>
				<view class="top-tips-line">申诉: (请在{{detail.content_time}}号前申诉)</view>
			</view>
			<view class="top-tips-close" @click="isFail = false">
				<u-icon name="close" size="40" color="#ED4015"></u-icon>
			</view>
		</view>
		<view class="notice">
			<text>{{detail.rule}}</text>
		</view>
		<view class="app-line"></view>
		<view class="receive-one">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">赏金任务</view>
			</view>
			<view class="receive-info">
				<text class="receive-info-author">发布者: {{detail.nickname}}</text>
				<view class="receive-info-price">
					<text class="active">会员:￥{{detail.vip_moeny}}</text>
					<text>普通:￥{{detail.moeny}}</text>
				</view>
			</view>
		</view>
		<view class="app-line"></view>
		<view class="app-over">
			<view class="app-over-l">
				<text class="active">{{detail.members_count}}</text>
				<text>人已赚到赏金</text>
			</view>
			<view class="app-over-r">
				<text>剩余</text>
				<text class="active">{{detail.count}}</text>
				<text>份</text>
			</view>
		</view>
		<view class="app-banner" v-if="detail.vip_status == 0 && system">
			<u-image @click="jumpVip" width="100%" height="100%" src="@/static/image/banner-1.png">
				<u-loading slot="loading"></u-loading>
			</u-image>
		</view>
		<view class="receive-two">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">领取说明</view>
			</view>
			<view class="receive-text">
				<text>{{detail.desc}}</text>
			</view>
		</view>
		<view class="app-line"></view>
		<view class="app-context">
			<view class="app-title">
				<view class="Title-line"></view>
				<view class="Title-text">步骤</view>
			</view>

			<!-- 首页进入 纯展示 -->
			<view class="example-box" v-if="type == 1">
				<view class="example-item" v-for="(item, index) in detail.task_steps" :key="item.id">
					<view class="example-item-head">
						<view class="example-item-li"></view>
						<view class="example-item-title">{{item.name}}</view>
					</view>
					<view class="example-item-cont">
						<!-- 实例图 -->
						<view class="example-item-img" v-if="item.type_one == 1">
							<u-image borderRadius="5" v-for="(itez, indez) in item.type_one_image" :key="itez.id" mode="aspectFit" :src="itez.abs_url"
							 width="100%" height="100%">
								<u-loading slot="loading"></u-loading>
							</u-image>
						</view>
						<!-- 用户上传内容 -->
						<view class="example-item-img" v-if="item.type_two == 1">
							<u-image borderRadius="5" src="@/static/image/unload.png" :fade="false" width="100%" height="100%">
								<u-loading slot="loading"></u-loading>
							</u-image>
						</view>
					</view>
					<view class="example-item-url" v-if="item.url_type == 1">
						<text>{{item.url}}</text>
						<view class="example-item-copy" @click="copyUrl(item.url)">复制链接</view>
					</view>
					<view class="example-item-input" v-if="item.type_two == 2">
						<view class="example-item-line"></view>
						<input placeholder="请填写内容" disabled placeholder-class="placeholder" type="text" />
					</view>
				</view>
			</view>

			<!-- 订单 进入渲染 -->
			<view class="example-box" v-if="type == 2">
				<view class="example-item" v-for="(item, index) in step" :key="item.id">
					<view class="example-item-head">
						<view class="example-item-li"></view>
						<view class="example-item-title">{{item.name}}</view>
					</view>
					<view class="example-item-cont">
						<!-- 实例图 -->
						<view class="example-item-img" v-if="item.type_one == 1">
							<u-image borderRadius="5" v-for="(itez, indez) in item.type_one_image" :key="itez.id" mode="aspectFit" :src="itez.abs_url"
							 width="100%" height="100%">
								<u-loading slot="loading"></u-loading>
							</u-image>
						</view>

						<view class="example-item-img" v-for="(itez, indez) in item.image" :key="itez.id">
							<u-image borderRadius="5" mode="aspectFit" :src="itez.abs_url" width="100%" height="100%">
								<u-loading slot="loading"></u-loading>
							</u-image>
							<u-icon v-if="delta.state == 1" @click="imgUploadClose(index, indez)" class="example-item-icon" name="close-circle-fill"
							 size="40" color="#333"></u-icon>
						</view>

						<!-- 用户上传内容 -->
						<view class="example-item-img" v-if="item.type_two == 1" @click="uploadImage(index)">
							<u-image borderRadius="5" src="@/static/image/unload.png" :fade="false" width="100%" height="100%">
								<u-loading slot="loading"></u-loading>
							</u-image>
						</view>
					</view>
					<view class="example-item-url" v-if="item.url_type == 1">
						<text>{{item.url}}</text>
						<view class="example-item-copy" @click="copyUrl(item.url)">复制链接</view>
					</view>
					<view class="example-item-input" v-if="item.type_two == 2">
						<view class="example-item-line"></view>
						<input placeholder="请填写内容" v-model="item.text" :disabled="delta.state == 1" placeholder-class="placeholder" type="text" />
					</view>
				</view>
			</view>

			<!-- 审核展示 纯展示 -->
			<view class="example-box" v-if="type == 3">
				<view class="example-item" v-for="(item, index) in detail.task_steps" :key="item.id">
					<view class="example-item-head">
						<view class="example-item-li"></view>
						<view class="example-item-title">{{item.name}}</view>
					</view>
					<view class="example-item-cont">
						<!-- 实例图 -->
						<view class="example-item-img" v-if="item.type_one == 1">
							<u-image borderRadius="5" v-for="(itez, indez) in item.type_one_image" :key="itez.id" mode="aspectFit" :src="itez.abs_url"
							 width="100%" height="100%">
								<u-loading slot="loading"></u-loading>
							</u-image>
						</view>
						<!-- 用户上传内容 -->
						<view class="example-item-img" v-for="(itez, indez) in item.image" :key="itez.id">
							<u-image borderRadius="5" mode="aspectFit" :src="itez.abs_url" :fade="false" width="100%" height="100%">
								<u-loading slot="loading"></u-loading>
							</u-image>
						</view>
					</view>
					<view class="example-item-url" v-if="item.url_type == 1">
						<text>{{item.url}}</text>
						<view class="example-item-copy" @click="copyUrl(item.url)">复制链接</view>
					</view>
					<view class="example-item-input" v-if="item.type_two == 2">
						<view class="example-item-line"></view>
						<input placeholder="请填写内容" :value="item.text" disabled placeholder-class="placeholder" type="text" />
					</view>
				</view>
			</view>
		</view>

		<view class="app-btn-box" v-if="type == 1">
			<view v-if="detail.members_status == 0" class="app-btn defalut-btn" @click="pickupTask">立即领取</view>
			<view v-else class="app-btn defalut-btn">任务已领取</view>
		</view>

		<view class="app-btn-box" v-if="type == 2">
			<button hover-class="none" open-type="share" class="app-btn-share">
				<image src="@/static/icon/share.png"></image>
				<text>分享</text>
			</button>
			<view v-if="detail.state == 1" class="defalut-btn app-btn-item" @click="setSubmitTask">提交</view>
			<view v-else-if="detail.state == 3 && detail.complaint == 0" class="defalut-btn app-btn-item" @click="isShow = true">申诉</view>
			<view v-else-if="detail.state == 3 && detail.complaint == 1" class="defalut-btn app-btn-item">申诉已提交,请耐心等待...</view>
			<view v-else-if="detail.state == 4" class="app-btn-item app-btn-two">任务已完成</view>
			<view v-else-if="detail.state == 5" class="app-btn-item app-btn-two">任务已结束</view>
			<view v-else class="app-btn-item app-btn-two">任务已提交</view>
		</view>

		<!-- 审核 -->
		<view class="app-btn-box" v-if="type == 3 && detail.state == 2">
			<view class="btn-active defalut-btn" @click="reviewTasks(1)">通过</view>
			<view class="btn-not" @click="reviewTasks(2)">拒绝</view>
		</view>

		<u-popup v-model="isShow" mode="bottom" border-radius="20" :safe-area-inset-bottom="true">
			<view class="popup-box">
				<view class="app-title">
					<view class="Title-line"></view>
					<view class="Title-text">理由说明:</view>
				</view>
				<view class="popup-box-input">
					<view class="popup-box-line"></view>
					<textarea placeholder-class="placeholder" maxlength="50" v-model="content" placeholder="多行输入,最多50个字"></textarea>
				</view>
				<view class="popup-box-btn">
					<view v-if="type == 2" class="btn-item active" @click="setAppealTask">提交</view>
					<view v-if="type == 3" class="btn-item active" @click="networkReview(2)">提交</view>
					<view class="btn-item" @click="content = ''; isShow = false">取消</view>
				</view>
			</view>
		</u-popup>

		<u-popup v-model="isLogin" mode="center" border-radius="20">
			<view class="popup-model">
				<view class="popup-model-title">
					<text>提示</text>
				</view>
				<view class="popup-model-context">
					您还未登录，请登录后操作
				</view>
				<view class="popup-model-btn">
					<view class="btn-item defalut-btn" @click="goLogin">
						立即登录
					</view>
					<view class="btn-item btn-close" @click="isLogin = false">
						取消
					</view>
				</view>
			</view>
		</u-popup>


		<view class="app-skeleton" v-show="isSkeleton"></view>
	</view>
</template>

<script>
	import {
		taskDesc,
		acceptTask,
		orderTaskDesc,
		submitTask,
		reviewTask,
		appealTask
	} from '@/network/home-api'

	import Upload from '@/utils/upload'

	export default {
		data() {
			return {
				isShow: false, // 申诉输入框
				isLogin: false, // 未登录提示框
				isFail: true, // 未通过提示框
				m_id: uni.getStorageSync('m_id') || '',
				task_id: '', // 任务或订单ID
				isSkeleton: true,
				type: 0, // 当前详情状态
				detail: null, // 详情数据
				step: [], // 步骤
				content: '', // 申诉或拒绝共用
				system: true
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})

			if (option.parent_code) {
				uni.setStorageSync('code', option.parent_code)
			}

			this.type = option.type

			this.task_id = option.id
			
			this.isSystem()
			
			if (option.type == 1) {
				this.getTaskDesc()
			} else {
				this.getOrderDesc()
			}
		},
		onShow() {
			const m_id = uni.getStorageSync('m_id')

			if (m_id !== '' && m_id !== undefined) {
				this.m_id = m_id
			}
		},
		watch: {
			m_id(e) {
				if (this.type == 1) {
					this.getTaskDesc()
				}
			}
		},
		onShareAppMessage() {
			return {
				title: this.detail.name,
				path: '/pages/Home/receive?id=' + this.task_id + '&parent_code=' + this.m_id,
				success: function(res) {
					console.log('分享成功' + res)
				},
				fail: function(res) {
					console.log(res + '失败');
				}
			}
		},
		methods: {
			isSystem() {
				let that = this
				uni.getSystemInfo({
					success: function(res) {
						console.log(res) // 当前设备信息
						let type = res.system.substring(0, 7);
						type === 'Android' ? that.system = true : that.system = false
					}
				})
			},
			// 获取任务详情
			async getTaskDesc() {
				try {
					let res = await taskDesc({
						id: this.task_id,
						m_id: this.m_id
					})

					this.detail = res

					this.isSkeleton = false
					uni.hideLoading()
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 获取订单详情
			async getOrderDesc() {
				try {
					let res = await orderTaskDesc({
						id: this.task_id,
						m_id: this.m_id
					})

					this.detail = res
					this.step = res.task_steps
					this.isSkeleton = false
					uni.hideLoading()

				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},

			jumpVip() {
				if (this.m_id === '') {
					this.isLogin = true
				}

				uni.navigateTo({
					url: '/pages/Profile/member?m_id=' + this.m_id
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/Profile/login',
					success: () => {
						this.isLogin = false
					}
				})
			},
			// 立即领取任务
			pickupTask() {
				// 判断是否登陆
				if (this.m_id === '' || this.m_id === undefined) {
					return this.isLogin = true
				}
				// 接口调用

				uni.showLoading({
					title: '任务领取中...',
					mask: true
				})

				acceptTask({
					m_id: this.m_id,
					id: this.task_id
				}).then(res => {

					uni.showToast({
						title: '任务领取成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})

				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})

			},

			// 用户上传图片
			async uploadImage(index) {

				if (this.detail.state != 1) {
					return
				}

				let res = await new Upload({
					url: 'Personal/upload',
					count: 3
				}).uploadPic()

				const imgList = res.map((item, index) => ({
					id: item.data.list[0].id,
					abs_url: item.data.list[0].abs_url
				}))
				this.$set(this.step, index, {
					...this.step[index],
					image: [...this.step[index].image, ...imgList]
				})
			},
			// 删除 上传图的某一项
			imgUploadClose(i, z) {
				this.step[i].image.splice(z, 1)
			},
			// 复制 链接
			copyUrl(url) {
				wx.setClipboardData({
					//准备复制的数据
					data: url,
					success: function(res) {
						wx.showToast({
							title: '复制成功',
						});
					}
				});
			},
			// 提交任务
			setSubmitTask() {
				uni.showLoading({
					title: '正在提交...',
					mask: true
				})

				let arr = JSON.stringify(this.step)

				submitTask({
					m_id: this.m_id,
					id: this.task_id,
					arr
				}).then(res => {

					uni.showToast({
						title: '提交成功,等待审核...',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(e => {
					wx.showToast({
						title: e,
						icon: 'none'
					})
				})
			},

			// 审核 处理
			networkReview(type) {

				if (type == 2 && this.content.trim().length === 0) {
					return uni.showToast({
						title: '请输入拒绝理由',
						icon: 'none'
					})
				}

				uni.showLoading({
					title: '正在处理...',
					mask: true
				})
				this.isShow = false
				reviewTask({
					id: this.task_id,
					content: this.content
				}).then(res => {
					uni.showToast({
						title: '操作成功',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},

			// 审核任务 type: 1 为通过 2为拒绝
			reviewTasks(type) {
				let that = this;
				if (type == 1) {
					uni.showModal({
						title: '提示',
						content: '您确定要通过该任务吗?',
						success(res) {
							if (res.confirm) {
								that.networkReview()
							}
						}
					})
				} else {

					return this.isShow = true
				}
			},
			// 用户申诉
			setAppealTask() {
				if (this.content.trim().length === 0) {
					return uni.showToast({
						title: '请输入申诉理由',
						icon: 'none'
					})
				}

				uni.showLoading({
					title: '正在提交...',
					mask: true
				})

				this.isShow = false

				appealTask({
					id: this.task_id,
					content: this.content
				}).then(res => {
					uni.showToast({
						title: '提交成功,请耐心等待反馈结果...',
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
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
	page {
		padding-bottom: 150rpx;
	}

	.top-tips {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;

		background-color: #FEEBE6;
		@include box(30rpx);
		z-index: 999;
		display: flex;

		&-text {
			flex: 1;

			.top-tips-line {
				color: #ED4015;
				font-size: 26rpx;
				line-height: 42rpx;
				font-weight: 500;
			}
		}

		.top-tips-close {
			width: 40rpx;
			flex-shrink: 0;
		}
	}

	.notice {
		@include box(0 30rpx);
		height: 69rpx;
		width: 100%;
		@include flex-al();
		font-size: 26rpx;
		color: #1A73E8;
		font-weight: 400;
	}

	.receive-one {
		height: 160rpx;
		width: 100%;
		@include box(0 30rpx);
	}

	.app-line {
		width: 100%;
		height: 20rpx;
		background-color: #F9F9FA;
	}

	.receive-info {
		@include flex-al-ju(space-between);
		height: 80rpx;

		&-author {
			font-size: 26rpx;
			color: #666666;
			font-weight: 500;
		}

		&-price {
			font-size: 26rpx;
			color: #999999;
			font-weight: 500;

			.active {
				font-size: 36rpx;
				color: #ED4015;
				font-weight: bold;
				margin-right: 25rpx;
			}
		}
	}

	.app-title {
		@include flex-al();
		height: 80rpx;
	}

	.app-over {
		width: 100%;
		@include flex-al-ju(space-between);
		@include box(0 30rpx);
		height: 64rpx;
		font-size: 24rpx;
		color: #999999;

		.active {
			color: #1A73E8;
			margin: 0 10rpx;
		}
	}

	.app-banner {
		width: 100%;
		height: 180rpx;
	}

	.receive-two {
		@include box(0 30rpx 30rpx 30rpx);

		.receive-text {
			font-size: 26rpx;
			color: #999999;
			line-height: 42rpx;
		}
	}

	.app-context {
		background-color: #FFFFFF;
		@include box(30rpx);
	}

	.example-box {
		margin-top: 20rpx;
	}

	.example-item {
		width: 100%;
		margin-bottom: 30rpx;

		&-head {
			@include flex-al();

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
				margin-bottom: 30rpx;
				border-radius: 5rpx;
				position: relative;
			}

			.example-item-icon {
				position: absolute;
				right: -15rpx;
				top: -15rpx;

				z-index: 99;
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

	.app-btn-box {
		height: 120rpx;
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		bottom: 0;
		@include box(0 30rpx);
		@include flex-al-ju(space-between);
	}

	.app-btn {
		width: 690rpx;
		height: 88rpx;
		border-radius: 45rpx;
	}

	.btn-active,
	.btn-not {
		width: 335rpx;
		height: 88rpx;
		border-radius: 45rpx;
		font-size: 30rpx;
	}

	.btn-not {
		background-color: #E5E5E5;
		color: #333333;
		@include flex-center();
	}

	.app-btn-share {
		width: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;
		color: #333333;
		font-weight: 400;

		image {
			width: 35rpx;
			height: 35rpx;
			margin-bottom: 10rpx;
		}
	}

	.app-btn-item {
		width: 594rpx;
		height: 88rpx;
		font-size: 30rpx;
		border-radius: 45rpx;
	}

	.app-btn-two {
		background-color: #E5E5E5;
		color: #333333;
		font-weight: 400;
		@include flex-center();
	}

	.popup-box {
		width: 100%;
		height: 800rpx;
		background-color: #FFFFFF;
		@include box(30rpx);

		&-input {
			@include box(20rpx);
			width: 100%;
			height: 520rpx;
			display: flex;
			border-bottom: 1px solid #E2E2E5;

			.popup-box-line {
				width: 2px;
				height: 36rpx;
				border: 1px;
				background-color: #1A73E8;
				margin-right: 10rpx;
			}

			textarea {
				flex: 1;
				height: 100%;
				font-size: 26rpx;
				line-height: 36rpx;
			}

			.placeholder {
				font-size: 26rpx;
				line-height: 36rpx;
				color: #666;
			}
		}

		.popup-box-btn {
			height: 142rpx;
			@include flex-al(flex-end);

			.btn-item {
				width: 200rpx;
				height: 60rpx;
				background-color: #E5E5E5;
				border-radius: 30rpx;
				@include flex-center();
				font-size: 24rpx;
				color: #333333;
				margin-right: 20rpx;
			}

			.active {

				background: linear-gradient(90deg, #F64D36 0%, #FFAE00 100%);
				color: #FFFFFF;
			}
		}
	}
</style>
