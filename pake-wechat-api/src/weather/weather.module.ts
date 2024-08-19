/*
 * @Author: zhangjian
 * @Date: 2024-08-14 17:20:38
 * @LastEditTime: 2024-08-19 10:23:35
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
