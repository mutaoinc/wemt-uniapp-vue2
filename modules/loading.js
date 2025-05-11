const show = function(mask = true) {
	return uni.showLoading({
		mask: mask
	})
}

const hide = function() {
	return uni.hideLoading();
}

export default {
	show,
	hide
}