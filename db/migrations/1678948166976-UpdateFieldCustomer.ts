import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldCustomer1678948166976 implements MigrationInterface {
    name = 'UpdateFieldCustomer1678948166976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_customer\` ADD \`sex\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_customer\` DROP COLUMN \`sex\``);
    }

}
