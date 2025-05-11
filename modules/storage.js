// 待处理
const get = (key) => {
	return getSync(key);
};

const getSync = (key) => {
	var data = uni.getStorageSync(key);

	if (data) {
		if (checkExpires(data.expires)) {
			removeSync(key);
			return null
		}
		return data.value;
	}
	return null;
};

const set = (key, value, expires = null) => {
	if(value) {
		var data = {
			value: value,
			expires: getExpires(expires)
		};
		return uni.setStorage({
			key: key,
			data: data
		});
	}
};

const setSync = (key, value, expires = null) => {

	var data = {
		value: value,
		expires: getExpires(expires)
	};
	return uni.setStorageSync({
		key: key,
		data: data
	});
};

const remove = (key) => {
	return uni.removeStorage({
		key: key
	});
};

const removeSync = (key) => {
	return uni.removeStorageSync(key);
};

const getExpires = function(expires = null) {

	if (expires) {
		var length = expires.toString().length

		if (length == 10) {
			var expires = expires * 1000
		} else if (length == 13) {

		} else {
			var expires = expires ? Date.now() + expires * 1000 : null;
		}
	}

	return expires;
}

const checkExpires = function(expires = null) {
	return expires ? (expires < Date.now() ? true : false) : false
}

export default {
	get,
	getSync,
	set,
	setSync,
	remove,
	removeSync
};