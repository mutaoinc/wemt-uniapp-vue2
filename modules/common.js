import settings from '../settings'
import language from '../language'
import crypto from './crypto'
import request from './request'
import hook from './hook'
import loading from './loading'
import run from './run'
import router from './router'
import storage from './storage'

import date from './date'
import validation from './validation'
import utils from './utils'

import user from './user'

const message = function(message, confirm) {
	uni.showModal({
		title: language("notice"),
		content: message ? language(message) : language('error'),
		showCancel: false,
		success: function(res) {
			if (res.confirm) {
				typeof confirm === 'function' && confirm()
			}
		}
	});
}

const confirm = function(message, confirm, cancel) {
	uni.showModal({
		title: language("notice"),
		content: language(message),
		success: function(res) {
			if (res.confirm) {
				typeof confirm === 'function' && confirm()
			} else if (res.cancel) {
				typeof cancel === 'function' && cancel()
			}
		}
	});
}

const toast = function(title, duration = 1500, callback = null) {
	uni.showToast({
		title: Array.isArray(title) ? language(...title) : language(title),
		icon: 'none',
		duration: duration
	});

	if (typeof callback === 'function') {
		setTimeout(() => {
			callback()
		}, duration)
	}
}

export {
	settings,
	language,
	crypto,
	request,
	hook,
	loading,
	run,
	router,
	storage,
	message,
	confirm,
	toast,
	date,
	validation,
	utils,
	user
}