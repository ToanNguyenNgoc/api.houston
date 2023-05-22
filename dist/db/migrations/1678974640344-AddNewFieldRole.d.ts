import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddNewFieldRole1678974640344 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
