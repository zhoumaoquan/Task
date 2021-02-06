import request from './request';

// 获取首页banner数据
export const getBanner = () => {
	return request({
		url: 'Index/banner_list'
	})
}

// 获取任务列表
export const taskList = (option) => {
	return request({
		url: 'Index/task_list',
		data: {
			p: option.p || 1,
			sort: option.sorts || 1,
			m_id: option.m_id || ''
		}
	})
}

// 任务详情数据
export const taskDesc = (option) => {
	return request({
		url: 'Index/task_desc',
		data: {
			id: option.id || '',
			m_id: option.m_id || ''
		}
	})
}

// 用户领取任务
export const acceptTask = (option) => {
	return request({
		url: 'Index/accept_task',
		data: {
			m_id: option.m_id || '',
			task_id: option.id || ''
		}
	})
}


// 订单详情数据
export const orderTaskDesc = (option) => {
	return request({
		url: 'Personal/my_accept_task_desc',
		data: {
			id: option.id || '',
			m_id: option.m_id || ''
		}
	})
}

// 任务提交接口
export const submitTask = (option) => {
	return request({
		url: 'Personal/my_accept_task_add',
		data: {
			m_id: option.m_id || '',
			order_id: option.id || '',
			arr: option.arr || ''
		}
	})
}

// 审核任务
export const reviewTask = (option) => {
	return request({
		url: 'Personal/my_accept_audit',
		data: {
			order_id: option.id || '',
			content: option.content || ''
		}
	})
} 

// 用户申诉
export const appealTask = (option) => {
	return request({
		url: 'Personal/my_accept_task_save',
		data: {
			order_id: option.id || '',
			content: option.content || ''
		}
	})
}

// 任务 修改
export const editTask = (option) => {
	return request({
		url: 'Index/task_update',
		data: {
			...option
		}
	})
}

// 首页活动数据
export const homeEvent = (option) => {
	return request({
		url: 'Index/launch_event_list',
		data: {
			p: option.p || 1,
			m_id: option.m_id || ''
		}
	})
}

// 首页活动地图
export const eventMap = () => {
	return request({
		url: 'Index/activity'
	})
}

// 活动详情
export const eventDetails = (option) => {
	return request({
		url: 'Index/launch_event_desc',
		data: {
			id: option.id || '',
			m_id: option.m_id || ''
		}
	})
}

// 邀请好友
export const invite = (option) => {
	return request({
		url: 'Index/distribution_list',
		data: {
			m_id: option.m_id || '',
			level: option.level || 1
		}
	})
}

// 活动规则
export const eventRule = () => {
	return request({
		url: 'Index/xieyi',
		data: {
			type: 3
		}
	})
}

// 领取任务
export const receive = (option) => {
	return request({
		url: 'Index/receive_hongbao',
		data: {
			m_id: option.m_id || '',
			id: option.id || '',
			type: option.type || ''
		}
	})
}