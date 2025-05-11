import {
    message
} from './common'

var makePhoneCall = function (number) {
	tt.makePhoneCall({
		phoneNumber: number,
		success: function () {},
		fail: function () {
			message('phone.call.fail')
		}
	});
}

export default {
	makePhoneCall
}