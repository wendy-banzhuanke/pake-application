import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    getWeChatLogin(code: string): Promise<any>;
    getWeChatMobileLogin(decryptDto: {
        code: string;
        encryptedData: string;
        iv: string;
    }): Promise<any>;
}
