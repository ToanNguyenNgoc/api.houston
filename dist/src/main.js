"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const swagger_2 = require("./swagger");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOrigin = (_a = process.env.CORS_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(',');
    app.enableCors({
        "origin": corsOrigin,
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "credentials": true
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useStaticAssets(__dirname + 'public');
    app.use(cookieParser());
    app.use(session({
        secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000,
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_2.options);
    swagger_1.SwaggerModule.setup('docs', app, document, swagger_2.customOptions);
    await app.listen(process.env.TYPEORM_LOCAL_PORT || 3000);
    console.log(`run PORT : ${process.env.TYPEORM_LOCAL_PORT || 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map