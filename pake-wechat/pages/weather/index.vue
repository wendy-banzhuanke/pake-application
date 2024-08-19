<!--
 * @Author: zhangjian
 * @Date: 2024-08-13 17:40:11
 * @LastEditTime: 2024-08-14 15:42:23
 * @LastEditors: zhangjian
 * @Description: 天气页面
-->
<template>
  <view class="weather-comp">
    <view>输入位置</view>
    <view>选择城市</view>
    <view class="container">天气显示</view>
    <weather-comp />
  </view>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue'
import { WeatherApi } from "./api/api";
import WeatherComp from '@/components/weather/index'

const findWeatherInfoByCity = async (city: string) => {
  uni.request({
    url: `https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=c2e21c6dad95d55db4ca29c319611370`,
    method: 'GET',
    success: (res) => {
      console.log("res===", res)
    }
  })
  // const res = await WeatherApi.getWeather({
  //   city
  // })
  // console.log(res)
}

findWeatherInfoByCity()

</script>

<style lang="scss" scoped>
.weather-comp {
  width: 100%;
}
</style>