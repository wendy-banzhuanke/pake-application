/*
 * @Author: zhangjian
 * @Date: 2024-06-05 19:47:09
 * @LastEditTime: 2024-06-24 17:26:07
 * @LastEditors: zhangjian
 * @Description: 微信授权方法
 */

import { LoginApi } from "./api/api";

export const silentAuth = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: async (result) => {
        if (result.code) {
          const resLoginInfo = await LoginApi.wxLogin({ code: result.code });
          uni.setStorageSync("access_token", resLoginInfo.token);
          resolve(result);
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};

export const mobileAuth = (params={}) => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: async (loginRes) => {
        console.log("resLoginInfo=a===");
        if (loginRes.code) {
          const resLoginInfo = await LoginApi.wxMobileLogin({
            code: loginRes.code,
            encryptedData: params.encryptedData,
            iv: params.iv,
          });
          console.log("resLoginInfo===", resLoginInfo)
          resolve(resLoginInfo)
        }
      },
      fail: (error) => {},
    });
  });
};
