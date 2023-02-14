<template>
  <view>
    <view class="echarts-wrap" >
      <l-echart ref="chart" :option="option"></l-echart>
    </view>
  </view>
</template>

<script>
import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
import echartsTheme from '@/util/echarts-theme.js'

	export default {
		props: {
			option: {
				type: [Object,Array],
				default: null
			}
		},
		data() {
			return {}
		},
		watch:{
			option:{
				handler(){
					this.init()
				},
				deep:true,
				// immediate:true
			}
		},
		mounted() {
			this.$nextTick(()=>{
				if(this.option){
					this.init()
				}
			})
		},
		methods:{
			init(){
				echarts.registerTheme('custom-theme', echartsTheme);	
				this.$refs.chart.init(echarts, 'custom-theme', chart => {
						let res=this.option
						chart.setOption(res);
						chart.on('click',(res)=>{
							this.$emit('chartClick',res) 
						})
				});
			}
		}
	}
</script>

<style>
	.echarts-wrap {
    width: 100%;
		height: 500rpx;
		overflow: hidden;
	}
	.placeholder{
		width: 100%;
		height: 500rpx !important;
		overflow: hidden;
		color: lightgrey;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
