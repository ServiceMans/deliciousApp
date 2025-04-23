<template>
	<view class="login-container">
		<view class="logan">
			<view class="circle-logo"></view>
			<view class="logan-text">
				<text style="display: inline-block;margin-bottom: 20rpx;">一个致力于让<text
						style="color: #FF5900;">泰豪</text>学子</text>
				<br />
				<text><text style="font-weight: bold;">吃好喝好</text>的平台</text>
			</view>
		</view>

		<view class="operation">
			<button type="primary" class="One-clickLogin" @click="handleLogin">微信一键登录</button>
			<button type="default" class="phone-login">手机登录</button>
			<view class="agreement">
				<label class="label">
					<radio class="radio" :value="checked" /><text>我已阅读并同意xxx的<text
							class="agreement-detail">《用户协议》</text>和<text class="agreement-detail">隐私政策</text></text>
				</label>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue'
	import { post } from '../../utils/request'

	const checked = ref(false)
	
	const handleLogin = () => {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				post('/user/login/wechat',{code:res.code}).then(res=>{
					console.log("结果",res);
					uni.setStorageSync('token', res.data.token)
					uni.setStorageSync('openid', res.data.openid)

				})
			}
		})
	}
	onMounted(() => {

	})
</script>

<style lang="scss" scoped>
	.login-container {
		width: 100%;
		height: 100vh;
		padding: 0 40rpx;
		box-sizing: border-box;
		background-color: #fff;

		.logan {
			padding-top: 200rpx;

			.circle-logo {
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				border: 2rpx solid #000;
			}

			.logan-text {
				margin-top: 70rpx;
				font-size: 54rpx;
			}
		}

		.operation {
			width: 100%;
			box-sizing: border-box;
			margin-top: 488rpx;

			.One-clickLogin {
				margin-bottom: 20rpx;
			}

			.phone-login {
				margin-bottom: 40rpx;
			}

			.agreement {
				font-size: 24rpx;

				.label {
					display: flex;
					align-items: center;
				}

				.radio {
					transform: scale(0.7)
				}

				.agreement-detail {
					color: #E1715B;
				}
			}

		}
	}
</style>