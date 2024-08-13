/*
 * @Author: zhangjian
 * @Date: 2024-06-13 11:47:44
 * @LastEditTime: 2024-06-24 14:47:40
 * @LastEditors: zhangjian
 * @Description: 登录模块
 */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: '2I*5f5OE9tlGIbg*3Q*C', // 确保在这里提供一个密钥
      signOptions: { expiresIn: '60s' }, // 可选：设置令牌过期时间
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
