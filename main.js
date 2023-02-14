import App from './App'
import Vue from 'vue'
import store from './store'





//人员结构二级页面全局组件
// import secondPage from '@/components/secondPage'
// Vue.component('second-page', secondPage)

// import ChartPlaceholder from '@/components/ChartPlaceholder'
// Vue.component('ChartPlaceholder', ChartPlaceholder)

// import Table from '@/components/Table'
// Vue.component('Table', Table)

// import FixTable from '@/components/FixTable'
// Vue.component('FixTable', FixTable)

// import choicePicker from '@/components/choicePicker'
// Vue.component('choicePicker', choicePicker)

// import navTitle from '@/components/navTitle'
// Vue.component('navTitle', navTitle)

// import MyChart from '@/components/MyChart.vue'
// Vue.component('MyChart', MyChart)




Vue.config.productionTip = false;




App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
