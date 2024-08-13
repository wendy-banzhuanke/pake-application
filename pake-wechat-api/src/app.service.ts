/*
 * @Author: zhangjian
 * @Date: 2024-06-06 15:51:53
 * @LastEditTime: 2024-06-11 17:57:07
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
