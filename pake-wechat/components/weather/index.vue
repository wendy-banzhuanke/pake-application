<!--
 * @Author: zhangjian
 * @Date: 2024-08-13 17:40:11
 * @LastEditTime: 2024-08-14 15:28:44
 * @LastEditors: zhangjian
 * @Description: 实时获取天气组件，对接高德
-->
<template>
  <view class="weather-comp">
    <view>输入位置</view>
    <view>选择城市</view>
    <view class="container">天气显示</view>
    <up-button />
  </view>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue'


</script>

<style lang="scss">
.weather-comp {
  width: 100%;
}
</style>