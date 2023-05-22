"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recaptchaConfig = exports.validatorsFile = exports.mailerConfig = exports.cloudinaryConfig = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
exports.cloudinaryConfig = {
    imports: [config_1.ConfigModule],
    useFactory: (configService) => ({
        cloud_name: configService.get('CLOUDINARY_NAME'),
        api_key: configService.get('CLOUDINARY_API_KEY'),
        api_secret: configService.get('CLOUDINARY_CL_API_SECRET_KET'),
    }),
    inject: [config_1.ConfigService],
};
exports.mailerConfig = {
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
exports.validatorsFile = new common_1.ParseFilePipe({
    validators: [
        new common_1.MaxFileSizeValidator({ maxSize: 30000000 }),
        new common_1.FileTypeValidator({ fileType: /^(image|video)\// }),
    ],
});
exports.recaptchaConfig = {
    imports: [config_1.ConfigModule],
    useFactory: (configService) => ({
        secretKey: configService.get('RECAPTCHA_SECRET_KEY'),
        response: req => req.headers.recaptcha,
        actions: ['FORGOT_CUSTOMER', 'BOOKING_CUSTOMER'],
        score: 0.8,
    }),
    inject: [config_1.ConfigService]
};
//# sourceMappingURL=index.js.map