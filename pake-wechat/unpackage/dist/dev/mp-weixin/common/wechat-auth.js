"use strict";
const common_vendor = require("./vendor.js");
const common_api_api = require("./api/api.js");
const silentAuth = () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      provider: "weixin",
      success: async (result) => {
        if (result.code) {
          const resLoginInfo = await common_api_api.LoginApi.wxLogin({ code: result.code });
          common_vendor.index.setStorageSync("access_token", resLoginInfo.token);
          resolve(result);
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
};
const mobileAuth = (params = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      provider: "weixin",
      success: async (loginRes) => {
        console.log("resLoginInfo=a===");
        if (loginRes.code) {
          const resLoginInfo = await common_api_api.LoginApi.wxMobileLogin({
            code: loginRes.code,
            encryptedData: params.encryptedData,
            iv: params.iv
          });
          console.log("resLoginInfo===", resLoginInfo);
          resolve(resLoginInfo);
        }
      },
      fail: (error) => {
      }
    });
  });
};
exports.mobileAuth = mobileAuth;
exports.silentAuth = silentAuth;
