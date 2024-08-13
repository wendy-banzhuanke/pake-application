/*
 * @Author: zhangjian
 * @Date: 2024-06-06 15:51:53
 * @LastEditTime: 2024-06-13 11:38:53
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './wechat/login.module'; // 引入 Wechat 模块
// import { LoginService } from './wechat/login.service';

@Module({
  imports: [LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
