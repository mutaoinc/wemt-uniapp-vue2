export default {
	props: {
		show: {
			type: Boolean,
			default: true
		},
		image: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},
		button: {
			type: Object,
			default: () => ({})
		}
	}
}