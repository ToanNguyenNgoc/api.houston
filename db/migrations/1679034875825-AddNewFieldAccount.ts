import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldAccount1679034875825 implements MigrationInterface {
    name = 'AddNewFieldAccount1679034875825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_account\` ADD \`sex\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`tb_account\` ADD \`full_address\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_account\` DROP COLUMN \`full_address\``);
        await queryRunner.query(`ALTER TABLE \`tb_account\` DROP COLUMN \`sex\``);
    }

}
