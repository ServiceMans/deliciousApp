<template>
	<myScrollView currentPath="/pages/index/index">
		<template slot="content"  style="height: 100%;">
			<view class="content-container">
				<view class="search-container">
					<view class="search-block"
						:style="{paddingTop: marginWindowTop+'px',height:searchHeight+'px',paddingLeft:globalLRPading+'px',width:searchWidth+'px'}">
						<text class="tag" :style="{marginRight:globalLRPading+'px'}">
							泰豪吃
						</text>

						<view class="search-ipt" @click="toSearchPage">搜索店铺名称</view>
					</view>
				</view>


				<tabs @onchange="tabChange" :list="tabsList" :actived="tabIndex" activeColor="#000"></tabs>

				<view class="list-body">
					<swiper @change="onSwiperChange" :current="tabIndex" class="swp">
						<swiper-item>
							<scroll-view scroll-y="true" enable-flex class="article-list" refresher-enabled>
								<view class="waterfall"
									:style="{paddingLeft:globalLRPading+'px',paddingRight:globalLRPading+'px'}">
									<view :id="'article-' + index" class="article" v-for="(item,index) in recommendList"
										:key="index" @click="onDetail(index,item)">
										<image class="food-img" :src="item.img" mode="widthFix"></image>

										<text class="article-heading">{{item.title}}</text>

										<view class="article-footer">
											<view class="author">
												<image class="avatar" src="/images/avatar.jpg" mode="aspectFill">
												</image>
												<text class="nickname">{{item.nickname}}</text>
											</view>

											<view class="more">
												<text class="iconfont icon-more"></text>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>

						</swiper-item>
						<swiper-item>
							今日推荐
						</swiper-item>
						<swiper-item>
							发现
						</swiper-item>
					</swiper>
				</view>
			</view>

			<view v-if="detailData" class="detail-popup"
				:class="{ 'show-first-animation': isShowPopup, 'show-second-animation': isSecondAnimation,'hide-first-animation':!isShowPopup,'hide-second-animation':isHidePopup }"
				:style="{ width: popupWidth + 'px', height: popupHeight + 'px', 
                    left: popupLeft + 'px', top: popupTop + 'px','--popup-width': popupWidth + 'px', '--popup-height': popupHeight + 'px', 
                  '--popup-left': targetArticleLeft + 'px', '--popup-top': targetArticleTop + 'px' }"
				@click="onCancel">
				<view class="detail-container">
					<image :src="detailData.img" mode="widthFix"></image>
				</view>

			</view>
		</template>
	</myScrollView>

