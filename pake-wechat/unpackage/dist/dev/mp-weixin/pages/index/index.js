"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let _data = common_vendor.ref("false==");
    function test() {
      _data.value = "hahahah2222a";
    }
    common_vendor.onShow(() => {
      test();
      console.log("进来啦-1111--", _data.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(_ctx.title),
        b: common_vendor.t(common_vendor.unref(_data))
      };
    };
  }
});
wx.createPage(_sfc_main);
