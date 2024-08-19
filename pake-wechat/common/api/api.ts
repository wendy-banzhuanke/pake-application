/*
 * @Author: zhangjian
 * @Date: 2024-06-14 09:39:15
 * @LastEditTime: 2024-08-13 17:49:32
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
export const WeatherApi = {
  getWeather: (params={}) => axios.get(`/weather/getWeather`, params), // 获取天气
}