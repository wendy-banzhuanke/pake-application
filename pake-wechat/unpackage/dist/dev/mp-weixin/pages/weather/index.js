"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const static_amapWx_130 = require("../../static/amap-wx.130.js");
const common_api_api = require("../../common/api/api.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_search2 = common_vendor.resolveComponent("up-search");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_up_icon2 + _easycom_up_search2 + _easycom_up_popup2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_search = () => "../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_search + _easycom_up_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const weatherInfoRef = common_vendor.ref({});
    const usualAddressRef = common_vendor.ref([]);
    const weatherPosition = common_vendor.ref("");
    const cityKeywordRef = common_vendor.ref("");
    const showPopup = common_vendor.ref(false);
    common_vendor.ref("");
    const searchAddressResult = common_vendor.ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const findWeatherInfoByCity = async (city) => {
      const res = await common_api_api.WeatherApi.getWeather({ city });
      weatherInfoRef.value = res[0];
      weatherPosition.value = `${weatherInfoRef.value.province} ${weatherInfoRef.value.city}`;
    };
    const findUsualAddress = async () => {
      const res = await common_api_api.WeatherApi.getUsualAddress();
      usualAddressRef.value = res;
    };
    const handleCurrentPosition = () => {
      const gaodeAMap = new static_amapWx_130.AMap.AMapWX({ key: "c2e21c6dad95d55db4ca29c319611370" });
      gaodeAMap.getRegeo({
        success: (data) => {
          console.log("myAMap=getRegeo==", data[0].name);
          weatherPosition.value = data[0].name;
          showPopup.value = false;
        },
        fail: (info) => {
          console.log(info);
        }
      });
    };
    const handleSearchConfirm = async (value) => {
      const result = await common_api_api.WeatherApi.getSearchAddress({ keyword: value });
      searchAddressResult.value = result;
    };
    common_vendor.watch(
      () => cityKeywordRef,
      async (newVal, oldVal) => {
        console.log("newVal===", newVal, oldVal);
        searchAddressResult.value = [];
      }
    );
    common_vendor.onShow(() => {
      findWeatherInfoByCity("110101");
      findUsualAddress();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.t(weatherPosition.value),
        c: common_vendor.p({
          name: "arrow-down-fill",
          color: "#000",
          size: "14"
        }),
        d: common_vendor.o(($event) => showPopup.value = true),
        e: common_vendor.t(weatherInfoRef.value.temperature),
        f: common_vendor.t(weatherInfoRef.value.weather),
        g: common_vendor.t(weatherInfoRef.value.winddirection),
        h: common_vendor.t(weatherInfoRef.value.windpower),
        i: common_vendor.t(weatherInfoRef.value.humidity),
        j: common_vendor.t(weatherInfoRef.value.reporttime),
        k: common_vendor.o(handleSearchConfirm),
        l: common_vendor.o(handleSearchConfirm),
        m: common_vendor.o(($event) => cityKeywordRef.value = $event),
        n: common_vendor.p({
          shape: "square",
          placeholder: "输入城市名称",
          bgColor: "#F2F2F2",
          modelValue: cityKeywordRef.value
        }),
        o: cityKeywordRef.value
      }, cityKeywordRef.value ? {
        p: common_vendor.f(searchAddressResult.value, (addr, index, i0) => {
          return {
            a: common_vendor.t(addr.path),
            b: index
          };
        }),
        q: common_vendor.n({
          "p-12 pl-0": searchAddressResult.value.length
        })
      } : {
        r: common_vendor.o(handleCurrentPosition),
        s: common_vendor.f(usualAddressRef.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item
          };
        })
      }, {
        t: common_vendor.o(($event) => showPopup.value = false),
        v: common_vendor.o(($event) => showPopup.value = true),
        w: common_vendor.p({
          show: showPopup.value,
          mode: "right",
          customStyle: {
            width: "100%",
            height: "100vh",
            backgroundColor: "#F5F4F5",
            left: "0px !important"
          },
          zIndex: "10070"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-37d277d7"]]);
wx.createPage(MiniProgramPage);
