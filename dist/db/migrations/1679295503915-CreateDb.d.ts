import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateDb1679295503915 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
