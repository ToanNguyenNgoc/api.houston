import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateDb1679299412977 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
