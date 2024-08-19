<!--
 * @Author: zhangjian
 * @Date: 2024-06-24 01:47:12
 * @LastEditTime: 2024-08-14 15:19:19
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

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-plus/index.scss";
</style>
