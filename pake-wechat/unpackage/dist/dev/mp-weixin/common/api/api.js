"use strict";
const common_api_request = require("./request.js");
const LoginApi = {
  wxLogin: (params = {}) => common_api_request.axios.post(`/login/getLogin`, params),
  // 微信授权登录
  wxMobileLogin: (params = {}) => common_api_request.axios.post(`/login/getWeChatMobileLogin`, params)
  // 微信手机号码授权登录
};
const WeatherApi = {
  getWeather: (params = {}) => common_api_request.axios.post(`/weather/getWeatherInfo`, params),
  // 获取天气
  getUsualAddress: () => common_api_request.axios.post(`/weather/getUsualAddress`),
  // 获取常用地址
  getSearchAddress: (params = {}) => common_api_request.axios.post(`/weather/getSearchAddress`, params)
  // 模糊搜索
};
exports.LoginApi = LoginApi;
exports.WeatherApi = WeatherApi;
