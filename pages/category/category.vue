<template>
	<myScrollView currentPath="/pages/category/category">
		<template slot="content" style="height: 100%;">
			<view class="nav-bar" :style="{paddingTop:marginWindowTop+'px',height:navBarHeight+'px'}">
				<picker @change="bindPickerChange" :value="id" range-key="name" :range="canteenOptions">
					<text class="canteen-name">{{currentCanteen}}</text>
				</picker>
				<text class="iconfont icon-sanjiaoxia"></text>
			</view>
			
			<view class="search">
				<view class="search-border">
					<text>搜索店铺</text>
				</view>
			</view>
		</template>
	</myScrollView>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import myScrollView from '@/component/th-scroll-view/index.vue'

	const marginWindowTop = ref(0)
	const navBarHeight = ref(0)

	const canteenOptions = ref([{
			name: '芒果食堂',
			id: 1
		},
		{
			name: '崇礼食堂',
			id: 2
		}
	])

	const currentCanteen = ref('芒果食堂')


	const init = () => {
		const menuButton = uni.getMenuButtonBoundingClientRect()
		marginWindowTop.value = menuButton.top
		navBarHeight.value = menuButton.height
	}

	const bindPickerChange = (e) => {
		currentCanteen.value = canteenOptions.value[e.detail.value].name
	}

	onMounted(() => {
		init()
	})
</script>

<style lang="scss">
	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		padding-bottom: 20rpx;

		.canteen-name {
			margin-right: 8rpx;
			font-size: 32rpx;
		}
	}
	
	.search{
		width: 100%;
		padding: 20rpx 40rpx;
		background-color: #fff;
		box-sizing: border-box;
		.search-border{
			height: 60rpx;
			border-radius: 75rpx;
			background-color: #F0F0F0;
			display: flex;
			align-items: center;
			justify-content: center;
			color:#BFBFBF
		}
	}
</style>