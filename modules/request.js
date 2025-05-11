import {
	settings,
	language,
	crypto,
	hook,
	loading,
	router,
	storage,
	confirm,
	toast,
	date,
	validation,
	user
} from './common'

const message = function(message) {
	toast(message)
};

import network from './network'

let requestCount = 0;
let loadingTimer = null;

const request = function(obj, _params = null, _success = null, _fail = null) {

	if (network.get().connected == false) {
		return
	}

	obj.loading != false && requestCount++

	return new Promise((resolve, reject) => {

		if (requestCount == 1) {
			loadingTimer = setTimeout(function() {
				loading.show()
			}, 200);
		}

		if (typeof obj == 'string') {
			obj = {
				url: obj,
				params: _params,
				success: _success,
				fail: _fail
			}
		}

		let header = obj.header ? obj.header : settings.request.header;

		let u = user.get();

		if (obj.url.indexOf('https') != 0 && obj.url.indexOf('http') != 0) {
			obj.url = settings.api.url + obj.url;
		}

		if (obj.params) {
			obj.url = router.build(obj.url, obj.params, false)
		}

		var success = function(response) {

			if (typeof response.data === 'string') {
				try {
					response.data = JSON.parse(response.data);
				} catch (e) {
					response.statusCode = 500
				}
			}

			hook('request.response.statusCode:' + response.statusCode)

			if (response.statusCode == 200) {

				if (settings.request.crypto.key) {
					response.data = crypto.decrypt(response.data)
				}

				if (hook('request.response.data.code:' + response.data.code)) {

				} else if (response.data
					.code > 0) {
					typeof obj.success === 'function' ? obj.success(response.data.data) : resolve(
						response.data.data)
				} else {
					typeof obj.fail === 'function' ? obj.fail(response) : (message(response.data
						.message ? response
						.data.message : 'request.response.error'), reject(response))
				}
			} else {
				typeof obj.fail === 'function' ? obj.fail(response) : (message(
					'request.response.error'), reject(response))
			}
		}

		var fail = function(response) {
			message(response.errMsg ? response.errMsg : 'request.http.error'), reject(response)
		}

		var complete = function() {
			if (obj.loading !== false) {
				requestCount--;
				if (requestCount === 0) {
					clearTimeout(loadingTimer);
					setTimeout(function() {
						loading.hide()
					}, 300);
				}
			}
		}

		if (obj.filePath) {
			uni.uploadFile({
				url: obj.url,
				filePath: obj.filePath,
				name: obj.name ? obj.name : 'file',
				header: {
					...header,
					'X-token': u.token,
					'X-sign': u.sign
				},
				success: function(response) {
					success(response)
				},
				fail: function(response) {
					fail(response)
				},
				complete: complete
			});
		} else {
			if (settings.request.crypto.key) {
				obj.data = crypto.encrypt(obj.data)
			}
			uni.request({
				url: obj.url,
				data: obj.data ? obj.data : {},
				header: {
					...header,
					'X-token': u.token,
					'X-sign': u.sign
				},
				method: obj.method ? obj.method : (obj.data ? 'POST' : 'GET'),
				dataType: obj.dataType ? dataType : 'json',
				success: function(response) {
					success(response)
				},
				fail: function(response) {
					fail(response)
				},
				complete: complete
			});
		}
	})
}

export default request