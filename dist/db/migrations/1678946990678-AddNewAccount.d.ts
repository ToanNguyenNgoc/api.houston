import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddNewAccount1678946990678 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
