import { HttpService } from '@nestjs/axios';
export declare class WeatherService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getWeatherInfo(city: number): Promise<any>;
    generateAddressData(filePath: string): void;
    getUsualAddress(): string[];
}
