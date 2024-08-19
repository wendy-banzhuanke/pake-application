import { WeatherService } from './weather.service';
export declare class WeatherController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    getWeatherInfoByCity(city: string): Promise<{
        code: string;
        success: boolean;
        data: any;
    }>;
}
