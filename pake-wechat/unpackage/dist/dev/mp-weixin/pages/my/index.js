"use strict";
const common_vendor = require("../../common/vendor.js");
const common_wechatAuth = require("../../common/wechat-auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    function handleMobileLogin(e) {
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        const { encryptedData, iv } = e.detail;
        console.log("e.detail===", e.detail);
        common_wechatAuth.mobileAuth({ encryptedData, iv });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleMobileLogin)
      };
    };
  }
});
wx.createPage(_sfc_main);
