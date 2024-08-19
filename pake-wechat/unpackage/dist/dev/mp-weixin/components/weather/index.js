"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  _easycom_up_button2();
}
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_up_button();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
});
wx.createComponent(_sfc_main);
