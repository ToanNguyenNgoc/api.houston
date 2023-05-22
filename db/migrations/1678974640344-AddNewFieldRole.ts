import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldRole1678974640344 implements MigrationInterface {
    name = 'AddNewFieldRole1678974640344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_role\` ADD \`code\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_role\` DROP COLUMN \`code\``);
    }

}
