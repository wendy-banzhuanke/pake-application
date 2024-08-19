"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_api = require("../../common/api/api.js");
if (!Array) {
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  _easycom_up_popup2();
}
const _easycom_up_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (common_vendor.unref(WeatherComp) + _easycom_up_popup)();
}
const WeatherComp = () => "../../components/weather/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const weatherInfoRef = common_vendor.ref({});
    common_vendor.ref("");
    const showPopup = common_vendor.ref(false);
    const findWeatherInfoByCity = async (city) => {
      const res = await common_api_api.WeatherApi.getWeather({
        city
      });
      weatherInfoRef.value = res[0];
      console.log("==res==", res, weatherInfoRef);
    };
    common_vendor.onShow(() => {
      findWeatherInfoByCity("110101");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(weatherInfoRef.value.province),
        b: common_vendor.t(weatherInfoRef.value.city),
        c: common_vendor.o(($event) => showPopup.value = true),
        d: common_vendor.t(weatherInfoRef.value.temperature),
        e: common_vendor.t(weatherInfoRef.value.weather),
        f: common_vendor.t(weatherInfoRef.value.winddirection),
        g: common_vendor.t(weatherInfoRef.value.windpower),
        h: common_vendor.t(weatherInfoRef.value.humidity),
        i: common_vendor.t(weatherInfoRef.value.reporttime),
        j: common_vendor.o(($event) => showPopup.value = false),
        k: common_vendor.o(($event) => showPopup.value = false),
        l: common_vendor.o(($event) => showPopup.value = true),
        m: common_vendor.p({
          show: showPopup.value,
          mode: "right",
          customStyle: {
            width: "100%"
          }
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-37d277d7"]]);
wx.createPage(MiniProgramPage);
