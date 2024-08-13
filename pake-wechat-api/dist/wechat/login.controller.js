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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
let LoginController = class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    async getWeChatLogin(code) {
        const _token = await this.loginService.getLogin(code);
        console.log('token--: ', _token);
        return { code: '000000', data: { token: _token } };
    }
    async getWeChatMobileLogin(decryptDto) {
        try {
            const result = await this.loginService.decryptPhoneNumber(decryptDto.code, decryptDto.encryptedData, decryptDto.iv);
            return { phoneNumber: result.phoneNumber };
        }
        catch (error) {
            throw new common_1.HttpException('解密失败', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, common_1.Post)('getLogin'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getWeChatLogin", null);
__decorate([
    (0, common_1.Post)('getWeChatMobileLogin'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getWeChatMobileLogin", null);
exports.LoginController = LoginController = __decorate([
    (0, common_1.Controller)('/login'),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginController);
//# sourceMappingURL=login.controller.js.map