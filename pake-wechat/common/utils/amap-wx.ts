/*
 * @Author: zhangjian
 * @Date: 2024-10-10 14:47:24
 * @LastEditTime: 2024-10-11 09:28:37
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import AMap from '@/static/amap-wx.130.js'
// const AMap = require('@/static/amap-wx.130.js');

// declare module '@/static/amap-wx.130.js' {
//   export default class AMap {
//     // 根据实际 API 定义属性和方法
//     constructor(): void;
//     init(mapId: string, options: any): void;
//     // 其他方法...
//   }
// }

export function gaodeAMap() {
  return new AMap.AMapWX({key:'c2e21c6dad95d55db4ca29c319611370'});
}