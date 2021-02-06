import request from './request';

// 获取openid
export const getCode = (code) => {
	return request({
		url: 'Login/get_openids',
		data: {
			code
		}
	})
}

// 保存用户信息
export const saveUserInfo = (option) => {
	return request({
		url: 'Login/add_members',
		data: {
			openid: option.openid || '',
			nickname: option.nickname || '',
			avatar: option.avatar || '',
			sex: option.sex || '',
			t_mid: option.t_mid || ''
		}
	})
}

