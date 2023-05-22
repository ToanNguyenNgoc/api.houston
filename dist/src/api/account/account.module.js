"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const account_controller_1 = require("./account.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const entities_2 = require("../role/entities");
const generate_permission_1 = require("../../middlewares/generate-permission");
const permission_entity_1 = require("../permission/entities/permission.entity");
const entities_3 = require("../branches/entities");
const entities_4 = require("../media/entities");
let AccountModule = class AccountModule {
    configure(consumer) {
        consumer
            .apply(generate_permission_1.GeneratePermissionMiddleware)
            .forRoutes(account_controller_1.AccountController);
    }
};
AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                entities_1.Account,
                entities_2.Role,
                permission_entity_1.Permission,
                entities_3.Branch,
                entities_4.Media
            ])],
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService]
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map