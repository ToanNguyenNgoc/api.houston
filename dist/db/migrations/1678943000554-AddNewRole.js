"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewRole1678943000554 = void 0;
class AddNewRole1678943000554 {
    constructor() {
        this.name = 'AddNewRole1678943000554';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tb_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`deleted\` tinyint NOT NULL DEFAULT 0, \`description\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_role_permissions_tb_permission\` (\`tbRoleId\` int NOT NULL, \`tbPermissionId\` int NOT NULL, INDEX \`IDX_3611c54ff8ae1c68d1b95d5d76\` (\`tbRoleId\`), INDEX \`IDX_e7a72ec181dfb50c48fad0ee2d\` (\`tbPermissionId\`), PRIMARY KEY (\`tbRoleId\`, \`tbPermissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tb_role_permissions_tb_permission\` ADD CONSTRAINT \`FK_3611c54ff8ae1c68d1b95d5d769\` FOREIGN KEY (\`tbRoleId\`) REFERENCES \`tb_role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tb_role_permissions_tb_permission\` ADD CONSTRAINT \`FK_e7a72ec181dfb50c48fad0ee2d8\` FOREIGN KEY (\`tbPermissionId\`) REFERENCES \`tb_permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tb_role_permissions_tb_permission\` DROP FOREIGN KEY \`FK_e7a72ec181dfb50c48fad0ee2d8\``);
        await queryRunner.query(`ALTER TABLE \`tb_role_permissions_tb_permission\` DROP FOREIGN KEY \`FK_3611c54ff8ae1c68d1b95d5d769\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7a72ec181dfb50c48fad0ee2d\` ON \`tb_role_permissions_tb_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_3611c54ff8ae1c68d1b95d5d76\` ON \`tb_role_permissions_tb_permission\``);
        await queryRunner.query(`DROP TABLE \`tb_role_permissions_tb_permission\``);
        await queryRunner.query(`DROP TABLE \`tb_role\``);
    }
}
exports.AddNewRole1678943000554 = AddNewRole1678943000554;
//# sourceMappingURL=1678943000554-AddNewRole.js.map