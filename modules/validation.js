// validation.check(this.form, {
// 	account: {
// 		"title": "手机号",
// 		"type": "phone",
// 		"required": true
// 	},
// 	password: {
// 		"title": "密码",
// 		"type": "text",
// 		"required": true
// 	}
// }).then(function() {
// 	weremt.user.login({
// 		phone: this.account,
// 		password: this.password
// 	})
// }).catch((error) => {
// 	console.error(error);
// });

const check = function(form, rule, toast = true) {
	return new Promise((resolve, reject) => {
		if (typeof form === 'object') {
			for (let key in form) {
				let r = rule[key];
				let value = form[key];
				let error = '';

				if (r.required && !value) {
					error = '不能为空';
				} else if (r.type && !type(r.type, value)) {
					error = '格式不正确';
				}
				if (error) {
					if (toast) {
						uni.showToast({
							title: r.title + error,
							icon: 'none',
							duration: 1500
						});
					}
					toast == false && reject(new Error(r.title + error));
					return;
				}
			}
			resolve(true);
		} else {
			reject(new Error('参数必须是对象'));
		}
	});
};

const type = function(type, value) {
	switch (type) {
		case 'text':
			break;
		case 'number':
			if (isNaN(value)) {
				return false;
			}
			break;
		case 'phone':
			if (!/^\d{11}$/.test(value)) {
				return false;
			}
			break;
		case 'email':
			if (!value.includes('@')) {
				return false;
			}
			break;
		case 'qq':
			if (!/^\d{5,}$/.test(value)) {
				return false;
			}
			break;
		case 'idcard':
			return /^[1-9]\d{5}(19\d{2}|20[0-2]\d)(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}(\d|X)$/.test(value)
			break;
		default:
			// 默认情况，未定义的类型，视为验证失败
			return true;
	}
	return true;
}

export default {
	check
}