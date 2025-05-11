var GCJ02_To_BD09 = function(lat, lng) {
	x_pi = (3.14159265358979324 * 3000.0) / 180.0;
	x = lng;
	y = lat;
	z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	lng = z * Math.cos(theta) + 0.0065;
	lat = z * Math.sin(theta) + 0.006;
	return {
		lng: lng.toFixed(6),
		lat: lat.toFixed(6),
	};
}

var BD09_To_GCJ02 = function(lat, lng) {
	let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
	let x = lng - 0.0065;
	let y = lat - 0.006;
	let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	lng = z * Math.cos(theta);
	lat = z * Math.sin(theta);
	return {
		lng: lng.toFixed(6),
		lat: lat.toFixed(6),
	};
}

// 获取两个点之间角度
var angle = (current, next) => {
	let ret = 0
	let w1 = current.latitude / 180 * Math.PI
	let j1 = current.longitude / 180 * Math.PI

	let w2 = next.latitude / 180 * Math.PI
	let j2 = next.longitude / 180 * Math.PI

	ret = 4 * Math.pow(Math.sin((w1 - w2) / 2), 2) - Math.pow(Math.sin((j1 - j2) / 2) * (Math.cos(w1) - Math
		.cos(w2)), 2)
	ret = Math.sqrt(ret)

	let temp = Math.sin((j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2))
	ret = ret / temp

	ret = Math.atan(ret) / Math.PI * 180
	ret += 90

	if (j1 - j2 < 0) {
		if (w1 - w2 < 0) {
			ret = ret
		} else {
			ret = -ret + 180
		}
	} else {
		if (w1 - w2 < 0) {
			ret = 180 + ret
		} else {
			ret = -ret
		}
	}
	return ret
}

export default {
	GCJ02_To_BD09,
	BD09_To_GCJ02
}