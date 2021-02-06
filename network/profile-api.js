import request from './request'

// 用户信息
export const getUserInfo = (id) => {
	return request({
		url: 'Personal/members_info',
		mode: 'spin',
		data: {
			m_id : id || ''
		}
	})
}


// 获取验证码
export const getVerify = (phone) => {
	return request({
		url: 'Login/getVerify',
		data: {
			account: phone || '',
			unique_code: 'login'
		}
	})
}

// 验证 验证码
export const taskVerify = (option) => {
	return request({
		url: 'Login/checkVerify',
		data: {
			m_id: option.m_id || '',
			account: option.phone || '',
			verify: option.verify || '',
			unique_code: 'login'
		}
	})
}


// 任务添加
export const addTask = (option) => {
	return request({
		url: 'Index/task_add',
		mode: 'spin',
		data: {
			...option
		}
	})
}

// 我发布的任务
export const myTask = (option) => {
	return request({
		url: 'Personal/my_task',
		mode: 'spin',
		data: {
			m_id: option.m_id || '',
			p: option.p || 1,
			state: option.state || 0
		}
	})
}

// 悬赏详情
export const taskDetail = (option) => {
	return request({
		url: 'Personal/my_task_desc',
		mode: 'loading',
		data: {
			task_id: option.id || '',
			p: option.p || 1,
			state: option.state || 0
		}
	})
}

// 我接受的任务
export const acceptTask = (option) => {
	return request({
		url: 'Personal/my_accept_task',
		mode: 'spin',
		data: {
			m_id: option.m_id || '',
			p: option.p || 1,
			state: option.state || 0
		}
	})
}

// 代理申请
export const proxyApply = (option) => {
	return request({
		url: 'Index/members_agent_add',
		mode: 'spin',
		data: {
			...option
		}
	})
}

// 代理详情
export const proxyDetail = (id) => {
	return request({
		url: 'Index/members_agent_desc',
		mode: 'spin',
		data: {
			m_id: id || ''
		}
	})
}

// 代理修改
export const proxyAgain = (option) => {
	return request({
		url: 'Index/members_agent_update',
		mode: 'spin',
		data: {
			...option
		}
	})
}

// 商户申请
export const merchant = (option) => {
	return request({
		url: 'Index/members_merchants_add',
		mode: 'spin',
		data: {
			...option
		}
	})
}

// 商户详情
export const merchantDesc = (id) => {
	return request({
		url: 'Index/members_merchants_desc',
		mode: 'spin',
		data: {
			m_id: id || ''
		}
	})
}

// 商户重新提交
export const merchantAgain = (option) => {
	return request({
		url: 'Index/members_merchants_update',
		mode: 'spin',
		data: {
			...option
		}
	})
}

// 我的会员
export const membersInfo = (id) => {
	return request({
		url: 'Personal/members_top_up',
		mode: 'loading',
		data: {
			m_id: id || ''
		}
	})
}

// 我的团队(简版)
export const myTaskOne = (option) => {
	return request({
		url: 'Index/my_team',
		mode: 'spin',
		data: {
			p: option.p || 1,
			m_id: option.m_id || ''
		}
	})
}

// 队友详情
export const teammate = (option) => {
	return request({
		url: 'Index/team_desc_member',
		data: {
			p: option.p || 1,
			m_id: option.m_id || ''
		}
	})
}

// 代理中心
export const childProxy = (option) => {
	return request({
		url: 'Index/my_team_agent',
		data: {
			m_id: option.m_id || '',
			type: option.type || 1
		}
	})
}

// 查看队员账户
export const teamAccount = (id) => {
	return request({
		url: 'Index/team_view_desc',
		data: {
			m_id: id || ''
		}
	})
}

// 队员账户重置
export const teamReset = (id) => {
	return request({
		url: 'Index/team_reset',
		data: {
			m_id: id || ''
		}
	})
}

// 队员详情
export const teamDetail = (option) => {
	return request({
		url: 'Index/team_desc_member',
		data: {
			m_id: option.m_id || '',
			p: option.p || 1
		}
	})
}

// 队员统计
export const teamCount = (option) => {
	return request({
		url: 'Index/team_desc',
		data: {
			m_id: option.m_id || '',
			p: option.p || 1
		}
	})
}

// 创建队员
export const addTeam = (option) => {
	return request({
		url: 'Index/create_teammates',
		data: {
			nickname: option.name || '',
			m_id: option.m_id || ''
		}
	})
}

// 添加子代理
export const addProxy = (option) => {
	return request({
		url: 'Index/create_agent',
		data: {
			account: option.phone || '',
			m_id: option.m_id || ''
		}
	})
}


// 协议
export const protocol = (type) => {
	return request({
		url: 'Index/xieyi',
		data: {
			type
		}
	})
}

// 发布活动
export const activity = (option) => {
	return request({
		url: 'Index/launch_event_add',
		data: {
			...option
		}
	})
}

// 活动管理
export const eventManage = (option) => {
	return request({
		url: 'Index/my_launch_event_list',
		data: {
			p: option.p || 1,
			state: option.state || 0,
			m_id: option.m_id || ''
		}
	})
}

// 停止 恢复活动
export const eventOperate = (option) => {
	return request({
		url: 'Index/stop_activity',
		data: {
			id: option.id || '',
			type: option.type || 1
		}
	})
}

// 零钱明细
export const dibDetail = (option) => {
	return request({
		url: 'Personal/my_moeny_log',
		data: {
			m_id: option.m_id || '',
			p: option.p || 1
		}
	})
}

// 提现
export const withdraw = (option) => {
	return request({
		url: 'Personal/tixian',
		data: {
			m_id: option.m_id || '',
			moeny: option.moeny || ''
		}
	})
}

// 我的红包\优惠劵
export const myCoupon = (option) => {
	return request({
		url: 'Index/members_activity',
		data: {
			m_id: option.m_id || '',
			p: option.p || 1
		}
	})
}

// 切换用户
export const switchUser = (option) => {
	return request({
		url: 'Personal/qie_members',
		data: {
			m_id: option.m_id || '',
			username: option.username || '',
			password: option.password || ''
		}
	})
}

// 会员支付
export const memberPay = (option) => {
	return request({
		url: 'Wx/wxpay',
		data: {
			m_id: option.m_id || '',
			vip_id: option.id || '',
			type: 1
		}
	})
}

// 实名认证
export const realName = (option) => {
	return request({
		url: 'Personal/members_real_name',
		data: {
			m_id: option.m_id || '',
			name: option.name || '',
			numbers_id: option.numbers_id || '',
			zheng_photo: option.zheng_photo || '',
			fan_photo: option.fan_photo || ''
		}
	})
}

// 支付任务
export const payTask = (option) => {
	return request({
		url: 'Wx/wxpay',
		data: {
			m_id: option.m_id || '',
			type: 2,
			task_id: option.id || '',
			money: option.money || ''
		}
	})
}

// 红包/优惠劵 二维码
export const ercode = (id) => {
	return request({
		url: 'Index/code',
		data: {
			id
		}
	})
}

// 商家核销二维码
export const useScan = (option) => {
	return request({
		url: 'Index/check_status',
		data: {
			id: option.id || '',
			m_id: option.m_id || ''
		}
	})
}

// 用户优惠使用确认
export const useDiscount = (id) => {
	return request({
		url: 'Index/check',
		data: {
			id
		}
	})
}