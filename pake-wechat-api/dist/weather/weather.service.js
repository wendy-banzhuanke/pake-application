"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const index_1 = require("../config/index");
const address_1 = require("../assets/address");
let WeatherService = class WeatherService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getWeatherInfo(city) {
        const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${index_1.amapKey}`;
        const response$ = await (0, rxjs_1.lastValueFrom)(this.httpService.get(weatherUrl));
        return response$.data;
    }
    generateAddressData(filePath) {
        const addressCodeBook = xlsx.readFile(filePath);
        const sheetName = addressCodeBook.SheetNames[0];
        const addressCodeSheet = addressCodeBook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(addressCodeSheet);
        const addressData = [];
        let currentProvinceNode = null;
        let currentCityNode = null;
        jsonData.forEach((item) => {
            const { name, adcode } = item;
            const adcodeStr = String(adcode);
            if (adcodeStr.endsWith('0000')) {
                currentProvinceNode = { label: name, value: adcodeStr, children: [] };
                addressData.push(currentProvinceNode);
            }
            else if (adcodeStr.endsWith('00')) {
                currentCityNode = { label: name, value: adcodeStr, children: [] };
                if (currentProvinceNode) {
                    currentProvinceNode.children.push(currentCityNode);
                }
            }
            else {
                const districtNode = { label: name, value: adcodeStr };
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
        console.log("addressTree===>", address_1.addressTree.length);
        const usualAddressList = address_1.addressTree.filter(item => addressCode.includes(item.value)).map(i => i.label);
        return usualAddressList;
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map