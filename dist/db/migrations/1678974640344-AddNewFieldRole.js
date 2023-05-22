"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewFieldRole1678974640344 = void 0;
class AddNewFieldRole1678974640344 {
    constructor() {
        this.name = 'AddNewFieldRole1678974640344';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tb_role\` ADD \`code\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tb_role\` DROP COLUMN \`code\``);
    }
}
exports.AddNewFieldRole1678974640344 = AddNewFieldRole1678974640344;
//# sourceMappingURL=1678974640344-AddNewFieldRole.js.map