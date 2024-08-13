/*
 * @Author: zhangjian
 * @Date: 2024-04-19 10:46:35
 * @LastEditTime: 2024-06-24 15:48:59
 * @LastEditors: zhangjian
 * @Description: 公共请求方法
 */
    
import { apiEnvHost } from './config'
// import {Arms} from '@/util/monitor.js';
const { host } = apiEnvHost()

function toType(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function filterNull(o) {
	for (let key in o) {
		if (o[key] === null) {
			delete o[key];
		}
		if (toType(o[key]) === 'string') {
			o[key] = o[key].trim();
		} else if (toType(o[key]) === 'object') {
			o[key] = filterNull(o[key]);
		} else if (toType(o[key]) === 'array') {
			o[key] = filterNull(o[key]);
		}
	}
	return o;
}

const interceptorsRequest = (method: string, url: string, data: any, header = {}) => {
    if (data && Object.keys(data).length) {
			data = filterNull(data);
    }
    let _params = { method, url, data, header };
    return _params;
};

class Request {
	getHeaders(options = {}){
		// header头参数设置
		const defaultHeaders = {
			token: uni.getStorageSync('access_token') || '',
			access_token: uni.getStorageSync('access_token') || '',
			'p': 1,
			'c': 4,
			'Content-Type': 'application/json',
			'v': '1.0.0',
		}
		return defaultHeaders
	}
	
	/**
	 * @params url         { string }   @default => ''   [接口地址，统一在 api 文件中]
	 * @params data/params { object }   @default => {}   [发送数据]
	 * @params header      { object }   @default => {}   [请求 Header 配置]
	 */
	get(url = "", data = {}, header = {}) {
		return this.request({
			method: 'GET',
			url,
			data,
			header
		});
	}

	/**
	 * @params url         { string }   @default => ''   [接口地址，统一在 api 文件中]
	 * @params data/params { object }   @default => {}   [发送数据]
	 * @params header      { object }   @default => {}   [请求 Header 配置]
	 */
	post(url = "", data = {}, header = {}) {
		return this.request({
			method: 'POST',
			url,
			data,
			header
		});
	}
	
	request(options = {}) {
		let _params = interceptorsRequest(options.method, options.url, options.data, options.header);
		
		return new Promise((resolve, reject) => {
			uni.request({
				url: host + _params.url,
				method: _params.method,
				header: {...this.getHeaders(), ..._params.header},
				data: _params.data || {},
				success: (res) => {
					if (res.statusCode == 200) {
						console.log("res===>", res)
						if(res.data.code && res.data.code !== '000000') {
							uni.hideLoading();
							
							uni.showToast({
								icon: 'none',
								title: res.data.msg,
								duration: 2000,
							});

							/**
							 * 拦截以下code码跳转到登录页，进行重新授权登录；
							 * 000401: 未登录或token过期
							 * 001103: 帐号已在其他地方退出，请重新登录
							 * 000501: 登录异常
							 * 000502: 权限异常
							 */
							if(['000401', '001103', '000501', '000502'].includes(res.data.code)) {
								uni.redirectTo({
									url: '/pages/login/index'
								});
							}
							reject(res.data);
						} 
						return resolve(res.data.data);
					} else {
						console.log("res===", res)
						reject(res);
						return null
					}
				},
				fail: err => {
					// 超时等
					uni.showToast({
						icon: 'none',
						title: '网络错误，请稍后再试',
						duration: 2000,
					});
					reject(err);
					return null
				}
			});
		});
	} 
}

export default new Request();