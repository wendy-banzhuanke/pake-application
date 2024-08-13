/*
 * @Author: zhangjian
 * @Date: 2024-04-19 11:22:00
 * @LastEditTime: 2024-06-24 15:32:49
 * @LastEditors: zhangjian
 * @Description: 环境及域名配置项
 */

export let currentEnv = 'test'  // 测试包
// export let currentEnv = 'pro' // 提审包
// export let currentEnv = 'dev' // 开发环境

let _apiEnv = currentEnv

// 配置API接口地址
export const apiEnvHost = () => {
  let realDomain:any = {
    host: '',     			// 接口域名
  }

  switch (_apiEnv) {
    case 'dev': 
      realDomain = {
        host: 'https://48ebdb8b.r3.cpolar.cn'//'https://localhost:3000/',
      }
      break;
    case 'test':
      realDomain = {
        host: 'https://48ebdb8b.r3.cpolar.cn',//'https://localhost:3000/',
      }
      break;
    case 'pro':
      realDomain = {
        host: 'https://48ebdb8b.r3.cpolar.cn',
      }
      break;
  }
  return realDomain
}