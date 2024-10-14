<!--
 * @Author: zhangjian
 * @Date: 2024-08-13 17:40:11
 * @LastEditTime: 2024-10-14 17:56:58
 * @LastEditors: zhangjian
 * @Description: 天气
-->
<template>
  <view class="weather-comp">
    <image
      src="@/static/images/weather/weather-bg.png"
      mode="scaleToFill"
      class="weather-comp__bg-img"
    />
    <view class="weather-comp__content">
      <view 
        class="position-info" 
        @click="showPopup=true">
        {{ weatherPosition }} <up-icon name="arrow-down-fill" color="#000" size="14"></up-icon>
      </view>
      <view class="temperature">
        {{ weatherInfoRef.temperature }}<text class="unit">&deg;C</text>
      </view>
      <view class="winddirection">
        {{ weatherInfoRef.weather }} |  风向 {{ weatherInfoRef.winddirection }}
      </view>
      <view class="humidity">
        风力 {{ weatherInfoRef.windpower }}    湿度 {{ weatherInfoRef.humidity }}
      </view>
      <view class="update-time">数据更新{{ weatherInfoRef.reporttime }}</view>
    </view>
    <up-popup 
      :show="showPopup" 
      mode="right"  
      :customStyle="{width: '100%', height:'100vh', backgroundColor: '#F5F4F5',left: '0px !important'}"
      zIndex="10070"
      @close="showPopup=false" 
      @open="showPopup=true">
      <view class="weather-comp__popup-content">
        <up-search 
          v-model="cityKeywordRef"
          shape="square" 
          placeholder="输入城市名称"
          bgColor="#F2F2F2"
          class="search-input"
          @change="handleSearchConfirm"
          @custom="handleSearchConfirm"></up-search>
        <view v-if="cityKeywordRef" :class="['weather-comp__search-result ', {'p-12 pl-0': searchAddressResult.length}]">
          <view 
            v-for="(addr, index) in searchAddressResult" 
            :key="index"
            class="search-result-item">
            {{ addr.path }}
          </view>
        </view>
        <view v-else class="address-block">
          <view class="address-block-title">猜您使用</view>
          <view class="address-block-box">
            <text class="address-block-box-item" @click="handleCurrentPosition">定位</text>
            <text 
              v-for="item in usualAddressRef" 
              :key="item"
              class="address-block-box-item">{{ item.label }}</text>
          </view>
        </view>
      </view>
	  </up-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch} from 'vue'
import { onShow } from '@dcloudio/uni-app'
import AMap from '@/static/amap-wx.130.js'
import { WeatherApi } from "@/common/api/api";
import { IWeather, IAddressNode } from '@/types/weather'

const weatherInfoRef = ref({} as IWeather);
const usualAddressRef = ref([])
const weatherPosition = ref('' as string);
const cityKeywordRef = ref('' as string);
const showPopup = ref(false);
const keyword = ref('');
const searchAddressResult = ref([{}, {}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {}, {},{}, {}, {}] as Array<IAddressNode>);
const findWeatherInfoByCity = async (city: string) => {
  // uni.request({
  //   url: `https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=c2e21c6dad95d55db4ca29c319611370`,
  //   method: 'GET',
  //   success: (res) => {
  //     console.log("res===", res)
  //   }
  // }) 2 0.3 1000 3.2 1.8 5  
  const res = await WeatherApi.getWeather({ city })
  weatherInfoRef.value = res[0]
  weatherPosition.value = `${weatherInfoRef.value.province} ${weatherInfoRef.value.city}`
}

const findUsualAddress = async () => {
  const res = await WeatherApi.getUsualAddress()
  usualAddressRef.value = res
}

const handleCurrentPosition = () => {
  const gaodeAMap = new AMap.AMapWX({key:'c2e21c6dad95d55db4ca29c319611370'});
  //获取地址信息
  gaodeAMap.getRegeo({
    success: (data) => {
      console.log("myAMap=getRegeo==", data[0].name)
      weatherPosition.value = data[0].name
      showPopup.value = false
      //成功回调
    },
    fail: (info) => {
      //失败回调
      console.log(info)
    }
  })
  // //获取天气
  // gaodeAMap.getWeather({
  //   success: function(data){
  //     console.log("myAMap=getWeather==", data)
  //     //成功回调
  //   },
  //   fail: function(info){
  //     //失败回调
  //     console.log(info)
  //   }
  // })
}

const handleSearchConfirm = async (value) => {
  const result = await WeatherApi.getSearchAddress({keyword: value})
  searchAddressResult.value = result
}

watch(() => cityKeywordRef,
  async (newVal, oldVal) => {
    console.log("newVal===", newVal, oldVal)
    searchAddressResult.value = []
  }
)

onShow(()=> {
  findWeatherInfoByCity('110101')
  findUsualAddress()
})


</script>

<style lang="scss" scoped>
.weather-comp {
  width: 100vw;
  height: 100vh;
  position: relative;
  &__search-result {
    border-top: 1px solid #eee;
    // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-top: none;
    .search-result-item {
      font-size: 28rpx;
      line-height: 60rpx;
      color: #bbb;
      border-bottom: 1px solid #F5F4F5;
    }
  }
  &__bg-img {
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .5;
    background-color: rgba($color: #000000, $alpha: .3);
  }
  &__content {
    z-index: 100;
    padding: 32rpx;
    .position-info {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .temperature {
      font-size: 120px;
      font-weight: 500;
      color: #333;
      text-align: center;
      padding: 32rpx 0;
      .unit {
        font-size: 80px;
        font-weight: 400;
        color: #444;
      }
    }
    .winddirection {
      text-align: center;
      font-weight: 500;
    }
    .humidity {
      text-align: center;
      font-weight: 400;
      margin-top: 32rpx;
    }
    .update-time {
      position: absolute;
      bottom: 32rpx;
      right: 32rpx;
      color: #666;
    }
  }
  &__popup-content {
    width: 100vw;
    padding: 32rpx;
    background-color: #fff;
    box-sizing: border-box;
    .address-block {
      margin: 32rpx 0;
      &-title {
        font-size: 32rpx;
        font-weight: 500;
        margin: 32rpx 0;
        color: #666;
      }
      &-box {
        display: flex;
        flex-wrap: wrap;
        &-item {
          background-color: #F5F4F5;
          border-radius: 8rpx;
          padding: 8rpx 32rpx;
          font-size: 28rpx;
          color: #999;
          margin-right: 16rpx;
          margin-bottom: 16rpx;
        }
      }
    }
  }
  .p-12 {
    padding: 24rpx;
  }
  .pl-0 {
    padding-left: 0rpx;
  }
}
</style>