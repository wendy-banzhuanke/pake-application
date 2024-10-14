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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const weather_service_1 = require("./weather.service");
let WeatherController = class WeatherController {
    constructor(weatherService) {
        this.weatherService = weatherService;
    }
    async getWeatherInfoByCity(city) {
        const cityCode = Number(city);
        console.log('cityCode====', city, cityCode);
        const _weatherInfo = await this.weatherService.getWeatherInfo(cityCode);
        return { code: '000000', success: true, data: _weatherInfo.lives };
    }
    generateAddressData() {
        const filePath = path.join(process.cwd(), 'src', 'assets', 'AMap_adcode_citycode.xlsx');
        const distFilePath = path.join(process.cwd(), 'dist', 'assets', 'AMap_adcode_citycode.xlsx');
        const finalFilePath = fs.existsSync(distFilePath) ? distFilePath : filePath;
        this.weatherService.generateAddressData(finalFilePath);
        return {
            message: '生成地址数据成功',
            code: '000000',
        };
    }
    getUsualAddress() {
        const usualData = this.weatherService.getUsualAddress();
        console.log('usualData===', usualData);
        return {
            message: '获取常用地址成功',
            data: usualData,
            code: '000000',
        };
    }
    getSearchAddress(keyword) {
        console.log('keyword===', keyword);
        const searchData = this.weatherService.getSearchAddress(keyword);
        console.log('flatAddresses=searchData==>', searchData);
        return {
            message: '获取搜索地址成功',
            data: searchData,
            code: '000000',
        };
    }
};
exports.WeatherController = WeatherController;
__decorate([
    (0, common_1.Post)('getWeatherInfo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WeatherController.prototype, "getWeatherInfoByCity", null);
__decorate([
    (0, common_1.Get)('generateAddressData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WeatherController.prototype, "generateAddressData", null);
__decorate([
    (0, common_1.Post)('getUsualAddress'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WeatherController.prototype, "getUsualAddress", null);
__decorate([
    (0, common_1.Post)('getSearchAddress'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WeatherController.prototype, "getSearchAddress", null);
exports.WeatherController = WeatherController = __decorate([
    (0, common_1.Controller)('/weather'),
    __metadata("design:paramtypes", [weather_service_1.WeatherService])
], WeatherController);
//# sourceMappingURL=weather.controller.js.map