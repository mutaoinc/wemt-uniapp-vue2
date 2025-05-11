// 版本号（纯数字）
const version = '100'

const request = {
	header: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	crypto: {
		key: '', // 不填写则不进行加密传输
		iv: ''
	}
}

// 底部tabbar路由
const tabbar = ['home/index', 'user/index']

// 常用页面对应路由
const pages = {
	user: {
		index: 'user/index',
		login: 'login/index',
		register: 'login/register',
		forget: 'login/forget'
	},
	home: {
		index: 'home/index'
	}
}

const api = {
	url: 'https://d3bscmx3.s8.mutaoinc.net/api/',
	user: {
		login: 'user/login'
	},
	upload: 'upload/index'
}

const routes = {

}

const hook = {
	"request.response.data.code:-4001": [{
		"action": "storage.remove",
		"key": "user"
	}, {
		"action": "store.remove",
		"key": "user"
	}, {
		"action": "toast",
		"title": "请登录",
		"callback": [{
			"action": "router.go",
			"url": "user/login"
		}]
	}]
}

export default {
	version,
	request,
	tabbar,
	pages,
	api,
	routes,
	hook,
	code
}