export default function language(key, ...args) {
    key = key ? key.toString() : null;

    const languagePack = {
        "notice": "提示",
        "error": "系统错误",
        "loading": "加载中",
        "phone.call.fail": '拨打失败',
        "user.get.info.fail": '获取用户信息失败',
        "user.login.fail": '登录失败',
        "location.get.fail": '获取定位失败',
        "location.open.fail": '打开地图失败',
        "network.disconnected": "网络已断开",
        "network.connected": "网络已连接",
        "wifi.error": "WiFi启用失败",
        "wifi.connected": "已连接$1",
        "wifi.connect.error": "WiFi连接失败",
        "wifi.connect.already": "已连接$1",
        "wifi.list.error": "获取WiFi失败",
        "wifi.list.available.error": "没有找到可用wifi",
        "request.http.error": "网络错误",
        "request.response.error": "系统错误"
    };

    let translation = languagePack[key] || key;

    if (args.length) {
        args.forEach((arg, index) => {
            translation = translation.replace(`$${index + 1}`, arg);
        });
    }

    return translation;
}