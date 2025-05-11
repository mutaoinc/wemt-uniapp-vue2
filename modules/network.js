import {
	settings,
	router,
	storage,
	message,
	toast
} from './common'

import store from '../store'

const network = {
	get: function(key = false) {
		return storage.get('network')
	},
	change: function(e) {
		store.commit('network', {
			connected: e.networkType === 'none' ? false : true,
			type: e.networkType
		})

		if (e.isConnected) {
			// toast('network.connected')
		} else if (e.networkType === 'none') {
			// toast('network.disconnected')
		}
	}
}

export default network