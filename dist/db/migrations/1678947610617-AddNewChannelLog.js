"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewChannelLog1678947610617 = void 0;
class AddNewChannelLog1678947610617 {
    constructor() {
        this.name = 'AddNewChannelLog1678947610617';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tb_channel_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`header\` varchar(255) NOT NULL, \`route\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`tb_channel_log\``);
    }
}
exports.AddNewChannelLog1678947610617 = AddNewChannelLog1678947610617;
//# sourceMappingURL=1678947610617-AddNewChannelLog.js.map