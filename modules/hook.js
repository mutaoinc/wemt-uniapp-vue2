import {
	settings,
	language,
	request,
	router,
	run,
	storage,
	message,
	confirm,
	toast,
	date,
	validation,
	user
} from './common'

export default function(hook) {
	hook = hook.toString()
	if (settings.hook && hook in settings.hook) {
		run(settings.hook[hook])
	} else {
		return false
	}

	return true
}