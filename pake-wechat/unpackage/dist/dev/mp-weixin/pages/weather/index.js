"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(WeatherComp)();
}
const WeatherComp = () => "../../components/weather/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const findWeatherInfoByCity = async (city) => {
      common_vendor.index.request({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=c2e21c6dad95d55db4ca29c319611370`,
        method: "GET",
        success: (res) => {
          console.log("res===", res);
        }
      });
    };
    findWeatherInfoByCity();
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-37d277d7"]]);
wx.createPage(MiniProgramPage);
