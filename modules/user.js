import {
	settings,
	language,
	request,
	router,
	storage,
	message,
	confirm,
	toast,
	date,
	validation
} from './common'

import store from '../store'

const user = {
	get: function(key = false, login = false) {
		let u = storage.getSync('user');
		if (!u) {
			if (login != false) {
				if (login == 'go') {
					router.go(settings.pages.user.login);
				} else if (login == 'replace') {
					storage.set('backurl', router.page().fullPath), router.replace(settings.pages.user.login);
				} else {
					return false;
				}
			}
		} else {
			return key ? user[key] : u;
		}

		return {};
	},
	login: function(form, callback) {
		request({
			url: settings.api.user.login,
			data: form,
			success: (result) => {
				store.commit('user', result), storage.set('lastlogin', form)
				if (typeof callback === "function") {
					callback(result);
				} else {
					let backurl = storage.get('backurl')
					if (backurl) {
						router.go(backurl)
					} else {
						router.back()
					}
				}
			}
		})
	},
	oauth(getUserProfile = true) {
		return new Promise((resolve, reject) => {
			let login = function(userinfo = {}) {
				uni.login({
					force: true,
					success(res) {
						let code = res.code
						request({
							'url': settings.api.user.oauth,
							'data': {
								code: code,
								userinfo: userinfo
							},
							success(user) {
								store.commit('user', user), resolve({
									user: user,
									userinfo: userinfo
								})
							}
						})
					},
					fail(error) {
						toast('user.login.fail'), reject(error)
					},
				});
			}
			if (getUserProfile) {
				uni.getUserProfile({
					success(res) {
						login(res.userInfo)
					},
					fail(error) {
						toast('user.get.info.fail'), reject(error)
					},
				});
			} else {
				login()
			}
		})
	},
	logout: function(callback) {
		confirm('logout.confirm', function() {
			store.commit('user', null);
			if (typeof callback == "function") {
				callback(result);
			} else {
				router.go(settings.pages.home.index)
			}
		})
	},
	last: function() {
		return storage.get("lastlogin")
	}
}

export default user