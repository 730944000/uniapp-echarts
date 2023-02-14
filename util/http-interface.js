import ToastUtil from "@/util/toast-util.js"
import configInfo from "@/config/index.js"
import store from "@/store/index.js"

export default {
	config: {
		baseUrl: configInfo.baseUrl,
		header: {
			'Content-Type': 'application/json',
			"charset": "utf8"
		},
		method: "GET",
		dataType: "json",
		responseType: "text"
	},
	interceptor: {
		request: null,
		response: null
	},
	async request(options) {
		if (!options) {
			options = {}
		}
		let obj = {};
		let token = ''
		const {
			userInfo
		} = store.state.user
		if (userInfo) {
			token = userInfo
		} else if(uni.getStorageSync('userInfo')){
			token=JSON.parse(uni.getStorageSync('userInfo'));
		}else {
			token = await store.dispatch('user/getUserInfo');
		}
		obj['Authorization'] = 'Bearer ' + token
		//如果当前登录接口存在匿名登录数组中，则不需要token
		// if (uni.getStorageSync('userInfo')) {

		// } else {
		// 	//设置默认token
		// 	obj['Authorization'] = 'Basic ' + "bG9vbmdhaXJfd2ViOmxvb25nYWly";
		// }

		options.dataType = options.type || this.config.dataType
		options.responseType = options.responseType || this.config.responseType

		if (options.apiType && options.apiType == 'file') {
			options.url = configInfo.fileBaseUrl + options.url
		} else if (options.apiType && options.apiType == 'user') {
			options.url = configInfo.userInfoUrl + options.url
		} else {
			options.url = this.config.baseUrl + options.url
		}

		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.header = Object.assign({}, options.header, obj)
		if(options.apiType!='pre'){
			ToastUtil.showLoading('加载中...');
		}
		return new Promise((resolve, reject) => {
			let _config = null
			options.complete = (response) => {
				if(options.apiType!='pre'){
						ToastUtil.hideLoading()
				}
				let statusCode = response.statusCode
				response.config = _config
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				//通过配置来判断是否打印日志
				if (configInfo.openLog) {
					ResultLog(response)
				}
				if (!statusCode) {
					reject(commonErr(response))
				}

				switch (statusCode) {
					case 200: //成功
						let {
							data
						} = response;
						const ErrorCode = data.ErrorCode;
						if (typeof ErrorCode === "undefined") {
							if (configInfo.noDoResultUrl.indexOf(options.url) === -1) {
								resolve(response.data);
								return;
							}
							resolve(response);
						} else {
							let message = ''
							if (data.hasOwnProperty("Message")) {
								message = data.Message
							}
							switch (ErrorCode) {
								case 0:
									resolve(data.Result);
									break;
								case 200:
									resolve(data.Result);
									break;
								case 1000:
									store.dispatch('user/removeUserInfo');
									uni.reLaunch({
										url: "/pages/auth/auth"
									})
									break;
								case 500:
									ToastUtil.show(message ?? "服务器异常")
									reject(message)
									break;
								default:
									if (message == 'undefined') {
										message = '无权限，请登录'
									}
									ToastUtil.show(message ?? "未知错误，请稍后再试")
									reject(message)
									break;
							}
						}
						break;
					case 401:
						ToastUtil.show('请重新登录')
						store.dispatch('user/removeUserInfo');
						uni.reLaunch({
							url: "/pages/login/login"
						})
						break;
					case 404:
						ToastUtil.show('接口路径不对')
						break;
					default:
						ToastUtil.show('接口错误')
						break;
				}
			}
			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			wx.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}

/**
 * 响应接口日志记录
 */
function ResultLog(res) {
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + res.config.requestId + "】 请求地址：" + res.config.url)
		if (res.config.data) {
			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
}

/**
 * 接口错误统一错误处理
 * @param {Object} Result
 */
function commonErr(Result) {
	let err_msg = "未知错误，请稍后再试"
	if (Result.hasOwnProperty("statusCode")) {
		let statusCode = Result.statusCode;
		if (statusCode == 401) {
			err_msg = "登录失效，请重新登录"
		} else if (Result.data.hasOwnProperty("Message")) {
			const message = Result.data.Message;
			if (message && message[0]) {
				err_msg = message[0]
			}
		}
	} else if (Result.hasOwnProperty("errMsg")) {
		err_msg = Result.errMsg
	} else if (Result.hasOwnProperty("Message")) {
		err_msg = Result.Message
	}
	ToastUtil.show(err_msg)
	return err_msg
}
