import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
export declare class LoginService {
    private readonly httpService;
    private readonly jwtService;
    constructor(httpService: HttpService, jwtService: JwtService);
    private readonly APPID;
    private readonly SECRET;
    getLogin(code: string): Promise<string>;
    decryptPhoneNumber(code: string, encryptedData: string, iv: string): Promise<any>;
}
