import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewAccount1678946990678 implements MigrationInterface {
    name = 'AddNewAccount1678946990678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`telephone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`fullname\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`description\` varchar(255) NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b8ad71f7ae902671fc9577b894\` (\`telephone\`), UNIQUE INDEX \`IDX_3741553369b2b4ee0515ad17ef\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_account_roles_tb_role\` (\`tbAccountId\` int NOT NULL, \`tbRoleId\` int NOT NULL, INDEX \`IDX_bc3203de1fe33900e31a3805bc\` (\`tbAccountId\`), INDEX \`IDX_dc5f756032e590a21be3009d55\` (\`tbRoleId\`), PRIMARY KEY (\`tbAccountId\`, \`tbRoleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tb_account_roles_tb_role\` ADD CONSTRAINT \`FK_bc3203de1fe33900e31a3805bce\` FOREIGN KEY (\`tbAccountId\`) REFERENCES \`tb_account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tb_account_roles_tb_role\` ADD CONSTRAINT \`FK_dc5f756032e590a21be3009d55a\` FOREIGN KEY (\`tbRoleId\`) REFERENCES \`tb_role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_account_roles_tb_role\` DROP FOREIGN KEY \`FK_dc5f756032e590a21be3009d55a\``);
        await queryRunner.query(`ALTER TABLE \`tb_account_roles_tb_role\` DROP FOREIGN KEY \`FK_bc3203de1fe33900e31a3805bce\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc5f756032e590a21be3009d55\` ON \`tb_account_roles_tb_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc3203de1fe33900e31a3805bc\` ON \`tb_account_roles_tb_role\``);
        await queryRunner.query(`DROP TABLE \`tb_account_roles_tb_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_3741553369b2b4ee0515ad17ef\` ON \`tb_account\``);
        await queryRunner.query(`DROP INDEX \`IDX_b8ad71f7ae902671fc9577b894\` ON \`tb_account\``);
        await queryRunner.query(`DROP TABLE \`tb_account\``);
    }

}
