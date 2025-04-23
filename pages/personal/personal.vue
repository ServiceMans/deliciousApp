<template>
	<myScrollView @onScroll="onScroll" currentPath="/pages/personal/personal">
		<template slot="content" style="height: 100%;">
			<view class="bg-panel" :style="{paddingTop:windowMarginTop+'px'}">
				<view class="nav-bar"
					:style="{paddingTop:windowMarginTop+'px',height:navBarHeight+'px',opacity:opacity}">
					我的
				</view>
				<view class="avatar-nickname">
					<image class="avatar"
						src="https://img.js.design/assets/img/67d552e104c499c1103f0bd5.bmp#8aff84179e820f42a792f1c4b81a8ec5"
						mode="aspectFill"></image>
					<view class="nickname">
						<text class="content">哥只是个传说</text>
						<image class="edit-img" src="/static/Union.png" mode="widthFix"></image>
					</view>
				</view>

				<view class="introduce-edit">
					<text class="introduce-text">添加简介让大家更好认识你</text>
					<view class="edit-btn">
						编辑资料
					</view>
				</view>

				<view class="trace">

				</view>

				<view id="my-note" :class="isFixed ? 'my-note-fixed' :'my-note'"
					:style="{'--fixed-top': navMaskHeight + 'px'}">

				</view>
			</view>

			<view v-for="item in 100">
				sss
			</view>
		</template>
	</myScrollView>
</template>

<script setup>
	import {
		onMounted,
		onActivated,
		ref
	} from 'vue';
	import myScrollView from '@/component/th-scroll-view/index.vue'
	import {
		getMarginTop,
		getNavBarHeight
	} from '../../utils/getDeviceInfo';

	const windowMarginTop = ref(getMarginTop())
	const navBarHeight = ref(getNavBarHeight())
	const navMaskHeight = ref(windowMarginTop.value + navBarHeight.value + 5)
	const fixedDistance = ref(0)
	const isFixed = ref(false)
	const opacity = ref(0)
	const onScroll = (e) => {

		opacity.value = e.detail.scrollTop / fixedDistance.value
		if (e.detail.scrollTop >= fixedDistance.value) {
			isFixed.value = true

		} else {
			isFixed.value = false
		}
	}

	const init = () => {
		uni.createSelectorQuery().select(`#my-note`)
			.boundingClientRect((rect) => {
				fixedDistance.value = rect.top
			}).exec()
	}
	onMounted(() => {
		init()
	})
</script>

<style lang="scss" scoped>
	.bg-panel {
		position: relative;
		width: 100%;
		background: linear-gradient(50deg, rgba(204, 204, 204, 1) 0%, rgba(204, 204, 204, 1) 0%, rgba(255, 195, 0, 0.05) 0%, rgba(237, 126, 146, 0.41) 100%);
		padding: 0 32rpx;
		box-sizing: border-box;
		padding-bottom: 150rpx;

		.nav-bar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 5px;
			background-color: #f3cacb;
		}

		.avatar-nickname {
			display: flex;
			align-items: center;
			padding-top: 75rpx;

			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}

			.nickname {
				margin-left: 26rpx;

				.content {
					font-size: 36rpx;
					margin-right: 18rpx;
				}

				.edit-img {
					width: 26rpx
				}
			}
		}

		.introduce-edit {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			.introduce-text {
				font-size: 24rpx;
				color: #808080;
			}

			.edit-btn {
				padding: 10rpx 30rpx;
				background-color: rgba(255, 255, 255, 0.56);
				border-radius: 70rpx;
				color: #000000;
			}
		}

		.trace {
			width: 100%;
			height: 284rpx;
			margin-top: 48rpx;
			border-radius: 24rpx;
			background-color: #fff;
		}

		.my-note {
			position: absolute;
			width: 100%;
			height: 45px;
			border-radius: 30rpx 30rpx 0px 0px;
			background-color: #fff;
			left: 0;
			bottom: 0;
		}

		.my-note-fixed {
			position: fixed;
			width: 100%;
			height: 45px;
			border-radius: 30rpx 30rpx 0px 0px;
			background-color: #fff;
			left: 0;
			top: var(--fixed-top);
		}
	}
</style>