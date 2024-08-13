"use strict";
const common_vendor = require("../vendor.js");
const common_api_config = require("./config.js");
const { host } = common_api_config.apiEnvHost();
function toType(obj) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function filterNull(o) {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}
const interceptorsRequest = (method, url, data, header = {}) => {
  if (data && Object.keys(data).length) {
    data = filterNull(data);
  }
  let _params = { method, url, data, header };
  return _params;
};
class Request {
  getHeaders(options = {}) {
    const defaultHeaders = {
      token: common_vendor.index.getStorageSync("access_token") || "",
      access_token: common_vendor.index.getStorageSync("access_token") || "",
      "p": 1,
      "c": 4,
      "Content-Type": "application/json",
      "v": "1.0.0"
    };
    return defaultHeaders;
  }
  /**
   * @params url         { string }   @default => ''   [接口地址，统一在 api 文件中]
   * @params data/params { object }   @default => {}   [发送数据]
   * @params header      { object }   @default => {}   [请求 Header 配置]
   */
  get(url = "", data = {}, header = {}) {
    return this.request({
      method: "GET",
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
      method: "POST",
      url,
      data,
      header
    });
  }
  request(options = {}) {
    let _params = interceptorsRequest(options.method, options.url, options.data, options.header);
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: host + _params.url,
        method: _params.method,
        header: { ...this.getHeaders(), ..._params.header },
        data: _params.data || {},
        success: (res) => {
          if (res.statusCode == 200) {
            console.log("res===>", res);
            if (res.data.code && res.data.code !== "000000") {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                icon: "none",
                title: res.data.msg,
                duration: 2e3
              });
              if (["000401", "001103", "000501", "000502"].includes(res.data.code)) {
                common_vendor.index.redirectTo({
                  url: "/pages/login/index"
                });
              }
              reject(res.data);
            }
            return resolve(res.data.data);
          } else {
            console.log("res===", res);
            reject(res);
            return null;
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "网络错误，请稍后再试",
            duration: 2e3
          });
          reject(err);
          return null;
        }
      });
    });
  }
}
const axios = new Request();
exports.axios = axios;
