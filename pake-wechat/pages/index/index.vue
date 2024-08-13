<!--
 * @Author: zhangjian
 * @Date: 2019-08-22 19:41:20
 * @LastEditTime: 2024-08-01 15:51:31
 * @LastEditors: zhangjian
 * @Description: 描述
-->
<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="text-area">
			<text class="title">{{title}}11122{{ _data }}</text>
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
	onShow(() => {
		test()
		console.log("进来啦-1111--", _data.value)
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
