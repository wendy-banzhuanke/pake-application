<!--
 * @Author: zhangjian
 * @Date: 2024-06-24 01:47:12
 * @LastEditTime: 2024-06-24 16:00:44
 * @LastEditors: zhangjian
 * @Description: 入口
-->
<script>
	import { silentAuth } from './common/wechat-auth'
	export default {
		onLaunch: function() {
			console.log('App Launch');
			const access_token = uni.getStorageSync('access_token')
			if(!access_token) {
				silentAuth();
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
