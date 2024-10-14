import { WeatherService } from './weather.service';
export declare class WeatherController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    getWeatherInfoByCity(city: string): Promise<{
        code: string;
        success: boolean;
        data: any;
    }>;
    generateAddressData(): {
        message: string;
        code: string;
    };
    getUsualAddress(): {
        message: string;
        data: {
            label: string;
            value: string;
            children: {
                label: string;
                value: string;
                children: {
                    label: string;
                    value: string;
                }[];
            }[];
        }[];
        code: string;
    };
    getSearchAddress(keyword: string): {
        message: string;
        data: any[];
        code: string;
    };
}
