"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewFieldAccount1679034875825 = void 0;
class AddNewFieldAccount1679034875825 {
    constructor() {
        this.name = 'AddNewFieldAccount1679034875825';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tb_account\` ADD \`sex\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`tb_account\` ADD \`full_address\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tb_account\` DROP COLUMN \`full_address\``);
        await queryRunner.query(`ALTER TABLE \`tb_account\` DROP COLUMN \`sex\``);
    }
}
exports.AddNewFieldAccount1679034875825 = AddNewFieldAccount1679034875825;
//# sourceMappingURL=1679034875825-AddNewFieldAccount.js.map