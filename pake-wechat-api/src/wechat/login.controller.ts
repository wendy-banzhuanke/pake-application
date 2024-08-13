/*
 * @Author: zhangjian
 * @Date: 2024-06-11 17:48:09
 * @LastEditTime: 2024-06-24 17:15:13
 * @LastEditors: zhangjian
 * @Description: 微信登录controller
 */
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('getLogin')
  @HttpCode(200)
  async getWeChatLogin(@Body('code') code: string): Promise<any> {
    const _token = await this.loginService.getLogin(code);
    console.log('token--: ', _token);
    return { code: '000000', data: { token: _token } };
  }

  @Post('getWeChatMobileLogin')
  @HttpCode(200)
  async getWeChatMobileLogin(
    @Body() decryptDto: { code: string; encryptedData: string; iv: string },
  ): Promise<any> {
    try {
      const result = await this.loginService.decryptPhoneNumber(
        decryptDto.code,
        decryptDto.encryptedData,
        decryptDto.iv,
      );
      return { phoneNumber: result.phoneNumber };
    } catch (error) {
      throw new HttpException('解密失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
