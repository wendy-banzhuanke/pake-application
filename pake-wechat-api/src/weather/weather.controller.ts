/*
 * @Author: zhangjian
 * @Date: 2024-08-14 15:45:56
 * @LastEditTime: 2024-08-19 10:55:51
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('getWeatherInfo')
  @HttpCode(200)
  async getWeatherInfoByCity(@Body('city') city: string) {
    const cityCode: number = Number(city);
    console.log("cityCode====",city,  cityCode)
    const _weatherInfo = await this.weatherService.getWeatherInfo(cityCode);
    return { code: '000000', success: true, data: _weatherInfo.lives };
  }
}
