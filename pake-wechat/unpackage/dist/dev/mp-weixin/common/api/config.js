"use strict";
let currentEnv = "test";
let _apiEnv = currentEnv;
const apiEnvHost = () => {
  let realDomain = {
    host: ""
    // 接口域名
  };
  switch (_apiEnv) {
    case "dev":
      realDomain = {
        host: "https://575f2c8a.r8.cpolar.cn"
        //'https://localhost:3000/',
      };
      break;
    case "test":
      realDomain = {
        host: "https://575f2c8a.r8.cpolar.cn"
        //'https://localhost:3000/',
      };
      break;
    case "pro":
      realDomain = {
        host: "https://575f2c8a.r8.cpolar.cn"
      };
      break;
  }
  return realDomain;
};
exports.apiEnvHost = apiEnvHost;
