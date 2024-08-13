<!--
 * @Author: zhangjian
 * @Date: 2024-06-05 16:36:04
 * @LastEditTime: 2024-06-24 17:26:18
 * @LastEditors: zhangjian
 * @Description: 个人中心
-->
<template>
  <view>
    我的
    <button 
      open-type="getPhoneNumber"
      @getphonenumber="handleMobileLogin">获取手机号</button>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { mobileAuth } from '@/common/wechat-auth';
  function handleMobileLogin(e: Event) {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      // 用户同意授权
      const { encryptedData, iv } = e.detail;
      console.log("e.detail===", e.detail)
      mobileAuth({encryptedData, iv})
    }
  }
</script>