/*
 * @Author: zhangjian
 * @Date: 2024-08-14 15:45:56
 * @LastEditTime: 2024-10-12 15:18:59
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { WeatherService } from './weather.service';

@Controller('/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('getWeatherInfo')
  @HttpCode(200)
  async getWeatherInfoByCity(@Body('city') city: string) {
    const cityCode: number = Number(city);
    console.log('cityCode====', city, cityCode);
    const _weatherInfo = await this.weatherService.getWeatherInfo(cityCode);
    return { code: '000000', success: true, data: _weatherInfo.lives };
  }

  @Get('generateAddressData')
  generateAddressData() {
    const filePath = path.join(
      process.cwd(),
      'src',
      'assets',
      'AMap_adcode_citycode.xlsx',
    );
    const distFilePath = path.join(
      process.cwd(),
      'dist',
      'assets',
      'AMap_adcode_citycode.xlsx',
    );
    const finalFilePath = fs.existsSync(distFilePath) ? distFilePath : filePath;

    this.weatherService.generateAddressData(finalFilePath);
    return {
      message: '生成地址数据成功',
      code: '000000',
    };
  }

  @Post('getUsualAddress')
  @HttpCode(200)
  getUsualAddress() {
    const usualData = this.weatherService.getUsualAddress();
    console.log('usualData===', usualData);
    return {
      message: '获取常用地址成功',
      data: usualData,
      code: '000000',
    };
  }

  @Post('getSearchAddress')
  @HttpCode(200)
  getSearchAddress(@Body('keyword') keyword: string) {
    console.log('keyword===', keyword);
    const searchData = this.weatherService.getSearchAddress(keyword);
    console.log('flatAddresses=searchData==>', searchData);
    return {
      message: '获取搜索地址成功',
      data: searchData,
      code: '000000',
    };
  }
}
