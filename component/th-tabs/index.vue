<template>
	<view class="comp-container">
		<view class="tabs">
			<!-- 标签栏 -->
			<view :class="['tab',{active:index==activedIndex}]" v-for="(item,index) in list" :key="index"
				@click="handleSelect(index)">{{item}}</view>
			<!-- 下划线 -->
			<view :class="['underline',{transition:left!==null}]"></view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		ref,
		onMounted,
		nextTick,
		getCurrentInstance,
		defineEmits,
	} from 'vue'
	
	const emit = defineEmits(['onchange']);
	
	const props = defineProps({
		//标签配置
		list: {
			type: Array,
			default: () => []
		},
		actived:{
			type:Number,
			default:0
		},
		//激活颜色
		activeColor: {
			type: String,
			defalut: 'deepskyblue'
		}
	})

	//激活颜色
	const activeColor = computed(() => {
		return props.activeColor || 'deepskyblue'
	})
	

	//切换标签
	const handleSelect = (index) => {
		if (index !== activedIndex) {
			emit('onchange', index)
			setPosition()
		}
	}

	//下划线离父元素左边距
	const left = ref(null)
	//组件实例
	const instance = getCurrentInstance()
	//设置下划线位置
	const setPosition = () => {
		nextTick(() => {
			let query = uni.createSelectorQuery().in(instance.proxy)
			query.select(".active").boundingClientRect(data => {
				//定位距离=选中标签项与左距离+标签宽一半
				left.value = `${data.left+data.width/2}px`

			}).exec()
		})
	}
	
	const activedIndex = computed(() => {
		setPosition()
		return props.actived
	})

	onMounted(() => {
		//设置下划线初始位置
		setPosition()
	
	})

	//手势切换回调
	const onSwiperChange = e => {
		if (e.detail.current !== selectIndex.value) {
			handleSelect(e.detail.current)
		}
	}
</script>

<style lang="scss" scoped>
	.comp-container {
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
		overflow: hidden;
	}
	.tabs {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #fff;
		position: relative;
		flex-shrink: 0;

		.tab {
			flex: 1;
			padding: 15rpx 10rpx 20rpx 10rpx;
			width: 0;
			box-sizing: border-box;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: #333;
			font-size: 28rpx;
			position: relative;

			&.active {
				font-weight: bold;
				color: v-bind(activeColor);
			}
		}
	}

	//下划线
	.underline {
		position: absolute;
		width: 30px; // 固定长度
		height: 6rpx;
		background-color: v-bind(activeColor);
		border-radius: 6rpx;
		bottom: 10rpx;
		left: v-bind(left);
		transform: translateX(-50%);
		display: none;

		&.transition {
			display: block;
			transition: all 0.3s;
		}
	}
</style>