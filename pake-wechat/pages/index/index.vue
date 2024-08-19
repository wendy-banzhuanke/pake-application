<!--
 * @Author: zhangjian
 * @Date: 2024-08-01 19:41:20
 * @LastEditTime: 2024-08-19 15:15:45
 * @LastEditors: zhangjian
 * @Description: 首页
-->
<template>
	<view class="content">
		<view class="text-area">
			<text class="title" @click="handleJump('weather/index')">天气</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'

	let _data = ref('false==')

	function test() {
		_data.value = 'hahahah2222a'
	}

	function handleJump(url: string) {
		uni.navigateTo({
			url: `/pages/${url}`
		})
	}

	onShow(() => {
		test()
	})
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
