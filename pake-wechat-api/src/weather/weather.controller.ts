
import {
  Controller,
  Post,
  Body,
  Param
} from '@nestjs/common';
import { WeatherService } from './weather.service'

@Controller('/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  
  @Post('getWeatherInfo')
  async getWeatherInfoByCity(@Body('city') city: string) {
    // TODO
    console.log("city====", city)
    const _weatherInfo = await this.weatherService.getWeatherInfo(110101)
    console.log("weatherService====", _weatherInfo)
    return { code: '000000', success: true, data: _weatherInfo.lives}
  }
}