/*
 * @Author: zhangjian
 * @Date: 2024-06-11 17:55:28
 * @LastEditTime: 2024-08-01 13:56:16
 * @LastEditors: zhangjian
 * @Description: 登录模块
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { wechatAppid, wechatSecret } from '../config/index';

@Injectable()
export class LoginService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly APPID = wechatAppid;
  private readonly SECRET = wechatSecret;

  async getLogin(code: string) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.APPID}&secret=${this.SECRET}&js_code=${code}&grant_type=authorization_code`;

    // 发送 HTTP GET 请求并获得 Observable
    const response$ = await lastValueFrom(this.httpService.get(url));

    const { openid, session_key, errcode } = response$.data;

    console.log('errcode===>', errcode, response$.data);
    // // 如果微信服务端抛出错误，则将错误直接返回给前端
    if (errcode) {
      throw new HttpException(
        { ...response$ },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      const _token = this.jwtService.sign({ openid, session_key });
      return _token;
    }
  }

  async decryptPhoneNumber(
    code: string,
    encryptedData: string,
    iv: string,
  ): Promise<any> {
    const sessionResponse = await firstValueFrom(
      this.httpService.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
          appid: this.APPID,
          secret: this.SECRET,
          js_code: code,
          grant_type: 'authorization_code',
        },
      }),
    );

    const sessionKey = sessionResponse.data.session_key;
    const decipher = crypto.createDecipheriv(
      'aes-128-cbc',
      Buffer.from(sessionKey, 'base64'),
      Buffer.from(iv, 'base64'),
    );
    let decrypted = decipher.update(
      Buffer.from(encryptedData, 'base64'),
      'base64',
      'utf8',
    );
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }
}
