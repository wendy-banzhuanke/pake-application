"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_wechatAuth = require("./common/wechat-auth.js");
if (!Math) {
  "./pages/weather/index.js";
  "./pages/my/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    const access_token = common_vendor.index.getStorageSync("access_token");
    if (!access_token) {
      common_wechatAuth.silentAuth();
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