</template>
<script>
	import tabs from '@/component/th-tabs/index.vue'
	import myScrollView from '@/component/th-scroll-view/index.vue'
	export default {
		components: {
			tabs,
			myScrollView
		},
		data() {
			return {
				tabIndex: 0,
				marginWindowTop: 0,
				searchWidth: 0,
				searchHeight: 0,
				globalLRPading: 0,
				tabsList: ['关注', '今日推荐', '发现'],
				recommendList: [{
						img: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.TYHEES-3V-YhfcUVq7V4IwHaLH?rs=1&pid=ImgDetMain',
						title: '饭后甜点阿斯顿萨达萨达萨达萨达萨达萨达萨达萨达',
						nickname: '小甜心'
					},
					{
						img: 'https://img.shetu66.com/2023/03/27/1679913068282902.jpg',
						title: '大家都爱吃',
						nickname: '大师'
					},
					{
						img: 'https://img.shetu66.com/2023/06/29/1688022450789366.png',
						title: '大家都爱吃撒谎滴哦少i但撒谎',
						nickname: '大师'
					},
					{
						img: 'https://img.shetu66.com/2023/06/12/1686543766474530.jpg',
						title: '大家都爱吃',
						nickname: '大师'
					},
					{
						img: 'https://img.shetu66.com/2023/06/07/1686126208404317.jpg',
						title: '大家都爱吃撒旦撒旦撒',
						nickname: '大师'
					},
					{
						img: 'https://ts1.tc.mm.bing.net/th/id/R-C.68978afc71576a94a1d50ef5016dbd9e?rik=cDDsy5SLmDvDHQ&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50075%2f0779.jpg_wh1200.jpg&ehk=FG4Hd5S711LYcuLBIcDagQyk4KhcH1oIfqyk1MWUOyg%3d&risl=&pid=ImgRaw&r=0',
						title: '大家都爱吃撒旦撒旦撒',
						nickname: '大师'
					},
					{
						img: 'https://img95.699pic.com/photo/50127/2945.jpg_wh860.jpg',
						title: '大家都爱吃撒旦撒旦撒',
						nickname: '大师'
					},
				],

				popupWidth: 0,
				popupHeight: 0,
				popupLeft: 0,
				popupTop: 0,
				isShowPopup: false,
				isSecondAnimation: false,
				isHidePopup: false,
				targetArticleLeft: 0,
				targetArticleTop: 0,
				targetArticleWidth: 0,
				targetArticleHeight: 0,
				detailData: null,
				timeOut1: null,
				timeOut2: null,
			}
		},
		onLoad() {

		},

		onShow() {
			const menuButton = uni.getMenuButtonBoundingClientRect()
			const windowInfo = uni.getWindowInfo()
			this.globalLRPading = windowInfo.windowWidth - menuButton.right
			this.searchWidth = menuButton.left - this.globalLRPading * 2
			this.marginWindowTop = menuButton.top
			this.searchHeight = menuButton.height
		},

		methods: {
			tabChange(e) {
				this.tabIndex = e
			},

			onSwiperChange(e) {
				this.tabIndex = e.detail.current
			},
			onDetail(index, data) {
				if (this.timeOut1) {
					clearTimeout(this.timeOut1)
					clearTimeout(this.timeOut2)
					this.timeOut1 = null
					this.timeOut2 = null
				}
				this.detailData = data
				uni.createSelectorQuery()
					.select(`#article-${index}`)
					.boundingClientRect((rect) => {
						this.popupWidth = rect.width
						this.popupHeight = rect.height
						this.popupLeft = rect.left
						this.popupTop = rect.top
						this.targetArticleLeft = rect.left
						this.targetArticleTop = rect.top
						this.targetArticleWidth = rect.width
						this.targetArticleHeight = rect.height
						this.isHidePopup = false
						this.isShowPopup = true


						this.timeOut1 = setTimeout(() => {
							this.isSecondAnimation = true;
							this.popupLeft = 0
							this.popupTop = 0
						}, 200);
					})
					.exec();

			},
			onCancel() {
				if (this.timeOut1) {
					clearTimeout(this.timeOut1)
					this.timeOut1 = null
				}
				this.isShowPopup = false
				this.isSecondAnimation = false;
				this.popupLeft = this.targetArticleLeft
				this.popupTop = this.targetArticleTop
				this.timeOut2 = setTimeout(() => {
					this.isHidePopup = true;
				}, 200);
			},

			toSearchPage() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	.detail-container {
		width: 100%;

		image {
			width: 100%
		}
	}

	.detail-popup {
		position: absolute;
		border-radius: 10.87px;
		background-color: #fff;
		z-index: 999;
		// opacity: 0;
		transition: opacity 0.2s ease;
		/* 透明度过渡效果 */
		// visibility: hidden;
		/* 初始状态隐藏 */
	}

	.show-first-animation {
		transition: opacity 0.2s ease;
		opacity: 1;
		visibility: visible;
	}

	.show-second-animation {
		opacity: 1;
		visibility: visible;
		transition: width 0.2s ease, height 0.2s ease, left 0.2s ease, top 0.2s ease;
		width: 100vw !important;
		height: 100vh !important;
		border-radius: 0;
	}

	.hide-first-animation {
		transition: opacity 0.2s ease, width 0.2s ease, height 0.2s ease, left 0.2s ease, top 0.2s ease;
		width: var(--popup-width) !important;
		height: var(--popup-height) !important;
	}

	.hide-second-animation {
		transition: opacity 0.2s ease;
		opacity: 0;
		visibility: hidden;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		height: 100%;

		.search-container {
			width: 100%;
			background-color: #fff;
			border-bottom: 1rpx solid #E5E5E5;
			padding-bottom: 15rpx;

			.search-block {
				display: flex;
				align-items: center;

				.tag {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 105rpx;
					height: 80%;
					font-size: 28rpx;
					font-weight: bold;
					color: #fff;
					background-color: #b11016;
					border-radius: 70rpx;
					box-sizing: border-box;
				}

				.search-ipt {
					flex: 1;
					background-color: #F0F0F0;
					height: 100%;
					border-radius: 65rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					color: #BFBFBF;
				}
			}
		}


		.list-body {
			flex: 1;

			.swp {
				height: 100%;

				box-sizing: border-box;

				.article-list {
					width: 100%;
					height: 100%;
					box-sizing: border-box;

					.waterfall {
						column-count: 2;
						column-gap: 10rpx;
						padding-bottom: 10rpx;
					}

					.article {
						display: inline-block;
						width: 100%;
						background-color: #fff;
						border-radius: 10.87px;
						box-sizing: border-box;
						margin-top: 10rpx;

						.food-img {
							width: 100%;
							height: 400rpx;
							border-radius: 10.87px;
						}

						.article-heading {
							display: inline-block;
							font-weight: bold;
							font-size: 32rpx;
							margin-top: 10rpx;
							padding: 0 10rpx;
						}

						.article-footer {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 20rpx;
							padding: 0 10rpx;
							padding-bottom: 10rpx;

							.author {
								display: flex;
								align-items: center;

								.avatar {
									width: 40rpx;
									height: 40rpx;
									border-radius: 50%;
									background-color: #000;
									margin-right: 10rpx;
								}

								.nickname {
									font-size: 24rpx;
								}
							}

							.more {
								display: flex;
								align-items: center;
								font-size: 48rpx;
							}
						}
					}
				}
			}
		}



	}
</style>