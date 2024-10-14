/*
 * @Author: zhangjian
 * @Date: 2024-08-19 14:12:35
 * @LastEditTime: 2024-10-12 14:52:11
 * @LastEditors: zhangjian
 * @Description: 描述
 */
export interface IWeather {
  province: string; // 省份名
  city: string; // 城市名
  adcode: string; // 区域编码
  weather: string; // 天气现象（汉字描述）
  temperature: string; // 实时气温，单位：摄氏度
  winddirection: string; // 风向描述
  windpower: string; // 风力级别，单位：级
  humidity: string; // 空气湿度
  reporttime: string; // 数据发布的时间
}

export interface IAddressNode {
  id: number,
  name: string,
  path: string,
}