const getDefaultState = () => {
	return {
		userInfo: '',
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = userInfo;
		uni.setStorageSync('userInfo', JSON.stringify(userInfo));
		// let isRemember = userInfo?.rememberMe;
		// //如果是记住我，则存入local
		// if (isRemember) {
		// 	localStorage.setItem("userInfo", JSON.stringify(userInfo))
		// }
		//不然存入session
		// else {

		// }
	}
}

const actions = {
	login({
		commit
	}, userInfo) {
		commit('SET_USER_INFO', userInfo);
	},
	getUserInfo(state) {
		if (state.userInfo) {
			return state.userInfo
		} else {
			if (uni.getStorageSync('userInfo')) {
				state.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				return JSON.parse(uni.getStorageSync('userInfo'))
			}
		}
		//session中有userInfo 则取session
		// let sessionObj = sessionStorage.getItem("userInfo");
		// if (sessionObj) {
		// 	return JSON.parse(sessionObj);
		// }
		// let localObj = localStorage.getItem("userInfo");
		// if (localObj) {
		// 	return JSON.parse(localObj)
		// }
	},
	removeUserInfo({
		commit,
		state
	}) {
		commit('RESET_STATE');
		uni.setStorageSync('userInfo', '');
		//两种存储都删除
		// localStorage.removeItem("userInfo");
		// sessionStorage.removeItem("userInfo");
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
