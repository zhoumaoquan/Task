<template>
	<view class="container">
		<u-sticky>
			<view class="app-nav">
				<view class="app-nav-item" v-for="(nav, index) in title" :class="{ active: index === current }" @click="changeNav(index)"
				 :key='index'>{{nav}}</view>
			</view>
		</u-sticky>
		<view class="app-box">
			<view class="app-tips">
				<u-icon name="info-circle" color="#F75233" top="0" label="管理须知" label-color="#F75233" label-size="24rpx" size="30"
				 margin-right="11rpx" @click="routerText(1)"></u-icon>
			</view>
			<block v-if="current == 0">
				<block v-if="teamList.length > 0">
					<view class="app-box-item" @click="jumpDetails(item.m_id)" v-for="(item,index) in teamList" :key="item.id">
						<image class="app-box-item-icon" :src="item.avatar"></image>
						<view class="app-box-item-r">
							<view class="app-box-item-title">{{item.nickname}}</view>
							<view class="app-box-item-text">
								<text>{{item.name}}</text>
								<text>{{item.ymd}}加入</text>
							</view>
						</view>
						<view class="app-box-item-btn" @click.stop="lookAccount(item.m_id)">查看账户</view>
					</view>

					<u-loadmore v-if="teamList.length > 3" :status="status1" margin-top="30" color="#999" margin-bottom="30"
					 :load-text="loadText" />
				</block>
				<block v-else>
					<z-empty text="暂无团队队友~"></z-empty>
				</block>
			</block>
			<block v-if="current == 1">
				<block v-if="proxyList.length > 0">
					<view class="app-proxy-item" v-for="(item,index) in proxyList" :key="item.id">
						<image class="app-proxy-item-icon" :src="item.avatar"></image>
						<view class="app-proxy-item-r">
							<view class="app-proxy-item-title">{{item.nickname}}</view>
							<view class="app-proxy-item-text">
								<text>{{item.name}}</text>
								<text>{{item.ymd}}加入</text>
							</view>
						</view>
					</view>
					<u-loadmore v-if="proxyList.length > 3" :status="status2" margin-top="30" color="#999" margin-bottom="30"
					 :load-text="loadText" />
				</block>
				<block v-else>
					<z-empty text="暂无子代理~"></z-empty>
				</block>
			</block>

		</view>


		<view class="app-btn">
			<view class="defalut-btn" @click="name = ''; isShow = true">创建队员</view>
			<view class="app-btn-item" @click="phone = ''; isProxy = true">添加子代理</view>
		</view>

		<u-popup mode="center" v-model="isInfo" border-radius="20" :mask-close-able="false" :closeable="true">
			<view class="popup-info">
				<view class="popup-info-title">子账户信息</view>
				<view class="popup-info-box">
					<view class="popup-info-item">
						<text>账户名称:</text>
						<text>{{teamInfo.nickname}}</text>
					</view>
					<view class="popup-info-item">
						<text>账户号码:</text>
						<text>{{teamInfo.username}}</text>
					</view>
					<view class="popup-info-item">
						<text>账户密码:</text>
						<text>{{teamInfo.password}}</text>
					</view>
					<view class="popup-info-item">
						<view class="popup-info-btn" @click.stop="infoReset(teamInfo.id)">重置</view>
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup mode="center" v-model="isShow" :mask-close-able="false" border-radius="20">
			<view class="popup-model">
				<view class="popup-model-title">
					<text>新建队友账户</text>
				</view>
				<view class="popup-model-box">
					<view class="popup-model-input">
						<view class="popup-model-line"></view>
						<input v-model="name" placeholder-class="placeholder" type="text" placeholder="账户名字" />
					</view>
				</view>
				<view class="popup-model-btn">
					<view class="popup-btn active" @click="createTeam">确定</view>
					<view class="popup-btn" @click="isShow = false">取消</view>
				</view>
			</view>
		</u-popup>


		<u-popup mode="center" v-model="isProxy" :mask-close-able="false" border-radius="20">
			<view class="popup-model">
				<view class="popup-model-title">
					<text>添加子代理</text>
				</view>
				<view class="popup-model-box">
					<view class="popup-model-input">
						<view class="popup-model-line"></view>
						<input v-model="phone" maxlength="11" placeholder-class="placeholder" type="number" placeholder="代理手机号" />
					</view>
				</view>
				<view class="popup-model-btn">
					<view class="popup-btn active" @click="createProxy">确定</view>
					<view class="popup-btn" @click="isProxy = false">取消</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import ZEmpty from '@/component/Z-empty.vue'
	import {
		childProxy,
		teamAccount,
		teamReset,
		addTeam,
		addProxy
	} from '@/network/profile-api'
	export default {
		components: {
			ZEmpty
		},
		data() {
			return {
				title: ['队员', '子代理'],
				current: 0,
				isInfo: false,
				isShow: false,
				isProxy: false,
				proxyParams: {
					type: 2,
					m_id: '',
					p: 1
				},
				teamParams: {
					type: 1,
					m_id: '',
					p: 1
				},
				proxyList: [],
				teamList: [],
				status1: 'loadmore',
				status2: 'loadmore',
				loadText: {
					loadmore: '往上拉加载更多',
					loading: '休息一下,正在加载...',
					nomore: '我也是有底线的~'
				},
				teamInfo: {
					nickname: '',
					username: '',
					id: '',
					password: ''
				},
				phone: '',
				name: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.proxyParams.m_id = option.m_id
			this.teamParams.m_id = option.m_id

			this.getTeamList()
			this.getProxyList()
		},
		onReachBottom() {
			if (this.current == 0) {
				this.moreTeamList()
			} else {
				this.moreProxyList()
			}
		},
		methods: {
			changeNav(index) {
				if (this.current === index) {
					return
				}

				this.current = index
			},
			async getTeamList() {

				try {
					let res = await childProxy(this.teamParams)

					this.teamList = res
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			getProxyList() {
				childProxy(this.proxyParams).then(res => {

					this.proxyList = res

					uni.hideLoading()

				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			moreTeamList() {
				this.teamParams.p += 1
				this.status1 = 'loading'
				childProxy(this.teamParams).then(res => {
					if (res.length === 0) {
						this.teamParams.p -= 1
						this.status1 = 'nomore'
					} else {
						this.status1 = 'loadmore'
						this.teamList = [...this.teamList, ...res]
					}
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			moreProxyList() {
				this.proxyParams.p += 1
				this.status2 = 'loading'
				childProxy(this.proxyParams).then(res => {
					if (res.length === 0) {
						this.proxyParams.p -= 1
						this.status2 = 'nomore'
					} else {
						this.status2 = 'loadmore'
						this.proxyList = [...this.proxyList, ...res]
					}
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 查看队友账户
			lookAccount(id) {
				uni.showLoading({
					title: '正在打开...',
					mask: true
				})

				this.teamInfo = {}

				teamAccount(id).then(res => {

					this.teamInfo = res

					uni.hideLoading()

					this.isInfo = true
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			infoReset(id) {
				this.isInfo = false
				uni.showModal({
					title: '提醒',
					content: '您确定要重置该队员账户吗?',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '重置中...'
							})
							this.setResetInfo(id)

						}
					}
				})
			},
			setResetInfo(id) {
				teamReset(id).then(res => {
					uni.showToast({
						title: '重置成功',
					})
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 创建队员
			createTeam() {
				if (this.name === '') {
					return uni.showToast({
						title: '请输入新增账户名称',
						icon: 'none'
					})
				}

				uni.showLoading({
					title: '正在添加...'
				})

				this.isShow = false

				addTeam({
					name: this.name,
					m_id: this.teamParams.m_id
				}).then(res => {
					uni.showToast({
						title: '添加队员成功',
						success: () => {
							this.getTeamList()
						}
					})
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 添加子代理
			createProxy() {
				if (this.phone === '') {
					return uni.showToast({
						title: '请输入添加代理手机号',
						icon: 'none'
					})
				}
				uni.showLoading({
					title: '正在添加...'
				})

				this.isProxy = false

				addProxy({
					phone: this.phone,
					m_id: this.proxyParams.m_id
				}).then(res => {
					uni.showToast({
						title: '添加代理成功',
						success: () => {
							this.getProxyList()
						}
					})
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 跳转队员详情
			jumpDetails(id) {
				uni.navigateTo({
					url: '/pages/Profile/agency/agencyPlayers?id=' + id
				})
			},
			routerText(type) {
				uni.navigateTo({
					url: '/pages/Home/textShow?type=' + type
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

	.app-box {
		@include box(0 30rpx);

		&-item {
			background-color: #FFFFFF;
			width: 690rpx;
			height: 180rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			@include box(42rpx 20rpx);
			@include flex-al();
			position: relative;
			box-shadow: 0px 8rpx 21rpx 3rpx rgba(228, 223, 223, 0.28);

			&-icon {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}

			&-r {
				flex: 1;
				height: 100%;
				@include flex-ju(space-between);
				flex-direction: column;
				margin-left: 30rpx;
			}

			&-title {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
			}

			&-text {
				@include flex-al();
				font-size: 24rpx;
				color: #999999;

				text {
					margin-right: 20rpx;
				}
			}

			&-btn {
				width: 160rpx;
				height: 60rpx;
				background: linear-gradient(90deg, #F64D36 0%, #FFAE00 100%);
				border-radius: 30rpx;
				@include flex-center();
				color: #FFFFFF;
				font-size: 24rpx;

				@include position-al();
				right: 20rpx;
			}
		}
	}

	.app-proxy-item {
		background-color: #FFFFFF;
		width: 690rpx;
		height: 180rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		@include box(42rpx 20rpx);
		@include flex-al();
		box-shadow: 0px 8rpx 21rpx 3rpx rgba(228, 223, 223, 0.28);

		&-icon {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
		}

		&-r {
			flex: 1;
			height: 100%;
			@include flex-ju(space-between);
			flex-direction: column;
			margin-left: 30rpx;
		}

		&-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}

		&-text {
			@include flex-al-ju(space-between);
			font-size: 24rpx;
			color: #999999;
		}
	}

	.app-tips {
		padding-left: 18rpx;
		height: 50rpx;
		margin-bottom: 30rpx;
		@include flex-al();
	}

	.app-btn {
		width: 690rpx;
		height: 90rpx;
		@include flex-al-ju(space-between);
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;

		z-index: 999;

		&-item,
		.defalut-btn {
			width: 335rpx;
			height: 88rpx;
			border-radius: 44rpx;
			border: 1px solid #FA771E;
			@include flex-center();
			font-size: 30rpx;
		}

		&-item {
			color: #FA771E;
		}
	}

	.popup-info {
		width: 600rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		@include box(0 30rpx);

		&-title {
			height: 80rpx;
			@include flex-center();
			font-size: 30rpx;
			color: #333333;
			font-weight: 500;
		}

		&-box {
			display: flex;
			flex-wrap: wrap;

		}

		&-item {
			width: 50%;
			height: 100rpx;
			@include flex-al();
			font-size: 26rpx;
			color: #333333;
		}

		&-btn {
			width: 160rpx;
			height: 60rpx;
			border-radius: 30rpx;
			border: 1px solid #FA771E;
			@include flex-center();
			color: #FA771E;
			font-size: 24rpx;
		}
	}

	.popup-model {
		width: 500rpx;
		height: 349rpx;
		@include box(0 40rpx);
		@include flex-ju(space-between);
		flex-direction: column;

		&-title {
			height: 100rpx;
			@include flex-center();
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}

		&-box {
			margin-top: 20rpx;

			input {
				flex: 1;
				font-size: 24rpx;
				color: #333333;
			}

		}

		.placeholder {
			font-size: 24rpx;
			color: #999999;
		}

		.popup-model-input {
			width: 400rpx;
			height: 80rpx;
			border: 1px solid #FA771E;
			border-radius: 10rpx;
			background-color: #FAFAFA;
			@include flex-al();
			margin-bottom: 36rpx;
		}

		.popup-model-line {
			width: 2px;
			height: 30rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			background-color: #1A73E8;
			border-radius: 1px;
		}

		&-btn {
			@include flex-al-ju(space-between);
			height: 120rpx;

			.popup-btn {
				width: 200rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background: #E5E5E5;
				@include flex-center();
				font-size: 24rpx;
				color: #333333;
			}

			.popup-btn.active {
				background: linear-gradient(90deg, #F64D36 0%, #FFAE00 100%);
				color: #FFFFFF;
			}
		}
	}
</style>
