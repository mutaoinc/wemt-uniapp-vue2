import {
	settings,
	storage
} from './common'

const pages = (url) => {
	return url ? (url.startsWith("/") || url.startsWith("/pages/") || url.startsWith("pages/")) ? url : "/pages/" +
		url : console.error('router.go: url 不能为空');
}

var build = (url, params, page = true) => {

	url = url.toLowerCase();

	if (page) {
		url = pages(url);
	}

	if (settings.routes[url] && settings.routes[url].user && !uni.getStorageSync('user')) {
		params.backurl = url
		url = settings.pages.user.login
	}

	return params && Object.keys(params).length ?
		url + (url.includes('?') ? '&' : '?') + Object.keys(params).map(key =>
			`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&') :
		url;
};

var go = (url, params = {}, timeout = 0) => {

	url = pages(url)

	setTimeout(() => {
		if (settings.tabbar.includes(url)) {
			uni.switchTab({
				url: build(url, params, false)
			})
		} else {
			uni.navigateTo({
				url: build(url, params, false)
			})
		}
	}, timeout)
}

var replace = (url, params = {}, timeout = 0) => {
	setTimeout(() => {
		uni.redirectTo({
			url: build(url, params)
		});
	}, timeout)
}

const back = (delta = 1, timeout = 0, params = {}) => {
	
	const backurl = storage.get('backurl');

	const navigateBack = () => {
		uni.navigateBack({
			delta: delta,
			success: () => {
				if (params) {
					const pages = getCurrentPages();
					const prevPage = pages[pages.length - 2];
					if (prevPage) {
						prevPage.setData(params);
					}
				}
			}
		});
	};

	setTimeout(() => {
		if (backurl) {
			storage.remove('backurl'), go(backurl, params);
		} else {
			navigateBack();
		}
	}, timeout);
};

var refresh = (url, params = {}, timeout = 0) => {
	setTimeout(() => {
		uni.reLaunch({
			url: build(url, params)
		});
	}, timeout)
}

const page = (delta = 1) => {
	const pages = getCurrentPages();
	if (delta <= pages.length) {
		return pages[pages.length - delta].__page__;
	} else {
		return {
			fullpath: settings.pages.home.index
		};
	}
};

export default {
	build,
	go,
	replace,
	back,
	refresh,
	page
}