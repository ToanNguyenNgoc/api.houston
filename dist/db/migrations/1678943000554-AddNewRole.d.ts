import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddNewRole1678943000554 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
