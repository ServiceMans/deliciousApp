<script>
	export default {
		onLaunch: function() {

		},
		onShow: function() {
			uni.hideTabBar()
		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	@import 'index.css';
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>