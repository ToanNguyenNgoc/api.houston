import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddNewChannelLog1678947610617 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
