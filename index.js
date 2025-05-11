/**
 * Wemt - WE CAN DO IT MORE SIMPLE
 * Copyright (c) 2014-2023 http://www.wemt.net All rights reserved.
 * 
 * @package  wemt
 * @author   慕涛网络 <info@mutaoinc.com>
 */

import {
	settings,
	language,
	request,
	hook,
	router,
	storage,
	message,
	confirm,
	toast,
	date,
	validation,
	user
} from './modules/common'

var go = (url, params, timeout) => {
	return router.go(url, params, timeout)
}

var back = (delta, timeout, params) => {
	return router.back(delta, timeout, params)
}

var get = (obj, params, _success = null, _fail = null) => {
	return request({
		method: 'GET',
		params: params,
		success: _success,
		fail: _fail
	})
}

var post = (obj, data, _success = null, _fail = null) => {
	return request({
		method: 'POST',
		data: data,
		success: _success,
		fail: _fail
	})
}

const $wemt = {
	settings,
	language,
	request,
	hook,
	router,
	storage,
	message,
	confirm,
	toast,
	date,
	validation,
	user,
	go,
	back,
	get,
	post
}

import network from './modules/network'
import mixins from './mixins'

export default {
	install(Vue) {

		Vue.prototype.$wemt = $wemt
		Vue.mixin(mixins)

		uni.onNetworkStatusChange((e) => {
			network.change(e)
		});
	}
}