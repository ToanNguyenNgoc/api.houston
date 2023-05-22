"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFieldCustomer1678948166976 = void 0;
class UpdateFieldCustomer1678948166976 {
    constructor() {
        this.name = 'UpdateFieldCustomer1678948166976';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tb_customer\` ADD \`sex\` tinyint NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tb_customer\` DROP COLUMN \`sex\``);
    }
}
exports.UpdateFieldCustomer1678948166976 = UpdateFieldCustomer1678948166976;
//# sourceMappingURL=1678948166976-UpdateFieldCustomer.js.map