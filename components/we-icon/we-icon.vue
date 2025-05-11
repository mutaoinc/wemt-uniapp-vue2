<template>
	<view class="we-icon" :style="iconStyle">
		<text class="ri-icon" :class="iconClass" />
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: "info-line" // 默认图标名称
			},
			color: {
				type: String,
				default: "#000"
			},
			size: {
				type: [String, Number],
				default: 24,
			},
			padding: {
				type: [String, Number],
				default: 0,
			},
			background: {
				type: String,
				default: ""
			},
			borderRadius: {
				type: [String, Number],
				default: 0,
			}
		},
		computed: {
			iconClass() {
				return `ri-${this.name}`;
			},
			iconStyle() {
				return {
					color: this.color,
					fontSize: this.size + 'px',
					lineHeight: this.size + 'px',
					padding: this.padding + 'px',
					background: this.background,
					borderRadius: this.borderRadius + 'px'
				};
			}
		}
	};
</script>

<style scoped>
	@import 'https://cdn.bootcdn.net/ajax/libs/remixicon/3.5.0/remixicon.min.css';

	.we-icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>