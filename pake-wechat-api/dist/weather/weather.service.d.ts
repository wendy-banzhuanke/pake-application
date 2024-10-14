import { HttpService } from '@nestjs/axios';
export declare class WeatherService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getWeatherInfo(city: number): Promise<any>;
    generateAddressData(filePath: string): void;
    getUsualAddress(): {
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
    getSearchAddress(keyword: string): any[];
    flattenAddresses(treeData: any, parentPath?: string): any[];
}
