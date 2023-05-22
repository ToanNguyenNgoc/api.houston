"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const customer_controller_1 = require("./customer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const generate_permission_1 = require("../../middlewares/generate-permission");
const permission_entity_1 = require("../permission/entities/permission.entity");
const entities_1 = require("../account/entities");
const entities_2 = require("../role/entities");
const entities_3 = require("../media/entities");
const entities_4 = require("../customer_original/entities");
let CustomerModule = class CustomerModule {
    configure(consumer) {
        consumer
            .apply(generate_permission_1.GeneratePermissionMiddleware)
            .forRoutes(customer_controller_1.CustomerController);
    }
};
CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                customer_entity_1.Customer,
                permission_entity_1.Permission,
                entities_1.Account,
                entities_2.Role,
                entities_3.Media,
                entities_4.CustomerOriginal
            ])],
        controllers: [customer_controller_1.CustomerController],
        providers: [customer_service_1.CustomerService]
    })
], CustomerModule);
exports.CustomerModule = CustomerModule;
//# sourceMappingURL=customer.module.js.map