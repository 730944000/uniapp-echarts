<template>
	<view class="content ">
		<view class="content-top">
			<!-- 首页图表 -->
			<view class="content-echarts">
				<view class="block">
					<homeChart  ></homeChart>
				</view>
			</view>

		</view>
		<view>这是首页</view>
	</view>
</template>

<script>
	import homeChart from '@/pages/home/homeChart'
	export default {
		components: {
			homeChart
		},
		data() {
			return {
				currentIndex: 0, //默认选中第一个颜色
			};
		},
		onLoad() {
			if (!uni.getStorageSync('userInfo')) {
				uni.reLaunch({
					url: '/pages/login/login',
				});
			}

		},
		async mounted() {

		},
		methods: {
			imgClick(item, index) {
				this.currentIndex = index
			},
			toAnalyse(val) {
				if (val == 0 || val == 1) {
					uni.navigateTo({
						url: this.boxList[0].url + `?list=${(this.encodeSend(this.boxList[0]))}`
					})
				} else if (val == 2) {
					uni.navigateTo({
						url: this.boxList[1].url + `?list=${(this.encodeSend(this.boxList[1]))}`
					})
				} else if (val == 3) {
					uni.navigateTo({
						url: this.boxList[3].url + `?list=${(this.encodeSend(this.boxList[3]))}`
					})
				} else if (val == 4) {
					uni.navigateTo({
						url: this.boxList[4].url + `?list=${(this.encodeSend(this.boxList[4]))}`
					})
				} else if (val == 5) {
					uni.navigateTo({
						url: this.boxList[5].url + `?list=${(this.encodeSend(this.boxList[5]))}`
					})
				} else if (val == 6) {
					uni.navigateTo({
						url: this.boxList[2].url + `?list=${(this.encodeSend(this.boxList[2]))}`
					})
				}
			},
			boxClick(item) {
				uni.navigateTo({
					url: item.url + `?list=${(this.encodeSend(item))}`
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	::-webkit-scrollbar {
		display: none;
	}

	.gap {
		margin-top: 10rpx;
	}

	.content {
		.content-top {
			//上面可视化模块高度  
			height: 666rpx;

			.content-echarts {
				height: 90%;
				background-color: #F5F7FC;

				view {
					padding: 10rpx;
				}
			}
		}

		.background {
			margin: 10rpx 0;
			height: 30rpx;
			width: 100%;
			background-color: #f4f7fc;
		}

		.content-bottom {
			//下面功能模块高度
			margin-top: 120rpx;
			height: 28%;
		}

		.activeColor {
			border-bottom: 1px solid #409EFF;
		}
	}
</style>
