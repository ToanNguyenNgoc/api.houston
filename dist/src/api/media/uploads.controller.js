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
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
let UploadsController = class UploadsController {
    getImageByName(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), '/uploads/' + imagename)));
    }
};
__decorate([
    (0, common_1.Get)(":imagename"),
    __param(0, (0, common_1.Param)("imagename")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "getImageByName", null);
UploadsController = __decorate([
    (0, swagger_1.ApiExcludeController)(),
    (0, common_1.Controller)('uploads')
], UploadsController);
exports.UploadsController = UploadsController;
//# sourceMappingURL=uploads.controller.js.map