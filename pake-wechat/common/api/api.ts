/*
 * @Author: zhangjian
 * @Date: 2024-06-14 09:39:15
 * @LastEditTime: 2024-10-11 17:57:53
 * @LastEditors: zhangjian
 * @Description: 接口请求
 */
import axios from './request'

/** 登录 **/
export const LoginApi = {
  wxLogin: (params={}) => axios.post(`/login/getLogin`, params), // 微信授权登录
  wxMobileLogin: (params={}) => axios.post(`/login/getWeChatMobileLogin`, params), // 微信手机号码授权登录
};

/** 退出登录 */
export const LogoutApi = {
  logout: () => axios.post(`/logout`)
}

/** 天气 */
export const WeatherApi = {
  getWeather: (params={}) => axios.post(`/weather/getWeatherInfo`, params), // 获取天气
  getUsualAddress: () => axios.post(`/weather/getUsualAddress`), // 获取常用地址
  getSearchAddress: (params={}) => axios.post(`/weather/getSearchAddress`, params), // 模糊搜索
}