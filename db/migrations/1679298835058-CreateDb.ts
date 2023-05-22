import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1679298835058 implements MigrationInterface {
    name = 'CreateDb1679298835058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullname\` varchar(255) NOT NULL, \`telephone\` varchar(255) NOT NULL, \`sex\` tinyint NOT NULL, \`full_address\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_channel_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`header\` varchar(255) NOT NULL, \`route\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`permission_path\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b9272cb3ddba542c421129823e\` (\`permission_path\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`deleted\` tinyint NOT NULL DEFAULT 0, \`description\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8a548fb819ca25681da6e2a419\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`telephone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`fullname\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`description\` varchar(255) NULL, \`sex\` tinyint NOT NULL DEFAULT 1, \`full_address\` varchar(255) NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b8ad71f7ae902671fc9577b894\` (\`telephone\`), UNIQUE INDEX \`IDX_3741553369b2b4ee0515ad17ef\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_role_permissions_tb_permission\` (\`tbRoleId\` int NOT NULL, \`tbPermissionId\` int NOT NULL, INDEX \`IDX_3611c54ff8ae1c68d1b95d5d76\` (\`tbRoleId\`), INDEX \`IDX_e7a72ec181dfb50c48fad0ee2d\` (\`tbPermissionId\`), PRIMARY KEY (\`tbRoleId\`, \`tbPermissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_account_roles_tb_role\` (\`tbAccountId\` int NOT NULL, \`tbRoleId\` int NOT NULL, INDEX \`IDX_bc3203de1fe33900e31a3805bc\` (\`tbAccountId\`), INDEX \`IDX_dc5f756032e590a21be3009d55\` (\`tbRoleId\`), PRIMARY KEY (\`tbAccountId\`, \`tbRoleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tb_role_permissions_tb_permission\` ADD CONSTRAINT \`FK_3611c54ff8ae1c68d1b95d5d769\` FOREIGN KEY (\`tbRoleId\`) REFERENCES \`tb_role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tb_role_permissions_tb_permission\` ADD CONSTRAINT \`FK_e7a72ec181dfb50c48fad0ee2d8\` FOREIGN KEY (\`tbPermissionId\`) REFERENCES \`tb_permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tb_account_roles_tb_role\` ADD CONSTRAINT \`FK_bc3203de1fe33900e31a3805bce\` FOREIGN KEY (\`tbAccountId\`) REFERENCES \`tb_account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tb_account_roles_tb_role\` ADD CONSTRAINT \`FK_dc5f756032e590a21be3009d55a\` FOREIGN KEY (\`tbRoleId\`) REFERENCES \`tb_role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_account_roles_tb_role\` DROP FOREIGN KEY \`FK_dc5f756032e590a21be3009d55a\``);
        await queryRunner.query(`ALTER TABLE \`tb_account_roles_tb_role\` DROP FOREIGN KEY \`FK_bc3203de1fe33900e31a3805bce\``);
        await queryRunner.query(`ALTER TABLE \`tb_role_permissions_tb_permission\` DROP FOREIGN KEY \`FK_e7a72ec181dfb50c48fad0ee2d8\``);
        await queryRunner.query(`ALTER TABLE \`tb_role_permissions_tb_permission\` DROP FOREIGN KEY \`FK_3611c54ff8ae1c68d1b95d5d769\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc5f756032e590a21be3009d55\` ON \`tb_account_roles_tb_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc3203de1fe33900e31a3805bc\` ON \`tb_account_roles_tb_role\``);
        await queryRunner.query(`DROP TABLE \`tb_account_roles_tb_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7a72ec181dfb50c48fad0ee2d\` ON \`tb_role_permissions_tb_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_3611c54ff8ae1c68d1b95d5d76\` ON \`tb_role_permissions_tb_permission\``);
        await queryRunner.query(`DROP TABLE \`tb_role_permissions_tb_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_3741553369b2b4ee0515ad17ef\` ON \`tb_account\``);
        await queryRunner.query(`DROP INDEX \`IDX_b8ad71f7ae902671fc9577b894\` ON \`tb_account\``);
        await queryRunner.query(`DROP TABLE \`tb_account\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a548fb819ca25681da6e2a419\` ON \`tb_role\``);
        await queryRunner.query(`DROP TABLE \`tb_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9272cb3ddba542c421129823e\` ON \`tb_permission\``);
        await queryRunner.query(`DROP TABLE \`tb_permission\``);
        await queryRunner.query(`DROP TABLE \`tb_channel_log\``);
        await queryRunner.query(`DROP TABLE \`tb_customer\``);
    }

}
