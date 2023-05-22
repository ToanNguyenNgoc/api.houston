import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateDb1679298835058 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
