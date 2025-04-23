<template>
	<view class="th-tabbar">
		<view class="tab-item" v-for="(item,index) in tabBarList" :key="index" :data-path="item.path"
			@click.stop="onSeleted(item.path)">
			<view class="tab-top" v-if="item.path !== '/pages/add/add'">
				<text :class="['iconfont', item.path === currentPath ? item.iconFill : item.icon]"></text>
			</view>
			<view class="tab-bottom" v-if="item.path !== '/pages/add/add'">
				<text>{{item.text}}</text>
			</view>

			<view class="add-btn" v-if="item.path == '/pages/add/add'">
				<text class="iconfont icon-jia"></text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBarList: [{
						path: "/pages/index/index",
						icon: "icon-shouye",
						iconFill: "icon-shouye1",
						text: "首页"
					},
					{
						path: "/pages/category/category",
						icon: "icon-fenlei",
						iconFill: "icon-fenlei-xuanzhong",
						text: "分类"
					},
					{
						path: "/pages/add/add",
						icon: "icon-jia",
						iconFill: "icon-jia",
						text: ""
					},
					{
						path: "/pages/rank/rank",
						icon: "icon-rank",
						iconFill: "icon-rankfill",
						text: "排行榜"
					},
					{
						path: "/pages/personal/personal",
						icon: "icon-wode",
						iconFill: "icon-wode1",
						text: "我的"
					}
				],
			};
		},

		props: {
			currentPath: {
				type: String,
				default: "/pages/index/index"
			}
		},

		methods: {
			onSeleted(value) {
				if(value == '/pages/add/add'){
					uni.navigateTo({
						url: value
					})
				}else{
					uni.switchTab({
						url: value
					})
				}
				
			}
		},
	}
</script>

<style lang="scss">
	.th-tabbar {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 150rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.tab-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			.tab-top {
				.iconfont {
					font-size: 50rpx;
				}
			}

			.tab-bottom {
				font-size: 28rpx;
			}

			.add-btn {
				width: 90rpx;
				height: 90rpx;
				border-radius: 24rpx;
				background-color: #E86F58;
				display: flex;
				justify-content: center;
				align-items: center;

				.icon-jia {
					font-size: 35rpx;
					color: #fff;
				}
			}
		}
	}
</style>