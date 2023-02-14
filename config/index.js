let prefix = ""
let filePrefix = ""
if (process.env.NODE_ENV === 'development') {
	// prefix = "http://10.1.8.27:5300/webapi" //小马哥
	// http://10.1.8.27:5300
	// filePrefix = "http://10.1.8.27:5300/webapi"
} else {
	prefix = "/webapi"
	// console.log('生产环境')
}

//一些基础信息的配置
const configInfo = {	
	// baseUrl
	baseUrl: prefix,
	//文件服务器的baseUrl
	fileBaseUrl: filePrefix,
	//路由白名单
	whiteList: [''],
	// 不需要请求头
	anonymityUrl: ['/auth/oauth/token'],
	//无需处理 Result 包住的返回值的接口地址, 登录接口没有包外层的对象，直接返回的登录信息
	noDoResultUrl: ['/auth/oauth/token'],
	// 是否需要打印日志
	openLog: false,
	// 版本号
	version: '1.0.0'
}


export default configInfo;
