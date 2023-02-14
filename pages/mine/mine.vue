<template>
	<view class="box">
		我的
			<button @click="clear">退出</button>
	</view>
</template>

<script>

	export default {
		data() {
			return {
			
			}
		},
		mounted() {
		
		},
		methods: {
			clear() {
				uni.clearStorageSync()
				uni.navigateTo({
					url:'/pages/login/login',
					fail:(err)=>{
						console.log(err)
					}
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.quit {
		position: fixed;
		top: calc(100% - 360rpx);
		z-index: 99;
		box-shadow: 0px -2px 0px rgba(6, 6, 6, 0.2);
		height: 300rpx;
		width: 80%;
		left: 10%;
		// background-color: white;
		text-align: center;

		.context {
			background-color: white;
			height: 240rpx;

			.txt {
				font-size: 28rpx;
				color: gray;
				height: 150rpx;
				line-height: 150rpx;
			}

			.confirm {

				height: 90rpx;
				color: #CC463D;
			}
		}

		.cancel {
			color: #576B95;
			background-color: white;
			margin-top: 20rpx;

			height: 90rpx;
		}
	}

	.gap {
		margin-top: 40rpx;
		border-top: 0.5rpx solid rgba(228, 228, 228, 0.4);

	}

	.list-item {
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		image {
			width: 60rpx;
			height: 60rpx;
		}

		.left-gap {
			margin-left: 20rpx;
		}

		border-bottom: 0.5rpx solid rgba(228, 228, 228, 0.4);
	}

	.box {
		background-color: #eee;

		height: 100vh;

		.setting-card {
			height: calc(100% - 400rpx);
			background-color: white;
			padding: 0 50rpx;
		}

		.login-time {
			font-size: 24rpx;
			color: grey;
			background-color: white;
			height: 50rpx;
			line-height: 50rpx;
		}

		.card {
			border-bottom: 0.5rpx solid rgba(228, 228, 228, 0.4);
			background-color: white;
			height: 320rpx;

			.name {
				font-size: 48rpx;
				font-weight: 600;
			}

			.position {
				font-size: 28rpx;
				color: gray;
				margin-top: 15rpx;
			}

			.card-top {
				display: flex;
			}



			.left {
				margin-left: 50rpx;
				margin-top: 20rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: gray;
			}

			.right {
				margin-top: 20rpx;
				margin-left: auto;
				margin-right: 50rpx;

				image {

					width: 120rpx;
					height: 160rpx;
				}
			}
		}

		.btn {
			position: fixed;
			bottom: 50rpx;
			width: calc(100% - 100rpx);
		}
	}
</style>
