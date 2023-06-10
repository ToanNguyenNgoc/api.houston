"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmAsyncConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
exports.typeOrmAsyncConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async () => {
        return {
            type: 'mysql',
            host: process.env.TYPEORM_HOST,
            port: parseInt(process.env.TYPEORM_PORT, 10),
            username: process.env.TYPEORM_USERNAME,
            database: process.env.TYPEORM_DATABASE,
            password: process.env.TYPEORM_PASSWORD,
            autoLoadEntities: true,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            migrations: ['dist/db/migrations/*.js'],
            synchronize: true,
            timezone: process.env.TIME_ZONE_UTC_DB
        };
    },
};
const typeOrmConfig = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    database: process.env.TYPEORM_DATABASE,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: true,
    timezone: 'Z'
};
const dataSource = new typeorm_1.DataSource(typeOrmConfig);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map