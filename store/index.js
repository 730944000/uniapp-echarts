import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import data from './modules/data'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		data
	},
	getters
})

export default store
