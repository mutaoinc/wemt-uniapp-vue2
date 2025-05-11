/**

 +------------------------------------------------------------------------------
 
 * date.js/日期类库，请勿修改此文件
 * 
 * Nanjing Mu Tao Network Technology Co., Ltd.

 +------------------------------------------------------------------------------

 * $website: www.mutaoinc.net
 * 
 * $mailto: info@mutaoinc.com

 +------------------------------------------------------------------------------
    
 */
const LANGUAGE = {
	ERROR_FORMAT_STRING: "时间格式必须为String类型",
	JUST_NOW: "刚刚",
	MINUTES_AGO: "分钟前",
	HOURS_AGO: "小时前",
	DAYS_AGO: "天前",
	MONTHS_AGO: "月前",
	YEARS_AGO: "年前"
};

const TIME_CONSTANTS = {
	YEAR: "year",
	MONTH: "month",
	DAY: "day",
	HOUR: "hour",
	MINUTE: "minute",
	SECOND: "second",
	DEFAULT_FORMAT: "Y-m-d H:i:s",
	FORMATS_MAP: {
		"Y": "year",
		"m": "month",
		"d": "day",
		"H": "hour",
		"i": "minute",
		"s": "second"
	},
	TIME_PERIODS: [{
			period: LANGUAGE.MINUTES_AGO,
			length: 60 * 1000
		},
		{
			period: LANGUAGE.HOURS_AGO,
			length: 60 * 60 * 1000
		},
		{
			period: LANGUAGE.DAYS_AGO,
			length: 24 * 60 * 60 * 1000
		},
		{
			period: LANGUAGE.MONTHS_AGO,
			length: 30 * 24 * 60 * 60 * 1000
		},
		{
			period: LANGUAGE.YEARS_AGO,
			length: 12 * 30 * 24 * 60 * 60 * 1000
		}
	]
}

const unify = (time = Date.now()) => {
	time -= 0;
	if (("" + time).length === 10) {
		time *= 1000;
	}
	return time;
}

const two = (str) => `0${str}`.slice(-2);

const time = () => Math.floor(microtime() / 1000);

const microtime = () => Date.now();

const format = (time, format = TIME_CONSTANTS.DEFAULT_FORMAT) => {
	if (format !== null && typeof format !== "undefined" && typeof format !== "string") {
		throw new Error(LANGUAGE.ERROR_FORMAT_STRING);
	}

	let date = new Date(unify(time));

	const fullTime = {
		year: date.getFullYear(),
		month: two(date.getMonth() + 1),
		day: two(date.getDate()),
		hour: two(date.getHours()),
		minute: two(date.getMinutes()),
		second: two(date.getSeconds())
	};

	for (let src in TIME_CONSTANTS.FORMATS_MAP) {
		format = format.replace(new RegExp(src, "g"), fullTime[TIME_CONSTANTS.FORMATS_MAP[src]]);
	}

	return format;
}

const friendly = (time) => {
	let currentTime = Date.now();
	let diff = currentTime - unify(time);

	for (let period of TIME_CONSTANTS.TIME_PERIODS) {
		let diffInPeriod = Math.floor(diff / (period.length / 1000));
		if (diff < period.length) {
			return diffInPeriod > 0 ? `${diffInPeriod}${period.period}` : LANGUAGE.JUST_NOW;
		}
	}
	return format(time);
}

export default {
	time,
	microtime,
	format,
	friendly
}