<template>
	<view style="height: 100%" class="gap ">
		<view class="content-title"></view>
		<view class="item-chart">
			<view class="container" >
				<MyChart  :option="option"></MyChart>
			</view>
		</view>
	</view>
</template>
<script>

	export default {
		data() {
			return {
				option: null,
			};
		},
		async mounted() {

		},

		watch: {
			currentIndex: {
				handler() {
					this.chartData = null;
					this.option = null;
					this.getChart();
				},
				immediate: true,
				deep: true,
			},
			option: {
				handler() {
					this.$forceUpdate();
				},
				immediate: true,
				deep: true,
			},
			chartData: {
				handler() {
					this.$forceUpdate();
				},
				immediate: true,
				deep: true,
			}
		},
		computed: {},
		methods: {
		
			async getChart() {
				let res ={
					departmentName:['aa','bb','cc','dd','ee'],
					planRecruitList:[65,84,256,98]
				}
						this.option = {
							title: {
								text: '招聘计划人数TOP5',
								textStyle: {
									// color: "#ffffff",
									fontSize: 10,
									lineHeight: 14,
								},
							},
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 1,
								y2: 0,
								colorStops: [{
										offset: 0,
										color: '#355AD3', // 0% 处的颜色
									},
									{
										offset: 0.5,
										color: '#498CDF', // 50% 处的颜色
									},
									{
										offset: 1,
										color: '#57B1E7', // 100% 处的颜色
									},
								],
							},
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow',
								},
							},
							legend: {},
							grid: {
								left: '3%',
								right: '10%',
								bottom: '3%',
								containLabel: true,
							},
							xAxis: {
								type: 'value',
								axisLabel: {
									show: false,
								},
								splitLine: {
									show: true,
									lineStyle: {
										color: ['rgba(255,255,255,0.15)'],
									},
								},
							},
							yAxis: {
								type: 'category',
								inverse: true,
								axisTick: {
									show: false,
								},
								axisLabel: {
									// color: "rgba(255,255,255,0.85)",
									fontSize: 12,
									lineHeight: 17,
									// align:'left',
								},
								data: res.departmentName,
							},
							series: [{
								label: {
									show: true,
									position: 'right',
									color: '#AAAEBD',
								},
								itemStyle: {
									// color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									//   {offset: 0, color: '#83bff6'},
									//   {offset: 0.5, color: '#188df0'},
									//   {offset: 1, color: '#188df0'}
									// ])
								},
								type: 'bar',
								data: res.planRecruitList,
							}, ],
						};
			},
		},
	};
</script>
<style lang="scss" scoped>
	.placeholder {
		width: 100%;
		height: 500rpx !important;
		overflow: hidden;
		color: lightgrey;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.gap {
		margin: 20rpx, 0rpx;
	}

	.item-chart {
		height: 100%;

	
		view:nth-of-type(2) {
			height: 10%;
			text-align: center;

			text {
				color: rgba(155, 155, 155, 0.8);
				font-size: 20rpx;
				padding: 4rpx 14rpx;
				border: 1px solid rgba(155, 155, 155, 0.8);
				border-radius: 15rpx;
				// text-decoration: underline;
			}
		}
	}
</style>
