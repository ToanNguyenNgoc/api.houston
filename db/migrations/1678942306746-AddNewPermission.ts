import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewPermission1678942306746 implements MigrationInterface {
    name = 'AddNewPermission1678942306746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`permission_path\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b9272cb3ddba542c421129823e\` (\`permission_path\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b9272cb3ddba542c421129823e\` ON \`tb_permission\``);
        await queryRunner.query(`DROP TABLE \`tb_permission\``);
    }

}
