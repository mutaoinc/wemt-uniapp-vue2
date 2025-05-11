import {
	loading,
	toast,
	message
} from './common';

var wifiStart = false

const complete = () => {
	setTimeout(function() {
		loading.hide()
	}, 600);
	console.log('wifi.complete')
}

// 启动 WiFi 功能
const start = async () => {
	if (wifiStart) {
		return
	}
	loading.show()
	return new Promise((resolve, reject) => {
		wx.startWifi({
			success: () => resolve(),
			fail: (error) => {
				console.log(error)
				toast('wifi.error');
				reject(error);
			}
		});
	});
};

// 连接到指定的 WiFi
const connect = async (ssid, password, success = null, fail = null, complete = null) => {
	try {
		await start();
		return new Promise((resolve, reject) => {
			wx.connectWifi({
				SSID: ssid,
				password: password,
				// forceNewApi: true,
				success: () => {
					toast(['wifi.connected', ssid]);
					resolve();
				},
				fail: (error) => {
					console.log(error)
					toast('wifi.connect.error');
					reject(error);
				},
				complete: complete
			});
		});
	} catch (error) {
		throw err;
	}
};

export default {
	connect
};