"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewPermission1678942306746 = void 0;
class AddNewPermission1678942306746 {
    constructor() {
        this.name = 'AddNewPermission1678942306746';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tb_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`permission_path\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b9272cb3ddba542c421129823e\` (\`permission_path\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_b9272cb3ddba542c421129823e\` ON \`tb_permission\``);
        await queryRunner.query(`DROP TABLE \`tb_permission\``);
    }
}
exports.AddNewPermission1678942306746 = AddNewPermission1678942306746;
//# sourceMappingURL=1678942306746-AddNewPermission.js.map