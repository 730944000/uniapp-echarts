<script>
	export default {
		created() {
		},
		onLaunch: function() {
			this.autoUpdate()
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			autoUpdate: function() {
				const self = this
				// 获取小程序更新机制兼容
				if (wx.canIUse('getUpdateManager')) {
					const updateManager = wx.getUpdateManager()
					//1. 检查小程序是否有新版本发布
					updateManager.onCheckForUpdate(function(res) {
						// 请求完新版本信息的回调
						if (res.hasUpdate) {
							//2. 小程序有新版本，则静默下载新版本，做好更新准备
							updateManager.onUpdateReady(function() {
								wx.showModal({
			  				title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										if (res.confirm) {
											//3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
											updateManager.applyUpdate()
										} else if (res.cancel) {
											//如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
											wx.showModal({
												title: '温馨提示~',
												content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
												success: function(res) {
													self.autoUpdate()
													return;
													//第二次提示后，强制更新
													if (res.confirm) {
														// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
														updateManager
															.applyUpdate()
													} else if (res.cancel) {
														//重新回到版本更新提示
														self.autoUpdate()
													}
												}
											})
										}
									}
								})
							})
							updateManager.onUpdateFailed(function() {
								// 新的版本下载失败
								wx.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
								})
							})
						}
					})
				} else {
					// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					wx.showModal({
						title: '提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					})
				}
			},
			/**
			 * 下载小程序新版本并重启应用
			 */
			downLoadAndUpdate: function(updateManager) {
				var self = this
				wx.showLoading();
				//静默下载更新小程序新版本
				updateManager.onUpdateReady(function() {
			 	wx.hideLoading()
					//新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate()
				})
			 updateManager.onUpdateFailed(function() {
					// 新的版本下载失败
					wx.showModal({
						title: '已经有新版本了哟~',
						content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
					})
				})
			},
		}
	}
</script>

<style lang="scss">

	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
    //模块左右滑动布局、6宫格弹性布局
    @import '@/style/content.scss';

	
	/deep/ .uni-picker-container .uni-picker-action.uni-picker-action-confirm{
		background-color:#1890ff !important;
	}
	
	::-webkit-scrollbar {
	  display: none;
	}
		// 设置整个项目的背景色
	page {
		background: #FFFFFF;
		height: 100%;
	}
	image {
		display: block;
	}

	/* #endif */
</style>
