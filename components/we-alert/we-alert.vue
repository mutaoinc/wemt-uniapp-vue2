<template>
	<view class="alert" :class="['alert-' + type, 'alert-' + size]" :style="{borderRadius: borderRadius + 'px'}">
		<view class="title">{{ title }}</view>
		<view class="content">{{ content }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'info'
			},
			content: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: ''
			},
			borderRadius: {
				type: [String, Number],
				default: 3,
			},
			margin: {
				type: [String, Number],
				default: 0
			}
		}
	};
</script>

<style lang="scss" scoped>
	.alert {
		font-size: 14px;
		padding: 10px 15px;

		.title {
			font-size: 15px;
			font-weight: bold;
		}

		&-small {
			font-size: 12px;
			padding: 5px 15px;
		}

		&-danger {
			color: #e55640;
			background-color: #fce9e6;
		}

		&-warning {
			color: #e1a72b;
			background-color: #fdf6e7;
		}

		&-info {
			color: #00c1de;
			background-color: #dff6fa;
		}

		&-primary {
			color: #259fdc;
			background-color: #d9edf7;
		}

		&-success {
			color: #29bc85;
			background-color: #e7f7f1;
		}

		&-default {
			color: #8c8c8c;
			background-color: #f2f2f2;
		}
	}
</style>