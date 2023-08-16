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
exports.ExampleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const redis_1 = require("../../redis");
let ExampleController = class ExampleController {
    constructor(redisCacheSv) {
        this.redisCacheSv = redisCacheSv;
    }
    async setCate() {
        await this.redisCacheSv.set('NEW_CACHE', 'Hello bro!');
        return true;
    }
    async getCate() {
        const res = await this.redisCacheSv.get('NEW_CACHE');
        return res;
    }
    async delCate() {
        await this.redisCacheSv.del('NEW_CACHE');
        return;
    }
};
__decorate([
    (0, common_1.Get)('set-cache'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleController.prototype, "setCate", null);
__decorate([
    (0, common_1.Get)('get-cache'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleController.prototype, "getCate", null);
__decorate([
    (0, common_1.Get)('del-cache'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleController.prototype, "delCate", null);
ExampleController = __decorate([
    (0, swagger_1.ApiTags)('example'),
    (0, common_1.Controller)('example'),
    __metadata("design:paramtypes", [redis_1.RedisCacheService])
], ExampleController);
exports.ExampleController = ExampleController;
//# sourceMappingURL=example.controller.js.map