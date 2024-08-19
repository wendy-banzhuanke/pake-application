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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const jwt_1 = require("@nestjs/jwt");
const rxjs_1 = require("rxjs");
const index_1 = require("../config/index");
let LoginService = class LoginService {
    constructor(httpService, jwtService) {
        this.httpService = httpService;
        this.jwtService = jwtService;
        this.APPID = index_1.wechatAppid;
        this.SECRET = index_1.wechatSecret;
    }
    async getLogin(code) {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.APPID}&secret=${this.SECRET}&js_code=${code}&grant_type=authorization_code`;
        const response$ = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
        const { openid, session_key, errcode } = response$.data;
        console.log('errcode===>', errcode, response$.data);
        if (errcode) {
            throw new common_1.HttpException({ ...response$ }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            const _token = this.jwtService.sign({ openid, session_key });
            return _token;
        }
    }
    async decryptPhoneNumber(code, encryptedData, iv) {
        const sessionResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: this.APPID,
                secret: this.SECRET,
                js_code: code,
                grant_type: 'authorization_code',
            },
        }));
        const sessionKey = sessionResponse.data.session_key;
        return "";
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        jwt_1.JwtService])
], LoginService);
//# sourceMappingURL=login.service.js.map