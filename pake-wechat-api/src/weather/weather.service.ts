
import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios';
import { amapKey } from '../config/index'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherInfo(city: number){
    const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${amapKey}`

    const response$ = await lastValueFrom(this.httpService.get(weatherUrl));

    return response$.data
  }
}