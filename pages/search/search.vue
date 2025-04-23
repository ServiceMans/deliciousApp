<template>
	<view class="search-container">
		<view class="search">
			<text class="iconfont icon-search"></text>
			<input class="search-ipt" type="text" placeholder="请输入内容" placeholder-style="color:#BFBFBF;"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},

		methods: {
			init() {}
		},

		onShow() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.search-container {
		width: 100%;
		height: 100vh;
		background-color: #fff;
		padding: 0 20rpx;
		box-sizing: border-box;

		.search {
			width: 100%;
			display: flex;
			align-items: center;
			border-radius: 65rpx;
			box-sizing: border-box;
			background-color: #F0F0F0;
			padding: 10rpx 20rpx;

			.icon-search {
				margin-right: 15rpx;
				color: #BFBFBF;
				font-size: 40rpx;
			}

			.search-ipt {
				flex: 1;
				height: 100%;
				box-sizing: border-box;
			}
		}
	}
</style>