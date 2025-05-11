<template>
	<view v-if="created">
		<u-form :borderBottom="false" ref="form" :model="form.data" :rules="form.rules" errorType="toast">
			<view v-for="(f, k) in field" :key="k">
				<view v-if="f.type == 'input'">
					<u-form-item :label="f.title" :labelWidth="f.settings.lable ? f.settings.lable.width : 100"
						:required="f.required">
						<u-input :placeholder="f.settings.placeholder ? f.settings.placeholder : '请输入'">
						</u-input>
					</u-form-item>
				</view>
				<view v-else-if="f.type == 'picker'">
					<u-form-item :label="f.title" :labelWidth="f.settings.lable ? f.settings.lable.width : 100"
						:required="f.required">
						<view @click="pickerTrigger(f.name)">
							{{ picker[f.name].title }}
						</view>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-picker :show="picker[f.name].show" :columns="[f.options]" keyName="title"
						@cancel="pickerTrigger(f.name)" @confirm="pickerConfirm"></u-picker>
				</view>
				<view v-else-if="f.type == 'datetime'">
					<u-form-item :label="f.title" :labelWidth="f.settings.lable ? f.settings.lable.width : 100"
						:required="f.required">
						<view @click="pickerTrigger(f.name)">
							{{ picker[f.name].title }}
						</view>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-datetime-picker :show="picker[f.name].show" :mode="f.settings.enableTime ? 'datetime' : 'date'"
						@cancel="pickerTrigger(f.name)" @confirm="pickerConfirm"></u-datetime-picker>
				</view>
				<view v-else-if="f.type == 'textarea'">
					<u-form-item :label="f.title" :labelWidth="f.settings.lable ? f.settings.lable.width : 100"
						:required="f.required">
					</u-form-item>
					<u--textarea :placeholder="f.settings.placeholder ? f.settings.placeholder : '请输入'"
						:height="f.settings.height ? f.settings.height : 100" autoHeight></u--textarea>
				</view>
				<view v-else-if="f.type == 'file'">
					<u-form-item :label="f.title" :labelWidth="f.settings.lable ? f.settings.lable.width : 100"
						:required="f.required">
					</u-form-item>
					<uni-file-picker :limit="f.settings.limit ? f.settings.limit : 1"
						:title="f.settings.placeholder ? f.settings.placeholder : '请选择'"></uni-file-picker>
				</view>
				<view v-else-if="f.type == 'radio'">
					<u-form-item :label="f.title" :labelWidth="f.settings.lable ? f.settings.lable.width : 100"
						:required="f.required">
						<u-radio-group>
							<u-radio v-for="(v, k) in f.options" :key="k"
								:shape="f.settings.shap ? f.settings.shap : 'circle'" :label="v.title"></u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view v-else>
					<u-form-item :label="f.title" :labelWidth="f.settings.lable ? f.settings.lable.width : 100"
						:required="f.required">
					</u-form-item>
				</view>
			</view>
		</u-form>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: "we-form",
		mixins: [props],
		data() {
			let picker = {};

			this.field.map((v, k) => {
				if (v.type == "picker") {
					picker[v.name] = {
						show: false,
						title: "请选择"
					}
				} else if (v.type == "datetime") {
					picker[v.name] = {
						show: false,
						title: "请选择时间"
					}
				}
			})

			return {
				created: false,
				picker: picker,
				form: {
					rules: {},
					data: {}
				}
			}
		},
		created() {
			this.created = true
		},
		methods: {
			pickerTrigger(name) {
				this.picker[name].show = !this.picker[name].show
			},
			pickerConfirm(e) {
				console.log(e)
				// this.pickerTrigger(name)
			}
		}
	}
</script>

<style>
</style>