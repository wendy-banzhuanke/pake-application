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
const index_1 = require("../config/index");
const rxjs_1 = require("rxjs");
let WeatherService = class WeatherService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getWeatherInfo(city) {
        const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${index_1.amapKey}`;
        const response$ = await (0, rxjs_1.lastValueFrom)(this.httpService.get(weatherUrl));
        return response$.data;
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map