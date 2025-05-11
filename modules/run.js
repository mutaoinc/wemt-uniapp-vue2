import {
	settings,
	language,
	request,
	router,
	storage,
	message,
	confirm,
	toast,
	date,
	validation,
	user
} from './common'

import store from '../store'

const run = function(json) {

	json.map((v, k) => {

		switch (v.action) {
			case 'toast':
				toast(v.title, v.duration ? v.duration : 1500, () => {
					run(v.callback)
				})
				break;
			case 'router.go':
				router.go(v.url)
				break;
			case 'storage.set':
				storage.set(v.key, v.value)
				break;
			case 'storage.remove':
				storage.remove(v.key)
				break;
			case 'store.set':
				store.commit(v.key, v.value)
			case 'store.remove':
				store.commit(v.key, null)
				break;
			default:
				break;
		}
	})
}

export default run