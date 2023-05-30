"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../db/data-source");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const nestjs_cloudinary_1 = require("nestjs-cloudinary");
const google_recaptcha_1 = require("@nestlab/google-recaptcha");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const entities_1 = require("./api/role/entities");
const api_module_1 = require("./api/api.module");
const mailerConfig = {
    imports: [config_1.ConfigModule],
    useFactory: (configService) => ({
        transport: {
            host: 'smtp.sendgrid.net',
            auth: {
                user: configService.get('MAILER_USER'),
                pass: configService.get('MAILER_PASSWORD'),
            },
        },
        template: {
            dir: __dirname + '/templates',
            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    }),
    inject: [config_1.ConfigService]
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync(data_source_1.typeOrmAsyncConfig),
            typeorm_1.TypeOrmModule.forFeature([entities_1.Role]),
            nestjs_cloudinary_1.CloudinaryModule.forRootAsync(config_2.cloudinaryConfig),
            mailer_1.MailerModule.forRootAsync(mailerConfig),
            google_recaptcha_1.GoogleRecaptchaModule.forRootAsync(config_2.recaptchaConfig),
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map