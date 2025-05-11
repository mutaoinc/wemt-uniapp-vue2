import {
	mapState,
	mapGetters
} from 'vuex'

import network from './modules/network'

export default {
	data() {
		return {

		}
	},
	computed: {
		...mapState(['system', 'network', 'user']),
	},
	created() {},
	mounted() {
		if (!this.system) {
			this.$store.commit('system', uni.getSystemInfoSync())
		}
		uni.getNetworkType({
			success: (e) => {
				network.change(e)
			}
		});
	},
	methods: {}
}