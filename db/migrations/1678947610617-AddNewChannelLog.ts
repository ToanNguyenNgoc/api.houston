import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewChannelLog1678947610617 implements MigrationInterface {
    name = 'AddNewChannelLog1678947610617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_channel_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`header\` varchar(255) NOT NULL, \`route\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tb_channel_log\``);
    }

}
