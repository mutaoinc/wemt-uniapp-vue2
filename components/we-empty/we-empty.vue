<template>
	<view class="we-empty" v-if="show">
		<image :src="image" class="we-empty__image" v-if="image"></image>
		<text class="we-empty__title" v-if="title">{{ title }}</text>
		<text class="we-empty__description" v-if="description">{{ description }}</text>
		<view class="we-empty__button" v-if="button.title">{{ button.title }}</view>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'we-empty',
		mixins: [props],
		computed: {}
	};
</script>

<style scoped>
	/* 根据需要自定义组件样式 */
	.we-empty {
		/* 组件样式 */
	}

	.we-empty__image {
		/* 图片样式 */
	}

	.we-empty__title {
		/* 标题样式 */
	}

	.we-empty__description {
		/* 描述样式 */
	}

	.we-empty__button {
		/* 按钮样式 */
	}
</style>