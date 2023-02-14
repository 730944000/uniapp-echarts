<template>
	<view class="main-box">
		<view class="page_bg">

		</view>
		<view style="display: flex">
			<view style="z-index: 2; width: 100%">

				<view class="login-box">
					<view class="title">
						<view style="margin-bottom: 10rpx">
							<text style="font-size: 48rpx">您好，请先登录</text>
						</view>
						<view>
							<text style="font-size: 24rpx; color: gray">洞见价值　引领未来</text>
						</view>
					</view>

					<uni-forms ref="loginForm" :modelValue="formData" :rules="rules">
						<uni-forms-item name="userName" class="mobilePhoneBox">
							<uni-easyinput v-model="formData.userName" clearable type="text" placeholder="请输入用户名(admin)"
								prefixIcon="person" />
						</uni-forms-item>
						<uni-forms-item name="userPassword" class="verifyCodeBox">
							<uni-easyinput v-model="formData.userPassword" clearable type="password"
								placeholder="密码(123)" prefixIcon="locked" />
						</uni-forms-item>
						<button @click="login" class="btn-style">登录</button>
					</uni-forms>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/config/index.js';
	import CryptoJS from 'crypto-js';
	import store from '@/store/index.js';
	let time = null;
	export default {
		data() {
			return {
				imageUrl: '',
				formData: {
					userName: '',
					userPassword: '',
				},
				code: null,
				rules: {
					userName: {
						rules: [{
							required: true,
							errorMessage: '请输入用户名',
						}, ],
					},
					userPassword: {
						rules: [{
							required: true,
							errorMessage: '请输入密码',
						}, ],
					},
				},
			};
		},

		onLoad() {
		
		},
		methods: {
			/**
			 * 点击登录
			 */
			login() {
				if (time) {
					clearTimeout(time);
				}
				time = setTimeout(() => {
					//模拟加密解密

					let pass = this.encrypt(
						this.formData.userName,this.formData.userPassword)
					pass = this.decrypt(this.formData.userName, pass)
					//随便写了下登录
					if (this.formData.userName == 'admin' && pass == 123) {
						this.$store.dispatch('user/login',this.formData)
						uni.switchTab({
							url: '/pages/home/home',
							fail: (err) => {
								console.log(err);
							}
						})({
						
						})
					}
				}, 500);
			},
			/**
			 * 密码加密
			 * @param key 用户名
			 * @param str 密码
			 * @returns {string}
			 */
			encrypt(key, data) {
				// 使用用户名进行MD5，32位，作为key
				let key_str = CryptoJS.MD5(key).toString().substring(8, 24);
				key = CryptoJS.enc.Utf8.parse(key_str);
				let iv = key;
				// 对password进行AES加密
				data=CryptoJS.enc.Utf8.parse(data)
				let AESPass = CryptoJS.AES.encrypt(data, key, {
					iv: iv,
					mode: CryptoJS.mode.CBC, //补齐方式 CBC,ECB,etc.
					padding: CryptoJS.pad.Pkcs7, // 偏移规则设定  pack5，pkcs7，nopadding,etc.
				});
				// CryptoJS 的 encrypt函数不会直接返回字符串，需要toString或者Crypto-JS进行转码才能得到真实的结果。
				let pass = AESPass.toString();
				return pass;
			},
			//解密
			decrypt(key, data) {
				let key_str = CryptoJS.MD5(key).toString().substring(8, 24);
				key = CryptoJS.enc.Utf8.parse(key_str);
				let iv = key;
				
				// let encHexstr=CryptoJS.enc.Base64.parse(data);
				// data= CryptoJS.enc.Base64.stringify(encHexstr)
				const decrypt = CryptoJS.AES.decrypt(data, key, {
					iv: iv,
					mode: CryptoJS.mode.CBC,
					padding: CryptoJS.pad.Pkcs7
				});
				return decrypt.toString(CryptoJS.enc.Utf8);
			}


		},
	};
</script>

<style scoped lang="scss">
	.page_bg {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
		min-height: 100%;
		width: 100%;

		image {
			width: 100%;
			height: 100vh;
			display: block;
		}
	}

	.logo-image {
		z-index: 2;
		height: 80rpx;
		width: 340rpx;
		margin-top: 24rpx;
		margin-left: 32rpx;
	}

	/deep/ .uni-easyinput__content {
		border-radius: 45rpx;
		height: 100rpx;
		background-color: #f5f8fc;
	}

	/deep/ .uni-forms-item {
		margin: 10rpx 0;
	}

	.btn-style {
		background-color: #1990ff;
		color: white;
		margin-top: 40rpx;
		border-radius: 45rpx;
		height: 100rpx;
		line-height: 100rpx;
		;
	}

	.main-box {
		width: 100%;
	}

	.login-box {
		z-index: 2;
		margin: 20rpx auto;
		width: 80%;

		.title {
			margin: 100rpx 0;

			// /deep/ text {
			// 	color: lightblue;
			// 	-webkit-animation: shining 1.0s alternate infinite;
			// 	animation: shining 1.0s alternate infinite;
			// }

			// @-webkit-keyframes shining {
			// 	from {
			// 		text-shadow: 0 0 10px lightblue 0 10px lightblue, 0 0 20px lightcyan, 0 0 30px #eee;
			// 	}

			// 	to {
			// 		text-shadow: 0 0 10px lightblue, 0 0 10px lightblue, 0 0 15px lightcyan, 0 0 20px #eee;
			// 	}
			// }
		}
	}
</style>
