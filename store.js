import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import storage from './modules/storage'

const store = new Vuex.Store({
	modules: {

	},
	state: {
		system: storage.getSync('system') || null,
		network: {
			connected: false,
			type: "unknown"
		},
		user: storage.getSync('user') || null,
	},
	getters: {

	},
	mutations: {
		system(state, value) {
			state.system = value, storage.set('system', value)
		},
		network(state, value){
			state.network = value, storage.set('network', value)
		},
		user(state, value) {
			state.user = value, value ? storage.set('user', value, value.overdue) : storage.remove("user")
		},
	},
})

export default store