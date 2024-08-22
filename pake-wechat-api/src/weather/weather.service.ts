/*
 * @Author: zhangjian
 * @Date: 2024-08-14 16:26:34
 * @LastEditTime: 2024-08-22 16:32:19
 * @LastEditors: zhangjian
 * @Description: 描述
 */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { amapKey } from '../config/index';
import { addressTree } from '../assets/address';

interface TreeNode {
  label: string;
  value: string;
  children?: TreeNode[];
}

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherInfo(city: number) {
    // https://lbs.amap.com/api/webservice/guide/api/weatherinfo#t1
    const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${amapKey}`;

    const response$ = await lastValueFrom(this.httpService.get(weatherUrl));

    return response$.data;
  }

  generateAddressData(filePath: string) {
    const addressCodeBook = xlsx.readFile(filePath);
    const sheetName = addressCodeBook.SheetNames[0];
    const addressCodeSheet = addressCodeBook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(addressCodeSheet);

    const addressData: TreeNode[] = [];

    let currentProvinceNode: TreeNode = null;
    let currentCityNode: TreeNode = null;

    jsonData.forEach((item: any) => {
      const { name, adcode } = item;
      const adcodeStr = String(adcode);
      if (adcodeStr.endsWith('0000')) {
        currentProvinceNode = { label: name, value: adcodeStr, children: [] };
        addressData.push(currentProvinceNode);
      } else if (adcodeStr.endsWith('00')) {
        currentCityNode = { label: name, value: adcodeStr, children: [] };
        if (currentProvinceNode) {
          currentProvinceNode.children.push(currentCityNode);
        }
      } else {
        const districtNode: TreeNode = { label: name, value: adcodeStr };
        if (currentCityNode) {
          currentCityNode.children.push(districtNode);
        }
      }
      const jsContent = `const addressData = ${JSON.stringify(addressData, null, 2)}; \n\n module.exports = addressData \n`;
      const outputPath = path.join(process.cwd(), 'src', 'assets', 'address.ts');
      fs.writeFileSync(outputPath, jsContent);
    });
  }

  getUsualAddress() {
    const addressCode = ['110000', '120000', '130000', '140000', '210000'];
    console.log("addressTree===>", addressTree.length)
    const usualAddressList = addressTree.filter(item => addressCode.includes(item.value)).map(i => {label: i.label; value: i.value});
    return usualAddressList;
  }
}
