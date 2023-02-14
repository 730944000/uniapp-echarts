export default class ToastUtil {

	static show = (msg) => {
		uni.showToast({
			title: msg ? msg : "",
			position: 'bottom',
			icon: 'none'
		})
	};

	static showLong = (message) => {

	};

	static showLoading = (msg) => {
		uni.showLoading({
			title: msg&&msg!='undefined' ? msg : "",
			mask: true
		});
	};

	static hideLoading = () => {
		uni.hideLoading();
	};
}
