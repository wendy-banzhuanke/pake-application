"use strict";
const common_api_request = require("./request.js");
const LoginApi = {
  wxLogin: (params = {}) => common_api_request.axios.post(`/login/getLogin`, params),
  // 微信授权登录
  wxMobileLogin: (params = {}) => common_api_request.axios.post(`/login/getWeChatMobileLogin`, params)
  // 微信手机号码授权登录
};
exports.LoginApi = LoginApi;
