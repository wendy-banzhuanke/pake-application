/*
 * @Author: zhangjian
 * @Date: 2024-08-14 16:26:34
 * @LastEditTime: 2024-10-12 09:47:31
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
import addressData from '../assets/address';

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
      const outputPath = path.join(
        process.cwd(),
        'src',
        'assets',
        'address.ts',
      );
      fs.writeFileSync(outputPath, jsContent);
    });
  }

  getUsualAddress() {
    const addressCode = ['110000', '120000', '130000'];
    const usualAddressList = addressData.filter(
      (item) => !!addressCode.includes(item.value),
    );
    return usualAddressList;
  }

  getSearchAddress(keyword: string) {
    if (keyword.trim() === '') {
      return;
    }
    const flatAddresses = this.flattenAddresses(addressData);
    const regex = new RegExp(keyword.trim(), 'i');
    const _flat = flatAddresses.filter((address) => !!regex.test(address.name));

    return _flat;
  }

  // 使用示例
  // const flattenedAddresses = flattenTree(addresses);
  // console.log(flattenedAddresses);

  // flattenData(treeData) {
  //   const flatArray = [];
  //   function flatten(node) {
  //     flatArray.push({ id: node.id, name: node.name });
  //     if (node.children && node.children.length > 0) {
  //       node.children.forEach((child) => flatten(child));
  //     }
  //   }
  //   treeData.forEach((node) => flatten(node));

  //   return flatArray;
  // }

  // 扁平化处理并保留路径信息
  flattenAddresses(treeData, parentPath = '') {
    const flatArray = [];
    function flatten(node, path) {
      const nodePath = path ? `${path} > ${node.label}` : node.label;
      flatArray.push({ id: node.value, name: node.label, path: nodePath });
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => flatten(child, nodePath));
      }
    } 
    treeData.forEach((node) => flatten(node, parentPath));

    return flatArray;
  }

  // flattenAddresses(data) {
  //   return data.reduce((acc, curr) => {
  //     acc.push(curr);
  //     if (curr.children && curr.children.length > 0) {
  //       acc = acc.concat(this.flattenAddresses(curr.children));
  //     }
  //     return acc;
  //   }, []);
  // }
}
