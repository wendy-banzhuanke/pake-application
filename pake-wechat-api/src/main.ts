/*
 * @Author: zhangjian
 * @Date: 2024-06-06 15:51:53
 * @LastEditTime: 2024-06-20 14:40:23
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
