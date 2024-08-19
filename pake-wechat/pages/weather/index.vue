<!--
 * @Author: zhangjian
 * @Date: 2024-08-13 17:40:11
 * @LastEditTime: 2024-08-19 15:13:39
 * @LastEditors: zhangjian
 * @Description: 天气
-->
<template>
  <view class="weather-comp">
    <view class="position-info" @click="showPopup=true">
      {{ weatherInfoRef.province }}&nbsp;&nbsp;{{ weatherInfoRef.city }}
    </view>
    <view class="temperature">
      {{ weatherInfoRef.temperature }}
    </view>
    <view>
      {{ weatherInfoRef.weather }} &nbsp;&nbsp;|&nbsp;&nbsp; 风向 {{ weatherInfoRef.winddirection }}
    </view>
    <view>
      风力{{ weatherInfoRef.windpower }}&nbsp;&nbsp;&nbsp;&nbsp;湿度{{ weatherInfoRef.humidity }}
    </view>
    <view>数据更新{{ weatherInfoRef.reporttime }}</view>
    <weather-comp />
    <up-popup 
      :show="showPopup" 
      mode="right"  
      :customStyle="{width: '100%'}"
      @close="showPopup=false" 
      @open="showPopup=true">
      <view>
        <text @click="showPopup=false">TODO:天气搜索，定位，选择城市</text>
      </view>
	  </up-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { WeatherApi } from "@/common/api/api";
import WeatherComp from '@/components/weather/index'
import { IWeather } from '@/types/weather'

const weatherInfoRef = ref({} as IWeather);
const cityKeywordRef = ref(''); //cityKeyword
const showPopup = ref(false);
const findWeatherInfoByCity = async (city: string) => {
  // uni.request({
  //   url: `https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=c2e21c6dad95d55db4ca29c319611370`,
  //   method: 'GET',
  //   success: (res) => {
  //     console.log("res===", res)
  //   }
  // })
  const res = await WeatherApi.getWeather({
    city
  })
  weatherInfoRef.value = res[0]
  console.log("==res==",res , weatherInfoRef)
}

onShow(()=> {
  findWeatherInfoByCity('110101')
})

</script>

<style lang="scss" scoped>
.weather-comp {
  width: 100%;
}
</style>