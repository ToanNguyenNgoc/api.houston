"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewCustomer1678941757380 = void 0;
class AddNewCustomer1678941757380 {
    constructor() {
        this.name = 'AddNewCustomer1678941757380';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tb_customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullname\` varchar(255) NOT NULL, \`telephone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`tb_customer\``);
    }
}
exports.AddNewCustomer1678941757380 = AddNewCustomer1678941757380;
//# sourceMappingURL=1678941757380-AddNewCustomer.js.map